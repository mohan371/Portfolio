-- =============================================================================
-- Migration 000002: Row Level Security (RLS) & Granular Access Control
-- Engine: PostgreSQL 15+ / Supabase
-- Author: Principal Architect
-- Date: 2026-11-23
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. SECURITY DEFINER HELPER: is_admin()
-- Evaluates whether the currently authenticated session belongs to a verified admin.
-- Runs with DEFINER privileges to inspect public.admin_users securely.
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public, auth, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  -- If not authenticated, immediately return false
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;

  RETURN EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE id = auth.uid()
      AND role IN ('superadmin', 'admin', 'editor')
  );
END;
$$;

-- Grant execution permission to authenticated and service roles
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;

-- -----------------------------------------------------------------------------
-- 2. ENABLE ROW LEVEL SECURITY ACROSS ALL TABLES
-- -----------------------------------------------------------------------------
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 3. POLICIES: admin_users
-- Admins can view their own profile; superadmins can manage all.
-- -----------------------------------------------------------------------------
CREATE POLICY "Admins can view own profile or all if admin"
ON public.admin_users
FOR SELECT
TO authenticated
USING (
  auth.uid() = id OR public.is_admin()
);

CREATE POLICY "Admins can insert or modify admin records"
ON public.admin_users
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 4. POLICIES: skills
-- Public can read all skills; admins have full mutation privileges.
-- -----------------------------------------------------------------------------
CREATE POLICY "Public read skills"
ON public.skills
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin manage skills"
ON public.skills
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 5. POLICIES: projects
-- Public can read published projects; admins can read all and mutate.
-- -----------------------------------------------------------------------------
CREATE POLICY "Public read published projects"
ON public.projects
FOR SELECT
TO anon, authenticated
USING (
  is_published = true OR public.is_admin()
);

CREATE POLICY "Admin manage projects"
ON public.projects
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 6. POLICIES: project_technologies
-- Public read junction table; admins manage associations.
-- -----------------------------------------------------------------------------
CREATE POLICY "Public read project technologies"
ON public.project_technologies
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin manage project technologies"
ON public.project_technologies
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 7. POLICIES: project_galleries
-- Public read gallery items; admins manage images.
-- -----------------------------------------------------------------------------
CREATE POLICY "Public read project galleries"
ON public.project_galleries
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin manage project galleries"
ON public.project_galleries
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 8. POLICIES: experience
-- Public read published experiences; admins manage.
-- -----------------------------------------------------------------------------
CREATE POLICY "Public read published experience"
ON public.experience
FOR SELECT
TO anon, authenticated
USING (
  is_published = true OR public.is_admin()
);

CREATE POLICY "Admin manage experience"
ON public.experience
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 9. POLICIES: education
-- Public read published education; admins manage.
-- -----------------------------------------------------------------------------
CREATE POLICY "Public read published education"
ON public.education
FOR SELECT
TO anon, authenticated
USING (
  is_published = true OR public.is_admin()
);

CREATE POLICY "Admin manage education"
ON public.education
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 10. POLICIES: blog_articles
-- Public read published articles; admins manage.
-- -----------------------------------------------------------------------------
CREATE POLICY "Public read published articles"
ON public.blog_articles
FOR SELECT
TO anon, authenticated
USING (
  is_published = true OR public.is_admin()
);

CREATE POLICY "Admin manage articles"
ON public.blog_articles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 11. POLICIES: testimonials
-- Public read published testimonials; admins manage.
-- -----------------------------------------------------------------------------
CREATE POLICY "Public read published testimonials"
ON public.testimonials
FOR SELECT
TO anon, authenticated
USING (
  is_published = true OR public.is_admin()
);

CREATE POLICY "Admin manage testimonials"
ON public.testimonials
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 12. POLICIES: company_profile
-- Public read published studio profile; admins manage.
-- -----------------------------------------------------------------------------
CREATE POLICY "Public read company profile"
ON public.company_profile
FOR SELECT
TO anon, authenticated
USING (
  is_published = true OR public.is_admin()
);

CREATE POLICY "Admin manage company profile"
ON public.company_profile
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 13. POLICIES: company_services
-- Public read active studio services; admins manage.
-- -----------------------------------------------------------------------------
CREATE POLICY "Public read company services"
ON public.company_services
FOR SELECT
TO anon, authenticated
USING (
  is_active = true OR public.is_admin()
);

CREATE POLICY "Admin manage company services"
ON public.company_services
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 14. POLICIES: contact_enquiries
-- CRITICAL SECURITY REQUIREMENT:
-- Public can ONLY INSERT an enquiry.
-- Public can NEVER SELECT, UPDATE, or DELETE any enquiry.
-- Only verified admins can view or manage inbound enquiries.
-- -----------------------------------------------------------------------------
CREATE POLICY "Public insert contact enquiry"
ON public.contact_enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) >= 2 AND
  length(email) >= 5 AND
  length(subject) >= 3 AND
  length(message) >= 10
);

CREATE POLICY "Admin select contact enquiries"
ON public.contact_enquiries
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admin update contact enquiries"
ON public.contact_enquiries
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin delete contact enquiries"
ON public.contact_enquiries
FOR DELETE
TO authenticated
USING (public.is_admin());

-- -----------------------------------------------------------------------------
-- 15. POLICIES: website_settings
-- Public can ONLY read settings flagged as is_public = true.
-- Private system settings and admin config remain secret.
-- -----------------------------------------------------------------------------
CREATE POLICY "Public read public settings"
ON public.website_settings
FOR SELECT
TO anon, authenticated
USING (
  is_public = true OR public.is_admin()
);

CREATE POLICY "Admin manage website settings"
ON public.website_settings
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());
