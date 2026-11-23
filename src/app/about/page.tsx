import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/data/site-config";
import { experienceData } from "@/content/data/experience";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Download, GraduationCap, Briefcase, CheckCircle2, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Mohan N.V., his journey from corporate accounting at Gabriel India Ltd to full-stack software engineering and MCA scholarship.",
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        index="ABOUT"
        tag="Engineering Profile"
        title="Analytical Precision Meets Modern Web Architecture"
        description="Software engineer with a rigorous analytical background, holding an MCA from Adhiyamaan College of Engineering (2026) and BCA from MGR College of Arts and Science (2022)."
      />

      {/* Main Narrative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6 text-silver-mid text-sm sm:text-base leading-relaxed font-light">
          <p className="text-white text-lg font-normal leading-relaxed">
            I am a <strong>Full-Stack Developer and Software Engineer</strong> who believes that great software begins with deep structural clarity, disciplined data models, and an uncompromising commitment to performance.
          </p>

          <h3 className="font-display font-bold text-white text-xl mt-4">The Accounting Foundation</h3>
          <p>
            Before immersing myself in advanced full-stack software engineering, I spent two formative years (2022–2024) working as a <strong>Bill Booking Accountant at Gabriel India Ltd</strong>, one of India&apos;s foremost automotive component manufacturers. In that role, I audited, matched, and booked thousands of vendor invoices into enterprise ERP systems.
          </p>
          <p>
            In corporate accounting, data integrity is not a theoretical buzzword — a single misplaced decimal or duplicated entry can disrupt supply chains and fail audits. That experience permanently shaped my software engineering philosophy:
          </p>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0 mt-1" />
              <span><strong>Idempotent Operations:</strong> Every state change must be safe against network retries and duplicate submissions.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0 mt-1" />
              <span><strong>Relational Rigor:</strong> Foreign keys, constraints, and ACID transactions are essential shields against corrupted states.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0 mt-1" />
              <span><strong>Audit-Ready Systems:</strong> Software should produce clean, traceable logs and deterministic execution trails.</span>
            </li>
          </ul>

          <h3 className="font-display font-bold text-white text-xl mt-4">Computer Science Scholarship</h3>
          <p>
            Building upon my undergraduate <strong>BCA from MGR College of Arts and Science (2019–2022)</strong>, where I graduated with distinction, I am now completing my <strong>Master of Computer Applications (MCA) at Adhiyamaan College of Engineering (2024–2026)</strong>.
          </p>
          <p>
            My daily engineering toolkit centers around building high-concurrency microservices and APIs in <strong>Go and Java</strong>, full-stack digital products with <strong>React and Next.js</strong>, and robust relational data layers in <strong>PostgreSQL and MySQL</strong>, packaged with <strong>Docker</strong>.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <a href={siteConfig.resumeUrl} download="Mohan_NV_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="primary">
                <Download className="w-4 h-4 mr-1 text-black" />
                Download Complete Resume
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline">
                Contact Directly
              </Button>
            </Link>
          </div>
        </div>

        {/* Sidebar Info Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card hasDatumCorners className="p-6">
            <div className="text-xs font-mono text-cyan-accent uppercase tracking-widest mb-4">
              ACADEMIC CREDENTIALS
            </div>
            <div className="space-y-6">
              {siteConfig.education.map((edu) => (
                <div key={edu.id} className="pb-4 border-b border-hairline last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <GraduationCap className="w-4 h-4 text-cyan-accent shrink-0" />
                    <span>{edu.degree}</span>
                  </div>
                  <div className="text-xs font-mono text-silver-dark mt-1">
                    {edu.institution} • {edu.year}
                  </div>
                  <p className="text-xs text-silver-mid font-light mt-2">
                    {edu.field}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card hasDatumCorners className="p-6">
            <div className="text-xs font-mono text-violet-accent uppercase tracking-widest mb-4">
              ENTERPRISE TRACK RECORD
            </div>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Briefcase className="w-4 h-4 text-violet-accent shrink-0" />
              <span>Gabriel India Ltd</span>
            </div>
            <div className="text-xs font-mono text-silver-dark mt-1">
              Bill Booking Accountant • 2022 — 2024
            </div>
            <p className="text-xs text-silver-mid font-light mt-2 leading-relaxed">
              Managed vendor invoice verification, ERP ledger booking, and two-way reconciliation with zero discrepancy tolerance.
            </p>
          </Card>

          <Card hasDatumCorners className="p-6">
            <div className="text-xs font-mono text-emerald-accent uppercase tracking-widest mb-3">
              PRIMARY CODEBASE CAPABILITIES
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {["Go", "Java", "React", "Next.js", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "MySQL", "Docker", "Git", "REST APIs"].map((item) => (
                <span key={item} className="px-2.5 py-1 rounded-md bg-carbon border border-hairline text-silver-light text-[11px]">
                  {item}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
