import { Metadata } from "next";
import { experienceData } from "@/content/data/experience";
import { siteConfig } from "@/content/data/site-config";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, GraduationCap, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Journey",
  description: "Chronology of Mohan N.V.'s education, corporate experience at Gabriel India Ltd, and software engineering evolution.",
};

export default function ExperiencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        index="JOURNEY"
        tag="Career &amp; Education"
        title="Professional Chronology"
        description="Tracing the intersection of rigorous academic computer science scholarship and corporate enterprise accounting precision."
      />

      {/* Timeline Section */}
      <div className="relative pl-6 sm:pl-8 border-l border-hairline space-y-14 mb-20">
        {experienceData.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-void bg-cyan-accent shadow-[0_0_10px_#00f5ff]" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-accent transition-colors">
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

            <p className="text-sm text-silver-mid font-light leading-relaxed mb-4 max-w-3xl">
              {item.description}
            </p>

            <div className="p-4 rounded-xl bg-obsidian border border-hairline mb-4 max-w-3xl">
              <div className="text-[10px] font-mono text-silver-dark uppercase tracking-widest mb-2">
                KEY ACCOMPLISHMENTS &amp; DELIVERABLES
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
          </div>
        ))}
      </div>
    </div>
  );
}
