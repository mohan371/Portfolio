"use client";

import { useAppStore } from "@/store/use-app-store";
import { playTactileClick, playChimeSuccess } from "@/lib/sound";
import { Volume2, VolumeX } from "lucide-react";

export function AudioController() {
  const { soundEnabled, toggleSound } = useAppStore();

  const handleToggle = () => {
    if (!soundEnabled) {
      playChimeSuccess();
    } else {
      playTactileClick();
    }
    toggleSound();
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={soundEnabled ? "Mute audio feedback" : "Enable tactile audio feedback"}
      className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#DCE5F0] bg-white text-[#142B4A] hover:bg-[#EDF3FA] hover:border-[#C6D3E2] dark:border-white/10 dark:bg-black/40 dark:text-zinc-400 dark:hover:text-white dark:hover:border-white/25 backdrop-blur-md text-xs font-mono transition-all duration-200 cursor-pointer shadow-xs"
    >
      {/* Equalizer animation bars when active */}
      {soundEnabled ? (
        <div className="flex items-end gap-0.5 h-3 w-3">
          <span className="w-0.5 h-full bg-blue-600 dark:bg-cyan-400 animate-pulse" style={{ animationDelay: "0ms" }} />
          <span className="w-0.5 h-2 bg-blue-600 dark:bg-cyan-400 animate-pulse" style={{ animationDelay: "150ms" }} />
          <span className="w-0.5 h-2.5 bg-blue-600 dark:bg-cyan-400 animate-pulse" style={{ animationDelay: "300ms" }} />
        </div>
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#142B4A] dark:text-zinc-500 dark:group-hover:text-zinc-300 transition-colors" />
      )}

      <span className="text-[11px] uppercase tracking-wider font-semibold dark:font-normal">
        {soundEnabled ? "Audio On" : "Audio Off"}
      </span>
    </button>
  );
}
