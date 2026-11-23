import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journalData } from "@/content/data/journal";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

interface JournalPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return journalData.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: JournalPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = journalData.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function JournalPostPage({ params }: JournalPostProps) {
  const { slug } = await params;
  const post = journalData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/journal"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Engineering Journal
      </Link>

      <div className="flex items-center gap-3 text-xs font-mono mb-4">
        <Badge variant="cyan" dot>
          {post.tags[0] || "Architecture"}
        </Badge>
        <span className="text-muted-foreground">{post.publishedAt}</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">{post.readTimeMinutes} min read</span>
      </div>

      <h1 className="font-display text-2xl sm:text-4xl font-bold uppercase text-foreground tracking-tight leading-tight">
        {post.title}
      </h1>

      <p className="mt-4 text-base sm:text-lg text-muted-foreground font-light leading-relaxed border-l-2 border-primary/50 pl-4 my-6">
        {post.excerpt}
      </p>

      {/* Render Markdown-Styled Article Body */}
      <div className="mt-10 space-y-6 text-foreground/90 font-light leading-relaxed text-sm sm:text-base border-t border-border pt-8">
        <div className="whitespace-pre-line font-sans">
          {post.contentMarkdown}
        </div>
      </div>
    </article>
  );
}
