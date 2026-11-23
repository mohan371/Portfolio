"use client";

import React, { useState } from "react";
import { MusicItem, MusicCategory } from "@/types/music";
import { initialMusicData, musicCategories, toSpotifyEmbedUrl } from "@/content/data/music";
import { playTactileClick } from "@/lib/sound";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Radio,
  X,
  ExternalLink,
  Share2,
  Copy,
  Check,
  Disc3,
  Volume2,
  Sparkles,
  Maximize2,
  Minimize2,
  Headphones,
} from "lucide-react";

export function MohanFmPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeTrack, setActiveTrack] = useState<MusicItem>(
    initialMusicData.find((t) => t.isFeatured) || initialMusicData[0]
  );
  const [hasLoadedEmbed, setHasLoadedEmbed] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredTracks = initialMusicData.filter(
    (t) => selectedCategory === "All" || t.category === selectedCategory
  );

  const handleSelectTrack = (track: MusicItem) => {
    playTactileClick();
    setActiveTrack(track);
    setHasLoadedEmbed(true);
  };

  const handleCopyLink = () => {
    playTactileClick();
    navigator.clipboard.writeText(activeTrack.spotifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    playTactileClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `MOHAN.FM — ${activeTrack.title}`,
          text: `Listen to "${activeTrack.title}" on Mohan N.V.'s Engineering Listening Room:`,
          url: activeTrack.spotifyUrl,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <>
      {/* Floating Compact Launcher Pill (Bottom-Right, above AI assistant) */}
      <div className="fixed bottom-20 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => {
              playTactileClick();
              setIsOpen(true);
              setHasLoadedEmbed(true);
            }}
            aria-label="Open MOHAN.FM Listening Room"
            className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-surface/95 dark:bg-surface-1/95 border border-border dark:border-hairline shadow-card hover:border-primary/50 transition-all duration-300 backdrop-blur-xl text-xs font-mono"
          >
            <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
              <Headphones className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-foreground group-hover:text-primary transition-colors text-[11px] tracking-wider">
                  MOHAN.FM
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-[9px] text-muted-foreground truncate max-w-[110px]">
                {activeTrack.title}
              </span>
            </div>

            {/* Micro Waveform Bars */}
            <div className="flex items-end gap-0.5 h-3.5 pl-1">
              <span className="w-0.5 h-full bg-primary/80 animate-pulse" style={{ animationDelay: "0ms" }} />
              <span className="w-0.5 h-2 bg-primary/60 animate-pulse" style={{ animationDelay: "180ms" }} />
              <span className="w-0.5 h-3 bg-primary animate-pulse" style={{ animationDelay: "320ms" }} />
              <span className="w-0.5 h-1.5 bg-primary/50 animate-pulse" style={{ animationDelay: "120ms" }} />
            </div>
          </button>
        )}
      </div>

      {/* Expanded Listening Room Modal / Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <Card
            hasDatumCorners
            className="w-full sm:max-w-3xl max-h-[90vh] sm:max-h-[85vh] bg-surface dark:bg-surface-1 border-border dark:border-hairline shadow-2xl flex flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-border dark:border-hairline flex items-center justify-between bg-surface-secondary/40 dark:bg-carbon/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Disc3 className="w-4 h-4 animate-spin-slow" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-sm sm:text-base text-foreground tracking-tight">
                      MOHAN.FM // LISTENING ROOM
                    </h3>
                    <Badge variant="cyan" dot className="text-[9px] py-0">
                      OFFICIAL SPOTIFY EMBED
                    </Badge>
                  </div>
                  <p className="text-[11px] font-mono text-muted-foreground">
                    Soundtrack of My Engineering Journey • Zero Autoplay Policy
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    playTactileClick();
                    setIsOpen(false);
                  }}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-secondary transition-colors"
                  aria-label="Close MOHAN.FM"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Body: Scrollable */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                <button
                  onClick={() => {
                    playTactileClick();
                    setSelectedCategory("All");
                  }}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedCategory === "All"
                      ? "bg-primary text-primary-foreground font-bold"
                      : "bg-surface-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All ({initialMusicData.length})
                </button>
                {musicCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      playTactileClick();
                      setSelectedCategory(cat);
                    }}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground font-bold"
                        : "bg-surface-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Active Player Card & Official Spotify Embed */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                {/* Embed Container */}
                <div className="md:col-span-7 bg-card border border-border dark:border-hairline rounded-2xl p-2.5 shadow-sm">
                  {hasLoadedEmbed ? (
                    <iframe
                      src={toSpotifyEmbedUrl(activeTrack.spotifyUrl)}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="rounded-xl w-full"
                      title={`Spotify Embed: ${activeTrack.title}`}
                    />
                  ) : (
                    <div className="h-[152px] rounded-xl bg-surface-secondary flex items-center justify-center text-xs font-mono text-muted-foreground">
                      Click to initialize Spotify player
                    </div>
                  )}

                  {/* Player Actions & Share Bar */}
                  <div className="mt-3 px-2 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyLink}
                        className="h-7 text-[11px] gap-1 px-2.5"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShare}
                        className="h-7 text-[11px] gap-1 px-2.5"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>Share</span>
                      </Button>
                    </div>

                    <a
                      href={activeTrack.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-[11px] font-semibold"
                    >
                      <span>Open in Spotify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Track Editorial Context */}
                <div className="md:col-span-5 space-y-3 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-surface-secondary/60 border border-border dark:border-hairline space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase text-muted-foreground tracking-wider font-semibold">
                        CURATOR NOTE
                      </span>
                      <Badge variant="violet" className="text-[9px]">
                        {activeTrack.category}
                      </Badge>
                    </div>
                    <h4 className="font-display font-bold text-sm text-foreground">
                      {activeTrack.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-sans font-light">
                      {activeTrack.description}
                    </p>
                  </div>

                  <div className="text-[10px] text-muted-foreground space-y-1 pl-1">
                    <div>• Streamed legally via official Spotify iFrame API</div>
                    <div>• Zero local audio extraction or copyrighted file downloads</div>
                    <div>• Click play inside the widget to initiate audio stream</div>
                  </div>
                </div>
              </div>

              {/* Playlist Directory */}
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-muted-foreground uppercase tracking-wider font-semibold">
                    CURATED TRACKLIST ({filteredTracks.length})
                  </span>
                  <span className="text-[11px] text-primary">Select to switch audio embed</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filteredTracks.map((track) => {
                    const isSelected = track.id === activeTrack.id;
                    return (
                      <div
                        key={track.id}
                        onClick={() => handleSelectTrack(track)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs font-mono ${
                          isSelected
                            ? "bg-primary/10 border-primary shadow-xs"
                            : "bg-card border-border hover:border-primary/40 hover:bg-surface-secondary/50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "bg-surface-secondary text-muted-foreground"
                            }`}
                          >
                            {isSelected ? <Volume2 className="w-3.5 h-3.5" /> : <Disc3 className="w-3.5 h-3.5" />}
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-display font-semibold text-foreground truncate text-xs">
                              {track.title}
                            </h5>
                            <span className="text-[10px] text-muted-foreground truncate block">
                              {track.artist} • {track.category}
                            </span>
                          </div>
                        </div>

                        {track.isFeatured && (
                          <Badge variant="emerald" className="text-[9px] py-0 shrink-0 ml-2">
                            Featured
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
