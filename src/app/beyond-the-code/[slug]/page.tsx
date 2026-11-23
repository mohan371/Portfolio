import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { initialPhilosophyData } from "@/content/data/philosophy";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  CheckCircle2,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return initialPhilosophyData.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = initialPhilosophyData.find((p) => p.slug === slug);

  if (!item) {
    return { title: "Philosophy Entry Not Found" };
  }

  return {
    title: `${item.title} // Beyond the Code`,
    description: item.excerpt,
  };
}

export default async function PhilosophyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = initialPhilosophyData.find((p) => p.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Back to Philosophy Directory */}
      <div>
        <Link
          href="/beyond-the-code"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Beyond the Code Directory</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4 pb-8 border-b border-border">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="cyan" dot className="text-[10px] font-mono uppercase">
            {item.category}
          </Badge>
          <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {item.publishedAt}
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-primary" /> {item.readTimeMinutes} min read
          </span>
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-5xl text-foreground tracking-tight leading-tight">
          {item.title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
          {item.excerpt}
        </p>
      </header>

      {/* Key Takeaways Callout Card */}
      <Card hasDatumCorners className="p-6 bg-surface-secondary/40 border-border shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-primary font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Core Engineering Takeaways</span>
        </div>
        <div className="space-y-2 font-mono text-xs">
          {item.keyTakeaways.map((takeaway, idx) => (
            <div key={idx} className="flex items-start gap-2 text-foreground/90 font-light">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Full Editorial Body */}
      <div className="prose prose-slate dark:prose-invert max-w-none text-foreground/90 font-sans font-light leading-relaxed text-sm sm:text-base space-y-6">
        {item.content.split("\n\n").map((paragraph, index) => {
          if (paragraph.startsWith("- ") || paragraph.startsWith("1. ")) {
            return (
              <div key={index} className="p-4 rounded-xl bg-card border border-border font-mono text-xs sm:text-sm my-4 space-y-2">
                {paragraph.split("\n").map((line, lIdx) => (
                  <div key={lIdx} className="leading-relaxed">
                    {line}
                  </div>
                ))}
              </div>
            );
          }
          return (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Author Bio Footer */}
      <div className="pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div>
          <span className="font-display font-bold text-sm text-foreground block">
            MOHAN N.V.
          </span>
          <span className="text-muted-foreground text-[11px]">
            Software Engineer at Veda Scholars • Hosur, Tamil Nadu
          </span>
        </div>

        <Link href="/contact">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs font-mono">
            <span>Discuss This Essay</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </article>
  );
}
