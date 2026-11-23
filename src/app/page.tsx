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
  Award,
  CheckCircle2,
  Smartphone,
  Globe,
  Bot,
} from "lucide-react";

export default function Home() {
  const featuredProjects = projectsData.filter((p) => p.featured);
  const otherProjects = projectsData.filter((p) => !p.featured);

  return (
    <div className="relative min-h-screen">
      {/* Background Ambience & Atmospheric Grid */}
      <div className="fixed inset-0 bg-tech-grid opacity-60 dark:opacity-40 pointer-events-none" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#873D49]/[0.025] dark:bg-[#A35360]/[0.03] blur-[160px] pointer-events-none rounded-full" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[400px] bg-[#B69A72]/[0.025] dark:bg-[#C9B08B]/[0.025] blur-[140px] pointer-events-none rounded-full" />

      {/* =========================================================================
          SECTION 1: HERO (CINEMATIC EDITORIAL TYPOGRAPHY, 3D CENTERPIECE)
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20 md:pt-14 md:pb-28 flex flex-col items-start">
        {/* Top Telemetry & Status Bar */}
        <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-border text-xs font-mono">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-border bg-card shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] uppercase tracking-wider text-foreground font-semibold">
              Software Engineer at Veda Scholars
            </span>
            <span className="text-muted-foreground">//</span>
            <span className="text-[11px] text-muted-foreground hidden sm:inline">
              Nov 2025 – Present
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-muted-foreground text-[11px] tracking-wider uppercase">
            <span>{siteConfig.location.city}, {siteConfig.location.country}</span>
            <span>•</span>
            <span className="text-primary font-semibold">{siteConfig.location.timezone}</span>
            <span>•</span>
            <span className="text-foreground font-semibold">Available for Hire</span>
          </div>
        </div>

        {/* Hero Asymmetric Grid: Left Editorial Typography + Right 3D Centerpiece */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          <div className="lg:col-span-7 flex flex-col">
            {/* Engineering Sub-Badge */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-3 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Software Engineer | Full-Stack Developer</span>
            </div>

            {/* Massive Editorial MOHAN. Title */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-display font-extrabold tracking-tight text-foreground uppercase leading-[0.88] select-none">
              MOHAN<span className="text-primary">.</span>
            </h1>

            {/* Position Headline with Staggered Entrance Animation */}
            <TextReveal
              text={siteConfig.positioning}
              as="h2"
              delay={0.15}
              className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold tracking-tight text-foreground mt-4 leading-tight"
            />

            {/* Authoritative Narrative Bio */}
            <p className="mt-5 text-base sm:text-lg text-muted-foreground font-sans font-normal leading-relaxed max-w-xl">
              {siteConfig.bio}
            </p>

            {/* Action Controls & Magnetic CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <MagneticButton strength={0.25}>
                <Link href="/projects">
                  <Button variant="primary" size="lg" className="shadow-md">
                    Explore Projects
                    <ArrowUpRight className="w-4 h-4 ml-1 text-primary-foreground" />
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
                    <Download className="w-4 h-4 mr-1 text-primary" />
                    Download Resume
                  </Button>
                </a>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <Link href="/lab">
                  <Button variant="outline" size="lg">
                    <Terminal className="w-4 h-4 mr-1 text-primary" />
                    Engineering Lab
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* 3D Engineering Interactive Object Centerpiece */}
          <div className="lg:col-span-5 w-full flex flex-col rounded-2xl border border-border bg-card shadow-card p-3 sm:p-4 corner-datum">
            {/* Top HUD Frame Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-foreground font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Gyroscopic Lattice 3D
              </span>
              <span className="text-muted-foreground">WebGL • R3F • Three.js</span>
            </div>

            {/* 3D Canvas Container */}
            <div className="h-[280px] sm:h-[340px] w-full flex items-center justify-center relative">
              <SceneContainer />
            </div>

            {/* Bottom HUD Frame Footer */}
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-border text-[10px] font-mono text-muted-foreground">
              <span>INTERACTIVE // MOVE CURSOR</span>
              <span className="text-primary font-semibold">DAMPED LERP (0.05)</span>
            </div>
          </div>
        </div>

        {/* Interactive Visual Centerpiece: Software Topology Matrix */}
        <div className="mt-8 w-full">
          <InteractiveHeroCenterpiece />
        </div>

        {/* Engineering Metrics Datum Bar */}
        <div className="mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl border border-border bg-surface shadow-subtle">
          <div className="flex flex-col border-r border-border pr-4 last:border-r-0">
            <span className="text-2xl sm:text-3xl font-display font-bold text-primary tracking-tight">Present</span>
            <span className="text-xs font-sans font-semibold text-foreground mt-0.5">Software Engineer</span>
            <span className="text-[11px] font-mono text-muted-foreground mt-1">Veda Scholars (Web + SaaS)</span>
          </div>

          <div className="flex flex-col sm:border-r border-border sm:pr-4 last:border-r-0 pl-2 sm:pl-0">
            <span className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">92% <span className="text-xs font-mono font-normal text-muted-foreground">MCA</span></span>
            <span className="text-xs font-sans font-semibold text-foreground mt-0.5">Academic Aggregate</span>
            <span className="text-[11px] font-mono text-muted-foreground mt-1">Adhiyamaan Coll of Eng &apos;26</span>
          </div>

          <div className="flex flex-col border-r border-border pr-4 last:border-r-0 pt-4 sm:pt-0">
            <span className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">02 <span className="text-xs font-mono font-normal text-muted-foreground">Yrs</span></span>
            <span className="text-xs font-sans font-semibold text-foreground mt-0.5">Corporate Accounting</span>
            <span className="text-[11px] font-mono text-muted-foreground mt-1">Gabriel India Ltd (Ledger)</span>
          </div>

          <div className="flex flex-col pl-2 sm:pl-0 pt-4 sm:pt-0">
            <span className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">78% <span className="text-xs font-mono font-normal text-muted-foreground">BCA</span></span>
            <span className="text-xs font-sans font-semibold text-foreground mt-0.5">Foundational Aggregate</span>
            <span className="text-[11px] font-mono text-muted-foreground mt-1">MGR College of Arts &amp; Sci</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SELECTED PROJECTS (FEATURED + ALL AUTHENTIC CASE STUDIES)
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <SectionHeader
            index="01"
            tag="Project Portfolio"
            title="Featured Engineering Work"
            description="Production-tested full-stack platforms, Android SaaS applications, and low-latency backend architectures."
            className="mb-0"
          />
          <Link
            href="/projects"
            className="text-xs font-mono uppercase text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors shrink-0 pb-2 font-semibold"
          >
            All Projects ({projectsData.length})
            <MoveRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Projects Grid (Top 3) */}
        <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredProjects.map((project) => (
            <MotionItem key={project.id}>
              <Link href={`/projects/${project.slug}`} className="block h-full group">
                <InteractiveTiltCard hasDatumCorners className="h-full flex flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="cyan" dot>{project.category}</Badge>
                      <span className="text-xs font-mono text-muted-foreground">{project.completionDate.split("-")[0]}</span>
                    </div>

                    <CardTitle className="group-hover:text-primary transition-colors flex items-center justify-between text-xl leading-snug">
                      {project.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    </CardTitle>

                    <p className="mt-3 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-3">
                      <span>Status:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{project.status}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-secondary text-muted-foreground border border-border"
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

        {/* Additional Authentic Projects (3-6) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {otherProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="block group">
              <div className="studio-card p-5 rounded-2xl flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-2">
                    <span>{project.category}</span>
                    <span>{project.completionDate.split("-")[0]}</span>
                  </div>
                  <h4 className="font-display font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                    {project.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                  <span>{project.technologies.slice(0, 3).join(" • ")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PROFESSIONAL JOURNEY (ANIMATED TIMELINE - PRESENT AT TOP)
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-border">
        <SectionHeader
          index="02"
          tag="Professional Journey"
          title="Career &amp; Academic Chronology"
          description="A vertical timeline ordered with the current Software Engineer role at Veda Scholars at the top, tracing earlier educational and corporate foundations below."
        />

        <AnimatedTimeline />
      </section>

      {/* =========================================================================
          SECTION 4: TECHNICAL SKILLS (TRUTHFUL & ACCREDITED)
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-border">
        <SectionHeader
          index="03"
          tag="Technical Competencies"
          title="Skills &amp; Technology Stack"
          description="Authentic programming languages, frameworks, databases, and tooling actively practiced in production and software development."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category) => (
            <Card key={category.title} hasDatumCorners className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
                  <h3 className="font-display font-bold text-lg text-foreground">{category.title}</h3>
                  <Badge variant="outline" className="text-[9px] font-mono">
                    {category.skills.length} SKILLS
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground font-light leading-relaxed mb-6">
                  {category.description}
                </p>

                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-surface border border-border hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-sans font-semibold text-xs text-foreground">{skill.name}</span>
                        <span className="text-[10px] font-mono text-primary font-medium">{skill.category}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-sans leading-relaxed">
                        {skill.focus}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CERTIFICATIONS & ACHIEVEMENTS
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-border">
        <SectionHeader
          index="04"
          tag="Certifications &amp; Achievements"
          title="Continuous Learning &amp; Competitive Milestones"
          description="Professional course accreditations from Scaler &amp; Networkz System, hackathon participations, and research paper presentation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Certifications */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border text-xs font-mono text-primary uppercase tracking-wider font-semibold">
              <Award className="w-4 h-4 text-primary" />
              <span>Professional Course Completions</span>
            </div>

            <div className="space-y-3">
              {siteConfig.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl studio-card flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-secondary border border-border flex items-center justify-center shrink-0 text-primary mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-sm text-foreground">{cert.title}</h4>
                      <div className="text-xs font-mono text-muted-foreground mt-0.5">
                        {cert.issuer} • <span className="text-muted-foreground/80">{cert.date}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="cyan" className="shrink-0 text-[9px]">{cert.category}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Achievements & Hackathons */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider font-semibold">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Competitions, Research &amp; Hackathons</span>
            </div>

            <div className="space-y-3">
              {siteConfig.achievements.slice(0, 4).map((ach) => (
                <div
                  key={ach.id}
                  className="p-4 rounded-xl studio-card flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">{ach.event}</span>
                    <span className="text-muted-foreground">{ach.date}</span>
                  </div>
                  <h4 className="font-display font-semibold text-sm text-foreground mb-1">{ach.title}</h4>
                  {ach.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed font-light">{ach.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: ABOUT ME & ACCOUNTING LEDGER FOUNDATION
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              index="05"
              tag="Personal Narrative"
              title="From Financial Ledgers to Resilient Software"
              className="mb-6"
            />

            <div className="p-6 rounded-2xl studio-card corner-datum">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full border border-border bg-surface-secondary flex items-center justify-center font-display font-bold text-sm text-primary">
                  NV
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">Mohan N.V.</div>
                  <div className="text-xs font-mono text-muted-foreground">Software Engineer | Full-Stack Developer</div>
                </div>
              </div>

              <div className="space-y-3 text-xs font-mono text-muted-foreground border-t border-border pt-4">
                <div className="flex justify-between">
                  <span>Current Role:</span>
                  <span className="text-primary font-semibold">Software Engineer (Veda Scholars)</span>
                </div>
                <div className="flex justify-between">
                  <span>Highest Degree:</span>
                  <span className="text-foreground">MCA — 92% (2024 — 2026)</span>
                </div>
                <div className="flex justify-between">
                  <span>Undergraduate:</span>
                  <span className="text-foreground">BCA — 78% (2019 — 2022)</span>
                </div>
                <div className="flex justify-between">
                  <span>Corporate Tenure:</span>
                  <span className="text-foreground">Gabriel India Ltd (2 Yrs)</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="text-foreground">Hosur, Tamil Nadu, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 text-muted-foreground text-sm sm:text-base leading-relaxed font-light">
            <p>
              My path into software engineering is rooted in a unique combination of <strong className="text-foreground font-semibold">analytical financial discipline</strong> and <strong className="text-foreground font-semibold">deep computer science scholarship</strong>.
            </p>
            <p>
              After completing my Bachelor of Computer Applications (BCA) with 78% in 2022, I spent two years as a <strong className="text-foreground font-semibold">Bill Booking Accountant at Gabriel India Ltd</strong>, one of India&apos;s leading automotive manufacturing giants. Auditing tens of thousands of corporate invoices in enterprise ERP systems taught me that software bugs aren&apos;t just abstract errors — they directly disrupt operations and financial integrity.
            </p>
            <p>
              Driven to build the systems behind digital products, I enrolled in the <strong className="text-foreground font-semibold">Master of Computer Applications (MCA) at Adhiyamaan College of Engineering (Anna University)</strong>, graduating in 2026 with a 92% aggregate.
            </p>
            <p>
              Today, as a <strong className="text-foreground font-semibold">Software Engineer at Veda Scholars</strong>, I build and optimize application modules across React.js, Next.js, Node.js, and MongoDB, design secure role-based REST APIs with JWT authentication, implement real-time communication via Socket.IO, and manage automated deployments on Netlify and Render.
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
          SECTION 7: ENGINEERING LAB PREVIEW
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <SectionHeader
            index="06"
            tag="Engineering Lab"
            title="Interactive Prototypes &amp; Practical Curiosity"
            description="Working local simulations: Geofencing Ray-Casting calculation, WebSocket alerts, terminal commands, and database architecture visualizer."
            className="mb-0"
          />
          <Link
            href="/lab"
            className="text-xs font-mono uppercase text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors shrink-0 pb-2 font-semibold"
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
                  <span className="text-xs font-mono text-muted-foreground">{exp.date}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{exp.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">{exp.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 rounded-full bg-surface-secondary border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/lab" className="text-xs font-mono text-primary font-semibold hover:underline flex items-center gap-1">
                  Launch Demo
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: JOURNAL PREVIEW
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <SectionHeader
            index="07"
            tag="Engineering Journal"
            title="Technical Essays &amp; Architecture Insights"
            description="Reflections on double-entry accounting shaping distributed software rigor, high-throughput Go APIs, and React 19 Server Components."
            className="mb-0"
          />
          <Link
            href="/journal"
            className="text-xs font-mono uppercase text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors shrink-0 pb-2 font-semibold"
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
                    <span className="text-xs font-mono text-primary font-semibold">{post.publishedAt}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-xs font-mono text-muted-foreground">{post.readTimeMinutes} min read</span>
                  </div>

                  <CardTitle className="group-hover:text-primary transition-colors text-lg leading-snug">
                    {post.title}
                  </CardTitle>

                  <p className="mt-3 text-xs text-muted-foreground font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">Read Publication</span>
                  <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: CONTACT CTA
          ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-border">
        <Card hasDatumCorners className="p-8 sm:p-14 text-center flex flex-col items-center border-border bg-surface shadow-subtle">
          <Badge variant="cyan" dot className="mb-4">
            INITIATE COMMUNICATION
          </Badge>

          <h2 className="type-display uppercase text-foreground font-bold max-w-2xl leading-tight">
            Let&apos;s Build Practical, Scalable Software Together.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-muted-foreground font-light max-w-xl leading-relaxed">
            I am currently working as a Software Engineer at Veda Scholars and am open to high-impact software engineering opportunities, full-stack development, and technical collaboration.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton strength={0.3}>
              <Link href="/contact">
                <Button variant="primary" size="lg" className="shadow-md">
                  Send a Direct Message
                  <ArrowUpRight className="w-4 h-4 ml-1 text-primary-foreground" />
                </Button>
              </Link>
            </MagneticButton>

            <a
              href={`mailto:${siteConfig.socials.email}`}
              className="px-6 py-3 rounded-full border border-border bg-card text-xs font-mono text-foreground hover:border-primary/40 shadow-xs transition-colors flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-primary" />
              {siteConfig.socials.email}
            </a>

            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
              className="px-6 py-3 rounded-full border border-border bg-card text-xs font-mono text-foreground hover:border-primary/40 shadow-xs transition-colors flex items-center gap-2"
            >
              <span className="text-primary font-bold">TEL:</span>
              {siteConfig.phone}
            </a>

            <a
              href={siteConfig.resumeUrl}
              download="Mohan_NV_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-border bg-card text-xs font-mono text-muted-foreground hover:text-foreground hover:border-slate-400 shadow-xs transition-colors flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              Resume PDF
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}
