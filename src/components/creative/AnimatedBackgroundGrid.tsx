"use client";

import React, { useEffect, useRef } from "react";

/**
 * Animated subtle background grid with drifting engineering crosshairs.
 * Adds futuristic laboratory atmosphere without impeding readability.
 */
export function AnimatedBackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Crosshair datum points
    const points = Array.from({ length: 14 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: 4,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle drifting crosshair datums
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;

      points.forEach((pt) => {
        pt.x += pt.vx;
        pt.y += pt.vy;

        if (pt.x < 0) pt.x = width;
        if (pt.x > width) pt.x = 0;
        if (pt.y < 0) pt.y = height;
        if (pt.y > height) pt.y = 0;

        // Draw crosshair '+'
        ctx.beginPath();
        ctx.moveTo(pt.x - pt.size, pt.y);
        ctx.lineTo(pt.x + pt.size, pt.y);
        ctx.moveTo(pt.x, pt.y - pt.size);
        ctx.lineTo(pt.x, pt.y + pt.size);
        ctx.stroke();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-40"
    />
  );
}
