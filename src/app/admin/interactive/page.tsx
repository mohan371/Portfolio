"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/admin/ToastContext";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { playTactileClick } from "@/lib/sound";
import { initialMusicData, musicCategories, toSpotifyEmbedUrl } from "@/content/data/music";
import { initialPhilosophyData, philosophyCategories } from "@/content/data/philosophy";
import { initialCommandCenterData } from "@/content/data/command-center";
import { arcadeChallenges } from "@/content/data/arcade";
import { MusicItem, MusicCategory } from "@/types/music";
import { PhilosophyItem, PhilosophyCategory } from "@/types/philosophy";
import { BuildingProject, ExploringTech, EngineeringDispatch } from "@/types/command-center";
import { ArcadeChallenge } from "@/types/arcade";
import {
  Headphones,
  BookOpen,
  Activity,
  Gamepad2,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ExternalLink,
  Sparkles,
  Flame,
  Star,
  Layers,
  Cpu,
} from "lucide-react";

type InteractiveTab = "music" | "philosophy" | "command-center" | "arcade";

export default function AdminInteractivePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<InteractiveTab>("music");

  // State slices
  const [musicList, setMusicList] = useState<MusicItem[]>(initialMusicData);
  const [philosophyList, setPhilosophyList] = useState<PhilosophyItem[]>(initialPhilosophyData);
  const [buildingList, setBuildingList] = useState<BuildingProject[]>(initialCommandCenterData.currentlyBuilding);
  const [exploringList, setExploringList] = useState<ExploringTech[]>(initialCommandCenterData.currentlyExploring);
  const [dispatchList, setDispatchList] = useState<EngineeringDispatch[]>(initialCommandCenterData.engineeringDispatches);
  const [arcadeList, setArcadeList] = useState<ArcadeChallenge[]>(arcadeChallenges);

  // New Music Form State
  const [isNewMusicModal, setIsNewMusicModal] = useState(false);
  const [newMusic, setNewMusic] = useState<{
    title: string;
    artist: string;
    category: MusicCategory;
    spotifyUrl: string;
    description: string;
    duration: string;
    isFeatured: boolean;
  }>({
    title: "",
    artist: "",
    category: "Coding Sessions",
    spotifyUrl: "",
    description: "",
    duration: "3:45",
    isFeatured: false,
  });

  // New Philosophy Form State
  const [isNewPhilosophyModal, setIsNewPhilosophyModal] = useState(false);
  const [newPhilosophy, setNewPhilosophy] = useState<{
    title: string;
    category: PhilosophyCategory;
    excerpt: string;
    content: string;
    readTimeMinutes: number;
    keyTakeaway1: string;
    keyTakeaway2: string;
  }>({
    title: "",
    category: "Engineering Principles",
    excerpt: "",
    content: "",
    readTimeMinutes: 5,
    keyTakeaway1: "",
    keyTakeaway2: "",
  });

  // Confirm delete target
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string; type: string } | null>(null);

  const handleTabChange = (tab: InteractiveTab) => {
    playTactileClick();
    setActiveTab(tab);
  };

  // Add Music
  const handleAddMusic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMusic.title || !newMusic.spotifyUrl) return;
    playTactileClick();

    const created: MusicItem = {
      id: `fm-${Date.now()}`,
      title: newMusic.title,
      artist: newMusic.artist || "Curated Artist",
      category: newMusic.category,
      spotifyUrl: newMusic.spotifyUrl,
      embedUrl: toSpotifyEmbedUrl(newMusic.spotifyUrl),
      description: newMusic.description || "Curated engineering soundtrack.",
      duration: newMusic.duration,
      isFeatured: newMusic.isFeatured,
      addedAt: new Date().toISOString().split("T")[0],
    };

    setMusicList([created, ...musicList]);
    setIsNewMusicModal(false);
    setNewMusic({
      title: "",
      artist: "",
      category: "Coding Sessions",
      spotifyUrl: "",
      description: "",
      duration: "3:45",
      isFeatured: false,
    });
    toast.success("Track Added", `"${created.title}" added to MOHAN.FM.`);
  };

  // Toggle Featured Music
  const handleToggleFeaturedMusic = (id: string) => {
    playTactileClick();
    setMusicList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFeatured: !item.isFeatured } : item))
    );
    toast.info("Updated", "Featured music status toggled.");
  };

  // Add Philosophy
  const handleAddPhilosophy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhilosophy.title || !newPhilosophy.content) return;
    playTactileClick();

    const created: PhilosophyItem = {
      id: `phil-${Date.now()}`,
      slug: newPhilosophy.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: newPhilosophy.title,
      category: newPhilosophy.category,
      excerpt: newPhilosophy.excerpt || newPhilosophy.content.slice(0, 140) + "...",
      content: newPhilosophy.content,
      publishedAt: new Date().toISOString().split("T")[0],
      readTimeMinutes: newPhilosophy.readTimeMinutes,
      isFeatured: false,
      keyTakeaways: [newPhilosophy.keyTakeaway1, newPhilosophy.keyTakeaway2].filter(Boolean),
    };

    setPhilosophyList([created, ...philosophyList]);
    setIsNewPhilosophyModal(false);
    setNewPhilosophy({
      title: "",
      category: "Engineering Principles",
      excerpt: "",
      content: "",
      readTimeMinutes: 5,
      keyTakeaway1: "",
      keyTakeaway2: "",
    });
    toast.success("Essay Published", `"${created.title}" published to Beyond the Code.`);
  };

  // Confirm delete handler
  const confirmDelete = () => {
    if (!deleteTarget) return;
    playTactileClick();

    if (deleteTarget.type === "music") {
      setMusicList((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    } else if (deleteTarget.type === "philosophy") {
      setPhilosophyList((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    } else if (deleteTarget.type === "building") {
      setBuildingList((prev) => prev.filter((b) => b.id !== deleteTarget.id));
    } else if (deleteTarget.type === "arcade") {
      setArcadeList((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    }

    toast.info("Deleted", `Item "${deleteTarget.name}" removed.`);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-8 font-mono text-xs">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <span className="text-[10px] uppercase text-cyan-accent tracking-widest block mb-1">
            CONTROL CENTER // INTERACTIVE SUITE
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Interactive Experience Management
          </h1>
          <p className="text-silver-mid font-light mt-1">
            Manage MOHAN.FM Spotify streams, Beyond the Code reflections, Command Center pipeline metrics, and Engineering Arcade bug challenges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "music" && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsNewMusicModal(true)}
              className="gap-1.5 bg-cyan-400 text-obsidian hover:bg-cyan-300 font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              ADD SPOTIFY EMBED
            </Button>
          )}

          {activeTab === "philosophy" && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsNewPhilosophyModal(true)}
              className="gap-1.5 bg-cyan-400 text-obsidian hover:bg-cyan-300 font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              WRITE REFLECTION
            </Button>
          )}
        </div>
      </div>

      {/* 4 Feature Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-hairline">
        {[
          { id: "music", label: "MOHAN.FM (Listening Room)", icon: Headphones, count: musicList.length },
          { id: "philosophy", label: "Beyond the Code", icon: BookOpen, count: philosophyList.length },
          { id: "command-center", label: "Command Center HUD", icon: Activity, count: buildingList.length + exploringList.length },
          { id: "arcade", label: "Engineering Arcade", icon: Gamepad2, count: arcadeList.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as InteractiveTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? "bg-cyan-400 text-obsidian font-bold shadow-sm"
                  : "bg-surface-1 border border-hairline text-silver-mid hover:text-white hover:bg-surface-2"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-obsidian/20 text-obsidian" : "bg-carbon text-silver-dark"}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: MOHAN.FM */}
      {activeTab === "music" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-silver-dark">
            <span>Spotify Embed Catalog ({musicList.length} items)</span>
            <span className="text-[10px]">Zero local audio extraction • Official iFrame API only</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {musicList.map((item) => (
              <Card key={item.id} hasDatumCorners className="p-4 bg-surface-1 border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 sm:max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">{item.title}</span>
                    <Badge variant="violet" className="text-[9px] py-0">{item.category}</Badge>
                    {item.isFeatured && <Badge variant="emerald" dot className="text-[9px] py-0">Featured</Badge>}
                  </div>
                  <div className="text-[11px] text-silver-dark">
                    {item.artist} • {item.duration} • Added: {item.addedAt}
                  </div>
                  <p className="text-[11px] text-silver-mid font-light leading-relaxed truncate">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={item.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-carbon border border-hairline text-silver-mid hover:text-cyan-accent transition-colors"
                    title="Open in Spotify"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleToggleFeaturedMusic(item.id)}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      item.isFeatured
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-carbon border-hairline text-silver-dark hover:text-white"
                    }`}
                    title={item.isFeatured ? "Unfeature Track" : "Feature Track"}
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setDeleteTarget({ id: item.id, name: item.title, type: "music" })}
                    className="p-2 rounded-lg bg-carbon border border-hairline text-silver-dark hover:text-red-400 hover:border-red-500/30 transition-colors cursor-pointer"
                    title="Delete Embed"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BEYOND THE CODE */}
      {activeTab === "philosophy" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-silver-dark">
            <span>Philosophy Essays &amp; Reflections ({philosophyList.length} published)</span>
            <span className="text-[10px]">Displayed on /beyond-the-code</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {philosophyList.map((essay) => (
              <Card key={essay.id} hasDatumCorners className="p-4 bg-surface-1 border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 sm:max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">{essay.title}</span>
                    <Badge variant="cyan" className="text-[9px] py-0">{essay.category}</Badge>
                    {essay.isFeatured && <Badge variant="emerald" dot className="text-[9px] py-0">Featured</Badge>}
                  </div>
                  <div className="text-[11px] text-silver-dark">
                    Slug: /{essay.slug} • Published: {essay.publishedAt} • {essay.readTimeMinutes} min read
                  </div>
                  <p className="text-[11px] text-silver-mid font-light leading-relaxed line-clamp-2">
                    {essay.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setDeleteTarget({ id: essay.id, name: essay.title, type: "philosophy" })}
                    className="p-2 rounded-lg bg-carbon border border-hairline text-silver-dark hover:text-red-400 hover:border-red-500/30 transition-colors cursor-pointer"
                    title="Delete Essay"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COMMAND CENTER */}
      {activeTab === "command-center" && (
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-silver-dark">
              <span>Active Engineering Pipelines (Currently Building)</span>
              <span className="text-[10px] text-cyan-accent">{buildingList.length} items</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {buildingList.map((proj) => (
                <Card key={proj.id} hasDatumCorners className="p-4 bg-surface-1 border-hairline space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-cyan-accent font-bold uppercase">{proj.category}</span>
                    <span className="text-white font-bold">{proj.progressPercent}%</span>
                  </div>
                  <h4 className="text-white font-bold text-sm">{proj.title}</h4>
                  <p className="text-[11px] text-silver-mid font-light leading-relaxed">{proj.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-hairline">
            <div className="flex items-center justify-between text-silver-dark">
              <span>Technologies in R&amp;D (Exploring)</span>
              <span className="text-[10px] text-emerald-accent">{exploringList.length} topics</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {exploringList.map((exp) => (
                <Card key={exp.id} hasDatumCorners className="p-4 bg-surface-1 border-hairline space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-sm">{exp.topic}</span>
                    <Badge variant="violet" className="text-[9px] py-0">{exp.status}</Badge>
                  </div>
                  <p className="text-[11px] text-silver-mid font-light leading-relaxed">{exp.purpose}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ARCADE */}
      {activeTab === "arcade" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-silver-dark">
            <span>Engineering Arcade Challenge Bank ({arcadeList.length} verified challenges)</span>
            <span className="text-[10px]">Levels 1 to 5</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {arcadeList.map((challenge) => (
              <Card key={challenge.id} hasDatumCorners className="p-4 bg-surface-1 border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 sm:max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-accent flex items-center justify-center font-bold text-[10px]">
                      L{challenge.level}
                    </span>
                    <span className="text-white font-bold text-sm">{challenge.title}</span>
                    <Badge variant="cyan" className="text-[9px] py-0">{challenge.category}</Badge>
                  </div>
                  <p className="text-[11px] text-silver-mid font-light leading-relaxed">
                    {challenge.scenario}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-silver-dark">{challenge.options.length} options</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Add Spotify Embed */}
      {isNewMusicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <Card hasDatumCorners className="w-full max-w-lg bg-surface-1 border-hairline shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <h3 className="font-display font-bold text-lg text-white">Add Spotify Embed to MOHAN.FM</h3>
              <button onClick={() => setIsNewMusicModal(false)} className="text-silver-dark hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMusic} className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase text-silver-dark mb-1">Track or Playlist Title *</label>
                <input
                  type="text"
                  required
                  value={newMusic.title}
                  onChange={(e) => setNewMusic({ ...newMusic, title: e.target.value })}
                  placeholder="e.g. Synthwave Night Coding Stream"
                  className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase text-silver-dark mb-1">Artist / Curator</label>
                  <input
                    type="text"
                    value={newMusic.artist}
                    onChange={(e) => setNewMusic({ ...newMusic, artist: e.target.value })}
                    placeholder="e.g. HOME or Editorial"
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-silver-dark mb-1">Category</label>
                  <select
                    value={newMusic.category}
                    onChange={(e) => setNewMusic({ ...newMusic, category: e.target.value as MusicCategory })}
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                  >
                    {musicCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-silver-dark mb-1">Spotify URL (Track, Album, or Playlist) *</label>
                <input
                  type="url"
                  required
                  value={newMusic.spotifyUrl}
                  onChange={(e) => setNewMusic({ ...newMusic, spotifyUrl: e.target.value })}
                  placeholder="https://open.spotify.com/track/..."
                  className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-silver-dark mb-1">Description / Curator Note</label>
                <textarea
                  rows={2}
                  value={newMusic.description}
                  onChange={(e) => setNewMusic({ ...newMusic, description: e.target.value })}
                  placeholder="Why this track soundtracks your engineering work..."
                  className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isFeaturedMusic"
                  checked={newMusic.isFeatured}
                  onChange={(e) => setNewMusic({ ...newMusic, isFeatured: e.target.checked })}
                  className="rounded border-hairline bg-carbon text-cyan-400 cursor-pointer"
                />
                <label htmlFor="isFeaturedMusic" className="text-silver-mid text-[11px] cursor-pointer">
                  Feature this track in floating player widget
                </label>
              </div>

              <div className="pt-3 border-t border-hairline flex items-center justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsNewMusicModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" className="bg-cyan-400 text-obsidian hover:bg-cyan-300 font-bold">
                  Save Spotify Embed
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Modal: Add Philosophy Reflection */}
      {isNewPhilosophyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <Card hasDatumCorners className="w-full max-w-xl bg-surface-1 border-hairline shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <h3 className="font-display font-bold text-lg text-white">Publish to Beyond the Code</h3>
              <button onClick={() => setIsNewPhilosophyModal(false)} className="text-silver-dark hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPhilosophy} className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase text-silver-dark mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newPhilosophy.title}
                  onChange={(e) => setNewPhilosophy({ ...newPhilosophy, title: e.target.value })}
                  placeholder="e.g. Determinism in Database Transactions"
                  className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase text-silver-dark mb-1">Category</label>
                  <select
                    value={newPhilosophy.category}
                    onChange={(e) => setNewPhilosophy({ ...newPhilosophy, category: e.target.value as PhilosophyCategory })}
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                  >
                    {philosophyCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-silver-dark mb-1">Read Time (Minutes)</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={newPhilosophy.readTimeMinutes}
                    onChange={(e) => setNewPhilosophy({ ...newPhilosophy, readTimeMinutes: parseInt(e.target.value, 10) || 5 })}
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-silver-dark mb-1">Excerpt / Summary</label>
                <textarea
                  rows={2}
                  value={newPhilosophy.excerpt}
                  onChange={(e) => setNewPhilosophy({ ...newPhilosophy, excerpt: e.target.value })}
                  placeholder="Short teaser for catalog cards..."
                  className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-silver-dark mb-1">Full Content *</label>
                <textarea
                  rows={6}
                  required
                  value={newPhilosophy.content}
                  onChange={(e) => setNewPhilosophy({ ...newPhilosophy, content: e.target.value })}
                  placeholder="Write your engineering reflection..."
                  className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-hairline flex items-center justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsNewPhilosophyModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" className="bg-cyan-400 text-obsidian hover:bg-cyan-300 font-bold">
                  Publish Reflection
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Confirm Deletion"
        description={`Are you sure you want to remove "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="DELETE ITEM"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
