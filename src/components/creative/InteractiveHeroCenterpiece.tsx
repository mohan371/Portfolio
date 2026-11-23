"use client";

import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Terminal } from "lucide-react";

interface NodeItem {
  name: string;
  category: "Language" | "Backend" | "Frontend" | "Database" | "DevOps";
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const TECH_NODES = [
  { name: "Go", category: "Language" as const },
  { name: "Java", category: "Language" as const },
  { name: "React 19", category: "Frontend" as const },
  { name: "Next.js", category: "Frontend" as const },
  { name: "Node.js", category: "Backend" as const },
  { name: "Express.js", category: "Backend" as const },
  { name: "REST APIs", category: "Backend" as const },
  { name: "PostgreSQL", category: "Database" as const },
  { name: "MongoDB", category: "Database" as const },
  { name: "MySQL", category: "Database" as const },
  { name: "Docker", category: "DevOps" as const },
  { name: "Git", category: "DevOps" as const },
];

export function InteractiveHeroCenterpiece() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string>("Go");
  const [activeCategory, setActiveCategory] = useState<string>("Systems & Concurrency");
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const checkTheme = () => {
      const dark = document.documentElement.classList.contains("dark") || 
                   document.documentElement.getAttribute("data-theme") === "obsidian";
      setIsDark(dark);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 360);

    const mouse = { x: -1000, y: -1000, radius: 100 };

    // Initialize node positions
    const nodes: NodeItem[] = TECH_NODES.map((t, idx) => {
      const angle = (idx / TECH_NODES.length) * Math.PI * 2;
      const dist = Math.min(width, height) * 0.32;
      return {
        name: t.name,
        category: t.category,
        x: width / 2 + Math.cos(angle) * dist + (Math.random() - 0.5) * 30,
        y: height / 2 + Math.sin(angle) * dist + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 4.5,
      };
    });

    // Ambient background particles in warm champagne / ivory
    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
    }));

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 25) {
          setActiveNode(node.name);
          setActiveCategory(node.category);
        }
      });
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid crosshairs in canvas background
      ctx.strokeStyle = isDark ? "rgba(229, 222, 213, 0.04)" : "rgba(48, 43, 42, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 40; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 40; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & draw background ambient particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = isDark ? "rgba(201, 176, 139, 0.18)" : "rgba(182, 154, 114, 0.2)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update nodes & apply mouse physics
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 30 || node.x > width - 30) node.vx *= -1;
        if (node.y < 30 || node.y > height - 30) node.vy *= -1;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          node.x -= (dx / dist) * force * 2.5;
          node.y -= (dy / dist) * force * 2.5;
        }
      });

      // Draw connecting lines between nodes (Warm Burgundy / Champagne)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * (isDark ? 0.35 : 0.3);
            ctx.strokeStyle = isDark
              ? `rgba(163, 83, 96, ${alpha})`
              : `rgba(135, 61, 73, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Nodes & Labels
      nodes.forEach((node) => {
        const isSelected = node.name === activeNode;

        // Outer ring on selected node
        if (isSelected) {
          ctx.strokeStyle = isDark ? "rgba(201, 176, 139, 0.8)" : "rgba(135, 61, 73, 0.8)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Inner solid dot
        ctx.fillStyle = isSelected
          ? isDark ? "#C9B08B" : "#873D49"
          : isDark ? "#F5F2EB" : "#625A56";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Node Label
        ctx.font = isSelected ? "bold 11px monospace" : "10px monospace";
        ctx.fillStyle = isSelected
          ? isDark ? "#C9B08B" : "#873D49"
          : isDark ? "rgba(245, 242, 235, 0.85)" : "#302B2A";
        ctx.fillText(node.name, node.x + 8, node.y + 3);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeNode, isDark]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl border border-border bg-card shadow-card overflow-hidden relative"
    >
      {/* HUD Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface text-[11px] font-mono text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-foreground font-semibold">TOPOLOGY_KERNEL // ACTIVE</span>
          <span className="hidden sm:inline text-muted-foreground">[{TECH_NODES.length} NODES]</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">INTERACTIVE MOUSE FIELD</span>
          <Badge variant="cyan" dot className="py-0 px-2 text-[9px]">
            60 FPS
          </Badge>
        </div>
      </div>

      {/* Interactive WebGL/Canvas Surface */}
      <div className="relative h-[340px] sm:h-[360px] w-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-crosshair"
          title="Interactive Software Topology Canvas — Hover or drag across nodes"
        />

        {/* Floating Telemetry Pill on Active Node */}
        <div className="absolute bottom-3 left-3 sm:left-4 z-10 flex items-center gap-3 px-3 py-1.5 rounded-lg bg-card/95 border border-border backdrop-blur-md font-mono text-xs shadow-sm">
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <div className="flex items-center gap-2">
            <span className="text-foreground font-bold">{activeNode}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground text-[11px]">{activeCategory}</span>
          </div>
        </div>

        {/* Live Coordinate Crosshair indicator */}
        <div className="absolute top-3 right-3 text-[10px] font-mono text-muted-foreground pointer-events-none hidden sm:block">
          POS: [ACTIVE] // DRAG TO INTERACT
        </div>
      </div>
    </div>
  );
}
