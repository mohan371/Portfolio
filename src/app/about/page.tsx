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
        <div className="lg:col-span-7 flex flex-col gap-6 text-silver-mid text-sm sm:text-base leading-relaxed font-light">
          <div className="p-5 rounded-2xl studio-card border-cyan-500/30">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-accent uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-accent animate-pulse" />
              <span>Current Designation</span>
            </div>
            <p className="text-foreground text-base sm:text-lg font-medium leading-relaxed">
              &ldquo;{siteConfig.bio}&rdquo;
            </p>
          </div>

          <h3 className="font-display font-bold text-foreground text-xl mt-2">Current Engineering at Veda Scholars</h3>
          <p>
            As a <strong>Software Engineer at Veda Scholars</strong> in Hosur (November 2025 – Present), I contribute to a comprehensive Education-to-Employment platform bridging web and mobile users. My daily engineering responsibilities include:
          </p>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0 mt-1" />
              <span><strong>Full-Stack Web Engineering:</strong> Developing and optimizing modular components using React.js, Next.js, Node.js, and MongoDB.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0 mt-1" />
              <span><strong>API Design &amp; Security:</strong> Designing RESTful endpoints with JWT role authentication and subscription feature gating.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0 mt-1" />
              <span><strong>Real-Time Features:</strong> Implementing bi-directional communication channels using Socket.IO.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0 mt-1" />
              <span><strong>Deployment &amp; Mobile:</strong> Configuring CI/CD pipelines on Netlify and Render, and handling Flutter Android release APK builds.</span>
            </li>
          </ul>

          <h3 className="font-display font-bold text-foreground text-xl mt-4">The Accounting Foundation at Gabriel India Ltd</h3>
          <p>
            Before my transition into modern software development, I spent two formative years (2022–2024) as a <strong>Bill Booking Accountant at Gabriel India Ltd</strong>, one of India&apos;s leading automotive manufacturing giants. Auditing tens of thousands of vendor invoices in enterprise ERP systems instilled an uncompromising discipline:
          </p>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0 mt-1" />
              <span><strong>Zero Tolerance for Errors:</strong> A 0.01 mismatch stops an audit. Software endpoints must be built with idempotent safeguards and strict payload validation.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0 mt-1" />
              <span><strong>ACID Relational Rigor:</strong> Financial transactions cannot rely on eventual consistency; state transitions require atomic integrity.</span>
            </li>
          </ul>

          <h3 className="font-display font-bold text-foreground text-xl mt-4">Academic Scholarship &amp; Performance</h3>
          <p>
            I earned my <strong>Master of Computer Applications (MCA)</strong> from <strong>Adhiyamaan College of Engineering (Anna University)</strong> in 2026, graduating with a <strong>92% aggregate</strong>. This advanced training built upon my undergraduate <strong>Bachelor of Computer Applications (BCA)</strong> from <strong>MGR College of Arts and Science (Periyar University)</strong> in 2022, completed with a <strong>78% aggregate</strong>.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <a href={siteConfig.resumeUrl} download="Mohan_NV_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="primary">
                <Download className="w-4 h-4 mr-1 text-black" />
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
            <div className="text-xs font-mono text-cyan-accent uppercase tracking-widest mb-3">
              CURRENT DESIGNATION
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-accent">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-foreground">Software Engineer</h4>
                <span className="text-xs font-mono text-silver-mid">Veda Scholars • Hosur</span>
              </div>
            </div>
            <div className="text-xs font-mono text-silver-dark pt-2 border-t border-hairline flex justify-between">
              <span>TENURE:</span>
              <span className="text-cyan-accent font-semibold">Nov 2025 – Present</span>
            </div>
          </Card>

          {/* Academic Credentials Card */}
          <Card hasDatumCorners className="p-6">
            <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-4">
              ACADEMIC CREDENTIALS
            </div>
            <div className="space-y-5">
              {siteConfig.education.map((edu) => (
                <div key={edu.id} className="pb-4 border-b border-hairline last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between text-foreground font-bold text-sm">
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
                      {edu.degree}
                    </span>
                    <span className="text-xs font-mono text-purple-400 font-semibold">{edu.grade}</span>
                  </div>
                  <div className="text-xs font-mono text-silver-dark mt-1">
                    {edu.institution} • {edu.university}
                  </div>
                  <div className="text-[11px] font-mono text-silver-dark mt-0.5">
                    {edu.year} • {edu.location}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Contact Details Card */}
          <Card hasDatumCorners className="p-6">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
              DIRECT VERIFIED CONTACT
            </div>
            <div className="space-y-3 text-xs font-mono">
              <a href={`mailto:${siteConfig.socials.email}`} className="flex items-center gap-2 text-silver-mid hover:text-cyan-accent transition-colors">
                <Mail className="w-3.5 h-3.5 text-cyan-accent" />
                <span>{siteConfig.socials.email}</span>
              </a>
              <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-2 text-silver-mid hover:text-cyan-accent transition-colors">
                <Phone className="w-3.5 h-3.5 text-cyan-accent" />
                <span>{siteConfig.phone}</span>
              </a>
              <div className="text-silver-dark pt-2 border-t border-hairline">
                LOCATION: {siteConfig.location.city}, {siteConfig.location.country}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
