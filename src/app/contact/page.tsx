"use client";

import React, { useState } from "react";
import { siteConfig } from "@/content/data/site-config";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { playChimeSuccess } from "@/lib/sound";
import { Mail, Send, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";

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
                <div className="w-12 h-12 rounded-full bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-center text-emerald-accent mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white uppercase">
                  Transmission Acknowledged
                </h3>
                <p className="mt-2 text-sm text-silver-mid max-w-md font-light leading-relaxed">
                  Thank you for reaching out, <strong>{formData.name}</strong>. I will review your message and reply promptly to <strong>{formData.email}</strong>.
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
                <div className="flex items-center justify-between pb-3 border-b border-hairline">
                  <span className="text-xs font-mono text-cyan-accent uppercase tracking-wider">
                    TRANSMISSION PROTOCOL // SECURE FORM
                  </span>
                  <Badge variant="emerald" dot>Available</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-silver-dark uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Chen"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-carbon border border-hairline text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-accent font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-silver-dark uppercase mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-carbon border border-hairline text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-accent font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver-dark uppercase mb-1">
                    Subject / Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-carbon border border-hairline text-sm text-white focus:outline-none focus:border-cyan-accent font-sans"
                  >
                    <option value="Full-Stack Opportunity">Full-Stack Software Engineering Opportunity</option>
                    <option value="Backend Engineering Role">Backend (Go / Java) Engineering Role</option>
                    <option value="Freelance / Consulting Project">Custom Digital Product / Project</option>
                    <option value="Technical Discussion">General Technical Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver-dark uppercase mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe the opportunity, technical requirements, or timeline..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-carbon border border-hairline text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-accent font-sans"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-1 text-black" />
                  Dispatch Transmission
                </Button>
              </form>
            )}
          </Card>
        </div>

        {/* Sidebar Direct Coordinates */}
        <div className="lg:col-span-5 space-y-6">
          <Card hasDatumCorners className="p-6">
            <h3 className="font-mono text-xs text-cyan-accent uppercase tracking-widest mb-4 font-bold">
              DIRECT DISPATCH
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-silver-dark uppercase">Primary Email</span>
                <a
                  href={`mailto:${siteConfig.socials.email}`}
                  className="block text-sm font-mono text-foreground hover:text-cyan-accent transition-colors mt-0.5"
                >
                  {siteConfig.socials.email}
                </a>
              </div>

              <div>
                <span className="text-[10px] font-mono text-silver-dark uppercase">Verified Phone</span>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                  className="block text-sm font-mono text-foreground hover:text-cyan-accent transition-colors mt-0.5"
                >
                  {siteConfig.phone}
                </a>
              </div>

              <div>
                <span className="text-[10px] font-mono text-silver-dark uppercase">Current Location</span>
                <div className="text-sm font-mono text-white mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-accent" />
                  <span>{siteConfig.location.city}, {siteConfig.location.country}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-silver-dark uppercase">Timezone</span>
                <div className="text-sm font-mono text-white mt-0.5">
                  {siteConfig.location.timezone} (IST)
                </div>
              </div>

              <div className="pt-2 border-t border-hairline">
                <span className="text-[10px] font-mono text-silver-dark uppercase">PGP Fingerprint</span>
                <div className="text-[11px] font-mono text-silver-mid mt-0.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-accent" />
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
