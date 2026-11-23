import { create } from "zustand";
import { MusicItem } from "@/types/music";
import { initialMusicData } from "@/content/data/music";

interface SpotifyEmbedController {
  loadUri: (uri: string) => void;
  play: () => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  addListener: (event: string, callback: (data: any) => void) => void;
  removeListener: (event: string, callback: (data: any) => void) => void;
  destroy: () => void;
}

interface MusicState {
  currentTrack: MusicItem;
  isPlaying: boolean;
  isReady: boolean;
  isPanelOpen: boolean;
  positionMs: number;
  durationMs: number;
  controller: SpotifyEmbedController | null;
  
  // Actions
  setCurrentTrack: (track: MusicItem) => void;
  setIsPlaying: (playing: boolean) => void;
  setIsReady: (ready: boolean) => void;
  setIsPanelOpen: (open: boolean) => void;
  togglePanel: () => void;
  setController: (controller: SpotifyEmbedController | null) => void;
  setPlaybackProgress: (positionMs: number, durationMs: number) => void;
  
  // Player Controls
  playTrack: (track?: MusicItem) => void;
  pauseTrack: () => void;
  togglePlayback: () => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  currentTrack: initialMusicData.find((t) => t.isFeatured) || initialMusicData[0],
  isPlaying: false,
  isReady: false,
  isPanelOpen: false,
  positionMs: 0,
  durationMs: 0,
  controller: null,

  setCurrentTrack: (track) => {
    const { controller } = get();
    set({ currentTrack: track });
    if (controller && track.spotifyUrl) {
      const match = track.spotifyUrl.match(/open\.spotify\.com\/(track|playlist|album|episode)\/([a-zA-Z0-9]+)/);
      if (match) {
        const uri = `spotify:${match[1]}:${match[2]}`;
        controller.loadUri(uri);
      }
    }
  },

  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setIsReady: (ready) => set({ isReady: ready }),
  setIsPanelOpen: (open) => set({ isPanelOpen: open }),
  togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen })),
  setController: (controller) => set({ controller }),
  setPlaybackProgress: (positionMs, durationMs) => set({ positionMs, durationMs }),

  playTrack: (track) => {
    const { controller, currentTrack } = get();
    const target = track || currentTrack;
    if (track && track.id !== currentTrack.id) {
      get().setCurrentTrack(track);
    }
    if (controller) {
      try {
        controller.play();
      } catch {
        // Fallback
      }
    }
  },

  pauseTrack: () => {
    const { controller } = get();
    if (controller) {
      try {
        controller.pause();
      } catch {
        // Fallback
      }
    }
  },

  togglePlayback: () => {
    const { controller, isPlaying } = get();
    if (controller) {
      try {
        controller.togglePlay();
      } catch {
        if (isPlaying) {
          controller.pause();
        } else {
          controller.play();
        }
      }
    }
  },
}));
