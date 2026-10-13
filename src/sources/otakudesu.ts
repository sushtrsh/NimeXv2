import type { Detail, Episode, ListItem, Source, StreamLink } from "../types";
import { assertHost, getHtml, hostIs, resolveRedirect } from "../http";
import { attr, ownText, parse, text } from "../dom";

const mainUrl = "https://otakudesu.blog";

function qualityOf(s: string): number | null {
  for (const q of [1080, 720, 480, 360, 240]) if (s.includes(String(q))) return q;
  return null;
}

export const otakudesu: Source = {
  id: "otakudesu",
  name: "Otakudesu",
  mainUrl,
  sections: { ongoing: "Anime Ongoing", complete: "Anime Completed" },

  async home(section, page) {
    const path = section === "complete" ? "complete-anime" : "ongoing-anime";
    const doc = parse(await getHtml(`${mainUrl}/${path}/page/${page}`));
    const seen = new Set<string>();
    const out: ListItem[] = [];
    for (const li of Array.from(doc.querySelectorAll("div.venz > ul > li"))) {
      const a = li.querySelector("a[href]");
      const url = attr(a, "href");
      const title = text(li.querySelector("h2.jdlflm")) || attr(a, "title");
      if (!url || !title || seen.has(url)) continue;
      seen.add(url);
      const epText = text(li.querySelector("div.epz"));
      const ep = epText.match(/(\d+)/)?.[1];
      out.push({
        title,
        url,
        poster: attr(li.querySelector("div.thumbz > img"), "src"),
        episode: ep ? parseInt(ep, 10) : undefined,
      });
    }
    return out;
  },

  async search(query) {
    const q = encodeURIComponent(query);
    const doc = parse(await getHtml(`${mainUrl}/?s=${q}&post_type=anime`));
    const out: ListItem[] = [];
    for (const li of Array.from(doc.querySelectorAll("ul.chivsrc > li"))) {
      const a = li.querySelector("h2 > a");
      const url = attr(a, "href");
      const title = text(a);
      if (!url || !title) continue;
      out.push({ title, url, poster: attr(li.querySelector("img"), "src") });
    }
    return out;
  },

  async detail(url): Promise<Detail> {
    assertHost(url, mainUrl);
    const doc = parse(await getHtml(url));

    const title =
      ownText(doc.querySelector("div.infozingle > p:nth-child(1) > span")).replace(":", "").trim() ||
      text(doc.querySelector("h1"));
    if (!title) throw new Error("Judul tidak ditemukan");

    const statusText = ownText(doc.querySelector("div.infozingle > p:nth-child(6) > span"));
    const yearText = text(doc.querySelector("div.infozingle > p:nth-child(9) > span"));
    const year = yearText.match(/\d, (\d*)/)?.[1];

    const lists = Array.from(doc.querySelectorAll("div.episodelist"));
    // index 0 = batch, index 1 = daftar episode (sama seperti plugin aslinya)
    const list = lists.length > 1 ? lists[1] : lists[0];
    const episodes: Episode[] = [];
    for (const li of Array.from(list?.querySelectorAll("ul > li") ?? [])) {
      const a = li.querySelector("a");
      const href = attr(a, "href");
      const name = text(a);
      if (!href || !name) continue;
      const n = name.match(/Episode\s?(\d+)/i)?.[1];
      episodes.push({ name, url: href, number: n ? parseInt(n, 10) : undefined });
    }
    episodes.reverse();

    return {
      title,
      url,
      poster: attr(doc.querySelector("div.fotoanime > img"), "src"),
      plot: text(doc.querySelector("div.sinopc")) || undefined,
      genres: Array.from(doc.querySelectorAll("div.infozingle > p:nth-child(11) > span > a")).map((e) => text(e)),
      status: /ongoing/i.test(statusText) ? "ongoing" : "completed",
      year: year ? parseInt(year, 10) : undefined,
      episodes,
    };
  },

  async links(episodeUrl): Promise<StreamLink[]> {
    assertHost(episodeUrl, mainUrl);
    const doc = parse(await getHtml(episodeUrl));
    const out: StreamLink[] = [];

    for (const li of Array.from(doc.querySelectorAll("div.download li"))) {
      const quality = qualityOf(text(li.querySelector("strong")));

      for (const a of Array.from(li.querySelectorAll("a[href]"))) {
        let href = attr(a, "href");
        if (!href) continue;
        const server = text(a) || "Download";

        // link.desustream.com = redirect, ikuti sekali untuk dapat URL asli
        if (hostIs(href, "desustream.com")) {
          const real = await resolveRedirect(href).catch(() => null);
          if (!real) continue;
          href = real;
        }
        const url = new URL(href, mainUrl).toString();

        const isDirect =
          /\.(mp4|mkv|webm|m3u8)(\?|$)/i.test(url) || url.toLowerCase().includes("pixeldrain.com/api/file/");
        if (isDirect) {
          out.push({ server, quality, url, type: "direct", referer: episodeUrl });
          continue;
        }

        if (hostIs(url, "pixeldrain.com")) {
          const id = url.match(/pixeldrain\.com\/u\/(\w+)/)?.[1];
          if (id) {
            out.push({
              server: "PixelDrain",
              quality,
              url: `https://pixeldrain.com/api/file/${id}`,
              type: "direct",
              referer: url,
            });
            continue;
          }
        }

        if (hostIs(url, "krakenfiles.com")) {
          try {
            const kf = parse(await getHtml(url));
            const src = attr(kf.querySelector("source[src*=krakencloud], source[type='video/mp4']"), "src");
            if (src) {
              out.push({ server: "KrakenFiles", quality, url: src, type: "direct", referer: url });
              continue;
            }
          } catch {
            /* jatuh ke embed */
          }
        }

        // Host lain: di CloudStream diserahkan ke loadExtractor. Di sini kita kembalikan apa adanya.
        out.push({ server, quality, url, type: "embed", referer: episodeUrl });
      }
    }
    return out;
  },
};
