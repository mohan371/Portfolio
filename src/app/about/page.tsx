import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/data/site-config";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Download, GraduationCap, Briefcase, CheckCircle2, Award, Sparkles, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Mohan N.V., Software Engineer at Veda Scholars, MCA graduate (92%), and former Bill Booking Accountant at Gabriel India Ltd.",
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        index="ABOUT"
        tag="Professional Profile"
        title="Practical Full-Stack Engineering &amp; Operational Rigor"
        description="Software Engineer at Veda Scholars with a disciplined background in web applications, Android SaaS, backend engineering, and corporate financial accounting."
      />

      {/* Main Narrative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6 text-muted-foreground text-sm sm:text-base leading-relaxed font-light">
          <div className="p-5 rounded-2xl studio-card">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-primary uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Current Designation</span>
            </div>
            <p className="text-foreground text-base sm:text-lg font-medium leading-relaxed">
              &ldquo;{siteConfig.bio}&rdquo;
            </p>
          </div>

          <h3 className="font-display font-bold text-foreground text-xl mt-2">Current Engineering at Veda Scholars</h3>
          <p>
            As a <strong className="text-foreground font-semibold">Software Engineer at Veda Scholars</strong> in Hosur (November 2025 – Present), I contribute to a comprehensive Education-to-Employment platform bridging web and mobile users. My daily engineering responsibilities include:
          </p>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span><strong className="text-foreground font-semibold">Full-Stack Web Engineering:</strong> Developing and optimizing modular components using React.js, Next.js, Node.js, and MongoDB.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span><strong className="text-foreground font-semibold">API Design &amp; Security:</strong> Designing RESTful endpoints with JWT role authentication and subscription feature gating.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span><strong className="text-foreground font-semibold">Real-Time Features:</strong> Implementing bi-directional communication channels using Socket.IO.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span><strong className="text-foreground font-semibold">Deployment &amp; Mobile:</strong> Configuring CI/CD pipelines on Netlify and Render, and handling Flutter Android release APK builds.</span>
            </li>
          </ul>

          <h3 className="font-display font-bold text-foreground text-xl mt-4">The Accounting Foundation at Gabriel India Ltd</h3>
          <p>
            Before my transition into modern software development, I spent two formative years (2022–2024) as a <strong className="text-foreground font-semibold">Bill Booking Accountant at Gabriel India Ltd</strong>, one of India&apos;s leading automotive manufacturing giants. Auditing tens of thousands of vendor invoices in enterprise ERP systems instilled an uncompromising discipline:
          </p>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span><strong className="text-foreground font-semibold">Zero Tolerance for Errors:</strong> A 0.01 mismatch stops an audit. Software endpoints must be built with idempotent safeguards and strict payload validation.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span><strong className="text-foreground font-semibold">ACID Relational Rigor:</strong> Financial transactions cannot rely on eventual consistency; state transitions require atomic integrity.</span>
            </li>
          </ul>

          <h3 className="font-display font-bold text-foreground text-xl mt-4">Academic Scholarship &amp; Performance</h3>
          <p>
            I earned my <strong className="text-foreground font-semibold">Master of Computer Applications (MCA)</strong> from <strong className="text-foreground font-semibold">Adhiyamaan College of Engineering (Anna University)</strong> in 2026, graduating with a <strong className="text-foreground font-semibold">92% aggregate</strong>. This advanced training built upon my undergraduate <strong className="text-foreground font-semibold">Bachelor of Computer Applications (BCA)</strong> from <strong className="text-foreground font-semibold">MGR College of Arts and Science (Periyar University)</strong> in 2022, completed with a <strong className="text-foreground font-semibold">78% aggregate</strong>.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <a href={siteConfig.resumeUrl} download="Mohan_NV_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="primary">
                <Download className="w-4 h-4 mr-1 text-primary-foreground" />
                Download Complete Resume
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="secondary">
                Contact Directly
              </Button>
            </Link>
          </div>
        </div>

        {/* Sidebar Info Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Current Status Card */}
          <Card hasDatumCorners className="p-6">
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-3 font-semibold">
              CURRENT DESIGNATION
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-primary">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-foreground">Software Engineer</h4>
                <span className="text-xs font-mono text-muted-foreground">Veda Scholars • Hosur</span>
              </div>
            </div>
            <div className="text-xs font-mono text-muted-foreground pt-2 border-t border-border flex justify-between">
              <span>TENURE:</span>
              <span className="text-primary font-semibold">Nov 2025 – Present</span>
            </div>
          </Card>

          {/* Academic Credentials Card */}
          <Card hasDatumCorners className="p-6">
            <div className="text-xs font-mono text-champagne uppercase tracking-widest mb-4 font-bold">
              ACADEMIC CREDENTIALS
            </div>
            <div className="space-y-5">
              {siteConfig.education.map((edu) => (
                <div key={edu.id} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between text-foreground font-bold text-sm">
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-champagne shrink-0" />
                      {edu.degree}
                    </span>
                    <span className="text-xs font-mono text-champagne font-semibold">{edu.grade}</span>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground mt-1">
                    {edu.institution} • {edu.university}
                  </div>
                  <div className="text-[11px] font-mono text-muted-foreground/80 mt-0.5">
                    {edu.year} • {edu.location}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Contact Details Card */}
          <Card hasDatumCorners className="p-6">
            <div className="text-xs font-mono text-sage uppercase tracking-widest mb-3 font-bold">
              DIRECT VERIFIED CONTACT
            </div>
            <div className="space-y-3 text-xs font-mono">
              <a href={`mailto:${siteConfig.socials.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>{siteConfig.socials.email}</span>
              </a>
              <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>{siteConfig.phone}</span>
              </a>
              <div className="text-muted-foreground pt-2 border-t border-border">
                LOCATION: {siteConfig.location.city}, {siteConfig.location.country}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
