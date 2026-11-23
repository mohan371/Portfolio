"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full rounded-2xl bg-card border border-border shadow-subtle p-6 corner-datum space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-primary" />
          <span className="font-mono text-xs text-foreground font-bold uppercase">
            Project Visual Artifacts
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          VIEW {activeIndex + 1} OF {images.length}
        </span>
      </div>

      {/* Main Active Visual Frame */}
      <div className="relative aspect-video w-full rounded-xl bg-surface border border-border overflow-hidden flex items-center justify-center group">
        <div className="absolute inset-0 bg-gradient-to-tr from-surface via-surface-secondary to-card flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full border border-border bg-card shadow-xs flex items-center justify-center text-primary mb-3">
            <ImageIcon className="w-6 h-6 text-primary" />
          </div>
          <span className="font-display font-bold text-foreground text-base">
            {title}
          </span>
          <span className="text-[11px] font-mono text-muted-foreground mt-1">
            Visual Artifact // View 0{activeIndex + 1}
          </span>
        </div>

        {/* Framing Tag */}
        <div className="absolute bottom-3 left-3 z-10">
          <Badge variant="outline" className="text-[9px] bg-card/80 backdrop-blur-md">
            ASPECT: 16:9 HD
          </Badge>
        </div>
      </div>

      {/* Thumbnails Navigator */}
      {images.length > 1 && (
        <div className="flex gap-2 pt-2 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative h-14 w-24 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                idx === activeIndex
                  ? "border-primary ring-2 ring-primary/20 shadow-xs"
                  : "border-border opacity-70 hover:opacity-100 hover:border-slate-400"
              }`}
            >
              <div className="w-full h-full bg-surface-secondary flex items-center justify-center text-[10px] font-mono text-muted-foreground">
                View 0{idx + 1}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
