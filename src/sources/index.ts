import type { Source } from "../types";
import { otakudesu } from "./otakudesu";

// Tambah modul baru di sini (satu file per situs, implementasi interface Source).
export const sources: Record<string, Source> = {
  [otakudesu.id]: otakudesu,
};
