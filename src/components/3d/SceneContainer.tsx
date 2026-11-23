"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { CoreFallback } from "./CoreFallback";

// Lazy-load the Three.js 3D canvas strictly on the client
const ArchitecturalCore3D = dynamic(() => import("./ArchitecturalCore3D"), {
  ssr: false,
  loading: () => <CoreFallback />,
});

interface SceneContainerProps {
  className?: string;
}

export function SceneContainer({ className }: SceneContainerProps) {
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setShouldRender3D(false);
      return;
    }

    // Enable 3D on client
    setShouldRender3D(true);

    // Pause rendering when outside viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[320px] sm:h-[400px] flex items-center justify-center ${className || ""}`}
    >
      {shouldRender3D && isVisible ? (
        <ArchitecturalCore3D />
      ) : (
        <CoreFallback />
      )}
    </div>
  );
}
