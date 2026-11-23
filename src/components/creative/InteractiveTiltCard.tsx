"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface InteractiveTiltCardProps {
  children: React.ReactNode;
  className?: string;
  hasDatumCorners?: boolean;
}

export function InteractiveTiltCard({
  children,
  className,
  hasDatumCorners = true,
}: InteractiveTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Subtle tilt angles (max ~4.5 degrees for professional stability)
  const rotateX = useTransform(smoothMouseY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-4, 4]);

  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isFinePointer) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    mouseX.set(x);
    mouseY.set(y);
    setSpotlightPos({ x: e.clientX - left, y: e.clientY - top });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isFinePointer ? rotateX : 0,
        rotateY: isFinePointer ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-2xl bg-card border border-border shadow-subtle transition-all duration-300 overflow-hidden",
        hasDatumCorners && "corner-datum",
        isHovered && "border-champagne/60 dark:border-champagne/40 shadow-card-hover",
        className
      )}
    >
      {/* Interactive Cursor Spotlight Reflection */}
      {isFinePointer && isHovered && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100 z-10"
          style={{
            background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, var(--spotlight-color, rgba(135, 61, 73, 0.05)), transparent 80%)`,
          }}
        />
      )}

      {/* Card Content with subtle 3D lift */}
      <div className="relative z-20 h-full">{children}</div>
    </motion.div>
  );
}
