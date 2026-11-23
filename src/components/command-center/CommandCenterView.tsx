"use client";

import React, { useState } from "react";
import { CommandCenterData, BuildingProject, ExploringTech, GitHubRepo } from "@/types/command-center";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { playTactileClick } from "@/lib/sound";
import {
  Activity,
  GitBranch,
  FolderGit2,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Terminal,
  Compass,
  ArrowUpRight,
  Radio,
} from "lucide-react";

interface CommandCenterViewProps {
  initialData: CommandCenterData;
}

export function CommandCenterView({ initialData }: CommandCenterViewProps) {
  const [data] = useState<CommandCenterData>(initialData);
  const [activeTab, setActiveTab] = useState<"all" | "building" | "github" | "dispatches">("all");

  return (
    <div className="space-y-12">
      {/* Telemetry Status Banner */}
      <Card hasDatumCorners className="p-6 sm:p-8 bg-card border-border shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="cyan" dot className="font-mono text-xs uppercase tracking-wider">
                ACTIVE TELEMETRY
              </Badge>
              <span className="text-xs font-mono text-muted-foreground">
                // COMMAND CENTER STATUS
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-foreground tracking-tight">
              {data.role} @ {data.company}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-2xl leading-relaxed">
              Real-time snapshot of what Mohan N.V. is actively engineering, evaluating in R&amp;D, and committing to open-source repositories.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-secondary/70 border border-border font-mono text-xs space-y-2 shrink-0">
            <div className="flex items-center gap-2 text-foreground font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CURRENT STATUS</span>
            </div>
            <div className="text-[11px] text-muted-foreground">
              {data.status}
            </div>
            <div className="text-[10px] text-muted-foreground pt-1 border-t border-border">
              Location: <strong className="text-foreground">{data.location}</strong>
            </div>
          </div>
        </div>

        {/* 4 Rapid Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-surface border border-border shadow-xs">
            <span className="text-[10px] text-muted-foreground uppercase block mb-1">ACTIVE BUILDS</span>
            <span className="font-display font-bold text-xl text-primary">{data.currentlyBuilding.length} Pipelines</span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">In active development</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface border border-border shadow-xs">
            <span className="text-[10px] text-muted-foreground uppercase block mb-1">R&amp;D EVALUATION</span>
            <span className="font-display font-bold text-xl text-indigo-600 dark:text-indigo-400">{data.currentlyExploring.length} Technologies</span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">Systems &amp; eBPF</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface border border-border shadow-xs">
            <span className="text-[10px] text-muted-foreground uppercase block mb-1">GITHUB REPOSITORIES</span>
            <span className="font-display font-bold text-xl text-emerald-600 dark:text-emerald-400">{data.githubProfile.publicRepos} Public Repos</span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">github.com/mohan371</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface border border-border shadow-xs">
            <span className="text-[10px] text-muted-foreground uppercase block mb-1">DISPATCHES</span>
            <span className="font-display font-bold text-xl text-foreground">{data.engineeringDispatches.length} Field Notes</span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">Latest: {data.lastUpdated}</span>
          </div>
        </div>
      </Card>

      {/* SECTION 1: CURRENTLY BUILDING */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-xl text-foreground">
              Currently Building // Active Pipelines
            </h3>
          </div>
          <Badge variant="cyan" dot className="text-[10px] font-mono">
            {data.currentlyBuilding.length} ACTIVE
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.currentlyBuilding.map((proj) => (
            <Card
              key={proj.id}
              hasDatumCorners
              className="p-6 bg-card border-border shadow-subtle flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] uppercase text-primary font-bold">{proj.category}</span>
                  <span className="font-bold text-foreground">{proj.progressPercent}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-surface-secondary overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${proj.progressPercent}%` }}
                  />
                </div>

                <h4 className="font-display font-bold text-lg text-foreground">
                  {proj.title}
                </h4>

                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border flex flex-wrap gap-1.5">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-surface-secondary text-[10px] font-mono text-muted-foreground border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 2: TECHNOLOGIES IN EXPLORATION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-display font-bold text-xl text-foreground">
              Technologies in Exploration &amp; R&amp;D
            </h3>
          </div>
          <Badge variant="violet" className="text-[10px] font-mono">
            BENCHMARKING
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.currentlyExploring.map((exp) => (
            <Card key={exp.id} hasDatumCorners className="p-6 bg-card border-border shadow-subtle space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <Badge variant="cyan" className="text-[9px]">
                  {exp.status}
                </Badge>
              </div>

              <h4 className="font-display font-bold text-base text-foreground">
                {exp.topic}
              </h4>

              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                {exp.purpose}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 3: PUBLIC GITHUB ACTIVITY */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border gap-2">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-display font-bold text-xl text-foreground">
              Public GitHub Activity // @mohan371
            </h3>
          </div>

          <a
            href={data.githubProfile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-primary hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.recentRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <Card
                hasDatumCorners
                className="p-5 bg-card border-border shadow-subtle group-hover:border-primary/50 transition-all flex flex-col justify-between h-full space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 text-xs font-mono">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-secondary text-primary font-semibold border border-border">
                      {repo.language}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  <h5 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                    {repo.name}
                  </h5>

                  <p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2 mt-1">
                    {repo.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                  <span>Updated: {repo.updatedAt}</span>
                  <span>{repo.stars} ★</span>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 4: ENGINEERING DISPATCHES & FIELD NOTES */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-xl text-foreground">
              Engineering Dispatches &amp; Field Notes
            </h3>
          </div>
          <Badge variant="cyan" dot className="text-[10px] font-mono">
            VERIFIED LOGS
          </Badge>
        </div>

        <div className="space-y-3">
          {data.engineeringDispatches.map((disp) => (
            <Card key={disp.id} hasDatumCorners className="p-4 sm:p-5 bg-card border-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 sm:max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <Badge variant="violet" className="text-[9px] py-0">
                    {disp.tag}
                  </Badge>
                  <span className="text-primary font-semibold">// {disp.scope}</span>
                  <span className="text-muted-foreground">• {disp.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-foreground/90 font-light leading-relaxed">
                  {disp.note}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Verified in Production</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
