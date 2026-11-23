import { MusicItem, MusicCategory } from "@/types/music";

/**
 * Utility to convert any Spotify URL (track, playlist, album, artist)
 * into an official Spotify Embed URL without audio extraction.
 */
export function toSpotifyEmbedUrl(url: string): string {
  try {
    const trimmed = url.trim();
    if (trimmed.includes("open.spotify.com/embed")) {
      return trimmed;
    }
    const match = trimmed.match(/open\.spotify\.com\/(track|playlist|album|episode)\/([a-zA-Z0-9]+)/);
    if (match) {
      const [, type, id] = match;
      return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
    }
    return trimmed;
  } catch {
    return url;
  }
}

/**
 * Utility to convert any Spotify URL into a standard Spotify URI
 * for the official Spotify iFrame Controller API.
 */
export function toSpotifyUri(url: string): string {
  try {
    const trimmed = url.trim();
    if (trimmed.startsWith("spotify:")) {
      return trimmed;
    }
    const match = trimmed.match(/open\.spotify\.com\/(track|playlist|album|episode)\/([a-zA-Z0-9]+)/);
    if (match) {
      const [, type, id] = match;
      return `spotify:${type}:${id}`;
    }
    return trimmed;
  } catch {
    return url;
  }
}

export const musicCategories: MusicCategory[] = [
  "Deep Focus",
  "Coding Sessions",
  "My Favourite Tracks",
  "Current Favourite",
];

export const initialMusicData: MusicItem[] = [
  {
    id: "fm-01",
    title: "Synthwave / Cyberpunk Coding Flow",
    artist: "Curated Spotify Stream",
    category: "Coding Sessions",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdLEN7aqioXM?utm_source=generator&theme=0",
    description: "High-tempo electronic rhythm and cyberpunk ambient beats calibrated for late-night algorithm design and high-velocity coding.",
    duration: "4+ Hours",
    isFeatured: true,
    addedAt: "2024-11-01",
  },
  {
    id: "fm-02",
    title: "Deep Focus Ambient Soundscapes",
    artist: "Deep Focus Editorial",
    category: "Deep Focus",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ?utm_source=generator&theme=0",
    description: "Calm, continuous harmonic drones and ambient textures that eliminate cognitive noise when debugging complex SQL queries or concurrency locks.",
    duration: "6+ Hours",
    isFeatured: false,
    addedAt: "2024-10-15",
  },
  {
    id: "fm-03",
    title: "Resonance",
    artist: "HOME",
    category: "Current Favourite",
    spotifyUrl: "https://open.spotify.com/track/1Tu2b1Y2eGZ86p8yD8eO9O",
    embedUrl: "https://open.spotify.com/embed/track/1Tu2b1Y2eGZ86p8yD8eO9O?utm_source=generator&theme=0",
    description: "The timeless chillwave anthem that soundtracked Mohan's transition from corporate accounting to building full-stack distributed systems.",
    duration: "3:32",
    isFeatured: true,
    addedAt: "2024-11-10",
  },
  {
    id: "fm-04",
    title: "Solaris (Lofi Beats to Structure Code)",
    artist: "Lofi Records",
    category: "Coding Sessions",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0",
    description: "Warm tape-saturated beats and soft electric keys that maintain deep state-of-flow without lyrical distraction.",
    duration: "3+ Hours",
    isFeatured: false,
    addedAt: "2024-09-20",
  },
  {
    id: "fm-05",
    title: "Interstellar — Main Theme",
    artist: "Hans Zimmer",
    category: "My Favourite Tracks",
    spotifyUrl: "https://open.spotify.com/track/6ov0aYn81643c7B6gU7f6C",
    embedUrl: "https://open.spotify.com/embed/track/6ov0aYn81643c7B6gU7f6C?utm_source=generator&theme=0",
    description: "Monumental acoustic organ chords evoking boundless engineering curiosity and perseverance against impossible constraints.",
    duration: "4:05",
    isFeatured: false,
    addedAt: "2024-08-12",
  },
  {
    id: "fm-06",
    title: "Weightless",
    artist: "Marconi Union",
    category: "Deep Focus",
    spotifyUrl: "https://open.spotify.com/track/6kkwzB6hXLIONkEk9JciA6",
    embedUrl: "https://open.spotify.com/embed/track/6kkwzB6hXLIONkEk9JciA6?utm_source=generator&theme=0",
    description: "A scientifically designed low-frequency soundscape that slows heart rate and fosters hyper-concentrated system architecture thinking.",
    duration: "8:08",
    isFeatured: false,
    addedAt: "2024-07-04",
  },
];
