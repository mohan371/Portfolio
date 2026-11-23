import { Metadata } from "next";
import { skillsData } from "@/content/data/skills";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Layers, Server, Database, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Skills & Tech Stack",
  description: "Detailed inventory of Mohan N.V.'s technical capabilities across JavaScript, Java, React.js, Next.js, Node.js, MongoDB, and modern developer tooling.",
};

export default function SkillsPage() {
  const getCategoryIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Code2 className="w-5 h-5 text-primary" />;
      case 1:
        return <Layers className="w-5 h-5 text-indigo-600 dark:text-purple-400" />;
      case 2:
        return <Server className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 3:
        return <Database className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <Wrench className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        index="SKILLS"
        tag="Technical Competencies"
        title="Technical Arsenal &amp; Ecosystem"
        description="Authentic technical skills, frameworks, runtime environments, databases, and deployment platforms actively practiced in engineering digital products."
      />

      {/* Categorized Detailed Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {skillsData.map((category, idx) => (
          <Card key={category.title} hasDatumCorners className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center">
                    {getCategoryIcon(idx)}
                  </div>
                  <h3 className="font-display font-bold text-foreground text-base">{category.title}</h3>
                </div>
                <Badge variant="outline" className="text-[9px] font-mono">
                  {category.skills.length} TECHS
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground font-light mb-6 leading-relaxed">
                {category.description}
              </p>

              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-xl bg-surface border border-border hover:border-primary/40 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-sans font-semibold text-xs text-foreground">{skill.name}</span>
                      <span className="text-[10px] font-mono text-primary font-medium">{skill.category}</span>
                    </div>

                    <p className="text-[11px] font-sans text-muted-foreground leading-relaxed font-light">
                      {skill.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
