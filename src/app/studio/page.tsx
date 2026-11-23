import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/data/site-config";
import { projectsData } from "@/content/data/projects";
import {
  studioConfig,
  studioPhilosophy,
  studioServices,
  studioProcess,
} from "@/content/data/studio";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StudioEnquiryForm } from "@/components/studio/StudioEnquiryForm";
import { StudioFaqAccordion } from "@/components/studio/StudioFaqAccordion";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Database,
  GitBranch,
  Cpu,
  Layers,
  Code2,
  Terminal,
  CheckCircle2,
  Clock,
  Building,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Software Development Studio // Nexora Engineering",
  description:
    "Bespoke digital product and software engineering studio founded by Mohan N.V. Delivering full-stack web applications, Go/Java microservices, and high-performance websites.",
};

export default function StudioPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-24">
      {/* =========================================================================
          SECTION 1: STUDIO INTRODUCTION & BRAND POSITIONING
         ========================================================================= */}
      <section className="relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-border">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="cyan" dot className="font-mono text-xs uppercase tracking-wider">
                SOFTWARE STUDIO PLATFORM
              </Badge>
              <span className="text-xs font-mono text-muted-foreground font-medium">
                // FOUNDED &amp; LED BY MOHAN N.V.
              </span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl text-foreground tracking-tight uppercase leading-none">
              {studioConfig.name}
            </h1>
            <p className="text-lg sm:text-xl font-display text-foreground/90 mt-3 leading-snug">
              {studioConfig.tagline}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mt-4 max-w-2xl">
              {studioConfig.mission} Mohan N.V. operates as principal architect and lead software engineer on every client engagement, ensuring enterprise rigor, strict type safety, and zero bloat.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a href="#client-enquiry">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto gap-2 font-mono text-xs font-bold shadow-md"
              >
                <span>INITIATE PROJECT ENQUIRY</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
            <a href="#services">
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-mono text-xs">
                EXPLORE 8 SERVICES
              </Button>
            </a>
          </div>
        </div>

        {/* 4 Studio Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="p-4 rounded-xl bg-surface border border-border font-mono text-xs shadow-xs">
            <span className="text-muted-foreground uppercase text-[10px] block mb-1">CODE DISCIPLINE</span>
            <span className="text-foreground font-bold text-sm">100% Strict TypeScript</span>
            <span className="text-muted-foreground text-[10px] block mt-0.5">Zod validation boundaries</span>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-border font-mono text-xs shadow-xs">
            <span className="text-muted-foreground uppercase text-[10px] block mb-1">PERFORMANCE TARGET</span>
            <span className="text-primary font-bold text-sm">Sub-100ms TTFB</span>
            <span className="text-muted-foreground text-[10px] block mt-0.5">Next.js Server Components</span>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-border font-mono text-xs shadow-xs">
            <span className="text-muted-foreground uppercase text-[10px] block mb-1">DATABASE ARCHITECTURE</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">ACID Guaranteed</span>
            <span className="text-muted-foreground text-[10px] block mt-0.5">PostgreSQL &amp; PostGIS</span>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-border font-mono text-xs shadow-xs">
            <span className="text-muted-foreground uppercase text-[10px] block mb-1">INTELLECTUAL PROPERTY</span>
            <span className="text-foreground font-bold text-sm">100% Code Ownership</span>
            <span className="text-muted-foreground text-[10px] block mt-0.5">Zero proprietary lock-in</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: COMPANY PHILOSOPHY
         ========================================================================= */}
      <section>
        <SectionHeader
          index="01"
          tag="Core Principles"
          title="Engineering Philosophy &amp; Standards"
          description="We reject disposable code, framework churn, and bloated templates. Every software deliverable is architected to be maintainable, mathematically sound, and scalable."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studioPhilosophy.map((pillar) => (
            <Card key={pillar.number} hasDatumCorners className="p-6 bg-card border-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-primary font-bold">
                    // {pillar.number}
                  </span>
                  {pillar.iconName === "ShieldCheck" && <ShieldCheck className="w-4 h-4 text-primary" />}
                  {pillar.iconName === "Database" && <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                  {pillar.iconName === "Zap" && <Zap className="w-4 h-4 text-amber-500" />}
                  {pillar.iconName === "GitBranch" && <GitBranch className="w-4 h-4 text-indigo-500" />}
                </div>

                <h3 className="font-display font-bold text-lg text-foreground mb-1">
                  {pillar.title}
                </h3>
                <div className="text-[11px] font-mono text-muted-foreground mb-3 font-medium">
                  {pillar.principle}
                </div>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: 8 INITIAL SERVICES
         ========================================================================= */}
      <section id="services">
        <SectionHeader
          index="02"
          tag="Engineering Offerings"
          title="Client Services &amp; Capabilities"
          description="From high-speed static corporate sites to full-stack distributed web applications, explore our 8 core development offerings."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studioServices.map((service, idx) => (
            <Card
              key={service.id}
              hasDatumCorners
              className={`p-6 flex flex-col justify-between transition-all group shadow-subtle ${
                service.featured ? "bg-surface border-primary/40 ring-1 ring-primary/20" : "bg-card border-border"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-primary font-bold">SERVICE // 0{idx + 1}</span>
                  {service.featured && <Badge variant="cyan" dot className="text-[9px]">Featured</Badge>}
                </div>

                <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-border">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase block mb-1 font-medium">
                    KEY DELIVERABLES:
                  </span>
                  {service.deliverables.map((d, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] font-mono text-foreground/80">
                      <span className="text-primary mt-0.5">›</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted-foreground">
                  Delivery: <strong className="text-foreground">{service.estimatedDelivery}</strong>
                </span>

                <a
                  href="#client-enquiry"
                  className="text-xs font-mono text-primary font-bold hover:underline flex items-center gap-0.5"
                >
                  Select <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: VERIFIED TECHNOLOGIES
         ========================================================================= */}
      <section>
        <SectionHeader
          index="03"
          tag="Technical Foundation"
          title="Battle-Tested Stack"
          description="We select programming languages, databases, and frameworks based on real-world stability, memory safety, and long-term maintainability."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
          {[
            { name: "Next.js 16", role: "SSR & App Router", color: "text-foreground" },
            { name: "React 19", role: "Server Components", color: "text-primary" },
            { name: "Go (Golang)", role: "High Concurrency", color: "text-primary" },
            { name: "Java 17+", role: "Enterprise Logic", color: "text-amber-600 dark:text-amber-400" },
            { name: "PostgreSQL 16", role: "ACID Relational", color: "text-emerald-600 dark:text-emerald-400" },
            { name: "TypeScript", role: "Strict Type Safety", color: "text-primary" },
            { name: "Docker", role: "Containerization", color: "text-foreground" },
            { name: "WebSockets", role: "Real-Time Telemetry", color: "text-primary" },
            { name: "Tailwind CSS", role: "Design Tokens", color: "text-foreground" },
            { name: "Node.js", role: "Event Runtime", color: "text-emerald-600 dark:text-emerald-400" },
            { name: "MySQL", role: "Relational Modeling", color: "text-foreground" },
            { name: "MongoDB", role: "Flexible Documents", color: "text-foreground" },
          ].map((tech) => (
            <div
              key={tech.name}
              className="p-3.5 rounded-xl bg-card border border-border shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/20 transition-colors"
            >
              <span className={`font-bold text-sm ${tech.color}`}>{tech.name}</span>
              <span className="text-[10px] text-muted-foreground mt-2">{tech.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: 5-PHASE DEVELOPMENT PROCESS
         ========================================================================= */}
      <section>
        <SectionHeader
          index="04"
          tag="Engineering Methodology"
          title="How We Build &amp; Deliver"
          description="Our structured 5-phase delivery process takes you from initial requirements discovery to a deployed, tested, and secure production platform."
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {studioProcess.map((proc) => (
            <Card key={proc.step} hasDatumCorners className="p-5 bg-card border-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="w-7 h-7 rounded-lg bg-surface-secondary border border-border flex items-center justify-center font-bold text-primary">
                    {proc.step}
                  </span>
                  <Badge variant="violet" className="text-[10px]">{proc.timeline}</Badge>
                </div>

                <h4 className="font-display font-bold text-base text-foreground mb-2">
                  {proc.title}
                </h4>
                <p className="text-xs text-muted-foreground font-light leading-relaxed mb-4">
                  {proc.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-border space-y-1">
                <span className="text-[9px] font-mono text-muted-foreground uppercase block font-medium">OUTPUTS:</span>
                {proc.outputs.map((out, i) => (
                  <div key={i} className="text-[10px] font-mono text-foreground/80">
                    • {out}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: SELECTED WORK (AUTHENTIC IMPLEMENTATIONS ONLY)
         ========================================================================= */}
      <section>
        <SectionHeader
          index="05"
          tag="Verified Implementations"
          title="Selected Software Products"
          description="Inspect verified software systems architected and engineered by Mohan N.V., including real-time spatial telematic engines and educational platforms."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project) => (
            <Card key={project.id} hasDatumCorners className="p-6 bg-card border-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-primary font-bold">{project.category}</span>
                  <Badge variant="cyan" dot>{project.status}</Badge>
                </div>

                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed mb-4">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-secondary border border-border text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-xs font-mono text-primary hover:underline flex items-center gap-1 font-bold"
                >
                  Inspect Case Study <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    Repository <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: CLIENT ENQUIRY FORM (SERVER-SIDE VALIDATED & SECURE)
         ========================================================================= */}
      <section id="client-enquiry">
        <SectionHeader
          index="06"
          tag="Initiate Project"
          title="Client Project Intake &amp; Consultation"
          description="Provide details about your project scope, target timeline, and budget. Mohan N.V. will review your specification and transmit an architectural proposal within 24 hours."
        />

        <StudioEnquiryForm />
      </section>

      {/* =========================================================================
          SECTION 8: FREQUENTLY ASKED QUESTIONS
         ========================================================================= */}
      <section>
        <SectionHeader
          index="07"
          tag="Clarity &amp; Transparency"
          title="Frequently Asked Questions"
          description="Everything you need to know about working with our studio, IP ownership, technology selection, and payment terms."
        />

        <StudioFaqAccordion />
      </section>

      {/* =========================================================================
          SECTION 9: CONTACT & STUDIO HEADQUARTERS
         ========================================================================= */}
      <section>
        <Card hasDatumCorners className="p-8 sm:p-12 bg-surface border-border shadow-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <Badge variant="cyan" dot className="font-mono text-xs uppercase">
                STUDIO HEADQUARTERS
              </Badge>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-foreground">
                Direct Engineering Collaboration
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed max-w-xl">
                Operating out of the Hosur / Bangalore industrial corridor, we collaborate with clients across India, Southeast Asia, Europe, and the Americas. Let&apos;s build something extraordinary.
              </p>

              <div className="flex flex-wrap gap-6 pt-2 font-mono text-xs">
                <div className="flex items-center gap-2 text-foreground/90">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Hosur / Bangalore (12.7409° N, 77.8253° E)</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/90">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href={`mailto:${studioConfig.contact.email}`} className="text-primary hover:underline font-semibold">
                    {studioConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <a href="#client-enquiry">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full font-mono text-xs font-bold shadow-md"
                >
                  START A CONVERSATION
                </Button>
              </a>

              <Link href="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full font-mono text-xs"
                >
                  ← Return to Mohan N.V. Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
