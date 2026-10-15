import { sources } from "./sources";
import { HttpError } from "./http";
import { PLAYER_HTML } from "./player";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...CORS },
  });
}

export default {
  async fetch(req: Request): Promise<Response> {
    if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
    if (req.method !== "GET") return json({ error: "Method not allowed" }, 405);

    const u = new URL(req.url);
    const parts = u.pathname.split("/").filter(Boolean);

    try {
      if (parts.length === 0 || parts[0] === "player") {
        return new Response(PLAYER_HTML, { headers: { "Content-Type": "text/html; charset=utf-8" } });
      }

      if (parts[0] === "sources") {
        return json(
          Object.values(sources).map((s) => ({
            id: s.id,
            name: s.name,
            mainUrl: s.mainUrl,
            sections: s.sections,
          })),
        );
      }

      const src = sources[parts[0]];
      if (!src) return json({ error: `Sumber '${parts[0]}' tidak ada` }, 404);

      const need = (k: string): string => {
        const v = u.searchParams.get(k);
        if (!v) throw new HttpError(400, `Parameter '${k}' wajib`);
        return v;
      };

      switch (parts[1]) {
        case "home": {
          const section = u.searchParams.get("section") ?? Object.keys(src.sections)[0];
          const page = Math.max(1, parseInt(u.searchParams.get("page") ?? "1", 10) || 1);
          return json({ section, page, items: await src.home(section, page) });
        }
        case "search":
          return json({ items: await src.search(need("q")) });
        case "detail":
          return json(await src.detail(need("url")));
        case "links":
          return json({ links: await src.links(need("url")) });
        default:
          return json({ error: "Endpoint: /home /search /detail /links" }, 404);
      }
    } catch (e) {
      if (e instanceof HttpError) return json({ error: e.message }, e.status);
      return json({ error: e instanceof Error ? e.message : "Internal error" }, 500);
    }
  },
} satisfies ExportedHandler;
