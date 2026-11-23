import { Metadata } from "next";
import Link from "next/link";
import { journalData } from "@/content/data/journal";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { Card, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Journal",
  description: "Technical essays and engineering reflections by Mohan N.V. on distributed databases, Go microservices, and React 19 architecture.",
};

export default function JournalPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        index="JOURNAL"
        tag="Engineering Journal"
        title="Technical Publications &amp; Reflections"
        description="Deep dives into database internals, low-latency microservice architecture in Go, and practical full-stack engineering."
      />

      <div className="space-y-6 mb-20">
        {journalData.map((post) => (
          <Link key={post.id} href={`/journal/${post.slug}`} className="block group">
            <Card hasDatumCorners className="p-6 sm:p-8 hover:border-cyan-500/40 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-cyan-accent">{post.publishedAt}</span>
                  <span className="text-silver-dark">•</span>
                  <span className="text-xs font-mono text-silver-dark">{post.readTimeMinutes} min read</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-1 text-silver-mid">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <CardTitle className="text-xl sm:text-2xl group-hover:text-cyan-accent transition-colors">
                {post.title}
              </CardTitle>

              <p className="mt-3 text-sm text-silver-mid font-light leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-xs font-mono">
                <span className="text-silver-mid group-hover:text-white transition-colors">
                  Read Full Publication
                </span>
                <ArrowUpRight className="w-4 h-4 text-cyan-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
