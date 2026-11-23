import { Metadata } from "next";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { initialMusicData, musicCategories, toSpotifyEmbedUrl } from "@/content/data/music";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Headphones, Disc3, ExternalLink, Sparkles, Radio, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "MOHAN.FM // Engineering Listening Room",
  description:
    "Curated Spotify soundscapes, lofi beats, and synthwave streams that soundtrack Mohan N.V.'s software engineering and architectural deep focus.",
};

export default function ListeningRoomPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      <SectionHeader
        index="AUDIO"
        tag="MOHAN.FM"
        title="Engineering Listening Room"
        description="A curated sonic environment designed for state-of-flow, systems architecture, and deep algorithmic problem solving. Streamed officially via Spotify embeds with zero autoplay."
      />

      {/* Acoustic Principles / Curator Manifesto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        <Card hasDatumCorners className="p-6 bg-card border-border shadow-subtle space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Radio className="w-4 h-4" />
            <span>01 // COGNITIVE HARMONICS</span>
          </div>
          <p className="text-muted-foreground font-sans font-light text-xs leading-relaxed">
            Non-lyrical synthwave and ambient drones reduce auditory distraction while maintaining steady mental cadence during intensive refactoring and database design.
          </p>
        </Card>

        <Card hasDatumCorners className="p-6 bg-card border-border shadow-subtle space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>02 // LEGAL &amp; ETHICAL EMBED</span>
          </div>
          <p className="text-muted-foreground font-sans font-light text-xs leading-relaxed">
            Integrated strictly via Spotify&apos;s developer iFrame widget. No local downloading, audio ripping, or reproduction of copyrighted material. Artists receive full streaming royalties.
          </p>
        </Card>

        <Card hasDatumCorners className="p-6 bg-card border-border shadow-subtle space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>03 // AUTONOMOUS AUDIOPLAY</span>
          </div>
          <p className="text-muted-foreground font-sans font-light text-xs leading-relaxed">
            Zero unwanted noise. Audio playback never triggers automatically. Visitors maintain complete control over their browsing acoustic experience.
          </p>
        </Card>
      </div>

      {/* Curated Streams Catalog */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-2 font-mono text-xs">
          <div>
            <h3 className="font-display font-bold text-xl text-foreground">
              Curated Streams &amp; Playlists
            </h3>
            <span className="text-muted-foreground">Select any playlist below to activate playback via Spotify</span>
          </div>
          <Badge variant="cyan" dot>
            {initialMusicData.length} ACTIVE STREAMS
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initialMusicData.map((item) => (
            <Card
              key={item.id}
              hasDatumCorners
              className="p-6 bg-card border-border shadow-card flex flex-col justify-between space-y-5"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <Badge variant="violet" className="text-[10px]">
                    {item.category}
                  </Badge>
                  {item.isFeatured && (
                    <Badge variant="emerald" dot className="text-[10px]">
                      Featured
                    </Badge>
                  )}
                </div>

                <h4 className="font-display font-bold text-xl text-foreground mb-1">
                  {item.title}
                </h4>
                <div className="text-xs font-mono text-primary font-semibold mb-3">
                  {item.artist} • {item.duration}
                </div>

                <p className="text-xs text-muted-foreground font-light leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Spotify Embed Widget */}
                <div className="rounded-xl overflow-hidden border border-border shadow-xs bg-surface-secondary">
                  <iframe
                    src={toSpotifyEmbedUrl(item.spotifyUrl)}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={item.title}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] text-muted-foreground">Added: {item.addedAt}</span>
                <a
                  href={item.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1 font-semibold text-[11px]"
                >
                  <span>Open in Spotify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
