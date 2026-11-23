"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { playTactileClick } from "@/lib/sound";
import { projectsData } from "@/content/data/projects";
import { journalData } from "@/content/data/journal";
import { skillsData } from "@/content/data/skills";
import { experienceData } from "@/content/data/experience";
import {
  FolderGit2,
  BookOpen,
  Mail,
  Layers,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const publishedProjects = projectsData.filter((p) => p.status === "Completed").length;
  const inProgressProjects = projectsData.filter((p) => p.status === "In Development").length;
  const totalArticles = journalData.length;
  const totalSkills = skillsData.reduce((acc, cat) => acc + cat.skills.length, 0);

  // Simulated inbound enquiries state for dashboard preview
  const [enquiriesCount, setEnquiriesCount] = useState(3);
  const [unreadCount, setUnreadCount] = useState(2);

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest block mb-1">
            CONTROL CENTER // OVERVIEW
          </span>
          <h1 className="font-display font-bold text-3xl text-white">
            Administration Dashboard
          </h1>
          <p className="text-xs text-silver-mid font-light mt-1">
            Manage published engineering projects, technical journal articles, verified chronology, and inbound client enquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/projects?create=true">
            <Button
              variant="primary"
              size="sm"
              onClick={() => playTactileClick()}
              className="gap-1.5 text-xs font-mono font-bold bg-cyan-400 text-obsidian hover:bg-cyan-300"
            >
              <Plus className="w-3.5 h-3.5" />
              NEW PROJECT
            </Button>
          </Link>

          <Link href="/admin/journal?create=true">
            <Button
              variant="outline"
              size="sm"
              onClick={() => playTactileClick()}
              className="gap-1.5 text-xs font-mono"
            >
              <Plus className="w-3.5 h-3.5" />
              WRITE ARTICLE
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Projects */}
        <Card hasDatumCorners className="p-5 bg-surface-1 border-hairline">
          <div className="flex items-center justify-between mb-3 text-silver-dark font-mono text-xs">
            <span className="uppercase">PUBLISHED PROJECTS</span>
            <FolderGit2 className="w-4 h-4 text-cyan-accent" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-3xl text-white">
              {publishedProjects}
            </span>
            <span className="text-[11px] font-mono text-emerald-accent">
              +{inProgressProjects} In Development
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-hairline flex items-center justify-between text-[11px] font-mono">
            <span className="text-silver-dark">Total in Catalog</span>
            <Link href="/admin/projects" className="text-cyan-accent hover:underline flex items-center gap-0.5">
              Manage <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </Card>

        {/* Articles */}
        <Card hasDatumCorners className="p-5 bg-surface-1 border-hairline">
          <div className="flex items-center justify-between mb-3 text-silver-dark font-mono text-xs">
            <span className="uppercase">ENGINEERING JOURNAL</span>
            <BookOpen className="w-4 h-4 text-violet-accent" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-3xl text-white">
              {totalArticles}
            </span>
            <span className="text-[11px] font-mono text-emerald-accent">
              100% Published
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-hairline flex items-center justify-between text-[11px] font-mono">
            <span className="text-silver-dark">Technical deep dives</span>
            <Link href="/admin/journal" className="text-violet-accent hover:underline flex items-center gap-0.5">
              Manage <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </Card>

        {/* Enquiries */}
        <Card hasDatumCorners className="p-5 bg-surface-1 border-hairline">
          <div className="flex items-center justify-between mb-3 text-silver-dark font-mono text-xs">
            <span className="uppercase">INBOUND ENQUIRIES</span>
            <Mail className="w-4 h-4 text-amber-accent" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-3xl text-white">
              {enquiriesCount}
            </span>
            {unreadCount > 0 && (
              <span className="text-[11px] font-mono text-amber-400 font-bold">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-hairline flex items-center justify-between text-[11px] font-mono">
            <span className="text-silver-dark">Private client inbox</span>
            <Link href="/admin/enquiries" className="text-amber-accent hover:underline flex items-center gap-0.5">
              Review <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </Card>

        {/* Skills */}
        <Card hasDatumCorners className="p-5 bg-surface-1 border-hairline">
          <div className="flex items-center justify-between mb-3 text-silver-dark font-mono text-xs">
            <span className="uppercase">VERIFIED TECH STACK</span>
            <Layers className="w-4 h-4 text-emerald-accent" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-3xl text-white">
              {totalSkills}
            </span>
            <span className="text-[11px] font-mono text-silver-dark">
              Across 4 Domains
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-hairline flex items-center justify-between text-[11px] font-mono">
            <span className="text-silver-dark">Go, Java, React, SQL</span>
            <Link href="/admin/content" className="text-emerald-accent hover:underline flex items-center gap-0.5">
              Inspect <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </Card>
      </div>

      {/* Main Grid: Recent Projects & Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Quick Project Status List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-hairline">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-cyan-accent" />
              <h3 className="font-display font-bold text-lg text-white">
                Live Portfolio Projects
              </h3>
            </div>
            <Link href="/admin/projects" className="text-xs font-mono text-cyan-accent hover:underline">
              View All ({projectsData.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-xl bg-surface-1 border border-hairline flex items-center justify-between gap-4 hover:border-silver-dark/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-display font-bold text-white text-sm">
                      {project.title}
                    </h4>
                    {project.featured && (
                      <Badge variant="cyan" dot className="text-[9px]">Featured</Badge>
                    )}
                  </div>
                  <p className="text-xs text-silver-mid font-light line-clamp-1">
                    {project.shortDescription}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-silver-dark">
                    <span>Category: {project.category}</span>
                    <span>•</span>
                    <span>Status: {project.status}</span>
                  </div>
                </div>

                <Link href={`/admin/projects?edit=${project.id}`}>
                  <Button variant="outline" size="sm" className="text-xs font-mono">
                    Edit
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Security & System Health HUD */}
        <div className="lg:col-span-5 space-y-4">
          <div className="pb-2 border-b border-hairline">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-accent" />
              System Status &amp; Integrity
            </h3>
          </div>

          <Card hasDatumCorners className="p-5 bg-surface-1 border-hairline space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <span className="text-silver-dark">DATABASE ENGINE</span>
              <span className="text-white font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-accent" />
                PostgreSQL 16 (Online)
              </span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <span className="text-silver-dark">ROW LEVEL SECURITY</span>
              <span className="text-emerald-400 font-bold">13/13 Tables Active</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <span className="text-silver-dark">STORAGE BUCKETS</span>
              <span className="text-cyan-accent font-bold">assets + resumes</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <span className="text-silver-dark">NEXT.JS RUNTIME</span>
              <span className="text-white">v16.4.6 (Turbopack)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-silver-dark">AUTH SESSION</span>
              <span className="text-cyan-accent font-bold">Encrypted Token Active</span>
            </div>
          </Card>

          {/* Quick Enquiries Preview */}
          <div className="p-4 rounded-xl bg-carbon border border-hairline font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-silver-dark uppercase font-bold">RECENT INBOUND MESSAGES</span>
              <Link href="/admin/enquiries" className="text-cyan-accent hover:underline">
                Open Inbox →
              </Link>
            </div>
            <div className="text-silver-mid text-[11px]">
              <span className="text-white font-bold">Client Ingestion:</span> &ldquo;Interested in MapUp fleet telemetry integration...&rdquo;
            </div>
            <div className="text-[10px] text-silver-dark">
              Status: <span className="text-amber-400 font-bold">UNREAD</span> • 2 hours ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
