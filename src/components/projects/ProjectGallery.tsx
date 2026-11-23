"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Maximize2, Image as ImageIcon } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full rounded-2xl bg-obsidian border border-hairline p-6 corner-datum space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-hairline">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-cyan-accent" />
          <span className="font-mono text-xs text-white font-bold uppercase">
            Project Visual Artifacts
          </span>
        </div>
        <span className="text-[10px] font-mono text-silver-dark">
          VIEW {activeIndex + 1} OF {images.length}
        </span>
      </div>

      {/* Main Active Visual Frame */}
      <div className="relative aspect-video w-full rounded-xl bg-carbon border border-hairline overflow-hidden flex items-center justify-center group">
        {/* Sleek Placeholder Canvas Frame if local image mock */}
        <div className="absolute inset-0 bg-gradient-to-tr from-obsidian via-carbon to-surface-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full border border-hairline bg-surface-2 flex items-center justify-center text-silver-dark mb-3">
            <ImageIcon className="w-6 h-6 text-cyan-accent" />
          </div>
          <span className="font-display font-bold text-white text-base">
            {title}
          </span>
          <span className="text-[11px] font-mono text-silver-mid mt-1">
            Visual Artifact // View 0{activeIndex + 1}
          </span>
        </div>

        {/* Framing Tag */}
        <div className="absolute bottom-3 left-3 z-10">
          <Badge variant="outline" className="text-[9px] bg-black/60 backdrop-blur-md">
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
              className={`px-3 py-2 rounded-lg text-xs font-mono border transition-all ${
                activeIndex === idx
                  ? "bg-cyan-950/60 border-cyan-500/50 text-cyan-accent font-bold"
                  : "bg-carbon border-hairline text-silver-dark hover:text-white"
              }`}
            >
              Artifact 0{idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
