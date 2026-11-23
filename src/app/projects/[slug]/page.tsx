import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects, getRelatedProjects } from "@/lib/data/projects";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { InteractiveTiltCard } from "@/components/creative/InteractiveTiltCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { GithubIcon } from "@/components/ui/icons";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Calendar,
  Layers,
} from "lucide-react";

interface ProjectDetailsProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(slug, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Back to Archive */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Projects Catalog
      </Link>

      {/* Header Metadata */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Badge variant="cyan" dot>
          {project.category}
        </Badge>
        <Badge variant={project.status === "Completed" ? "emerald" : "outline"}>
          {project.status.toUpperCase()}
        </Badge>
        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
          <Calendar className="w-3 h-3 text-muted-foreground" />
          {project.startDate} — {project.completionDate}
        </span>
      </div>

      <h1 className="font-display text-3xl sm:text-5xl font-bold uppercase text-foreground tracking-tight leading-tight">
        {project.title}
      </h1>

      <p className="mt-4 text-base sm:text-xl text-muted-foreground font-light leading-relaxed">
        {project.shortDescription}
      </p>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3 pb-8 border-b border-border">
        {project.liveDemoUrl && (
          <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="md">
              Launch Live Demo / Artifact
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Button>
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="md">
              <GithubIcon className="w-3.5 h-3.5 mr-1" />
              Source Code Repository
            </Button>
          </a>
        )}
      </div>

      {/* Main Narrative Stack */}
      <div className="mt-12 space-y-12 text-muted-foreground font-light leading-relaxed">
        {/* Project Detailed Overview */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-foreground text-2xl uppercase tracking-tight flex items-center gap-2">
            <span className="text-primary font-mono text-xs font-semibold">[ 01 ]</span>
            Project Overview
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
            {project.detailedDescription}
          </p>
        </section>

        {/* The Problem Statement */}
        <section className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-subtle corner-datum space-y-3">
          <h2 className="font-display font-bold text-foreground text-xl uppercase tracking-tight flex items-center gap-2">
            <span className="text-primary font-mono text-xs font-semibold">[ 02 ]</span>
            The Problem Statement
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.problemStatement}
          </p>
        </section>

        {/* The Architectural Solution */}
        <section className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-subtle corner-datum space-y-3">
          <h2 className="font-display font-bold text-foreground text-xl uppercase tracking-tight flex items-center gap-2">
            <span className="text-primary font-mono text-xs font-semibold">[ 03 ]</span>
            Engineering Solution
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.solution}
          </p>
        </section>

        {/* Visual Architecture Diagram */}
        <section>
          <ArchitectureDiagram
            architecture={project.architecture}
            projectTitle={project.title}
          />
        </section>

        {/* Key Features */}
        <section className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-subtle corner-datum">
          <h2 className="font-display font-bold text-foreground text-xl uppercase tracking-tight mb-4 flex items-center gap-2">
            <span className="text-primary font-mono text-xs font-semibold">[ 04 ]</span>
            Key Technical Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.keyFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-foreground/90">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Engineering Challenges & Resolutions */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-foreground text-2xl uppercase tracking-tight flex items-center gap-2">
            <span className="text-primary font-mono text-xs font-semibold">[ 05 ]</span>
            Engineering Challenges &amp; Resolutions
          </h2>
          <div className="space-y-4">
            {project.engineeringChallenges.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-card border border-border shadow-subtle space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground font-display uppercase">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <span className="text-muted-foreground uppercase block text-[10px]">Challenge:</span>
                    <p className="text-muted-foreground font-light text-xs font-sans mt-0.5">{item.challenge}</p>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <span className="text-emerald-600 dark:text-emerald-400 uppercase block text-[10px] font-semibold">Engineering Resolution:</span>
                    <p className="text-foreground font-medium text-xs font-sans mt-0.5">{item.resolution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lessons Learned */}
        <section className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-subtle corner-datum space-y-3">
          <h2 className="font-display font-bold text-foreground text-xl uppercase tracking-tight flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span>Lessons Learned</span>
          </h2>
          <ul className="space-y-2 text-xs text-muted-foreground font-light">
            {project.lessonsLearned.map((lesson, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary font-mono font-bold">•</span>
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Project Visual Gallery */}
        <section>
          <ProjectGallery images={project.galleryImages} title={project.title} />
        </section>

        {/* Technologies Deployed */}
        <section className="pt-4 border-t border-border">
          <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">
            VERIFIED TECHNOLOGIES IN THIS PROJECT
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-full bg-surface-secondary border border-border text-xs font-mono text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* =========================================================================
          RELATED PROJECTS SECTION
          ========================================================================= */}
      {relatedProjects.length > 0 && (
        <section className="mt-20 pt-12 border-t border-border space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-primary font-semibold uppercase tracking-widest">
                RECOMMENDED CASE STUDIES
              </span>
              <h2 className="font-display text-2xl font-bold uppercase text-foreground tracking-tight mt-1">
                Related Engineering Work
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors font-semibold"
            >
              All Projects ({`->`})
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedProjects.map((rel) => (
              <Link key={rel.id} href={`/projects/${rel.slug}`} className="block group">
                <InteractiveTiltCard hasDatumCorners className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="cyan" dot>{rel.category}</Badge>
                      <span className="text-xs font-mono text-muted-foreground">
                        {rel.completionDate.split("-")[0]}
                      </span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors text-lg">
                      {rel.title}
                    </CardTitle>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2 font-light">
                      {rel.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </InteractiveTiltCard>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
