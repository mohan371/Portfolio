"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { playTactileClick } from "@/lib/sound";
import { submitStudioEnquiryAction } from "@/app/studio/actions";
import {
  StudioProjectType,
  StudioBudgetRange,
  StudioTimeline,
} from "@/types/studio";
import {
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Building,
  Mail,
  Phone,
  User,
} from "lucide-react";

const PROJECT_TYPES: StudioProjectType[] = [
  "Static Website",
  "Dynamic Website",
  "Full-Stack Web Application",
  "Business Website",
  "Landing Page",
  "Custom Dashboard",
  "API Integration",
  "Website Maintenance",
  "Custom Architecture & Consulting",
];

const BUDGET_RANGES: StudioBudgetRange[] = [
  "₹50,000 — ₹1,50,000 (Starter / MVP)",
  "₹1,50,000 — ₹3,50,000 (Professional)",
  "₹3,50,000 — ₹7,50,000 (Enterprise Tier)",
  "₹7,50,000+ (Custom Enterprise / Retainer)",
];

const TIMELINES: StudioTimeline[] = [
  "< 2 Weeks (Rapid Launch)",
  "1 — 2 Months (Standard Milestone)",
  "3 — 6 Months (Complex Platform)",
  "Flexible / Ongoing Retainer",
];

export function StudioEnquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [projectType, setProjectType] = useState<StudioProjectType>("Full-Stack Web Application");
  const [budgetRange, setBudgetRange] = useState<StudioBudgetRange>("₹1,50,000 — ₹3,50,000 (Professional)");
  const [expectedTimeline, setExpectedTimeline] = useState<StudioTimeline>("1 — 2 Months (Standard Milestone)");
  const [requirements, setRequirements] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await submitStudioEnquiryAction({
        name,
        email,
        phone,
        businessName,
        projectType,
        budgetRange,
        requirements,
        expectedTimeline,
      });

      if (result.success && result.referenceId) {
        setSubmittedRef(result.referenceId);
      } else {
        setErrorMessage(result.error || "Unable to submit enquiry. Please try again or email directly.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    playTactileClick();
    setSubmittedRef(null);
    setName("");
    setEmail("");
    setPhone("");
    setBusinessName("");
    setRequirements("");
  };

  if (submittedRef) {
    return (
      <Card hasDatumCorners className="p-8 sm:p-10 bg-card border-emerald-500/50 shadow-card text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <Badge variant="cyan" dot className="mb-2">ENQUIRY TRANSMITTED</Badge>
          <h3 className="font-display font-bold text-2xl text-foreground">
            Project Proposal Received
          </h3>
          <p className="text-xs text-muted-foreground font-light max-w-md mx-auto mt-2 leading-relaxed">
            Thank you, <strong className="text-foreground">{name}</strong>. Your project brief has been securely cataloged into our studio intake queue. Mohan N.V. will review your requirements and respond within 24 business hours.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border inline-block text-left font-mono text-xs space-y-1">
          <div className="text-muted-foreground text-[10px] uppercase">INTAKE REFERENCE NUMBER</div>
          <div className="text-primary font-bold text-sm tracking-wider">{submittedRef}</div>
          <div className="text-muted-foreground text-[11px] pt-1">Direct confirmation queued to {email}</div>
        </div>

        <div>
          <Button variant="outline" size="sm" onClick={handleReset} className="text-xs font-mono gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            Submit Another Project Brief
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card hasDatumCorners className="p-6 sm:p-10 bg-card border-border shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-display font-bold text-xl text-foreground">
              Studio Project Intake &amp; Technical Consultation
            </h3>
          </div>
          <p className="text-xs text-muted-foreground font-light mt-1">
            Specify your technical requirements, desired timeline, and budget parameters to receive an architectural scope and milestone quote.
          </p>
        </div>

        <Badge variant="cyan" dot className="font-mono text-[10px]">
          GUARANTEED &lt;24HR SLA
        </Badge>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-500/50 text-red-700 dark:text-red-300 font-mono text-xs mb-6 flex items-start gap-2">
          <span>⚠</span>
          <div>
            <strong className="block text-red-800 dark:text-white">Validation Notice:</strong>
            {errorMessage}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
        {/* Row 1: Name, Email, Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-muted-foreground uppercase mb-1.5 font-medium">
              Your Full Name <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-muted-foreground absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Arun Krishnan"
                className="w-full bg-card border border-border rounded-xl pl-9 pr-3 py-2.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-muted-foreground uppercase mb-1.5 font-medium">
              Business or Personal Email <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="arun@company.com"
                className="w-full bg-card border border-border rounded-xl pl-9 pr-3 py-2.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-muted-foreground uppercase mb-1.5 font-medium">
              Phone / WhatsApp Number <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-muted-foreground absolute left-3 top-3 pointer-events-none" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-card border border-border rounded-xl pl-9 pr-3 py-2.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Business Name, Project Type, Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-muted-foreground uppercase mb-1.5 font-medium">
              Business / Organization Name
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-muted-foreground absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Acme Logistics or Stealth MVP"
                className="w-full bg-card border border-border rounded-xl pl-9 pr-3 py-2.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-muted-foreground uppercase mb-1.5 font-medium">
              Project Service Type <span className="text-primary">*</span>
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value as StudioProjectType)}
              className="w-full bg-card border border-border rounded-xl px-3 py-2.5 text-primary font-bold outline-none cursor-pointer shadow-xs"
            >
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t} className="bg-card text-foreground">
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-muted-foreground uppercase mb-1.5 font-medium">
              Estimated Budget Tier <span className="text-primary">*</span>
            </label>
            <select
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value as StudioBudgetRange)}
              className="w-full bg-card border border-border rounded-xl px-3 py-2.5 text-foreground outline-none cursor-pointer shadow-xs"
            >
              {BUDGET_RANGES.map((b) => (
                <option key={b} value={b} className="bg-card text-foreground">
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Expected Timeline */}
        <div>
          <label className="block text-muted-foreground uppercase mb-1.5 font-medium">
            Target Delivery Timeline <span className="text-primary">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {TIMELINES.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => {
                  playTactileClick();
                  setExpectedTimeline(t);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  expectedTimeline === t
                    ? "bg-primary text-primary-foreground font-bold shadow-xs border-primary"
                    : "bg-surface border-border text-muted-foreground hover:text-foreground hover:bg-surface-secondary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Row 4: Requirements Description */}
        <div>
          <label className="block text-muted-foreground uppercase mb-1.5 font-medium">
            Technical Requirements &amp; Project Description <span className="text-primary">*</span>
          </label>
          <textarea
            rows={4}
            required
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Describe your product vision, key features, target audience, any existing tech stack preferences (e.g. Next.js, PostgreSQL, Go), or design references..."
            className="w-full bg-card border border-border rounded-xl p-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary leading-relaxed font-sans text-xs shadow-xs transition-colors"
          />
        </div>

        {/* Form Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Strict NDA &amp; confidentiality applied to all client inquiries</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 text-xs font-mono font-bold shadow-md gap-2"
          >
            {isSubmitting ? (
              <Clock className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isSubmitting ? "TRANSMITTING PROPOSAL..." : "TRANSMIT CLIENT ENQUIRY"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
