-- =============================================================================
-- Migration 000001: Initial Schema Definition for Mohan N.V. Portfolio Platform
-- Engine: PostgreSQL 15+ / Supabase
-- Author: Principal Architect
-- Date: 2026-11-23
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Automated updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------------------------------
-- 1. ADMIN USERS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin', 'editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_admin_users_updated_at
BEFORE UPDATE ON public.admin_users
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 2. SKILLS & TECHNOLOGIES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('languages', 'frontend', 'backend', 'databases', 'devops', 'architecture')),
  level TEXT NOT NULL DEFAULT 'Proficient' CHECK (level IN ('Expert', 'Advanced', 'Proficient', 'Familiar')),
  years_of_experience NUMERIC(3, 1) NOT NULL DEFAULT 1.0,
  icon_name TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_skills_category ON public.skills(category);
CREATE INDEX idx_skills_featured ON public.skills(is_featured);
CREATE INDEX idx_skills_sort ON public.skills(sort_order ASC);

CREATE TRIGGER set_skills_updated_at
BEFORE UPDATE ON public.skills
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 3. PROJECTS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  detailed_description TEXT NOT NULL,
  category TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  github_url TEXT,
  live_demo_url TEXT,
  status TEXT NOT NULL DEFAULT 'Completed' CHECK (status IN ('Completed', 'In Development', 'Production', 'Archived')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  start_date DATE,
  completion_date DATE,
  problem_statement TEXT,
  solution TEXT,
  architecture_summary TEXT,
  architecture_nodes JSONB DEFAULT '[]'::jsonb,
  key_features TEXT[] DEFAULT '{}',
  challenges JSONB DEFAULT '[]'::jsonb,
  lessons_learned TEXT[] DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0,
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_published ON public.projects(is_published);
CREATE INDEX idx_projects_featured ON public.projects(is_featured);
CREATE INDEX idx_projects_category ON public.projects(category);
CREATE INDEX idx_projects_sort ON public.projects(sort_order ASC, published_date DESC);

CREATE TRIGGER set_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 4. PROJECT TECHNOLOGIES (Relational Junction)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.project_technologies (
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (project_id, skill_id)
);

CREATE INDEX idx_proj_tech_skill ON public.project_technologies(skill_id);

-- -----------------------------------------------------------------------------
-- 5. PROJECT GALLERIES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.project_galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  alt_text TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_galleries_project ON public.project_galleries(project_id, display_order ASC);

-- -----------------------------------------------------------------------------
-- 6. EXPERIENCE (Career Chronology)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  company_url TEXT,
  period TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN NOT NULL DEFAULT false,
  location TEXT NOT NULL,
  employment_type TEXT NOT NULL DEFAULT 'Full-time' CHECK (employment_type IN ('Full-time', 'Contract', 'Internship', 'Part-time')),
  domain TEXT,
  description TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  technologies_used TEXT[] DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_experience_published ON public.experience(is_published);
CREATE INDEX idx_experience_sort ON public.experience(sort_order ASC, start_date DESC);

CREATE TRIGGER set_experience_updated_at
BEFORE UPDATE ON public.experience
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 7. EDUCATION
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  institution_url TEXT,
  year TEXT NOT NULL,
  start_year INT NOT NULL,
  end_year INT NOT NULL,
  field TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_education_published ON public.education(is_published);
CREATE INDEX idx_education_sort ON public.education(sort_order ASC, start_year DESC);

CREATE TRIGGER set_education_updated_at
BEFORE UPDATE ON public.education
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 8. BLOG ARTICLES (Engineering Journal)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  cover_image_url TEXT,
  category TEXT NOT NULL,
  read_time_minutes INT NOT NULL DEFAULT 5,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_articles_slug ON public.blog_articles(slug);
CREATE INDEX idx_articles_published ON public.blog_articles(is_published, published_at DESC);

CREATE TRIGGER set_blog_articles_updated_at
BEFORE UPDATE ON public.blog_articles
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 9. TESTIMONIALS & RECOMMENDATIONS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  author_company TEXT NOT NULL,
  author_avatar_url TEXT,
  content TEXT NOT NULL,
  relationship TEXT,
  rating INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_verified BOOLEAN NOT NULL DEFAULT true,
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_testimonials_published ON public.testimonials(is_published);

CREATE TRIGGER set_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 10. COMPANY PROFILE (Future Software Studio)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.company_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  mission TEXT NOT NULL,
  description TEXT NOT NULL,
  founded_year INT NOT NULL DEFAULT 2026,
  location TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'In Stealth / Formation' CHECK (status IN ('In Stealth / Formation', 'Active', 'Scaling')),
  metrics JSONB DEFAULT '{}'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_company_profile_updated_at
BEFORE UPDATE ON public.company_profile
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 11. COMPANY SERVICES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.company_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  deliverables TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_services_active ON public.company_services(is_active, sort_order ASC);

CREATE TRIGGER set_company_services_updated_at
BEFORE UPDATE ON public.company_services
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 12. CONTACT ENQUIRIES (Private Inbound Messages)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  service_interest TEXT,
  budget_range TEXT,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'in_review', 'responded', 'archived')),
  ip_hash TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_enquiries_status ON public.contact_enquiries(status, created_at DESC);

CREATE TRIGGER set_contact_enquiries_updated_at
BEFORE UPDATE ON public.contact_enquiries
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 13. WEBSITE SETTINGS (Key-Value Metadata)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.website_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_settings_key ON public.website_settings(key);
CREATE INDEX idx_settings_public ON public.website_settings(is_public);

CREATE TRIGGER set_website_settings_updated_at
BEFORE UPDATE ON public.website_settings
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
