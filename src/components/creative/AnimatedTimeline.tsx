"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { timelineData } from "@/content/data/timeline";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  Building2,
} from "lucide-react";

export function AnimatedTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 50%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const getMilestoneIcon = (type: "career" | "education" | "achievement", isCurrent?: boolean) => {
    if (isCurrent) {
      return <Sparkles className="w-3.5 h-3.5 text-cyan-accent animate-pulse" />;
    }
    switch (type) {
      case "career":
        return <Briefcase className="w-3.5 h-3.5 text-cyan-accent" />;
      case "education":
        return <GraduationCap className="w-3.5 h-3.5 text-purple-400" />;
      case "achievement":
        return <Award className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Building2 className="w-3.5 h-3.5 text-silver-mid" />;
    }
  };

  const getMilestoneBadge = (type: "career" | "education" | "achievement", isCurrent?: boolean) => {
    if (isCurrent) {
      return (
        <Badge variant="cyan" dot className="bg-cyan-500/15 border-cyan-500/40 text-cyan-accent shadow-[0_0_12px_rgba(0,245,255,0.25)]">
          CURRENT ROLE
        </Badge>
      );
    }
    switch (type) {
      case "career":
        return <Badge variant="outline" className="border-cyan-500/30 text-cyan-accent">CAREER</Badge>;
      case "education":
        return <Badge variant="violet" dot className="bg-purple-500/10 border-purple-500/30 text-purple-400">EDUCATION</Badge>;
      case "achievement":
        return <Badge variant="silver" className="border-amber-500/30 text-amber-300">ACHIEVEMENT</Badge>;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-8">
      {/* Central Vertical Spine (Desktop center / Mobile left) */}
      <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-hairline" />

      {/* Animated Upward Connecting Glow Fill */}
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-purple-400 to-amber-400 shadow-[0_0_12px_rgba(0,245,255,0.6)]"
      />

      {/* Timeline Direction Header Datum */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-obsidian text-[11px] font-mono text-silver-mid shadow-sm z-10">
          <span className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse" />
          <span>PRESENT POSITION AT TOP — SCROLL DOWN FOR CHRONOLOGY</span>
        </div>
      </div>

      {/* Timeline Milestones List (Present at Top -> Past at Bottom) */}
      <div className="space-y-12 md:space-y-16">
        {timelineData.map((milestone, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.65,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Central Milestone Node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                <div
                  className={`w-9 h-9 rounded-full border-2 bg-obsidian flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 ${
                    milestone.isCurrent
                      ? "border-cyan-accent shadow-[0_0_20px_rgba(0,245,255,0.5)] ring-4 ring-cyan-500/20"
                      : milestone.type === "education"
                      ? "border-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                      : milestone.type === "achievement"
                      ? "border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                      : "border-hairline"
                  }`}
                >
                  {getMilestoneIcon(milestone.type, milestone.isCurrent)}
                </div>
              </div>

              {/* Content Card (Desktop alternating left/right, mobile right-aligned to spine) */}
              <div className="w-full pl-12 md:pl-0 md:w-[calc(50%-2.5rem)]">
                <div
                  className={`studio-card rounded-2xl p-6 transition-all duration-300 group hover:border-hairline-hover ${
                    milestone.isCurrent
                      ? "border-cyan-500/40 bg-obsidian/95 shadow-[0_8px_32px_rgba(0,245,255,0.12)]"
                      : "bg-obsidian/85"
                  }`}
                >
                  {/* Top Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-hairline text-xs font-mono">
                    <div className="flex items-center gap-2">
                      {getMilestoneBadge(milestone.type, milestone.isCurrent)}
                      <span className="text-silver-dark flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-silver-mid" />
                        {milestone.period}
                      </span>
                    </div>

                    {milestone.location && (
                      <span className="text-[11px] text-silver-dark flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {milestone.location}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-3">
                    <h3 className="font-display font-bold text-xl text-foreground group-hover:text-cyan-accent transition-colors leading-snug">
                      {milestone.title}
                    </h3>
                    <div className="text-sm font-sans font-medium text-silver-mid mt-0.5 flex items-center gap-1.5">
                      <span>{milestone.subtitle}</span>
                      {milestone.metrics && (
                        <>
                          <span className="text-silver-dark">•</span>
                          <span className="text-xs font-mono text-cyan-accent">{milestone.metrics}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Description Narrative */}
                  <p className="text-sm font-sans text-silver-mid font-normal leading-relaxed mb-4">
                    {milestone.description}
                  </p>

                  {/* Accomplishment Highlights */}
                  {milestone.details && milestone.details.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-carbon/70 border border-hairline/80 mb-4">
                      <div className="text-[10px] font-mono text-silver-dark uppercase tracking-wider mb-2">
                        Deliverables &amp; Contributions
                      </div>
                      <ul className="space-y-1.5">
                        {milestone.details.map((detail, dIdx) => (
                          <li key={dIdx} className="text-xs text-silver-mid flex items-start gap-2 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-accent shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies / Tags */}
                  {milestone.skills && milestone.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {milestone.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-carbon text-silver-mid border border-hairline group-hover:border-hairline-hover transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Spacer on desktop for the other half */}
              <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Historical Foundation Node */}
      <div className="flex justify-center mt-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-carbon/80 text-[10px] font-mono text-silver-dark z-10">
          <span>ACADEMIC &amp; ALGORITHMIC FOUNDATIONS (2019 — 2022)</span>
        </div>
      </div>
    </div>
  );
}
