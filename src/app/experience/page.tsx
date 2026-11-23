import { Metadata } from "next";
import { siteConfig } from "@/content/data/site-config";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { AnimatedTimeline } from "@/components/creative/AnimatedTimeline";
import { Award, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Journey",
  description: "Chronology of Mohan N.V.'s software engineering role at Veda Scholars, MCA scholarship, corporate accounting tenure at Gabriel India Ltd, and BCA foundations.",
};

export default function ExperiencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        index="JOURNEY"
        tag="Career &amp; Education"
        title="Professional Chronology"
        description="Tracing current engineering contributions at Veda Scholars, academic scholarship at Anna University, and corporate enterprise accounting precision."
      />

      {/* Primary Vertical Animated Timeline (Present at Top -> Past at Bottom) */}
      <AnimatedTimeline />

      {/* Additional Accreditations & Hackathons Matrix */}
      <div className="mt-20 pt-16 border-t border-border">
        <SectionHeader
          index="CREDENTIALS"
          tag="Verifiable Learning"
          title="Certifications &amp; Achievements"
          description="Verified course credentials from Scaler and Networkz System alongside technical conference presentations and hackathon competitions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Certifications Card */}
          <div className="studio-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border text-xs font-mono text-primary uppercase font-semibold">
              <Award className="w-4 h-4 text-primary" />
              <span>Course Accreditations</span>
            </div>
            <div className="space-y-3">
              {siteConfig.certifications.map((cert) => (
                <div key={cert.id} className="p-3.5 rounded-xl bg-surface border border-border flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-semibold text-sm text-foreground">{cert.title}</h4>
                    <span className="text-xs font-mono text-muted-foreground">{cert.issuer} • {cert.date}</span>
                  </div>
                  <span className="text-[10px] font-mono text-primary font-medium px-2 py-0.5 rounded-full bg-secondary border border-border">{cert.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathons & Research Card */}
          <div className="studio-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border text-xs font-mono text-champagne uppercase font-bold">
              <Sparkles className="w-4 h-4 text-champagne" />
              <span>Competitions &amp; Presentations</span>
            </div>
            <div className="space-y-3">
              {siteConfig.achievements.slice(0, 4).map((ach) => (
                <div key={ach.id} className="p-3.5 rounded-xl bg-surface border border-border">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-champagne font-semibold">{ach.event}</span>
                    <span className="text-muted-foreground">{ach.date}</span>
                  </div>
                  <h4 className="font-display font-semibold text-sm text-foreground">{ach.title}</h4>
                  {ach.description && (
                    <p className="text-xs text-muted-foreground mt-1 font-light">{ach.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
