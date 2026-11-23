import { Metadata } from "next";
import { siteConfig } from "@/content/data/site-config";
import { experienceData } from "@/content/data/experience";
import { skillsData } from "@/content/data/skills";
import { Button } from "@/components/ui/button";
import { Download, Mail, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
  description: "Official interactive resume of Mohan N.V. — Full-Stack Developer & Software Engineer.",
};

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header Bar with Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-border gap-4">
        <div>
          <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            OFFICIAL RESUME // MOHAN N.V.
          </span>
          <h1 className="font-display text-3xl font-bold uppercase text-foreground tracking-tight mt-1">
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
            <Button variant="primary" size="sm" className="shadow-sm">
              <Download className="w-3.5 h-3.5 mr-1 text-primary-foreground" />
              Download PDF
            </Button>
          </a>

          <a href={`mailto:${siteConfig.socials.email}`}>
            <Button variant="outline" size="sm">
              <Mail className="w-3.5 h-3.5 mr-1 text-primary" />
              Hire Mohan
            </Button>
          </a>
        </div>
      </div>

      {/* Clean Printable Resume Sheet */}
      <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 space-y-10 shadow-card">
        {/* Identity & Header */}
        <div className="border-b border-border pb-8">
          <h2 className="font-display text-3xl font-bold uppercase text-foreground tracking-tight">
            {siteConfig.name}
          </h2>
          <div className="text-sm font-mono text-primary font-semibold mt-1">
            {siteConfig.role}
          </div>
          <p className="mt-3 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed max-w-2xl">
            {siteConfig.bio}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
            <span>{siteConfig.socials.email}</span>
            <span>•</span>
            <span>{siteConfig.phone}</span>
            <span>•</span>
            <span>{siteConfig.location.city}, {siteConfig.location.country}</span>
            <span>•</span>
            <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
              GitHub Profile
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
            02 // EDUCATION
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
    </div>
  );
}
