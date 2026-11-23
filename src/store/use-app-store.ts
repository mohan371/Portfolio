import { create } from "zustand";

interface AppState {
  soundEnabled: boolean;
  hudVisible: boolean;
  activeSection: string;
  isMobileMenuOpen: boolean;
  toggleSound: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  toggleHud: () => void;
  setActiveSection: (section: string) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  soundEnabled: false,
  hudVisible: true,
  activeSection: "home",
  isMobileMenuOpen: false,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  toggleHud: () => set((state) => ({ hudVisible: !state.hudVisible })),
  setActiveSection: (section) => set({ activeSection: section }),
  setIsMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
}));
