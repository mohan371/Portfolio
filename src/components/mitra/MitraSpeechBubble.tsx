"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, ArrowRight, MessageSquare } from "lucide-react";
import { useAssistantStore, SpeechBubbleState } from "@/store/use-assistant-store";
import { playTactileClick } from "@/lib/sound";

interface MitraSpeechBubbleProps {
  speech: SpeechBubbleState | null;
  onDismiss: () => void;
  className?: string;
}

export function MitraSpeechBubble({
  speech,
  onDismiss,
  className = "",
}: MitraSpeechBubbleProps) {
  const router = useRouter();
  const { setIsOpen, setMitraMood } = useAssistantStore();

  if (!speech || !speech.visible) return null;

  const handleActionClick = () => {
    playTactileClick();
    if (speech.actionType === "projects") {
      router.push("/projects");
      onDismiss();
    } else if (speech.actionType === "chat") {
      setIsOpen(true);
      onDismiss();
    } else {
      onDismiss();
    }
  };

  const handleChatOpen = () => {
    playTactileClick();
    setMitraMood("happy");
    setIsOpen(true);
    onDismiss();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 4 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        role="region"
        aria-live="polite"
        className={`absolute bottom-full right-0 mb-3 z-40 w-72 sm:w-80 p-3.5 rounded-2xl bg-white/95 dark:bg-[#0F141C]/95 backdrop-blur-xl border border-border dark:border-white/10 shadow-2xl text-foreground pointer-events-auto ${className}`}
      >
        {/* Header with Mitra badge & Dismiss Button */}
        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-border/60 dark:border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-wider text-primary dark:text-cyan-accent uppercase">
              Mitra Companion
            </span>
          </div>
          <button
            onClick={() => {
              playTactileClick();
              onDismiss();
            }}
            aria-label="Dismiss message"
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-secondary dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speech Text */}
        <p className="text-xs font-sans text-foreground/90 leading-relaxed mb-3">
          {speech.text}
        </p>

        {/* Quick Action Chips */}
        <div className="flex items-center gap-2 pt-1">
          {speech.actionText && (
            <button
              onClick={handleActionClick}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-mono text-[11px] font-semibold hover:bg-primary-hover shadow-xs transition-colors cursor-pointer"
            >
              <span>{speech.actionText}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          <button
            onClick={handleChatOpen}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-border dark:border-white/10 bg-surface-secondary/70 dark:bg-white/5 font-mono text-[11px] text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3 h-3 text-cyan-accent" />
            <span>Chat</span>
          </button>
        </div>

        {/* Speech Bubble Tail Indicator */}
        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white/95 dark:bg-[#0F141C]/95 border-b border-r border-border dark:border-white/10 rotate-45 transform origin-center" />
      </motion.div>
    </AnimatePresence>
  );
}
