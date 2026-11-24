"use client";

import React from "react";
import { problemSolvingData } from "@/content/data/problem-solving";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { playTactileClick } from "@/lib/sound";
import { useAppStore } from "@/store/use-app-store";
import {
  ExternalLink,
  Flame,
  Calendar,
  Target,
  Code2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

function LeetCodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 9.355l4.316-4.624a1.374 1.374 0 0 0-.963-2.731zm-3.267 8.243a1.376 1.376 0 0 0-.97 2.35l3.86 3.86a1.377 1.377 0 1 0 1.947-1.948l-3.86-3.86a1.37 1.37 0 0 0-.977-.402z" />
    </svg>
  );
}

export function ProblemSolvingSection() {
  const { soundEnabled } = useAppStore();
  const data = problemSolvingData;

  const progressPercent = Math.min(
    100,
    Math.round((data.currentStreak / data.targetGoalDays) * 100)
  );

  return (
    <section id="problem-solving" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-border">
      {/* Editorial Section Header */}
      <SectionHeader
        index="04"
        tag="Problem-Solving Journey"
        title="100 Days of Code &amp; Algorithmic Discipline"
        description="A transparent, day-by-day record of disciplined algorithmic practice on LeetCode. Initiated on November 24, 2026 with a commitment to 100 days of consistent problem solving."
      />

      <div className="space-y-6">
        {/* Main Polished LeetCode Progress Card */}
        <Card hasDatumCorners className="p-6 sm:p-8 bg-card border-border shadow-card relative overflow-hidden">
          {/* Subtle Accent Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/[0.03] dark:bg-amber-400/[0.04] rounded-full blur-3xl pointer-events-none" />

          {/* Top Status & Platform Identity Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <LeetCodeIcon className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-lg text-foreground tracking-tight">
                    LeetCode Sprint // 100 Days
                  </h3>
                  <Badge variant="cyan" dot className="text-[10px] uppercase font-mono py-0">
                    {data.status}
                  </Badge>
                </div>
                <p className="text-xs font-mono text-muted-foreground mt-0.5">
                  Target: 100 Consecutive Days of Problem Solving
                </p>
              </div>
            </div>

            {/* Profile Link & Call to Action */}
            <div className="flex items-center gap-3">
              <a
                href={data.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEnabled && playTactileClick()}
                className="inline-flex items-center gap-2"
              >
                <Button variant="primary" size="sm" className="gap-2 shadow-xs">
                  <span>View LeetCode Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-primary-foreground" />
                </Button>
              </a>
            </div>
          </div>

          {/* Key Metrics Dashboard Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-b border-border">
            {/* Metric 1: Total Problems Solved */}
            <div className="p-4 rounded-xl bg-surface border border-border flex flex-col justify-between">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider">Problems Solved</span>
                <Code2 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                  {data.totalSolved}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground mt-1">
                  Verified Solutions
                </div>
              </div>
            </div>

            {/* Metric 2: Current Streak */}
            <div className="p-4 rounded-xl bg-surface border border-border flex flex-col justify-between">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider">Current Streak</span>
                <Flame className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-foreground flex items-baseline gap-1">
                  <span>{data.currentStreak}</span>
                  <span className="text-xs font-mono font-normal text-muted-foreground">days</span>
                </div>
                <div className="text-[11px] font-mono text-muted-foreground mt-1">
                  Active Streak
                </div>
              </div>
            </div>

            {/* Metric 3: Target Goal */}
            <div className="p-4 rounded-xl bg-surface border border-border flex flex-col justify-between">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider">Goal Progress</span>
                <Target className="w-4 h-4 text-cyan-500" />
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-foreground flex items-baseline gap-1">
                  <span>{data.currentDay}</span>
                  <span className="text-xs font-mono font-normal text-muted-foreground">/ {data.targetGoalDays}d</span>
                </div>
                <div className="text-[11px] font-mono text-muted-foreground mt-1">
                  {progressPercent}% Goal Reached
                </div>
              </div>
            </div>

            {/* Metric 4: Start Date */}
            <div className="p-4 rounded-xl bg-surface border border-border flex flex-col justify-between">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider">Journey Kickoff</span>
                <Calendar className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <div className="font-display text-lg sm:text-xl font-bold text-foreground">
                  {data.startDate}
                </div>
                <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Day 1 Active
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar towards 100-Day Target */}
          <div className="pt-6 pb-2 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground">100-Day Sprint Progress Tracker</span>
              <span className="font-semibold text-primary">{data.currentStreak} / {data.targetGoalDays} Days ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface border border-border overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(2, progressPercent)}%` }}
              />
            </div>
          </div>

          {/* Difficulty Distribution Breakdown */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-surface/60 border border-border">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold uppercase text-[11px]">
                  Easy Problems
                </span>
                <span className="font-mono font-bold text-foreground">{data.breakdown.easy}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-card border border-border overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: data.totalSolved > 0 ? `${(data.breakdown.easy / data.totalSolved) * 100}%` : "0%" }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface/60 border border-border">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase text-[11px]">
                  Medium Problems
                </span>
                <span className="font-mono font-bold text-foreground">{data.breakdown.medium}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-card border border-border overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: data.totalSolved > 0 ? `${(data.breakdown.medium / data.totalSolved) * 100}%` : "0%" }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface/60 border border-border">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-mono text-rose-600 dark:text-rose-400 font-semibold uppercase text-[11px]">
                  Hard Problems
                </span>
                <span className="font-mono font-bold text-foreground">{data.breakdown.hard}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-card border border-border overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{ width: data.totalSolved > 0 ? `${(data.breakdown.hard / data.totalSolved) * 100}%` : "0%" }}
                />
              </div>
            </div>
          </div>

          {/* Topic Roadmap Pillars */}
          <div className="pt-6 mt-6 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Algorithmic Topic Pillars
              </span>
              <span className="text-[11px] font-mono text-primary">
                Structured Practice
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.focusPillars.map((pillar) => (
                <div
                  key={pillar.name}
                  className="p-3 rounded-xl bg-surface border border-border flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-semibold text-xs text-foreground">
                      {pillar.name}
                    </span>
                    <Badge
                      variant={pillar.status === "Active" ? "cyan" : "outline"}
                      className="text-[9px] py-0 px-1.5"
                    >
                      {pillar.status}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Authenticity Pledge Banner */}
          <div className="mt-6 p-4 rounded-xl bg-surface-secondary/50 dark:bg-carbon/50 border border-border flex items-start gap-3 text-xs text-muted-foreground font-light leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground font-semibold">Authenticity Commitment: </strong>
              Zero fabricated ratings, problems, or simulated contest achievements. This tracker marks the start of a genuine 100-day daily problem-solving routine initiated on November 24, 2026. You can audit daily submissions directly on LeetCode at{" "}
              <a
                href={data.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-mono font-medium"
              >
                leetcode.com/u/{data.username}
              </a>
              .
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
