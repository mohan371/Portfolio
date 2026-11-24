"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, PanInfo } from "motion/react";
import { MitraMascot } from "./MitraMascot";
import { MitraSpeechBubble } from "./MitraSpeechBubble";
import { MitraControls, MitraRestoreButton } from "./MitraControls";
import {
  useAssistantStore,
  MITRA_STORAGE_KEYS,
} from "@/store/use-assistant-store";
import { playTactileClick } from "@/lib/sound";

export function MitraController() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [dragConstraints, setDragConstraints] = useState({
    top: -600,
    bottom: 0,
    left: -800,
    right: 0,
  });

  const {
    isOpen,
    setIsOpen,
    mitraMood,
    setMitraMood,
    isPaused,
    setPaused,
    setQuietMode,
    isHidden,
    setIsHidden,
    speechBubble,
    dismissSpeechBubble,
    position,
    setPosition,
  } = useAssistantStore();

  // Track dragging to distinguish from clicking
  const isDraggingRef = useRef(false);

  // Motion values for fluid drag positioning
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 1. Initial hydration and storage restore
  useEffect(() => {
    setMounted(true);

    // Reduced motion preference
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);

      // Restore preferences from localStorage
      try {
        const savedQuiet = localStorage.getItem(MITRA_STORAGE_KEYS.QUIET);
        if (savedQuiet === "true") setQuietMode(true);

        const savedPaused = localStorage.getItem(MITRA_STORAGE_KEYS.PAUSED);
        if (savedPaused === "true") setPaused(true);

        const savedHidden = localStorage.getItem(MITRA_STORAGE_KEYS.HIDDEN);
        if (savedHidden === "true") setIsHidden(true);

        const savedPos = localStorage.getItem(MITRA_STORAGE_KEYS.POSITION);
        if (savedPos) {
          const parsed = JSON.parse(savedPos);
          if (typeof parsed.x === "number" && typeof parsed.y === "number") {
            setPosition(parsed);
            x.set(parsed.x);
            y.set(parsed.y);
          }
        }
      } catch {
        // Ignore storage errors
      }

      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, [setQuietMode, setPaused, setIsHidden, setPosition, x, y]);

  // 2. Viewport boundary calculations
  useEffect(() => {
    const updateConstraints = () => {
      if (typeof window === "undefined") return;
      const mascotSize = 72;
      const margin = 16;

      // Constraints relative to the initial bottom-right anchor (bottom-6 right-6)
      const maxLeft = -(window.innerWidth - mascotSize - margin * 2);
      const maxTop = -(window.innerHeight - mascotSize - margin * 2);

      setDragConstraints({
        left: maxLeft,
        right: 0,
        top: maxTop,
        bottom: 0,
      });

      // Auto-clamp current position if viewport resized
      if (position) {
        const clampedX = Math.max(maxLeft, Math.min(0, position.x));
        const clampedY = Math.max(maxTop, Math.min(0, position.y));
        if (clampedX !== position.x || clampedY !== position.y) {
          setPosition({ x: clampedX, y: clampedY });
          x.set(clampedX);
          y.set(clampedY);
        }
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, [position, setPosition, x, y]);

  // 3. React to route changes with a curious animation
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (!isPaused && !isOpen) {
        setMitraMood("curious");
        const timer = setTimeout(() => {
          setMitraMood("idle");
        }, 2400);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, isPaused, isOpen, setMitraMood]);

  // 4. Handle drag gestures
  const handleDragStart = () => {
    isDraggingRef.current = true;
    dismissSpeechBubble();
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Check if significant drag movement happened
    const distance = Math.hypot(info.offset.x, info.offset.y);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);

    if (distance > 6) {
      const newPos = {
        x: x.get(),
        y: y.get(),
      };
      setPosition(newPos);
    }
  };

  // 5. Handle Click on Mitra
  const handleClick = () => {
    if (isDraggingRef.current) return;
    playTactileClick();
    dismissSpeechBubble();
    setIsOpen(!isOpen);
  };

  if (!mounted || isHidden) {
    return <MitraRestoreButton />;
  }

  return (
    <>
      <MitraRestoreButton />

      {/* Floating Container: Anchored at fixed bottom-6 right-6 with Motion Drag */}
      <motion.div
        ref={containerRef}
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.08}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ x, y }}
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto touch-none select-none"
      >
        {/* Speech Bubble */}
        <MitraSpeechBubble
          speech={speechBubble}
          onDismiss={dismissSpeechBubble}
        />

        {/* Mascot & Floating Halo */}
        <div className="relative flex items-center gap-1 group">
          {/* Subtle Control Settings Gear */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 self-center">
            <MitraControls />
          </div>

          {/* Interactive Mascot Trigger */}
          <div
            onClick={handleClick}
            tabIndex={0}
            role="button"
            aria-label="Mitra AI Companion. Click to chat with Mohan's assistant. Drag to reposition."
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }}
            className="p-1 rounded-2xl cursor-grab active:cursor-grabbing hover:scale-105 active:scale-95 transition-transform duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-accent"
          >
            <MitraMascot
              mood={mitraMood}
              isPaused={isPaused}
              reducedMotion={prefersReducedMotion}
              size={64}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
