"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { experienceData } from "@/content/data/experience";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export function AnimatedTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative pl-6 sm:pl-8 space-y-16">
      {/* Background Static Hairline */}
      <div className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-[1px] bg-hairline" />

      {/* Animated Glowing Fill Line */}
      <motion.div
        style={{ scaleY: lineHeight, transformOrigin: "top" }}
        className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-[1px] bg-gradient-to-b from-cyan-400 via-white to-purple-500 shadow-[0_0_8px_#00f5ff]"
      />

      {/* Milestone Items */}
      {experienceData.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
        >
          {/* Animated Milestone Bullet Node */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-void bg-obsidian flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-cyan-accent shadow-[0_0_10px_#00f5ff] group-hover:scale-125 transition-transform" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
            <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-cyan-accent transition-colors">
              {item.role}
            </h3>
            <Badge variant="cyan" dot className="w-fit">
              {item.period}
            </Badge>
          </div>

          <div className="text-xs font-mono text-silver-dark mb-4 flex items-center gap-2">
            <span className="text-silver-mid font-medium">{item.company}</span>
            <span>•</span>
            <span>{item.location}</span>
          </div>

          <p className="text-xs sm:text-sm text-silver-mid font-light leading-relaxed mb-4 max-w-3xl">
            {item.description}
          </p>

          <div className="p-4 rounded-xl bg-obsidian border border-hairline mb-4 max-w-3xl">
            <div className="text-[10px] font-mono text-silver-dark uppercase tracking-widest mb-2">
              KEY DELIVERABLES &amp; IMPACT
            </div>
            <ul className="space-y-2">
              {item.achievements.map((ach, i) => (
                <li key={i} className="text-xs text-silver-mid flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-accent shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-carbon text-silver-dark border border-hairline"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
