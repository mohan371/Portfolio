import { Metadata } from "next";
import { siteConfig } from "@/content/data/site-config";
import { experienceData } from "@/content/data/experience";
import { skillsData } from "@/content/data/skills";
import { Button } from "@/components/ui/button";
import { Download, Mail, Printer, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
  description: "Official interactive resume of Mohan N.V. — Full-Stack Developer & Software Engineer.",
};

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header Bar with Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-hairline gap-4">
        <div>
          <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest">
            OFFICIAL RESUME // MOHAN N.V.
          </span>
          <h1 className="font-display text-3xl font-bold uppercase text-white tracking-tight mt-1">
            Curriculum Vitae
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.resumeUrl}
            download="Mohan_NV_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="sm">
              <Download className="w-3.5 h-3.5 mr-1 text-black" />
              Download PDF
            </Button>
          </a>

          <a href={`mailto:${siteConfig.socials.email}`}>
            <Button variant="outline" size="sm">
              <Mail className="w-3.5 h-3.5 mr-1" />
              Hire Mohan
            </Button>
          </a>
        </div>
      </div>

      {/* Clean Printable Resume Sheet */}
      <div className="bg-obsidian border border-hairline rounded-2xl p-8 sm:p-12 space-y-10 shadow-2xl">
        {/* Identity & Header */}
        <div className="border-b border-hairline pb-8">
          <h2 className="font-display text-3xl font-bold uppercase text-white tracking-tight">
            {siteConfig.name}
          </h2>
          <div className="text-sm font-mono text-cyan-accent mt-1">
            {siteConfig.role}
          </div>
          <p className="mt-3 text-xs sm:text-sm text-silver-mid font-light leading-relaxed max-w-2xl">
            {siteConfig.bio}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-silver-dark">
            <span>{siteConfig.socials.email}</span>
            <span>•</span>
            <span>{siteConfig.location.city}, {siteConfig.location.country}</span>
            <span>•</span>
            <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" className="text-cyan-accent hover:underline">
              GitHub Profile
            </a>
            <span>•</span>
            <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-accent hover:underline">
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Education Section */}
        <section>
          <h3 className="font-mono text-xs text-cyan-accent uppercase tracking-widest mb-4 font-bold">
            01 // EDUCATION
          </h3>
          <div className="space-y-6">
            {siteConfig.education.map((edu) => (
              <div key={edu.id} className="flex flex-col gap-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-white font-bold text-base">
                  <span>{edu.degree}</span>
                  <span className="text-xs font-mono text-silver-dark">{edu.year}</span>
                </div>
                <div className="text-xs font-mono text-silver-mid">
                  {edu.institution}
                </div>
                <ul className="mt-2 space-y-1">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-silver-mid flex items-start gap-2">
                      <span className="text-cyan-accent">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="border-t border-hairline pt-8">
          <h3 className="font-mono text-xs text-cyan-accent uppercase tracking-widest mb-4 font-bold">
            02 // PROFESSIONAL EXPERIENCE
          </h3>
          <div className="space-y-8">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-white font-bold text-base">
                <span>Bill Booking Accountant</span>
                <span className="text-xs font-mono text-silver-dark">2022 — 2024</span>
              </div>
              <div className="text-xs font-mono text-silver-mid">
                Gabriel India Ltd • Hosur, India
              </div>
              <p className="mt-2 text-xs text-silver-mid leading-relaxed font-light">
                Audited and processed high-volume vendor invoices into enterprise ERP systems, reconciling financial ledgers with zero discrepancy tolerance.
              </p>
              <ul className="mt-2 space-y-1.5">
                <li className="text-xs text-silver-mid flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-accent shrink-0 mt-0.5" />
                  <span>Audited 10,000+ invoices across tier-1 automotive manufacturing supplier networks.</span>
                </li>
                <li className="text-xs text-silver-mid flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-accent shrink-0 mt-0.5" />
                  <span>Automated audit reconciliation spreadsheets, cutting weekly reporting time by 30%.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="border-t border-hairline pt-8">
          <h3 className="font-mono text-xs text-cyan-accent uppercase tracking-widest mb-4 font-bold">
            03 // TECHNICAL EXPERTISE
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-silver-dark uppercase text-[10px]">Languages:</span>
              <div className="text-white mt-1">Java, Go (Golang), JavaScript (ES6+), TypeScript</div>
            </div>
            <div>
              <span className="text-silver-dark uppercase text-[10px]">Full-Stack &amp; Web:</span>
              <div className="text-white mt-1">React 19, Next.js, Node.js, Express.js, REST APIs, Tailwind CSS</div>
            </div>
            <div>
              <span className="text-silver-dark uppercase text-[10px]">Databases:</span>
              <div className="text-white mt-1">PostgreSQL, MySQL, MongoDB, Query Optimization</div>
            </div>
            <div>
              <span className="text-silver-dark uppercase text-[10px]">Tools &amp; DevOps:</span>
              <div className="text-white mt-1">Docker, Git, GitHub, Linux Shell, Postman</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
