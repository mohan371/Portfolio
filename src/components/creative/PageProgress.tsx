"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "motion/react";

export function PageProgress() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Trigger route transition indicator pulse
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 450);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      {/* Scroll-Based Progress Bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "0%" }}
        className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-white to-cyan-400 shadow-[0_0_10px_#00f5ff]"
      />

      {/* Route Switch Pulse Animation */}
      {isNavigating && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute top-0 h-[2px] w-1/3 bg-cyan-accent shadow-[0_0_12px_#00f5ff]"
        />
      )}
    </div>
  );
}
