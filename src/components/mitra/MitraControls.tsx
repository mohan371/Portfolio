"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Settings,
  Pause,
  Play,
  Volume2,
  VolumeX,
  RotateCcw,
  EyeOff,
  Sparkles,
  Bot,
} from "lucide-react";
import { useAssistantStore } from "@/store/use-assistant-store";
import { playTactileClick } from "@/lib/sound";

export function MitraControls() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isPaused,
    togglePaused,
    isQuietMode,
    toggleQuietMode,
    resetPosition,
    setIsHidden,
  } = useAssistantStore();

  const handleAction = (action: () => void) => {
    playTactileClick();
    action();
  };

  return (
    <div className="relative inline-block">
      {/* Mini Settings Trigger Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          playTactileClick();
          setIsOpen(!isOpen);
        }}
        aria-label="Mitra Controls"
        title="Mitra Controls"
        className="w-5 h-5 rounded-full bg-surface dark:bg-carbon border border-border dark:border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors shadow-xs cursor-pointer"
      >
        <Settings className="w-2.5 h-2.5" />
      </button>

      {/* Floating Menu Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ duration: 0.16 }}
            className="absolute bottom-full right-0 mb-2 w-44 p-1.5 rounded-xl bg-white/95 dark:bg-[#0F141C]/95 backdrop-blur-xl border border-border dark:border-white/10 shadow-xl z-50 text-xs font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-2 py-1 text-[10px] text-muted-foreground uppercase tracking-wider border-b border-border/50 dark:border-white/5 mb-1 font-semibold flex items-center justify-between">
              <span>Mitra Options</span>
              <Sparkles className="w-2.5 h-2.5 text-cyan-accent" />
            </div>

            {/* Pause / Resume */}
            <button
              onClick={() => handleAction(togglePaused)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-secondary dark:hover:bg-white/5 text-foreground transition-colors text-left cursor-pointer"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Resume Float</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pause Float</span>
                </>
              )}
            </button>

            {/* Quiet Mode */}
            <button
              onClick={() => handleAction(toggleQuietMode)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-secondary dark:hover:bg-white/5 text-foreground transition-colors text-left cursor-pointer"
            >
              {isQuietMode ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-accent" />
                  <span>Enable Speech</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Quiet Mode</span>
                </>
              )}
            </button>

            {/* Reset Position */}
            <button
              onClick={() => {
                handleAction(resetPosition);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-secondary dark:hover:bg-white/5 text-foreground transition-colors text-left cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-primary" />
              <span>Reset Position</span>
            </button>

            {/* Hide Mascot */}
            <button
              onClick={() => {
                handleAction(() => setIsHidden(true));
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-secondary dark:hover:bg-white/5 text-foreground transition-colors text-left cursor-pointer"
            >
              <EyeOff className="w-3.5 h-3.5 text-rose-500" />
              <span>Hide Mitra</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MitraRestoreButton() {
  const { isHidden, setIsHidden } = useAssistantStore();

  if (!isHidden) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={() => {
        playTactileClick();
        setIsHidden(false);
      }}
      aria-label="Restore Mitra AI Companion"
      title="Restore Mitra AI Companion"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-surface-1 border border-border dark:border-hairline shadow-md hover:border-primary/50 transition-all font-mono text-xs cursor-pointer text-muted-foreground hover:text-foreground"
    >
      <Bot className="w-3.5 h-3.5 text-cyan-accent" />
      <span className="text-[11px] font-semibold">Mitra</span>
    </motion.button>
  );
}
