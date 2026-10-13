export interface ListItem {
  title: string;
  url: string;
  poster?: string;
  episode?: number;
}

export interface Episode {
  name: string;
  url: string;
  number?: number;
}

export interface Detail {
  title: string;
  url: string;
  poster?: string;
  plot?: string;
  genres: string[];
  status?: "ongoing" | "completed";
  year?: number;
  episodes: Episode[];
}

export interface StreamLink {
  server: string;
  quality: number | null; // 1080, 720, ... atau null kalau tidak diketahui
  url: string;
  // direct = bisa diputar langsung, embed = halaman/embed host pihak ketiga
  type: "direct" | "embed";
  referer?: string;
}

export interface Source {
  id: string;
  name: string;
  mainUrl: string;
  sections: Record<string, string>; // key -> label
  home(section: string, page: number): Promise<ListItem[]>;
  search(query: string): Promise<ListItem[]>;
  detail(url: string): Promise<Detail>;
  links(episodeUrl: string): Promise<StreamLink[]>;
}
