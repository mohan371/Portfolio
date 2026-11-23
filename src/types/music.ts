export type MusicCategory =
  | "Deep Focus"
  | "Coding Sessions"
  | "My Favourite Tracks"
  | "Current Favourite";

export interface MusicItem {
  id: string;
  title: string;
  artist: string;
  category: MusicCategory;
  spotifyUrl: string;
  embedUrl: string;
  description: string;
  coverUrl?: string;
  isFeatured?: boolean;
  duration?: string;
  addedAt: string;
}
