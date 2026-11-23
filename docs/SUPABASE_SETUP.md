# Production Supabase & PostgreSQL Architecture Setup Guide

This document provides complete, step-by-step instructions for provisioning, configuring, securing, and operating the production PostgreSQL database backend for **Mohan N.V.'s Portfolio and Software Studio Platform**.

---

## Architecture Overview

```
                                 [CLIENT BROWSERS]
                                         │
                         Public Read (RLS: is_published)
                         Public Insert (Contact Enquiries Only)
                                         │
                                         ▼
                            [SUPABASE POSTGRESQL 15+]
               ┌─────────────────────────┴─────────────────────────┐
               │                                                   │
     [ROW LEVEL SECURITY]                                [STORAGE BUCKETS]
     • 13 Tables with RLS                                • portfolio-assets (Public Read, Admin Write)
     • is_admin() Security Definer                       • resumes (Public Read, Admin Write)
     • Private Contact Enquiries                         • 10MB image limit / 5MB PDF limit
               │
               ▼
   [NEXT.JS 16 SERVER LAYER]
   • Server Components & Server Actions
   • Zod Schema Validation
   • Encrypted Session Cookies
   • Decoupled Repository Data-Access Layer
```

---

## 1. Prerequisites

1. A [Supabase](https://supabase.com) account (Free or Pro tier).
2. Local development environment with Node.js 20+ and npm.
3. Supabase CLI (optional, but recommended): `npm install -g supabase` or run directly through the Supabase Web SQL Editor.

---

## 2. Database Migrations Execution

Migrations must be executed in sequence. You can apply them either via the **Supabase Dashboard SQL Editor** or via the **Supabase CLI**.

### Option A: Using the Supabase Web SQL Editor (Fastest)

1. Open your project on [database.new](https://database.new) or the [Supabase Dashboard](https://supabase.com/dashboard).
2. Navigate to the **SQL Editor** tab on the left sidebar.
3. Open and run the migration files in this exact chronological order:

#### Step 1: Initial Schema & Tables
- Open `supabase/migrations/20261123000001_initial_schema.sql`.
- Copy all contents, paste into the SQL Editor, and click **Run**.
- *Verification*: Inspect the **Table Editor** to confirm all 13 tables are present:
  - `admin_users`
  - `skills`
  - `projects`
  - `project_technologies`
  - `project_galleries`
  - `experience`
  - `education`
  - `blog_articles`
  - `testimonials`
  - `company_profile`
  - `company_services`
  - `contact_enquiries`
  - `website_settings`

#### Step 2: Row Level Security (RLS) & Policies
- Open `supabase/migrations/20261123000002_row_level_security.sql`.
- Copy all contents, paste into the SQL Editor, and click **Run**.
- *Verification*: Confirm that RLS is enabled on all 13 tables, the `public.is_admin()` function is created with `SECURITY DEFINER`, and strict read/write policies are in place.

#### Step 3: Storage Buckets & Storage RLS
- Open `supabase/migrations/20261123000003_storage_buckets.sql`.
- Copy all contents, paste into the SQL Editor, and click **Run**.
- *Verification*: Navigate to **Storage** in the dashboard and verify two buckets exist:
  - `portfolio-assets` (Public)
  - `resumes` (Public)

---

## 3. Database Seeding

To populate the database with Mohan N.V.'s authentic career, education, project, and studio data:

1. In the Supabase **SQL Editor**, open `supabase/seed.sql`.
2. Copy and execute the script.
3. *Verification*: Check `projects` (4 records), `skills` (14 records), `experience` (Gabriel India Ltd), `education` (Adhiyamaan College MCA & MGR College BCA), `blog_articles` (3 records), and `company_profile`.

---

## 4. Admin User Authentication & Bootstrapping

The system uses **Supabase Auth** with a linked record in `public.admin_users`.

### Step 1: Create the User in Supabase Auth
1. In the Supabase Dashboard, go to **Authentication** > **Users**.
2. Click **Add User** > **Create User**.
3. Enter:
   - **Email**: `mohannv.dev@gmail.com` (or your preferred admin email)
   - **Password**: A strong 12+ character password.
   - **Auto Confirm Email**: Checked (Yes).
4. Copy the generated `User UID` (a UUID like `12345678-abcd-...`).

### Step 2: Grant Administrator Role
Run this SQL snippet in the **SQL Editor**, replacing the UUID with your actual `User UID`:

```sql
INSERT INTO public.admin_users (id, email, full_name, role)
VALUES (
  'PASTE_YOUR_COPIED_USER_UID_HERE',
  'mohannv.dev@gmail.com',
  'Mohan N.V.',
  'superadmin'
)
ON CONFLICT (id) DO UPDATE SET
  role = 'superadmin';
```

---

## 5. Environment Variables Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Populate the values from your Supabase Dashboard (**Settings** > **API**):

```env
# Public Supabase URL & Anon Key (Accessible to browser)
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Strictly Server-Only Service Role Key
# NEVER expose to client code or prefix with NEXT_PUBLIC
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## 6. Security & Row Level Security (RLS) Verification

You can verify that your RLS policies are functioning correctly by testing from an unauthenticated context:

| Table | Anonymous / Public Access | Authorized Admin Access |
|---|---|---|
| `projects` | `SELECT` where `is_published = true` | Full CRUD |
| `skills` | `SELECT` all | Full CRUD |
| `experience` | `SELECT` where `is_published = true` | Full CRUD |
| `education` | `SELECT` where `is_published = true` | Full CRUD |
| `blog_articles` | `SELECT` where `is_published = true` | Full CRUD |
| `company_profile` | `SELECT` where `is_published = true` | Full CRUD |
| `contact_enquiries` | **`INSERT` ONLY** (`SELECT` / `UPDATE` / `DELETE` blocked) | Full CRUD |
| `admin_users` | **BLOCKED** | Read own profile / Superadmin CRUD |
| `website_settings` | `SELECT` where `is_public = true` | Full CRUD |
| Storage `portfolio-assets` | Public Read | Upload / Delete restricted to admin |
| Storage `resumes` | Public Read | Upload / Delete restricted to admin |

---

## 7. Graceful Offline Fallback

The data access layer (`src/lib/repositories/`) is designed with a **fail-safe offline fallback architecture**:
- When Supabase credentials are not present or when the network is unreachable, repositories fall back cleanly to static data in `@/content/data/`.
- This ensures that `next build` and local development remain 100% resilient and error-free regardless of external cloud status.
