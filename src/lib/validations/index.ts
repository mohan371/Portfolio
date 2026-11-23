import { z } from "zod";

// =============================================================================
// Zod Validation Schemas for Mohan N.V. Portfolio Platform
// Enforces strict data integrity across client forms, Server Actions, & API routes
// =============================================================================

// -----------------------------------------------------------------------------
// 1. ADMIN USER SCHEMAS
// -----------------------------------------------------------------------------
export const adminLoginSchema = z.object({
  email: z.string().email("Valid administrative email required").trim().toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const adminUserSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email().trim().toLowerCase(),
  full_name: z.string().min(2, "Full name must be at least 2 characters").trim(),
  role: z.enum(["superadmin", "admin", "editor"]).default("admin"),
});

// -----------------------------------------------------------------------------
// 2. SKILL SCHEMAS
// -----------------------------------------------------------------------------
export const skillSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Skill name is required").trim(),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  category: z.enum(["languages", "frontend", "backend", "databases", "devops", "architecture"]),
  level: z.enum(["Expert", "Advanced", "Proficient", "Familiar"]).default("Proficient"),
  years_of_experience: z.number().min(0).max(40).default(1),
  icon_name: z.string().nullable().optional(),
  is_featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
});

// -----------------------------------------------------------------------------
// 3. PROJECT SCHEMAS
// -----------------------------------------------------------------------------
export const architectureNodeSchema = z.object({
  layer: z.string().min(1),
  technology: z.string().min(1),
  responsibility: z.string().min(1),
});

export const engineeringChallengeSchema = z.object({
  title: z.string().min(1),
  challenge: z.string().min(1),
  resolution: z.string().min(1),
});

export const projectSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2, "Title is required").trim(),
  slug: z.string().min(2, "Slug is required").regex(/^[a-z0-9-]+$/),
  short_description: z.string().min(10, "Short description must be at least 10 characters").trim(),
  detailed_description: z.string().min(30, "Detailed description must be at least 30 characters").trim(),
  category: z.string().min(2, "Category is required").trim(),
  thumbnail_url: z.string().min(1, "Thumbnail URL or path is required"),
  github_url: z.string().url("Must be a valid URL").nullable().optional().or(z.literal("")),
  live_demo_url: z.string().url("Must be a valid URL").nullable().optional().or(z.literal("")),
  status: z.enum(["Completed", "In Development", "Production", "Archived"]).default("Completed"),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(true),
  start_date: z.string().nullable().optional(),
  completion_date: z.string().nullable().optional(),
  problem_statement: z.string().nullable().optional(),
  solution: z.string().nullable().optional(),
  architecture_summary: z.string().nullable().optional(),
  architecture_nodes: z.array(architectureNodeSchema).default([]),
  key_features: z.array(z.string()).default([]),
  challenges: z.array(engineeringChallengeSchema).default([]),
  lessons_learned: z.array(z.string()).default([]),
  sort_order: z.number().int().default(0),
  published_date: z.string().optional(),
});

// -----------------------------------------------------------------------------
// 4. PROJECT GALLERY SCHEMAS
// -----------------------------------------------------------------------------
export const projectGallerySchema = z.object({
  id: z.string().uuid().optional(),
  project_id: z.string().uuid(),
  image_url: z.string().min(1, "Image URL is required"),
  caption: z.string().nullable().optional(),
  alt_text: z.string().min(2, "Alt text required for accessibility"),
  display_order: z.number().int().default(0),
});

