import { z } from "zod";

export const studioEnquirySchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please provide a valid business or personal email address")
    .max(255)
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(7, "Please provide a valid phone or WhatsApp number")
    .max(20, "Phone number is too long")
    .regex(/^[+0-9\s\-()]{7,20}$/, "Phone format should only contain numbers, spaces, and +/()")
    .trim(),
  businessName: z
    .string()
    .max(150, "Business name must be under 150 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  projectType: z.enum([
    "Static Website",
    "Dynamic Website",
    "Full-Stack Web Application",
    "Business Website",
    "Landing Page",
    "Custom Dashboard",
    "API Integration",
    "Website Maintenance",
    "Custom Architecture & Consulting",
  ]),
  budgetRange: z.enum([
    "₹50,000 — ₹1,50,000 (Starter / MVP)",
    "₹1,50,000 — ₹3,50,000 (Professional)",
    "₹3,50,000 — ₹7,50,000 (Enterprise Tier)",
    "₹7,50,000+ (Custom Enterprise / Retainer)",
  ]),
  requirements: z
    .string()
    .min(15, "Please provide at least 15 characters describing your project goals")
    .max(5000, "Requirements description is too long")
    .trim(),
  expectedTimeline: z.enum([
    "< 2 Weeks (Rapid Launch)",
    "1 — 2 Months (Standard Milestone)",
    "3 — 6 Months (Complex Platform)",
    "Flexible / Ongoing Retainer",
  ]),
});

export type StudioEnquiryFormData = z.infer<typeof studioEnquirySchema>;
