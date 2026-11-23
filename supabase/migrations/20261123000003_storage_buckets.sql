-- =============================================================================
-- Migration 000003: Supabase Storage Buckets & Storage Security Policies
-- Engine: PostgreSQL 15+ / Supabase Storage
-- Author: Principal Architect
-- Date: 2026-11-23
-- =============================================================================

-- Create storage buckets if they do not exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  (
    'portfolio-assets',
    'portfolio-assets',
    true,
    10485760, -- 10MB limit
    ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif']
  ),
  (
    'resumes',
    'resumes',
    true,
    5242880, -- 5MB limit
    ARRAY['application/pdf']
  )
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- -----------------------------------------------------------------------------
-- STORAGE OBJECT POLICIES
-- -----------------------------------------------------------------------------

-- 1. Public Read Access for Assets
CREATE POLICY "Public Read Portfolio Assets"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'portfolio-assets');

-- 2. Public Read Access for Resumes
CREATE POLICY "Public Read Resumes"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'resumes');

-- 3. Admin Upload Access (Restricted to verified administrators)
CREATE POLICY "Admin Upload Storage Objects"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  (bucket_id IN ('portfolio-assets', 'resumes')) AND
  public.is_admin()
);

-- 4. Admin Update Access
CREATE POLICY "Admin Update Storage Objects"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  (bucket_id IN ('portfolio-assets', 'resumes')) AND
  public.is_admin()
)
WITH CHECK (
  (bucket_id IN ('portfolio-assets', 'resumes')) AND
  public.is_admin()
);

-- 5. Admin Delete Access
CREATE POLICY "Admin Delete Storage Objects"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  (bucket_id IN ('portfolio-assets', 'resumes')) AND
  public.is_admin()
);
