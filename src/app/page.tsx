import Link from "next/link";
import { siteConfig } from "@/content/data/site-config";
import { projectsData } from "@/content/data/projects";
import { skillsData } from "@/content/data/skills";
import { journalData } from "@/content/data/journal";
import { labData } from "@/content/data/lab";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { TextReveal } from "@/components/creative/TextReveal";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { MagneticButton } from "@/components/creative/MagneticButton";
import { MotionContainer, MotionItem } from "@/components/creative/MotionContainer";
import { InteractiveHeroCenterpiece } from "@/components/creative/InteractiveHeroCenterpiece";
import { SceneContainer } from "@/components/3d/SceneContainer";
import { InteractiveTiltCard } from "@/components/creative/InteractiveTiltCard";
import { AnimatedTimeline } from "@/components/creative/AnimatedTimeline";
import {
  ArrowUpRight,
  Download,
  Mail,
  MoveRight,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Code2,
  Database,
  Container,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Activity,
} from "lucide-react";

export default function Home() {
  const featuredProjects = projectsData.filter((p) => p.featured);
  const coreLanguages = ["Java", "JavaScript", "Go", "React", "Next.js", "Node.js", "Express.js", "REST APIs", "PostgreSQL", "MongoDB", "MySQL", "Docker", "Git"];

  return (
    <div className="relative min-h-screen">
      {/* Background Ambience & Atmospheric Grid */}
      <div className="fixed inset-0 bg-tech-grid opacity-30 pointer-events-none" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-500/[0.03] blur-[160px] pointer-events-none rounded-full" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[400px] bg-purple-500/[0.03] blur-[140px] pointer-events-none rounded-full" />

      {/* =========================================================================
          SECTION 1: HERO (CINEMATIC EDITORIAL TYPOGRAPHY, 3D CENTERPIECE)
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20 md:pt-14 md:pb-28 flex flex-col items-start">
        {/* Top Telemetry & Status Bar */}
        <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-hairline text-xs font-mono">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-hairline bg-carbon/80 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-accent shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="text-[11px] uppercase tracking-wider text-white font-medium">
              {siteConfig.availability.status}
            </span>
            <span className="text-silver-dark">//</span>
            <span className="text-[11px] text-silver-mid hidden sm:inline">
              Available for Full-Stack Roles & High-Impact Contracts
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-silver-dark text-[11px] tracking-wider uppercase">
            <span>{siteConfig.location.coordinates}</span>
            <span>•</span>
            <span>{siteConfig.location.city}, {siteConfig.location.country}</span>
            <span>•</span>
            <span className="text-cyan-accent">{siteConfig.location.timezone}</span>
          </div>
        </div>

        {/* Hero Asymmetric Grid: Left Editorial Typography + Right 3D Centerpiece */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          <div className="lg:col-span-7 flex flex-col">
            {/* Engineering Sub-Badge */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-accent uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent" />
              <span>Full-Stack Developer & Software Engineer</span>
            </div>

            {/* Massive Editorial MOHAN. Title */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-display font-extrabold tracking-tight text-white uppercase leading-[0.88] select-none">
              MOHAN<span className="text-cyan-accent">.</span>
            </h1>

            {/* Position Headline with Staggered Entrance Animation */}
            <TextReveal
              text="Building scalable digital products. Turning ideas into working software."
              as="h2"
              delay={0.15}
              className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold tracking-tight text-silver-bright mt-4 leading-tight"
            />

            {/* Authentic Narrative Bio */}
            <p className="mt-5 text-base sm:text-lg text-silver-mid font-sans font-normal leading-relaxed max-w-xl">
              Specialized in high-concurrency backend services in <strong>Go</strong> &amp; <strong>Java</strong>, modern reactive web platforms in <strong>React 19</strong> &amp; <strong>Next.js</strong>, and relational database query optimization across PostgreSQL and MySQL. Equipped with 2 years of enterprise financial ledger precision from tenure at <strong>Gabriel India Ltd</strong>.
            </p>

            {/* Action Controls & Magnetic CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <MagneticButton strength={0.25}>
                <Link href="/projects">
                  <Button variant="primary" size="lg" className="shadow-lg">
                    Explore Projects
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <a
                  href={siteConfig.resumeUrl}
                  download="Mohan_NV_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="lg">
                    <Download className="w-4 h-4 mr-1 text-cyan-accent" />
                    Download Resume
                  </Button>
                </a>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <Link href="/lab">
                  <Button variant="outline" size="lg" className="border-hairline hover:border-cyan-accent hover:text-cyan-accent">
                    <Terminal className="w-4 h-4 mr-1 text-cyan-accent" />
                    Engineering Lab
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* 3D Engineering Interactive Object Centerpiece */}
          <div className="lg:col-span-5 w-full flex flex-col rounded-2xl border border-hairline bg-carbon/60 backdrop-blur-xl p-3 sm:p-4 corner-datum shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
            {/* Top HUD Frame Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-hairline text-[10px] font-mono text-silver-dark uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-silver-mid">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent animate-pulse" />
                Gyroscopic Lattice 3D
              </span>
              <span className="text-silver-dark">WebGL • R3F • Three.js</span>
            </div>

            {/* 3D Canvas Container */}
            <div className="h-[280px] sm:h-[340px] w-full flex items-center justify-center relative">
              <SceneContainer />
            </div>

            {/* Bottom HUD Frame Footer */}
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-hairline text-[10px] font-mono text-silver-dark">
              <span>INTERACTIVE // MOVE CURSOR</span>
              <span className="text-cyan-accent">DAMPED LERP (0.05)</span>
            </div>
          </div>
        </div>

        {/* Interactive Visual Centerpiece: Software Topology Matrix */}
        <div className="mt-8 w-full">
          <InteractiveHeroCenterpiece />
        </div>

        {/* Engineering Metrics Datum Bar */}
        <div className="mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl border border-hairline bg-carbon/40 backdrop-blur-md">
          <div className="flex flex-col border-r border-hairline/60 pr-4 last:border-r-0">
            <span className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">02+ <span className="text-xs font-mono font-normal text-silver-dark">Yrs</span></span>
            <span className="text-xs font-sans font-medium text-silver-mid mt-0.5">Corporate Tenure</span>
            <span className="text-[11px] font-mono text-silver-dark mt-1">Gabriel India Ltd (Auditing)</span>
          </div>

          <div className="flex flex-col sm:border-r border-hairline/60 sm:pr-4 last:border-r-0 pl-2 sm:pl-0">
            <span className="text-2xl sm:text-3xl font-display font-bold text-cyan-accent tracking-tight">10k+ <span className="text-xs font-mono font-normal text-silver-dark">QPS</span></span>
            <span className="text-xs font-sans font-medium text-silver-mid mt-0.5">Ingest Capacity</span>
            <span className="text-[11px] font-mono text-silver-dark mt-1">MapUp Go Spatial Pipeline</span>
          </div>

          <div className="flex flex-col border-r border-hairline/60 pr-4 last:border-r-0 pt-4 sm:pt-0">
            <span className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">MCA <span className="text-xs font-mono font-normal text-silver-dark">&apos;26</span></span>
            <span className="text-xs font-sans font-medium text-silver-mid mt-0.5">Advanced CS</span>
            <span className="text-[11px] font-mono text-silver-dark mt-1">Adhiyamaan College of Eng</span>
          </div>

          <div className="flex flex-col pl-2 sm:pl-0 pt-4 sm:pt-0">
            <span className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">100%</span>
            <span className="text-xs font-sans font-medium text-silver-mid mt-0.5">Production Tested</span>
            <span className="text-[11px] font-mono text-silver-dark mt-1">TypeScript, Go, PostgreSQL</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SELECTED PROJECTS (WITH 3D PERSPECTIVE TILT)
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-hairline">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <SectionHeader
            index="01"
            tag="Selected Projects"
            title="Featured Engineering Work"
            description="Production-tested full-stack platforms and backend microservices built for deterministic performance and clean data modeling."
            className="mb-0"
          />
          <Link
            href="/projects"
            className="text-xs font-mono uppercase text-silver-mid hover:text-cyan-accent flex items-center gap-1.5 transition-colors shrink-0 pb-2"
          >
            All Projects ({projectsData.length})
            <MoveRight className="w-4 h-4" />
          </Link>
        </div>

        <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <MotionItem key={project.id}>
              <Link href={`/projects/${project.slug}`} className="block h-full group">
                <InteractiveTiltCard hasDatumCorners className="h-full flex flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="cyan" dot>{project.category}</Badge>
                      <span className="text-xs font-mono text-silver-dark">{project.completionDate.split("-")[0]}</span>
                    </div>

                    <CardTitle className="group-hover:text-cyan-accent transition-colors flex items-center justify-between text-xl leading-snug">
                      {project.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-accent" />
                    </CardTitle>

                    <p className="mt-2 text-xs font-mono text-silver-mid line-clamp-2">
                      {project.shortDescription}
                    </p>

                    <p className="mt-4 text-xs text-silver-mid leading-relaxed line-clamp-3 font-light">
                      {project.problemStatement}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-hairline">
                    <div className="flex items-center justify-between text-[11px] font-mono text-silver-dark mb-3">
                      <span>Status:</span>
                      <span className="text-emerald-accent font-semibold">{project.status}</span>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-silver-mid border border-hairline"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </InteractiveTiltCard>
              </Link>
            </MotionItem>
          ))}
        </MotionContainer>
      </section>

      {/* =========================================================================
          SECTION 3: ENGINEERING CAPABILITIES
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-hairline">
        <SectionHeader
          index="02"
          tag="Engineering Capabilities"
          title="Full-Stack Technical Depth"
          description="A balanced engineering profile spanning low-latency backend systems, responsive web interfaces, and normalized relational databases."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hasDatumCorners className="p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-accent mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Backend &amp; Microservices</h3>
              <p className="mt-2 text-xs text-silver-mid leading-relaxed font-light">
                Architecting high-concurrency REST APIs in Go and Java with goroutines, connection pooling, and structured error handling.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-hairline font-mono text-[10px] text-silver-dark">
              Go • Java • Node.js • REST APIs
            </div>
          </Card>

          <Card hasDatumCorners className="p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-violet-accent mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Modern Frontend</h3>
              <p className="mt-2 text-xs text-silver-mid leading-relaxed font-light">
                Engineering sub-second web applications in React 19 and Next.js App Router with Server Components and Tailwind CSS.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-hairline font-mono text-[10px] text-silver-dark">
              React 19 • Next.js • TypeScript • Tailwind
            </div>
          </Card>

          <Card hasDatumCorners className="p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-accent mb-4">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Databases &amp; Modeling</h3>
              <p className="mt-2 text-xs text-silver-mid leading-relaxed font-light">
                Designing normalized schemas, query indexing, ACID transactions, and document collections across PostgreSQL, MySQL, and MongoDB.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-hairline font-mono text-[10px] text-silver-dark">
              PostgreSQL • MongoDB • MySQL • B-Trees
            </div>
          </Card>

          <Card hasDatumCorners className="p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/20 flex items-center justify-center text-white mb-4">
                <Container className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">DevOps &amp; Infrastructure</h3>
              <p className="mt-2 text-xs text-silver-mid leading-relaxed font-light">
                Packaging applications into multi-stage Docker containers and managing reliable Git version control branch workflows.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-hairline font-mono text-[10px] text-silver-dark">
              Docker • Git • GitHub • Linux Shell
            </div>
          </Card>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: ABOUT ME
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-hairline">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              index="03"
              tag="Personal Narrative"
              title="From Financial Ledgers to Resilient Software"
              className="mb-6"
            />

            <div className="p-6 rounded-2xl bg-obsidian border border-hairline corner-datum">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full border border-hairline bg-carbon flex items-center justify-center font-display font-bold text-sm text-cyan-accent">
                  NV
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Mohan N.V.</div>
                  <div className="text-xs font-mono text-silver-dark">Full-Stack Engineer</div>
                </div>
              </div>

              <div className="space-y-3 text-xs font-mono text-silver-mid border-t border-hairline pt-4">
                <div className="flex justify-between">
                  <span className="text-silver-dark">Highest Degree:</span>
                  <span className="text-white">MCA (2024 — 2026)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-silver-dark">Undergraduate:</span>
                  <span className="text-white">BCA (2019 — 2022)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-silver-dark">Corporate Tenure:</span>
                  <span className="text-white">Gabriel India Ltd (2 Yrs)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-silver-dark">Location:</span>
                  <span className="text-white">Hosur / Bangalore, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 text-silver-mid text-sm sm:text-base leading-relaxed font-light">
            <p>
              My path into software engineering is rooted in a unique combination of <strong>analytical financial discipline</strong> and <strong>deep computer science scholarship</strong>.
            </p>
            <p>
              After completing my Bachelor of Computer Applications (BCA) with distinction in 2022, I spent two years as a <strong>Bill Booking Accountant at Gabriel India Ltd</strong>, one of India&apos;s leading automotive manufacturing giants. Auditing tens of thousands of corporate invoices in enterprise ERP systems taught me that software bugs aren&apos;t just abstract errors — they directly disrupt operations and financial integrity.
            </p>
            <p>
              Driven to build the systems behind enterprise platforms, I enrolled in the <strong>Master of Computer Applications (MCA) at Adhiyamaan College of Engineering (2024–2026)</strong>. Over the past several years, I have channeled that same uncompromising precision into architecting full-stack web products, mastering Go, Java, React, Next.js, and relational database systems.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
              <Link href="/about">
                <Button variant="secondary" size="sm">
                  Read Full Background &amp; Philosophy
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: TECHNOLOGY STACK
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-hairline">
        <SectionHeader
          index="04"
          tag="Technology Stack"
          title="Tools &amp; Languages Engineered with Rigor"
          description="Every tool in this stack is chosen for performance, maintainability, and enterprise-grade reliability."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
          {coreLanguages.map((tech) => (
            <div
              key={tech}
              className="p-3.5 rounded-xl bg-obsidian border border-hairline hover:border-cyan-500/40 hover:bg-carbon transition-all duration-200 flex flex-col items-center justify-center text-center group cursor-default"
            >
              <span className="font-mono text-xs font-bold text-white group-hover:text-cyan-accent transition-colors">
                {tech}
              </span>
              <span className="text-[9px] font-mono text-silver-dark uppercase mt-1">
                Verified
              </span>
            </div>
          ))}
        </div>

        {/* Detailed Category Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.slice(0, 2).map((category, idx) => (
            <Card key={idx} hasDatumCorners className="p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-hairline">
                <h3 className="font-display font-bold text-white text-base">{category.title}</h3>
                <span className="text-[10px] font-mono text-cyan-accent uppercase">DEPTH MATRIX</span>
              </div>
              <p className="text-xs text-silver-mid font-light mb-6">{category.description}</p>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-silver-dark">{skill.level}%</span>
                    </div>
                    {/* Minimalist Progress Meter */}
                    <div className="w-full h-1 bg-surface-1 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-white rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-silver-dark">{skill.focus}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: PROFESSIONAL JOURNEY (ANIMATED TIMELINE)
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-hairline">
        <SectionHeader
          index="05"
          tag="Professional Journey"
          title="Chronology of Growth"
          description="A progressive timeline tracing academic credentials, corporate financial accountability, and advanced software engineering."
        />

        <AnimatedTimeline />
      </section>

      {/* =========================================================================
          SECTION 7: ENGINEERING PHILOSOPHY
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-hairline">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <SectionHeader
              index="06"
              tag="Engineering Philosophy"
              title="Simplicity, Correctness, and Resilience"
              className="mb-0"
            />
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-obsidian border border-hairline">
              <div className="font-mono text-xs text-cyan-accent font-bold mb-2">01 // CORRECTNESS OVER CONVENIENCE</div>
              <p className="text-xs text-silver-mid font-light leading-relaxed">
                Code that breaks in edge cases is liabilities disguised as features. We write tests and enforce schema barriers before shipping.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-obsidian border border-hairline">
              <div className="font-mono text-xs text-violet-accent font-bold mb-2">02 // DATA INTEGRITY AS FOUNDATION</div>
              <p className="text-xs text-silver-mid font-light leading-relaxed">
                Databases are the source of truth. We prioritize normalized relational schemas, ACID safety, and sensible indexing over quick hacks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-obsidian border border-hairline">
              <div className="font-mono text-xs text-emerald-accent font-bold mb-2">03 // SUB-SECOND RESPONSIVENESS</div>
              <p className="text-xs text-silver-mid font-light leading-relaxed">
                Users deserve zero latency. We favor server-rendered components, minimal client-side JavaScript, and optimized SQL queries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-obsidian border border-hairline">
              <div className="font-mono text-xs text-white font-bold mb-2">04 // ENTERPRISE PRACTICALITY</div>
              <p className="text-xs text-silver-mid font-light leading-relaxed">
                Software must solve tangible business problems. Having worked in corporate automotive accounting, I value systems that deliver real ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: CURRENT FOCUS
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-hairline">
        <Card hasDatumCorners className="p-8 sm:p-12 relative overflow-hidden bg-obsidian">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-cyan-accent" />
              <Badge variant="cyan" dot>
                CURRENT R&amp;D // ACTIVE FOCUS
              </Badge>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-white leading-tight">
              {siteConfig.currentFocus.headline}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-silver-mid font-light leading-relaxed">
              {siteConfig.currentFocus.description}
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siteConfig.currentFocus.areas.map((area, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-carbon/60 border border-hairline text-xs font-mono text-silver-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* =========================================================================
          SECTION 9: ENGINEERING LAB PREVIEW
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-hairline">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <SectionHeader
            index="07"
            tag="Engineering Lab"
            title="Interactive Prototypes &amp; Micro-Tools"
            description="Algorithmic visualizers, SQL query cost simulators, and Docker utilities developed for developer productivity."
            className="mb-0"
          />
          <Link
            href="/lab"
            className="text-xs font-mono uppercase text-silver-mid hover:text-cyan-accent flex items-center gap-1.5 transition-colors shrink-0 pb-2"
          >
            Open Complete Lab ({labData.length})
            <MoveRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {labData.slice(0, 2).map((exp) => (
            <Card key={exp.id} hasDatumCorners className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="violet" dot>{exp.category}</Badge>
                  <span className="text-xs font-mono text-silver-dark">{exp.date}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{exp.title}</h3>
                <p className="text-xs text-silver-mid leading-relaxed font-light">{exp.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-silver-dark px-2 py-0.5 rounded bg-surface-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/lab" className="text-xs font-mono text-cyan-accent hover:underline flex items-center gap-1">
                  Launch Demo
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: JOURNAL PREVIEW
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-hairline">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <SectionHeader
            index="08"
            tag="Engineering Journal"
            title="Technical Essays &amp; Insights"
            description="Documenting real-world architectural decisions, database optimizations, and reflections on writing high-performance code."
            className="mb-0"
          />
          <Link
            href="/journal"
            className="text-xs font-mono uppercase text-silver-mid hover:text-cyan-accent flex items-center gap-1.5 transition-colors shrink-0 pb-2"
          >
            Read All Articles ({journalData.length})
            <MoveRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {journalData.slice(0, 2).map((post) => (
            <Link key={post.id} href={`/journal/${post.slug}`} className="block group">
              <Card hasDatumCorners className="h-full p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono text-cyan-accent">{post.publishedAt}</span>
                    <span className="text-silver-dark">•</span>
                    <span className="text-xs font-mono text-silver-dark">{post.readTimeMinutes} min read</span>
                  </div>

                  <CardTitle className="group-hover:text-cyan-accent transition-colors text-lg leading-snug">
                    {post.title}
                  </CardTitle>

                  <p className="mt-3 text-xs text-silver-mid font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-xs font-mono">
                  <span className="text-silver-dark">Read Publication</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: CONTACT CTA
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-hairline">
        <Card hasDatumCorners className="p-8 sm:p-14 text-center flex flex-col items-center bg-obsidian border-hairline">
          <Badge variant="cyan" dot className="mb-4">
            INITIATE COMMUNICATION
          </Badge>

          <h2 className="type-display uppercase text-white font-bold max-w-2xl leading-tight">
            Let&apos;s Build Something Resilient Together.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-silver-mid font-light max-w-xl leading-relaxed">
            I am actively open to full-time software engineering roles, high-impact full-stack development, and challenging backend architecture opportunities.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton strength={0.3}>
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Send a Direct Message
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </MagneticButton>

            <a
              href={`mailto:${siteConfig.socials.email}`}
              className="px-6 py-3 rounded-full border border-hairline bg-carbon text-xs font-mono text-white hover:border-white/30 transition-colors flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-accent" />
              {siteConfig.socials.email}
            </a>

            <a
              href={siteConfig.resumeUrl}
              download="Mohan_NV_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-hairline text-xs font-mono text-silver-mid hover:text-white hover:border-white/30 transition-colors flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              Resume PDF
            </a>
          </div>
        </Card>
      </section>

      {/* SECTION 12: Footer is rendered automatically in RootLayout */}
    </div>
  );
}
