"use client";

import React, { useState } from "react";
import { siteConfig } from "@/content/data/site-config";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { playChimeSuccess } from "@/lib/sound";
import { Mail, Send, CheckCircle2, ShieldCheck, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Full-Stack Opportunity",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    playChimeSuccess();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        index="CONTACT"
        tag="Direct Channel"
        title="Let's Connect &amp; Collaborate"
        description="Whether you have an engineering role, a full-stack project, or a technical inquiry, my direct channel is always open."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Card hasDatumCorners className="p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-2xl text-foreground uppercase">
                  Transmission Acknowledged
                </h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md font-light leading-relaxed">
                  Thank you for reaching out, <strong className="text-foreground">{formData.name}</strong>. I will review your message and reply promptly to <strong className="text-foreground">{formData.email}</strong>.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "Full-Stack Opportunity", message: "" });
                  }}
                  className="mt-6"
                >
                  Send Another Transmission
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                    TRANSMISSION PROTOCOL // SECURE FORM
                  </span>
                  <Badge variant="emerald" dot>Available</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground uppercase mb-1 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Chen"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-sans shadow-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-foreground uppercase mb-1 font-medium">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-sans shadow-xs transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase mb-1 font-medium">
                    Subject / Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-sans shadow-xs cursor-pointer"
                  >
                    <option value="Full-Stack Opportunity" className="bg-card text-foreground">Full-Stack Software Engineering Opportunity</option>
                    <option value="Backend Engineering Role" className="bg-card text-foreground">Backend (Go / Node.js) Engineering Role</option>
                    <option value="Freelance / Consulting Project" className="bg-card text-foreground">Custom Digital Product / Project</option>
                    <option value="Technical Discussion" className="bg-card text-foreground">General Technical Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase mb-1 font-medium">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe the opportunity, technical requirements, or timeline..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-sans shadow-xs transition-colors"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full shadow-md">
                  <Send className="w-4 h-4 mr-1 text-primary-foreground" />
                  Dispatch Transmission
                </Button>
              </form>
            )}
          </Card>
        </div>

        {/* Sidebar Direct Coordinates */}
        <div className="lg:col-span-5 space-y-6">
          <Card hasDatumCorners className="p-6">
            <h3 className="font-mono text-xs text-primary uppercase tracking-widest mb-4 font-bold">
              DIRECT DISPATCH
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">Primary Email</span>
                <a
                  href={`mailto:${siteConfig.socials.email}`}
                  className="block text-sm font-mono text-foreground hover:text-primary transition-colors mt-0.5"
                >
                  {siteConfig.socials.email}
                </a>
              </div>

              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">Verified Phone</span>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                  className="block text-sm font-mono text-foreground hover:text-primary transition-colors mt-0.5"
                >
                  {siteConfig.phone}
                </a>
              </div>

              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">Current Location</span>
                <div className="text-sm font-mono text-foreground mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{siteConfig.location.city}, {siteConfig.location.country}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">Timezone</span>
                <div className="text-sm font-mono text-foreground mt-0.5">
                  {siteConfig.location.timezone} (IST)
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <span className="text-[10px] font-mono text-muted-foreground uppercase">PGP Fingerprint</span>
                <div className="text-[11px] font-mono text-muted-foreground mt-0.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>4A7F 92B1 C83E 55E0 1A04</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
