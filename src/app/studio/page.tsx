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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-hairline">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="cyan" dot className="font-mono text-xs uppercase tracking-wider">
                SOFTWARE STUDIO PLATFORM
              </Badge>
              <span className="text-xs font-mono text-silver-dark">
                // FOUNDED &amp; LED BY MOHAN N.V.
              </span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight uppercase leading-none">
              {studioConfig.name}
            </h1>
            <p className="text-lg sm:text-xl font-display text-silver-light mt-3 leading-snug">
              {studioConfig.tagline}
            </p>
            <p className="text-xs sm:text-sm text-silver-mid font-light leading-relaxed mt-4 max-w-2xl">
              {studioConfig.mission} Mohan N.V. operates as principal architect and lead software engineer on every client engagement, ensuring enterprise rigor, strict type safety, and zero bloat.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a href="#client-enquiry">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto gap-2 font-mono text-xs font-bold bg-cyan-400 text-obsidian hover:bg-cyan-300"
              >
                <span>INITIATE PROJECT ENQUIRY</span>
                <ArrowRight className="w-4 h-4" />
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
          <div className="p-4 rounded-xl bg-surface-1 border border-hairline font-mono text-xs">
            <span className="text-silver-dark uppercase text-[10px] block mb-1">CODE DISCIPLINE</span>
            <span className="text-white font-bold text-sm">100% Strict TypeScript</span>
            <span className="text-silver-dark text-[10px] block mt-0.5">Zod validation boundaries</span>
          </div>

          <div className="p-4 rounded-xl bg-surface-1 border border-hairline font-mono text-xs">
            <span className="text-silver-dark uppercase text-[10px] block mb-1">PERFORMANCE TARGET</span>
            <span className="text-cyan-accent font-bold text-sm">Sub-100ms TTFB</span>
            <span className="text-silver-dark text-[10px] block mt-0.5">Next.js Server Components</span>
          </div>

          <div className="p-4 rounded-xl bg-surface-1 border border-hairline font-mono text-xs">
            <span className="text-silver-dark uppercase text-[10px] block mb-1">DATABASE ARCHITECTURE</span>
            <span className="text-emerald-accent font-bold text-sm">ACID Guaranteed</span>
            <span className="text-silver-dark text-[10px] block mt-0.5">PostgreSQL &amp; PostGIS</span>
          </div>

          <div className="p-4 rounded-xl bg-surface-1 border border-hairline font-mono text-xs">
            <span className="text-silver-dark uppercase text-[10px] block mb-1">INTELLECTUAL PROPERTY</span>
            <span className="text-white font-bold text-sm">100% Code Ownership</span>
            <span className="text-silver-dark text-[10px] block mt-0.5">Zero proprietary lock-in</span>
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
            <Card key={pillar.number} hasDatumCorners className="p-6 bg-obsidian border-hairline flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-cyan-accent font-bold">
                    // {pillar.number}
                  </span>
                  {pillar.iconName === "ShieldCheck" && <ShieldCheck className="w-4 h-4 text-cyan-accent" />}
                  {pillar.iconName === "Database" && <Database className="w-4 h-4 text-emerald-accent" />}
                  {pillar.iconName === "Zap" && <Zap className="w-4 h-4 text-amber-accent" />}
                  {pillar.iconName === "GitBranch" && <GitBranch className="w-4 h-4 text-violet-accent" />}
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-1">
                  {pillar.title}
                </h3>
                <div className="text-[11px] font-mono text-silver-dark mb-3">
                  {pillar.principle}
                </div>
                <p className="text-xs text-silver-mid font-light leading-relaxed">
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
              className={`p-6 flex flex-col justify-between transition-all group ${
                service.featured ? "bg-surface-1 border-cyan-500/40" : "bg-obsidian border-hairline"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-cyan-accent font-bold">SERVICE // 0{idx + 1}</span>
                  {service.featured && <Badge variant="cyan" dot className="text-[9px]">Featured</Badge>}
                </div>

                <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-accent transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-silver-mid font-light leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-hairline">
                  <span className="text-[10px] font-mono text-silver-dark uppercase block mb-1">
                    KEY DELIVERABLES:
                  </span>
                  {service.deliverables.map((d, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] font-mono text-silver-light">
                      <span className="text-cyan-accent mt-0.5">›</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between">
                <span className="text-[10px] font-mono text-silver-dark">
                  Delivery: <strong className="text-white">{service.estimatedDelivery}</strong>
                </span>

                <a
                  href="#client-enquiry"
                  className="text-xs font-mono text-cyan-accent hover:underline flex items-center gap-0.5"
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
            { name: "Next.js 16", role: "SSR & App Router", color: "text-white" },
            { name: "React 19", role: "Server Components", color: "text-cyan-accent" },
            { name: "Go (Golang)", role: "High Concurrency", color: "text-cyan-accent" },
            { name: "Java 17+", role: "Enterprise Logic", color: "text-amber-accent" },
            { name: "PostgreSQL 16", role: "ACID Relational", color: "text-emerald-accent" },
            { name: "TypeScript", role: "Strict Type Safety", color: "text-cyan-accent" },
            { name: "Docker", role: "Containerization", color: "text-white" },
            { name: "WebSockets", role: "Real-Time Telemetry", color: "text-cyan-accent" },
            { name: "Tailwind CSS", role: "Design Tokens", color: "text-white" },
            { name: "Node.js", role: "Event Runtime", color: "text-emerald-accent" },
            { name: "MySQL", role: "Relational Modeling", color: "text-white" },
            { name: "MongoDB", role: "Flexible Documents", color: "text-white" },
          ].map((tech) => (
            <div
              key={tech.name}
              className="p-3.5 rounded-xl bg-surface-1 border border-hairline flex flex-col justify-between hover:border-silver-dark/60 transition-colors"
            >
              <span className={`font-bold text-sm ${tech.color}`}>{tech.name}</span>
              <span className="text-[10px] text-silver-dark mt-2">{tech.role}</span>
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
            <Card key={proc.step} hasDatumCorners className="p-5 bg-obsidian border-hairline flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="w-7 h-7 rounded-lg bg-carbon border border-hairline flex items-center justify-center font-bold text-cyan-accent">
                    {proc.step}
                  </span>
                  <Badge variant="violet" className="text-[10px]">{proc.timeline}</Badge>
                </div>

                <h4 className="font-display font-bold text-base text-white mb-2">
                  {proc.title}
                </h4>
                <p className="text-xs text-silver-mid font-light leading-relaxed mb-4">
                  {proc.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-hairline space-y-1">
                <span className="text-[9px] font-mono text-silver-dark uppercase block">OUTPUTS:</span>
                {proc.outputs.map((out, i) => (
                  <div key={i} className="text-[10px] font-mono text-silver-light">
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
            <Card key={project.id} hasDatumCorners className="p-6 bg-surface-1 border-hairline flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-cyan-accent font-bold">{project.category}</span>
                  <Badge variant="cyan" dot>{project.status}</Badge>
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-silver-mid font-light leading-relaxed mb-4">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-carbon border border-hairline text-silver-light">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-hairline flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-xs font-mono text-cyan-accent hover:underline flex items-center gap-1 font-bold"
                >
                  Inspect Case Study <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-silver-dark hover:text-white flex items-center gap-1"
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
        <Card hasDatumCorners className="p-8 sm:p-12 bg-obsidian border-hairline">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <Badge variant="cyan" dot className="font-mono text-xs uppercase">
                STUDIO HEADQUARTERS
              </Badge>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
                Direct Engineering Collaboration
              </h2>
              <p className="text-xs sm:text-sm text-silver-mid font-light leading-relaxed max-w-xl">
                Operating out of the Hosur / Bangalore industrial corridor, we collaborate with clients across India, Southeast Asia, Europe, and the Americas. Let&apos;s build something extraordinary.
              </p>

              <div className="flex flex-wrap gap-6 pt-2 font-mono text-xs">
                <div className="flex items-center gap-2 text-silver-light">
                  <MapPin className="w-4 h-4 text-cyan-accent" />
                  <span>Hosur / Bangalore (12.7409° N, 77.8253° E)</span>
                </div>
                <div className="flex items-center gap-2 text-silver-light">
                  <Mail className="w-4 h-4 text-cyan-accent" />
                  <a href={`mailto:${studioConfig.contact.email}`} className="text-cyan-accent hover:underline">
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
                  className="w-full font-mono text-xs font-bold bg-cyan-400 text-obsidian hover:bg-cyan-300"
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