// -----------------------------------------------------------------------------
// 5. EXPERIENCE SCHEMAS
// -----------------------------------------------------------------------------
export const experienceSchema = z.object({
  id: z.string().uuid().optional(),
  role: z.string().min(2, "Role title is required").trim(),
  company: z.string().min(2, "Company name is required").trim(),
  company_url: z.string().url().nullable().optional().or(z.literal("")),
  period: z.string().min(2, "Period string required (e.g. 2022 — 2024)").trim(),
  start_date: z.string().min(4, "Start date required (YYYY-MM-DD)"),
  end_date: z.string().nullable().optional(),
  is_current: z.boolean().default(false),
  location: z.string().min(2, "Location is required").trim(),
  employment_type: z.enum(["Full-time", "Contract", "Internship", "Part-time"]).default("Full-time"),
  domain: z.string().nullable().optional(),
  description: z.string().min(10, "Description required"),
  highlights: z.array(z.string()).default([]),
  technologies_used: z.array(z.string()).default([]),
  is_published: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

// -----------------------------------------------------------------------------
// 6. EDUCATION SCHEMAS
// -----------------------------------------------------------------------------
export const educationSchema = z.object({
  id: z.string().uuid().optional(),
  degree: z.string().min(2, "Degree name is required").trim(),
  institution: z.string().min(2, "Institution name is required").trim(),
  institution_url: z.string().url().nullable().optional().or(z.literal("")),
  year: z.string().min(2, "Year display string is required (e.g. 2024 — 2026)").trim(),
  start_year: z.number().int().min(1990).max(2100),
  end_year: z.number().int().min(1990).max(2100),
  field: z.string().min(2, "Field of study is required").trim(),
  highlights: z.array(z.string()).default([]),
  is_published: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

// -----------------------------------------------------------------------------
// 7. BLOG ARTICLE SCHEMAS
// -----------------------------------------------------------------------------
export const blogArticleSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, "Title must be at least 3 characters").trim(),
  slug: z.string().min(3, "Slug is required").regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").trim(),
  content_markdown: z.string().min(50, "Content markdown must be at least 50 characters"),
  cover_image_url: z.string().nullable().optional(),
  category: z.string().min(2, "Category is required").trim(),
  read_time_minutes: z.number().int().min(1).max(60).default(5),
  tags: z.array(z.string()).default([]),
  is_published: z.boolean().default(true),
  published_at: z.string().optional(),
});

// -----------------------------------------------------------------------------
// 8. TESTIMONIAL SCHEMAS
// -----------------------------------------------------------------------------
export const testimonialSchema = z.object({
  id: z.string().uuid().optional(),
  author_name: z.string().min(2, "Author name required").trim(),
  author_role: z.string().min(2, "Author role required").trim(),
  author_company: z.string().min(2, "Author company required").trim(),
  author_avatar_url: z.string().nullable().optional(),
  content: z.string().min(10, "Recommendation content must be at least 10 characters").trim(),
  relationship: z.string().nullable().optional(),
  rating: z.number().int().min(1).max(5).default(5),
  is_verified: z.boolean().default(true),
  is_published: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

// -----------------------------------------------------------------------------
// 9. COMPANY PROFILE & SERVICES SCHEMAS
// -----------------------------------------------------------------------------
export const companyProfileSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, "Company name is required").trim(),
  tagline: z.string().min(5, "Tagline required").trim(),
  mission: z.string().min(10, "Mission statement required").trim(),
  description: z.string().min(20, "Description required").trim(),
  founded_year: z.number().int().default(2026),
  location: z.string().min(2, "Location required").trim(),
  contact_email: z.string().email("Valid company email required").trim().toLowerCase(),
  status: z.enum(["In Stealth / Formation", "Active", "Scaling"]).default("In Stealth / Formation"),
  metrics: z.record(z.string(), z.any()).default({}),
  is_published: z.boolean().default(true),
});

export const companyServiceSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2, "Service title required").trim(),
  slug: z.string().min(2, "Service slug required").regex(/^[a-z0-9-]+$/),
  description: z.string().min(10, "Service description required").trim(),
  deliverables: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

// -----------------------------------------------------------------------------
// 10. CONTACT ENQUIRY SCHEMAS (Inbound Messages)
// -----------------------------------------------------------------------------
export const contactEnquiryInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100).trim(),
  email: z.string().email("Please provide a valid email address").max(255).trim().toLowerCase(),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200).trim(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000).trim(),
  service_interest: z.string().max(100).nullable().optional(),
  budget_range: z.string().max(100).nullable().optional(),
});

export const contactEnquiryAdminUpdateSchema = z.object({
  status: z.enum(["unread", "in_review", "responded", "archived"]),
  admin_notes: z.string().max(2000).nullable().optional(),
});

// -----------------------------------------------------------------------------
// 11. WEBSITE SETTING SCHEMAS
// -----------------------------------------------------------------------------
export const websiteSettingSchema = z.object({
  id: z.string().uuid().optional(),
  key: z.string().min(2, "Setting key required").regex(/^[a-z0-9_]+$/, "Key must be lowercase snake_case"),
  value: z.any(),
  description: z.string().nullable().optional(),
  is_public: z.boolean().default(false),
});
