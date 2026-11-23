import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journalData } from "@/content/data/journal";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface JournalDetailsProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return journalData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: JournalDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  const post = journalData.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function JournalArticlePage({ params }: JournalDetailsProps) {
  const { slug } = await params;
  const post = journalData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Back to Journal */}
      <Link
        href="/journal"
        className="inline-flex items-center gap-2 text-xs font-mono text-silver-mid hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Journal
      </Link>

      <div className="flex items-center gap-3 mb-4 text-xs font-mono">
        <Badge variant="cyan" dot>
          {post.tags[0] || "Architecture"}
        </Badge>
        <span className="text-silver-dark">{post.publishedAt}</span>
        <span className="text-silver-dark">•</span>
        <span className="text-silver-dark">{post.readTimeMinutes} min read</span>
      </div>

      <h1 className="font-display text-2xl sm:text-4xl font-bold uppercase text-white tracking-tight leading-tight">
        {post.title}
      </h1>

      <p className="mt-4 text-base sm:text-lg text-silver-mid font-light leading-relaxed border-l-2 border-cyan-500/40 pl-4 my-6">
        {post.excerpt}
      </p>

      {/* Render Markdown-Styled Article Body */}
      <div className="mt-10 space-y-6 text-silver-light font-light leading-relaxed text-sm sm:text-base border-t border-hairline pt-8">
        <div className="whitespace-pre-line font-sans">
          {post.contentMarkdown}
        </div>
      </div>
    </article>
  );
}
