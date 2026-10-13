import { parseHTML } from "linkedom";

export type Doc = Document;
export type El = Element;

export function parse(html: string): Doc {
  return parseHTML(html).document as unknown as Doc;
}

export function text(el: El | null | undefined): string {
  return (el?.textContent ?? "").replace(/\s+/g, " ").trim();
}

/** Padanan Jsoup ownText(): hanya teks langsung milik elemen, tanpa anak. */
export function ownText(el: El | null | undefined): string {
  if (!el) return "";
  return Array.from(el.childNodes)
    .filter((n) => n.nodeType === 3)
    .map((n) => n.textContent ?? "")
    .join("")
    .trim();
}

export function attr(el: El | null | undefined, name: string): string | undefined {
  const v = el?.getAttribute(name);
  return v && v.trim() ? v.trim() : undefined;
}
