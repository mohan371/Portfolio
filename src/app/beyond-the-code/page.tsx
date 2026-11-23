import { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { initialPhilosophyData, philosophyCategories } from "@/content/data/philosophy";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, BookOpen, Clock, Compass, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "BEYOND THE CODE // Thoughts, Principles & Lessons",
  description:
    "Mohan N.V.'s personal engineering philosophy: connecting corporate accounting precision with ACID databases, academic discipline, and low-latency system design.",
};

export default function BeyondTheCodePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      <SectionHeader
        index="PHILOSOPHY"
        tag="Beyond the Code"
        title="Thoughts, Principles &amp; Lessons"
        description="Engineering is not merely writing syntax—it is the disciplined application of precision, mathematics, and operational reliability. Essays on how corporate accounting rigor and academic computer science shape my architectural standards."
      />

      {/* Featured Anchor Essay */}
      {initialPhilosophyData.filter((p) => p.isFeatured).slice(0, 1).map((featured) => (
        <Card
          key={featured.id}
          hasDatumCorners
          className="p-8 sm:p-10 bg-card border-primary/40 ring-1 ring-primary/20 shadow-card relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <Badge variant="cyan" dot className="text-[10px] font-mono uppercase">
                  FEATURED MANIFESTO
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">
                  // {featured.category}
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-4xl text-foreground tracking-tight">
                {featured.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                {featured.excerpt}
              </p>
            </div>

            <Link href={`/beyond-the-code/${featured.slug}`}>
              <button className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-bold hover:bg-primary-hover transition-colors shadow-sm flex items-center gap-2 shrink-0 cursor-pointer">
                <span>READ MANIFESTO</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {featured.keyTakeaways.map((takeaway, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-surface-secondary/60 border border-border flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground/90 font-light leading-snug">{takeaway}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* Essays Catalog */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-2 font-mono text-xs">
          <div>
            <h3 className="font-display font-bold text-xl text-foreground">
              All Essays &amp; Architectural Reflections
            </h3>
            <span className="text-muted-foreground">Perspectives on software design, study, and problem solving</span>
          </div>
          <Badge variant="cyan" dot>
            {initialPhilosophyData.length} ESSAYS PUBLISHED
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialPhilosophyData.map((essay) => (
            <Link key={essay.id} href={`/beyond-the-code/${essay.slug}`} className="block group">
              <Card
                hasDatumCorners
                className="p-6 sm:p-8 bg-card border-border shadow-subtle group-hover:border-primary/50 transition-all flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <Badge variant="violet" className="text-[10px]">
                      {essay.category}
                    </Badge>
                    <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {essay.readTimeMinutes} min read
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-2">
                    {essay.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mb-6">
                    {essay.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between font-mono text-xs">
                  <span className="text-[10px] text-muted-foreground">{essay.publishedAt}</span>
                  <div className="text-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Reflection</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
