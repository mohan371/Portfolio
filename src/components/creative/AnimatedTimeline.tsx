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
      return <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />;
    }
    switch (type) {
      case "career":
        return <Briefcase className="w-3.5 h-3.5 text-primary" />;
      case "education":
        return <GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-purple-400" />;
      case "achievement":
        return <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
      default:
        return <Building2 className="w-3.5 h-3.5 text-muted-foreground" />;
    }
  };

  const getMilestoneBadge = (type: "career" | "education" | "achievement", isCurrent?: boolean) => {
    if (isCurrent) {
      return (
        <Badge variant="cyan" dot className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-cyan-950/40 dark:text-cyan-accent shadow-xs font-semibold">
          CURRENT ROLE
        </Badge>
      );
    }
    switch (type) {
      case "career":
        return <Badge variant="outline" className="border-blue-200 text-primary">CAREER</Badge>;
      case "education":
        return <Badge variant="violet" dot>EDUCATION</Badge>;
      case "achievement":
        return <Badge variant="silver">ACHIEVEMENT</Badge>;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-8">
      {/* Central Vertical Spine (Desktop center / Mobile left) */}
      <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-border" />

      {/* Animated Upward Connecting Glow Fill */}
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-600 via-indigo-500 to-teal-500 shadow-xs"
      />

      {/* Timeline Direction Header Datum */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card text-[11px] font-mono text-muted-foreground shadow-xs z-10">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">PRESENT POSITION AT TOP — SCROLL DOWN FOR CHRONOLOGY</span>
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
                  className={`w-9 h-9 rounded-full border-2 bg-card flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-110 ${
                    milestone.isCurrent
                      ? "border-primary shadow-[0_0_15px_rgba(37,99,235,0.35)] ring-4 ring-blue-500/15"
                      : milestone.type === "education"
                      ? "border-indigo-500 shadow-xs"
                      : milestone.type === "achievement"
                      ? "border-amber-500 shadow-xs"
                      : "border-border"
                  }`}
                >
                  {getMilestoneIcon(milestone.type, milestone.isCurrent)}
                </div>
              </div>

              {/* Content Card (Desktop alternating left/right, mobile right-aligned to spine) */}
              <div className="w-full pl-12 md:pl-0 md:w-[calc(50%-2.5rem)]">
                <div
                  className={`studio-card rounded-2xl p-6 transition-all duration-300 group hover:border-slate-300 dark:hover:border-white/20 hover:shadow-card-hover ${
                    milestone.isCurrent
                      ? "border-blue-500/40 bg-card shadow-[0_8px_30px_rgba(37,99,235,0.08)]"
                      : "bg-card"
                  }`}
                >
                  {/* Top Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-border text-xs font-mono">
                    <div className="flex items-center gap-2">
                      {getMilestoneBadge(milestone.type, milestone.isCurrent)}
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {milestone.period}
                      </span>
                    </div>

                    {milestone.location && (
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {milestone.location}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-3">
                    <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
                      {milestone.title}
                    </h3>
                    <div className="text-sm font-sans font-medium text-muted-foreground mt-0.5 flex items-center gap-1.5">
                      <span>{milestone.subtitle}</span>
                      {milestone.metrics && (
                        <>
                          <span className="text-muted-foreground/60">•</span>
                          <span className="text-xs font-mono text-primary font-semibold">{milestone.metrics}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Description Narrative */}
                  <p className="text-sm font-sans text-muted-foreground font-normal leading-relaxed mb-4">
                    {milestone.description}
                  </p>

                  {/* Accomplishment Highlights */}
                  {milestone.details && milestone.details.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-surface border border-border mb-4">
                      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                        Deliverables &amp; Contributions
                      </div>
                      <ul className="space-y-1.5">
                        {milestone.details.map((detail, dIdx) => (
                          <li key={dIdx} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
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
                          className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-surface-secondary text-muted-foreground border border-border group-hover:border-slate-300 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
