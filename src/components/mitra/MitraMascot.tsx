"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MitraMood } from "@/store/use-assistant-store";

interface MitraMascotProps {
  mood?: MitraMood;
  isPaused?: boolean;
  reducedMotion?: boolean;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export function MitraMascot({
  mood = "idle",
  isPaused = false,
  reducedMotion = false,
  size = 64,
  className = "",
  onClick,
}: MitraMascotProps) {
  const [blink, setBlink] = useState(false);

  // Periodic natural eye blinking when in idle or listening states
  useEffect(() => {
    if (isPaused || mood === "paused" || mood === "sleep" || mood === "thinking") {
      setBlink(false);
      return;
    }

    const triggerBlink = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    };

    // Blink every 3.5 to 6 seconds randomly
    const interval = setInterval(() => {
      triggerBlink();
    }, 3800 + Math.random() * 2200);

    return () => clearInterval(interval);
  }, [mood, isPaused]);

  // Levitation floating animation
  const shouldAnimateFloat = !isPaused && !reducedMotion && mood !== "paused" && mood !== "sleep";

  return (
    <motion.div
      onClick={onClick}
      role="img"
      aria-label={`Mitra AI Companion (${mood} state)`}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      animate={
        shouldAnimateFloat
          ? {
              y: mood === "happy" ? [0, -8, 0, -4, 0] : [0, -5, 0],
              rotate: mood === "curious" ? [0, 4, 0] : 0,
            }
          : { y: 0, rotate: 0 }
      }
      transition={{
        duration: mood === "happy" ? 1.4 : 3.2,
        repeat: shouldAnimateFloat ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md transition-all duration-300"
      >
        <defs>
          {/* Ceramic Metallic Body Gradient */}
          <linearGradient id="mitraBodyGrad" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#F0F4F8" />
            <stop offset="100%" stopColor="#D5DEE8" />
          </linearGradient>

          {/* Deep Visor Screen Gradient */}
          <linearGradient id="mitraVisorGrad" x1="30" y1="30" x2="70" y2="55" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06090E" />
            <stop offset="100%" stopColor="#0F1722" />
          </linearGradient>

          {/* Cyan LED Glow Filter */}
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Repulsor Field Gradient */}
          <radialGradient id="repulsorGlow" cx="50" cy="90" r="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(0, 245, 255, 0.45)" />
            <stop offset="70%" stopColor="rgba(0, 245, 255, 0.12)" />
            <stop offset="100%" stopColor="rgba(0, 245, 255, 0)" />
          </radialGradient>
        </defs>

        {/* 1. Ambient Anti-Gravity Hover Shadow */}
        <ellipse
          cx="50"
          cy="92"
          rx={shouldAnimateFloat ? 22 : 18}
          ry={shouldAnimateFloat ? 4.5 : 3.5}
          fill="url(#repulsorGlow)"
          className="transition-all duration-300"
        />

        {/* 2. Antenna with Cyan Beacon */}
        <path
          d="M 50 20 L 50 12"
          stroke="#94A3B8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="10"
          r="3"
          fill={isPaused || mood === "sleep" ? "#64748B" : "#00F5FF"}
          filter={!isPaused && mood !== "sleep" ? "url(#cyanGlow)" : undefined}
          className={mood === "thinking" ? "animate-ping origin-center" : undefined}
        />

        {/* 3. Ear Sensor Pods (Left & Right) */}
        <rect x="18" y="32" width="5" height="12" rx="2.5" fill="#94A3B8" />
        <rect x="77" y="32" width="5" height="12" rx="2.5" fill="#94A3B8" />
        <circle cx="20.5" cy="38" r="1.5" fill="#00F5FF" />
        <circle cx="79.5" cy="38" r="1.5" fill="#00F5FF" />

        {/* 4. Main Chassis Head & Body (Futuristic Pill Shape) */}
        <rect
          x="22"
          y="18"
          width="56"
          height="62"
          rx="28"
          fill="url(#mitraBodyGrad)"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />

        {/* Highlight Specular Glare on Head Dome */}
        <path
          d="M 34 22 Q 50 20 66 22"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* 5. Curved Obsidian Visor Glass */}
        <rect
          x="28"
          y="28"
          width="44"
          height="28"
          rx="14"
          fill="url(#mitraVisorGrad)"
          stroke="#1E293B"
          strokeWidth="1"
        />

        {/* Subtle Glass Reflection Arc */}
        <path
          d="M 32 33 Q 48 30 64 35"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 6. Dynamic Expressive Cyan-Blue LED Eyes */}
        <g filter="url(#cyanGlow)">
          {/* Eyes State: BLINK */}
          {blink && (
            <>
              <line x1="36" y1="42" x2="44" y2="42" stroke="#00F5FF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="56" y1="42" x2="64" y2="42" stroke="#00F5FF" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}

          {/* Eyes State: IDLE */}
          {!blink && mood === "idle" && (
            <>
              <rect x="36" y="37" width="8" height="10" rx="4" fill="#00F5FF" />
              <rect x="56" y="37" width="8" height="10" rx="4" fill="#00F5FF" />
              {/* Eye Catchlights */}
              <circle cx="38" cy="39" r="1" fill="#FFFFFF" />
              <circle cx="58" cy="39" r="1" fill="#FFFFFF" />
            </>
          )}

          {/* Eyes State: HAPPY (Crescent Smiling Arcs ^_^) */}
          {!blink && mood === "happy" && (
            <>
              <path d="M 35 44 Q 40 36 45 44" stroke="#00F5FF" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 55 44 Q 60 36 65 44" stroke="#00F5FF" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Eyes State: CURIOUS (One larger eye + raised inquisitive brow) */}
          {!blink && mood === "curious" && (
            <>
              <circle cx="40" cy="41" r="5.5" fill="#00F5FF" />
              <circle cx="60" cy="41" r="4" fill="#00F5FF" />
              <circle cx="39" cy="39" r="1.5" fill="#FFFFFF" />
              <path d="M 36 33 Q 41 31 46 34" stroke="#00F5FF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Eyes State: THINKING (Scanning Radar Ring) */}
          {!blink && mood === "thinking" && (
            <>
              <circle cx="40" cy="42" r="4.5" stroke="#00F5FF" strokeWidth="2" strokeDasharray="4 2" className="animate-spin origin-[40px_42px]" fill="none" />
              <circle cx="60" cy="42" r="4.5" stroke="#00F5FF" strokeWidth="2" strokeDasharray="4 2" className="animate-spin origin-[60px_42px]" fill="none" />
              <circle cx="40" cy="42" r="1.5" fill="#00F5FF" />
              <circle cx="60" cy="42" r="1.5" fill="#00F5FF" />
            </>
          )}

          {/* Eyes State: LISTENING (Wide attentive oval eyes) */}
          {!blink && mood === "listening" && (
            <>
              <ellipse cx="40" cy="41" rx="4.5" ry="6" fill="#00F5FF" />
              <ellipse cx="60" cy="41" rx="4.5" ry="6" fill="#00F5FF" />
              <circle cx="39" cy="39" r="1.5" fill="#FFFFFF" />
              <circle cx="59" cy="39" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Eyes State: PAUSED / SLEEP (Resting Slit Eyes -_-) */}
          {(mood === "paused" || mood === "sleep") && (
            <>
              <line x1="36" y1="42" x2="44" y2="42" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
              <line x1="56" y1="42" x2="64" y2="42" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
        </g>

        {/* 7. Miniature Chest Medallion (Core Cyan Accent Node) */}
        <rect x="46" y="63" width="8" height="5" rx="2.5" fill="#CBD5E1" />
        <circle
          cx="50"
          cy="65.5"
          r="1.8"
          fill={isPaused || mood === "sleep" ? "#64748B" : "#2563EB"}
        />

        {/* 8. Articulated Small Magnetic Arms */}
        {/* Left Arm: Resting at side */}
        <path
          d="M 23 52 Q 17 58 20 64"
          stroke="#94A3B8"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="20" cy="64" r="2.5" fill="#64748B" />

        {/* Right Arm: Friendly Wave if happy, otherwise resting */}
        {mood === "happy" ? (
          <g>
            <path
              d="M 77 50 Q 84 42 85 34"
              stroke="#94A3B8"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="85" cy="34" r="2.5" fill="#64748B" />
          </g>
        ) : (
          <g>
            <path
              d="M 77 52 Q 83 58 80 64"
              stroke="#94A3B8"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="80" cy="64" r="2.5" fill="#64748B" />
          </g>
        )}

        {/* 9. Miniature Feet / Magnetic Thruster Pads */}
        <rect x="36" y="78" width="8" height="4" rx="2" fill="#94A3B8" />
        <rect x="56" y="78" width="8" height="4" rx="2" fill="#94A3B8" />
      </svg>
    </motion.div>
  );
}
