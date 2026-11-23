import { Metadata } from "next";
import { skillsData } from "@/content/data/skills";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Skills & Tech Stack",
  description: "Detailed breakdown of Mohan N.V.'s technical capabilities across Go, Java, React, Next.js, PostgreSQL, Docker, and REST APIs.",
};

export default function SkillsPage() {
  const allCore = ["Java", "JavaScript", "Go", "React", "Next.js", "Node.js", "Express.js", "REST APIs", "PostgreSQL", "MongoDB", "MySQL", "Docker", "Git"];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        index="SKILLS"
        tag="Engineering Matrix"
        title="Technical Arsenal &amp; Ecosystem"
        description="A comprehensive inventory of programming languages, frameworks, databases, and DevOps tools verified in production environments."
      />

      {/* Verified Skills Grid */}
      <div className="mb-14">
        <div className="text-xs font-mono text-cyan-accent uppercase tracking-widest mb-4">
          PRIMARY CAPABILITIES
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {allCore.map((tech) => (
            <div
              key={tech}
              className="p-4 rounded-xl bg-obsidian border border-hairline hover:border-cyan-500/40 hover:bg-carbon transition-colors text-center group cursor-default"
            >
              <span className="font-mono text-xs font-bold text-white group-hover:text-cyan-accent transition-colors">
                {tech}
              </span>
              <span className="block text-[9px] font-mono text-silver-dark uppercase mt-1">
                Verified
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Categorized Detailed Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {skillsData.map((category, idx) => (
          <Card key={idx} hasDatumCorners className="p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-hairline">
              <h3 className="font-display font-bold text-white text-lg">{category.title}</h3>
              <Badge variant="cyan" dot className="text-[9px]">ACTIVE</Badge>
            </div>

            <p className="text-xs text-silver-mid font-light mb-6 leading-relaxed">
              {category.description}
            </p>

            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-silver-dark">{skill.level}%</span>
                  </div>

                  {/* Meter */}
                  <div className="w-full h-1.5 bg-surface-1 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-white rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <span className="text-[10px] font-mono text-silver-dark">{skill.focus}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
