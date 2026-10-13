export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export const UA: Record<string, string> = {
  "User-Agent":
    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
  "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8",
};

export async function getHtml(url: string, referer?: string): Promise<string> {
  const res = await fetch(url, {
    headers: { ...UA, ...(referer ? { Referer: referer } : {}) },
    // cache di edge 5 menit supaya tidak hammer situs asal
    cf: { cacheTtl: 300, cacheEverything: true },
  });
  if (!res.ok) throw new HttpError(502, `Upstream ${res.status}: ${url}`);
  return res.text();
}

/** Ambil header Location tanpa mengikuti redirect (padanan allowRedirects=false). */
export async function resolveRedirect(url: string): Promise<string | null> {
  const res = await fetch(url, { headers: UA, redirect: "manual" });
  return res.headers.get("location");
}

/** Cegah SSRF: URL dari client harus milik host sumber yang dipilih. */
export function assertHost(url: string, mainUrl: string): void {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    throw new HttpError(400, "URL tidak valid");
  }
  if (u.hostname !== new URL(mainUrl).hostname) {
    throw new HttpError(400, "URL bukan milik sumber ini");
  }
}

export function hostIs(url: string, domain: string): boolean {
  try {
    const h = new URL(url).hostname;
    return h === domain || h.endsWith("." + domain);
  } catch {
    return false;
  }
}
