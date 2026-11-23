"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/data/site-config";
import { experienceData } from "@/content/data/experience";
import { skillsData } from "@/content/data/skills";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { playTactileClick } from "@/lib/sound";
import { useAppStore } from "@/store/use-app-store";
import {
  Download,
  ExternalLink,
  FileText,
  Copy,
  Check,
  ArrowLeft,
  Maximize2,
  Minimize2,
  FileCheck,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  HardDrive,
  Eye,
  FileCode2,
} from "lucide-react";

const PDF_URL = "/resume/Mohan_N_V_Resume.pdf";
const PDF_FILENAME = "Mohan_N_V_Resume.pdf";

export function ResumeView() {
  const { soundEnabled } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<"pdf" | "transcript">("pdf");
  const viewerContainerRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = () => {
    if (soundEnabled) playTactileClick();
    const fullUrl = `${window.location.origin}${PDF_URL}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const toggleFullscreen = () => {
    if (soundEnabled) playTactileClick();
    if (!viewerContainerRef.current) return;

    if (!document.fullscreenElement) {
      viewerContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* 1. TOP BREADCRUMB & BACK NAVIGATION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <Link
          href="/"
          onClick={() => soundEnabled && playTactileClick()}
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="cyan" dot className="text-[10px] uppercase font-mono">
            VERIFIED OFFICIAL RESUME
          </Badge>
          <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
            // UPDATED NOV 2026
          </span>
        </div>
      </div>

      {/* 2. PROFESSIONAL IDENTITY & INTRODUCTION HEADER */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest">
                CURRICULUM VITAE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono text-muted-foreground">
                Active Software Developer
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-foreground">
              {siteConfig.name}
            </h1>

            <p className="text-sm sm:text-base font-mono text-primary font-medium">
              Software Developer | Full-Stack Developer
            </p>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
              &quot;Maximizing efficiency through smart work and technical expertise by leveraging technology to streamline workflows, meet goals faster, and deliver impactful, resource-conscious solutions.&quot;
            </p>

            {/* Quick Contact & Metadata Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-muted-foreground">
              <a
                href={`mailto:${siteConfig.socials.email}`}
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>{siteConfig.socials.email}</span>
              </a>
              <span>•</span>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>{siteConfig.phone}</span>
              </a>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>{siteConfig.location.city}, {siteConfig.location.country}</span>
              </span>
            </div>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <a
              href={PDF_URL}
              download={PDF_FILENAME}
              onClick={() => soundEnabled && playTactileClick()}
              className="w-full"
            >
              <Button variant="primary" size="md" className="w-full gap-2 shadow-md">
                <Download className="w-4 h-4 text-primary-foreground" />
                <span>Download Resume</span>
              </Button>
            </a>

            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEnabled && playTactileClick()}
              className="w-full"
            >
              <Button variant="outline" size="md" className="w-full gap-2">
                <ExternalLink className="w-4 h-4 text-primary" />
                <span>Open in New Tab</span>
              </Button>
            </a>

            <Button
              variant="outline"
              size="md"
              onClick={handleCopyLink}
              className="gap-2 text-xs font-mono"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-muted-foreground" />
                  <span>Copy Direct URL</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* 3. PDF FILE INFORMATION CARD */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card hasDatumCorners className="p-3.5 sm:p-4 bg-surface border-border flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">File Name</span>
            <FileText className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="font-mono text-xs sm:text-sm font-semibold text-foreground truncate" title={PDF_FILENAME}>
            {PDF_FILENAME}
          </div>
        </Card>

        <Card hasDatumCorners className="p-3.5 sm:p-4 bg-surface border-border flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">File Size</span>
            <HardDrive className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="font-mono text-xs sm:text-sm font-semibold text-foreground">
            202.6 KB
          </div>
        </Card>

        <Card hasDatumCorners className="p-3.5 sm:p-4 bg-surface border-border flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">Format</span>
            <FileCode2 className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="font-mono text-xs sm:text-sm font-semibold text-foreground">
            PDF 1.7 (Portable Doc)
          </div>
        </Card>

        <Card hasDatumCorners className="p-3.5 sm:p-4 bg-surface border-border flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">Verified State</span>
            <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="font-mono text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            Authoritative Upload
          </div>
        </Card>
      </div>

      {/* 4. VIEW MODE SELECTOR (EMBEDDED PDF VS STRUCTURED TRANSCRIPT) */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (soundEnabled) playTactileClick();
              setActiveTab("pdf");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "pdf"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-surface text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive PDF Viewer</span>
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playTactileClick();
              setActiveTab("transcript");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "transcript"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-surface text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Structured Web Resume</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          {activeTab === "pdf" && (
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-secondary border border-border transition-colors cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* 5. EMBEDDED NATIVE PDF VIEWER */}
      {activeTab === "pdf" ? (
        <div
          ref={viewerContainerRef}
          className={`flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-2xl transition-all ${
            isFullscreen ? "fixed inset-0 z-50 rounded-none border-0" : "w-full"
          }`}
        >
          {/* Viewer Toolbar */}
          <div className="px-4 py-2.5 bg-surface-secondary/70 dark:bg-carbon border-b border-border flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-semibold text-foreground truncate">
                {PDF_FILENAME}
              </span>
              <span className="text-muted-foreground text-[10px] hidden sm:inline">
                • Native PDF Viewer
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEnabled && playTactileClick()}
                className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-surface transition-colors flex items-center gap-1"
                title="Open in new browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden md:inline text-[11px]">New Tab</span>
              </a>

              <a
                href={PDF_URL}
                download={PDF_FILENAME}
                onClick={() => soundEnabled && playTactileClick()}
                className="p-1.5 rounded text-primary hover:text-primary-hover hover:bg-primary/10 transition-colors flex items-center gap-1"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden md:inline text-[11px] font-semibold">Download</span>
              </a>

              {isFullscreen && (
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                  aria-label="Exit Fullscreen"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Embedded Native PDF Viewer Frame */}
          <div className="relative w-full h-[650px] sm:h-[850px] lg:h-[950px] bg-slate-950/5 dark:bg-black/40">
            <object
              data={`${PDF_URL}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
              type="application/pdf"
              className="w-full h-full"
            >
              {/* Fallback for browsers or devices without native PDF embedding support */}
              <div className="flex flex-col items-center justify-center p-8 text-center h-full space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <FileText className="w-8 h-8 animate-pulse" />
                </div>
                <div className="max-w-md space-y-1">
                  <h3 className="font-display font-bold text-base text-foreground">
                    Native PDF Preview
                  </h3>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    Your current browser or mobile viewport does not support embedded inline PDF rendering. You can view the document directly in a full viewer tab or download it.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary" size="sm" className="gap-2">
                      <ExternalLink className="w-3.5 h-3.5 text-primary-foreground" />
                      <span>Open Full PDF in New Tab</span>
                    </Button>
                  </a>
                  <a
                    href={PDF_URL}
                    download={PDF_FILENAME}
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-3.5 h-3.5 text-primary" />
                      <span>Download PDF</span>
                    </Button>
                  </a>
                </div>
              </div>
            </object>
          </div>
        </div>
      ) : (
        /* 6. STRUCTURED WEB RESUME SHEET */
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-12 space-y-10 shadow-card">
          {/* Identity & Header */}
          <div className="border-b border-border pb-8">
            <h2 className="font-display text-3xl font-bold uppercase text-foreground tracking-tight">
              {siteConfig.name}
            </h2>
            <div className="text-sm font-mono text-primary font-semibold mt-1">
              Software Developer | Full-Stack Developer
            </div>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed max-w-2xl">
              Maximizing efficiency through smart work and technical expertise by leveraging technology to streamline workflows, meet goals faster, and deliver impactful, resource-conscious solutions.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
              <span>{siteConfig.socials.email}</span>
              <span>•</span>
              <span>{siteConfig.phone}</span>
              <span>•</span>
              <span>{siteConfig.location.city}, {siteConfig.location.country}</span>
              <span>•</span>
              <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                GitHub: github.com/mohan371
              </a>
              <span>•</span>
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Professional Experience */}
          <section>
            <h3 className="font-mono text-xs text-primary uppercase tracking-widest mb-4 font-bold">
              01 // PROFESSIONAL EXPERIENCE
            </h3>
            <div className="space-y-8">
              {experienceData.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-1 pb-6 border-b border-border last:border-b-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-foreground font-bold text-base">
                    <span>{exp.role}</span>
                    <span className="text-xs font-mono text-muted-foreground">{exp.period}</span>
                  </div>
                  <div className="text-xs font-mono text-primary font-medium">
                    {exp.company} • {exp.location}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed font-light">
                    {exp.description}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section className="border-t border-border pt-8">
            <h3 className="font-mono text-xs text-primary uppercase tracking-widest mb-4 font-bold">
              02 // EDUCATION &amp; ACADEMICS
            </h3>
            <div className="space-y-6">
              {siteConfig.education.map((edu) => (
                <div key={edu.id} className="flex flex-col gap-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-foreground font-bold text-base">
                    <span>{edu.degree}</span>
                    <span className="text-xs font-mono text-primary font-semibold">{edu.grade} ({edu.year})</span>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    {edu.institution} • {edu.university}
                  </div>
                  <ul className="mt-2 space-y-1">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="border-t border-border pt-8">
            <h3 className="font-mono text-xs text-primary uppercase tracking-widest mb-4 font-bold">
              03 // TECHNICAL EXPERTISE
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              {skillsData.map((cat) => (
                <div key={cat.title} className="p-3.5 rounded-xl bg-surface border border-border">
                  <span className="text-muted-foreground uppercase text-[10px] font-semibold">{cat.title}:</span>
                  <div className="text-foreground font-medium mt-1">
                    {cat.skills.map((s) => s.name).join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* 7. FOOTER CALL-TO-ACTION */}
      <div className="p-6 rounded-2xl border border-border bg-surface-secondary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-display font-bold text-base text-foreground">
            Looking to Discuss an Engineering Opportunity?
          </h4>
          <p className="text-xs text-muted-foreground font-light mt-0.5">
            Available for high-impact software engineering roles and production web/systems architecture.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/contact" onClick={() => soundEnabled && playTactileClick()}>
            <Button variant="primary" size="sm">
              Initiate Contact
            </Button>
          </Link>
          <a href={`mailto:${siteConfig.socials.email}`}>
            <Button variant="outline" size="sm">
              Send Email
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
