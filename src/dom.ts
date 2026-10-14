import { parseHTML } from "linkedom";

// Tipe sendiri (tanpa bergantung pada lib DOM), supaya tidak bentrok
// dengan tipe Element milik @cloudflare/workers-types (HTMLRewriter).
export interface DomNode {
  nodeType: number;
  textContent: string | null;
}

export interface El {
  textContent: string | null;
  childNodes: ArrayLike<DomNode>;
  getAttribute(name: string): string | null;
  querySelector(selector: string): El | null;
  querySelectorAll(selector: string): ArrayLike<El>;
}

export interface Doc {
  querySelector(selector: string): El | null;
  querySelectorAll(selector: string): ArrayLike<El>;
}

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
