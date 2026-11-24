import { create } from "zustand";

export type MitraMood = "idle" | "happy" | "curious" | "thinking" | "listening" | "paused" | "sleep";

export interface SpeechBubbleState {
  visible: boolean;
  text: string;
  actionText?: string;
  actionType?: "projects" | "contact" | "chat" | "dismiss";
}

interface AssistantState {
  // Chat window state
  isOpen: boolean;
  isThinking: boolean;
  inputFocused: boolean;

  // Mitra specific states
  mitraMood: MitraMood;
  isPaused: boolean;
  isQuietMode: boolean;
  isHidden: boolean;
  speechBubble: SpeechBubbleState | null;
  position: { x: number; y: number } | null;

  // Actions
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
  setIsThinking: (thinking: boolean) => void;
  setInputFocused: (focused: boolean) => void;
  setMitraMood: (mood: MitraMood) => void;
  togglePaused: () => void;
  setPaused: (paused: boolean) => void;
  toggleQuietMode: () => void;
  setQuietMode: (quiet: boolean) => void;
  setIsHidden: (hidden: boolean) => void;
  setSpeechBubble: (bubble: SpeechBubbleState | null) => void;
  dismissSpeechBubble: () => void;
  setPosition: (pos: { x: number; y: number } | null) => void;
  resetPosition: () => void;
}

export const MITRA_STORAGE_KEYS = {
  POSITION: "mitra-position-v1",
  QUIET: "mitra-quiet-mode-v1",
  PAUSED: "mitra-paused-v1",
  HIDDEN: "mitra-hidden-v1",
} as const;

export const useAssistantStore = create<AssistantState>((set, get) => ({
  isOpen: false,
  isThinking: false,
  inputFocused: false,

  mitraMood: "idle",
  isPaused: false,
  isQuietMode: false,
  isHidden: false,
  speechBubble: {
    visible: true,
    text: "Namaskaram! I'm Mitra, Mohan's little digital companion. Want to explore his portfolio?",
    actionText: "Explore Projects",
    actionType: "projects",
  },
  position: null,

  setIsOpen: (open) => {
    set({
      isOpen: open,
      mitraMood: open ? "listening" : "idle",
      speechBubble: open ? null : get().speechBubble,
    });
  },

  toggleOpen: () => {
    const next = !get().isOpen;
    get().setIsOpen(next);
  },

  setIsThinking: (thinking) => {
    set({
      isThinking: thinking,
      mitraMood: thinking ? "thinking" : get().isOpen ? "listening" : "idle",
    });
  },

  setInputFocused: (focused) => {
    set({
      inputFocused: focused,
      mitraMood: focused ? "listening" : get().isThinking ? "thinking" : "idle",
    });
  },

  setMitraMood: (mood) => {
    if (get().isPaused && mood !== "paused" && mood !== "sleep") return;
    set({ mitraMood: mood });
  },

  togglePaused: () => {
    const next = !get().isPaused;
    set({
      isPaused: next,
      mitraMood: next ? "paused" : "idle",
    });
    try {
      localStorage.setItem(MITRA_STORAGE_KEYS.PAUSED, String(next));
    } catch {
      // Ignore quota errors
    }
  },

  setPaused: (paused) => {
    set({
      isPaused: paused,
      mitraMood: paused ? "paused" : "idle",
    });
  },

  toggleQuietMode: () => {
    const next = !get().isQuietMode;
    set({
      isQuietMode: next,
      speechBubble: next ? null : get().speechBubble,
    });
    try {
      localStorage.setItem(MITRA_STORAGE_KEYS.QUIET, String(next));
    } catch {
      // Ignore quota errors
    }
  },

  setQuietMode: (quiet) => {
    set({ isQuietMode: quiet });
  },

  setIsHidden: (hidden) => {
    set({
      isHidden: hidden,
      speechBubble: hidden ? null : get().speechBubble,
    });
    try {
      localStorage.setItem(MITRA_STORAGE_KEYS.HIDDEN, String(hidden));
    } catch {
      // Ignore quota errors
    }
  },

  setSpeechBubble: (bubble) => {
    if (get().isQuietMode) return;
    set({ speechBubble: bubble });
  },

  dismissSpeechBubble: () => {
    set({ speechBubble: null });
  },

  setPosition: (pos) => {
    set({ position: pos });
    if (pos) {
      try {
        localStorage.setItem(MITRA_STORAGE_KEYS.POSITION, JSON.stringify(pos));
      } catch {
        // Ignore quota errors
      }
    }
  },

  resetPosition: () => {
    set({ position: null });
    try {
      localStorage.removeItem(MITRA_STORAGE_KEYS.POSITION);
    } catch {
      // Ignore quota errors
    }
  },
}));
