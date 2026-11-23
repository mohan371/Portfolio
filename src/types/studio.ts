/**
 * Scalable Software Development Studio Types & Future Expansion Architecture
 * Author: Principal Architect
 * Prepared for future products, subscriptions, and client portals.
 */

export type StudioProjectType =
  | "Static Website"
  | "Dynamic Website"
  | "Full-Stack Web Application"
  | "Business Website"
  | "Landing Page"
  | "Custom Dashboard"
  | "API Integration"
  | "Website Maintenance"
  | "Custom Architecture & Consulting";

export type StudioBudgetRange =
  | "₹50,000 — ₹1,50,000 (Starter / MVP)"
  | "₹1,50,000 — ₹3,50,000 (Professional)"
  | "₹3,50,000 — ₹7,50,000 (Enterprise Tier)"
  | "₹7,50,000+ (Custom Enterprise / Retainer)";

export type StudioTimeline =
  | "< 2 Weeks (Rapid Launch)"
  | "1 — 2 Months (Standard Milestone)"
  | "3 — 6 Months (Complex Platform)"
  | "Flexible / Ongoing Retainer";

export interface StudioServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  estimatedDelivery: string;
  featured?: boolean;
}

export interface StudioPhilosophyPillar {
  number: string;
  title: string;
  principle: string;
  description: string;
  iconName: string;
}

export interface StudioProcessStep {
  step: string;
  title: string;
  timeline: string;
  summary: string;
  outputs: string[];
}

export interface StudioFaqItem {
  question: string;
  answer: string;
  category: "Engagement" | "Technical" | "Delivery" | "Pricing";
}

export interface StudioEnquiryInput {
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  projectType: StudioProjectType;
  budgetRange: StudioBudgetRange;
  requirements: string;
  expectedTimeline: StudioTimeline;
}

// -----------------------------------------------------------------------------
// FUTURE EXPANSION ARCHITECTURE (Products, Subscriptions, Client Portal)
// -----------------------------------------------------------------------------

export interface StudioProduct {
  id: string;
  name: string;
  tagline: string;
  category: "Developer Tool" | "Micro-SaaS" | "Design Template" | "API Engine";
  status: "In Conception" | "Alpha" | "Live";
  pricingModel: "One-Time" | "Monthly Subscription" | "Open Core";
  demoUrl?: string;
}

export interface StudioSubscriptionTier {
  id: string;
  name: string;
  monthlyPriceInr: number;
  description: string;
  slaResponseHours: number;
  features: string[];
  maxDevHoursPerMonth: number;
}

export interface StudioClientPortalConfig {
  portalEnabled: boolean;
  activeClientCount: number;
  features: {
    milestoneTracking: boolean;
    realtimeChat: boolean;
    invoiceBilling: boolean;
    codeRepositoryAccess: boolean;
  };
}
