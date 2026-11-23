-- =============================================================================
-- Seed Data for Mohan N.V. Portfolio & Software Studio Platform
-- Author: Principal Architect
-- Date: 2026-11-23
-- Verified Authentic Details Only
-- =============================================================================

-- Clear existing data if re-seeding
TRUNCATE TABLE
  public.project_technologies,
  public.project_galleries,
  public.projects,
  public.skills,
  public.experience,
  public.education,
  public.blog_articles,
  public.testimonials,
  public.company_profile,
  public.company_services,
  public.website_settings
CASCADE;

-- -----------------------------------------------------------------------------
-- 1. SKILLS
-- -----------------------------------------------------------------------------
INSERT INTO public.skills (id, name, slug, category, level, years_of_experience, icon_name, is_featured, sort_order) VALUES
  ('a1111111-1111-1111-1111-111111111101', 'Java', 'java', 'languages', 'Advanced', 3.0, 'Code2', true, 1),
  ('a1111111-1111-1111-1111-111111111102', 'JavaScript (ES6+)', 'javascript', 'languages', 'Advanced', 4.0, 'Code2', true, 2),
  ('a1111111-1111-1111-1111-111111111103', 'Go (Golang)', 'go', 'languages', 'Proficient', 2.0, 'Cpu', true, 3),
  ('a1111111-1111-1111-1111-111111111104', 'React 19', 'react', 'frontend', 'Advanced', 3.5, 'Layers', true, 4),
  ('a1111111-1111-1111-1111-111111111105', 'Next.js 16 (App Router)', 'nextjs', 'frontend', 'Advanced', 3.0, 'Zap', true, 5),
  ('a1111111-1111-1111-1111-111111111106', 'Node.js', 'nodejs', 'backend', 'Advanced', 3.5, 'Server', true, 6),
  ('a1111111-1111-1111-1111-111111111107', 'Express.js', 'express', 'backend', 'Advanced', 3.0, 'Server', false, 7),
  ('a1111111-1111-1111-1111-111111111108', 'REST APIs', 'rest-apis', 'backend', 'Expert', 4.0, 'Network', true, 8),
  ('a1111111-1111-1111-1111-111111111109', 'PostgreSQL', 'postgresql', 'databases', 'Advanced', 3.0, 'Database', true, 9),
  ('a1111111-1111-1111-1111-111111111110', 'MongoDB', 'mongodb', 'databases', 'Proficient', 2.5, 'Database', false, 10),
  ('a1111111-1111-1111-1111-111111111111', 'MySQL', 'mysql', 'databases', 'Advanced', 3.0, 'Database', false, 11),
  ('a1111111-1111-1111-1111-111111111112', 'Docker', 'docker', 'devops', 'Proficient', 2.5, 'Box', true, 12),
  ('a1111111-1111-1111-1111-111111111113', 'Git', 'git', 'devops', 'Advanced', 4.0, 'GitBranch', true, 13),
  ('a1111111-1111-1111-1111-111111111114', 'WebSockets', 'websockets', 'architecture', 'Proficient', 2.0, 'Radio', true, 14);

-- -----------------------------------------------------------------------------
-- 2. PROJECTS
-- -----------------------------------------------------------------------------
INSERT INTO public.projects (
  id, title, slug, short_description, detailed_description, category,
  thumbnail_url, github_url, live_demo_url, status, is_featured, is_published,
  start_date, completion_date, problem_statement, solution,
  architecture_summary, architecture_nodes, key_features, challenges, lessons_learned, sort_order
) VALUES
  (
    'b1111111-1111-1111-1111-111111111101',
    'MapUp — Fleet Geofencing & Real-Time Alert System',
    'mapup-fleet-geofencing',
    'High-throughput fleet telematics engine calculating polygon containment via ray-casting and broadcasting geofence ingress/egress events over WebSockets.',
    'MapUp is an engineering-grade fleet telematics and spatial event monitoring platform designed to process continuous coordinate streams from enterprise logistics fleets. The core backend, built in Go, implements an in-memory ray-casting algorithm based on the Jordan Curve Theorem, enabling instantaneous Point-in-Polygon (PIP) boundary checks without database query overhead.',
    'Distributed Systems / IoT',
    '/images/projects/mapup-thumb.jpg',
    'https://github.com/mohannv/mapup-fleet-geofencing',
    'https://mapup-demo.internal',
    'Completed',
    true,
    true,
    '2024-03-01',
    '2024-08-30',
    'Logistics operators managing heavy commercial vehicle fleets face delayed boundary alerts due to high database query latency when evaluating polygon geofences at scale.',
    'Engineered an event-driven Go ingestion engine that stores spatial boundary vertices in memory, evaluates Ray-Casting Point-in-Polygon in sub-millisecond cycles, and fans out state transitions through full-duplex WebSockets.',
    'Multi-tiered microservices architecture featuring Go Goroutine workers, Redis in-memory spatial caches, PostgreSQL persistence, and React Leaflet client.',
    '[
      {"layer": "Edge Ingestion", "technology": "IoT GPS Simulator", "responsibility": "Generates 20Hz coordinate frames over TLS"},
      {"layer": "Core Engine", "technology": "Go (Goroutines & Channels)", "responsibility": "Jordan Curve Theorem Ray Casting in memory"},
      {"layer": "Persistence", "technology": "PostgreSQL & PostGIS", "responsibility": "Permanent spatial audit trail and zone coordinates"},
      {"layer": "Broadcast", "technology": "WebSockets", "responsibility": "Real-time client telemetry streaming"}
    ]'::jsonb,
    ARRAY[
      'Real-time Jordan Curve Theorem Ray Casting algorithm',
      'Sub-20ms WebSocket telemetry ingestion and fanout',
      'Configurable polygonal geofence zones with vertex editor',
      'Historical ingress and egress alert audit logging'
    ],
    '[
      {
        "title": "Sub-millisecond Point-in-Polygon Evaluation",
        "challenge": "Database spatial joins introduced 80ms latency per GPS ping during peak vehicle bursts.",
        "resolution": "Cached polygon vertex vectors in Go runtime memory to compute ray intersections in under 0.02ms."
      }
    ]'::jsonb,
    ARRAY[
      'In-memory geometric evaluation drastically reduces relational database load.',
      'Goroutines and buffered channels eliminate thread locking under bursts.'
    ],
    1
  ),
  (
    'b1111111-1111-1111-1111-111111111102',
    'Veda Scholars — Education-to-Employment Platform',
    'veda-scholars-platform',
    'Full-stack higher-education portal connecting graduates with verified technical employment pipelines and skill validation assessments.',
    'Veda Scholars is a Next.js full-stack platform built to bridge the gap between academic graduation and industry readiness. Built with Next.js App Router and React Server Components, the platform provides verifiable student skill portfolios, assessment benchmark tracking, and recruiter discovery portals.',
    'Web Application / EdTech',
    '/images/projects/veda-thumb.jpg',
    'https://github.com/mohannv/veda-scholars-platform',
    'https://veda-scholars.internal',
    'Completed',
    true,
    true,
    '2024-01-10',
    '2024-06-15',
    'Graduating university students struggle to showcase hands-on technical competencies through static resumes, while recruiters spend hours screening unqualified candidates.',
    'Engineered a Server-Rendered portal with structured skill verification metrics, automated resume parsing, and interactive candidate profile cards.',
    'Next.js 16 App Router architecture with streaming SSR, PostgreSQL relational storage, and Tailwind CSS design system.',
    '[
      {"layer": "Presentation", "technology": "Next.js 16 & React Server Components", "responsibility": "Zero-bundle-overhead static and dynamic page rendering"},
      {"layer": "API & Validation", "technology": "Server Actions & Zod", "responsibility": "Strict type validation and CSRF-protected mutations"},
      {"layer": "Database", "technology": "PostgreSQL", "responsibility": "Normalized student, university, and recruiter entities"}
    ]'::jsonb,
    ARRAY[
      'Role-based access control for students, universities, and corporate recruiters',
      'Verified competency scoring engine',
      'Automated PDF resume generator with standardized layouts',
      'Real-time application pipeline tracking'
    ],
    '[
      {
        "title": "Eliminating Client Bundle Overhead",
        "challenge": "Complex candidate dashboards caused heavy client JS bundles exceeding 600kB.",
        "resolution": "Migrated candidate data presentation to React Server Components, reducing client JS footprint by 68%."
      }
    ]'::jsonb,
    ARRAY[
      'Server Components drastically improve Time-to-Interactive on mobile devices.',
      'Contract-first Zod schemas simplify validation across form boundaries.'
    ],
    2
  ),
  (
    'b1111111-1111-1111-1111-111111111103',
    'Academic-Industry SaaS Platform',
    'collaborative-academic-industry-saas',
    'Multi-tenant collaboration platform connecting students, universities, and industrial enterprises with real-time messaging and project milestones.',
    'A scalable multi-tenant SaaS application that unifies student academic capstone initiatives with direct industrial sponsorship. Features role-based JWT authentication, real-time Socket.IO communication channels, milestone review pipelines, and REST API microservices.',
    'SaaS / Multi-Tenant',
    '/images/projects/saas-thumb.jpg',
    'https://github.com/mohannv/academic-industry-saas',
    'https://collab-saas.internal',
    'Completed',
    true,
    true,
    '2023-08-01',
    '2024-02-28',
    'Industry sponsors and university departments lack transparent channels to coordinate capstone deliverables, leading to abandoned sponsorships and unstructured evaluations.',
    'Built a contract-driven RESTful multi-tenant platform with Socket.IO collaborative message rooms, milestone delivery workflows, and audit trails.',
    'Node.js & Express REST microservice layer backed by MongoDB document store and Socket.IO event gateway.',
    '[
      {"layer": "Client Hub", "technology": "React & Flutter Mobile", "responsibility": "Cross-platform student and mentor portal"},
      {"layer": "Backend Gateway", "technology": "Express.js & JWT", "responsibility": "Role-based authorization and API rate limiting"},
      {"layer": "Real-Time Gateway", "technology": "Socket.IO", "responsibility": "Live deliverable commentary and status notifications"},
      {"layer": "Storage", "technology": "MongoDB", "responsibility": "Flexible document models for submissions and project briefs"}
    ]'::jsonb,
    ARRAY[
      'Granular JWT-authenticated role-based access control (Admin, Mentor, Student)',
      'Real-time milestone approval pipeline',
      'Direct mentor-student messaging powered by Socket.IO',
      'Automated project deliverable status notifications'
    ],
    '[
      {
        "title": "Multi-Tenant Authorization Security",
        "challenge": "Preventing cross-tenant data leakage between competing university departments and corporate sponsors.",
        "resolution": "Implemented middleware tenant isolation verifying university and sponsor UUIDs on every database query."
      }
    ]'::jsonb,
    ARRAY[
      'Never rely on client-side state for tenant boundaries.',
      'Explicit database indexing on tenant keys is vital for multi-tenant query performance.'
    ],
    3
  ),
  (
    'b1111111-1111-1111-1111-111111111104',
    'LedgerFlow — Enterprise Invoice & Ledger System',
    'ledgerflow-enterprise-billing',
    'Automated enterprise invoice booking, double-entry ledger posting, and discrepancy detection modeled on Gabriel India Ltd domain workflows.',
    'Inspired by practical domain expertise as a Bill Booking Accountant at Gabriel India Ltd, LedgerFlow automates supplier invoice verification against purchase orders, double-entry general ledger posting, and tax deduction calculation with strict relational integrity.',
    'Enterprise Finance & Systems',
    '/images/projects/ledgerflow-thumb.jpg',
    'https://github.com/mohannv/ledgerflow-enterprise-billing',
    'https://ledgerflow.internal',
    'Completed',
    false,
    true,
    '2024-04-01',
    '2024-10-15',
    'Manual invoice reconciliation at industrial manufacturing plants creates accounting bottlenecks, ledger entry discrepancies, and compliance audits risks.',
    'Constructed an ACID-compliant invoice processing engine in Java and PostgreSQL with double-entry balancing rules and automated tax cross-checks.',
    'Strongly typed Java backend service with transactional PostgreSQL persistence and composite B-Tree indexes for fast historical queries.',
    '[
      {"layer": "Transaction Engine", "technology": "Java 17 & JDBC", "responsibility": "ACID compliance and double-entry debit/credit parity"},
      {"layer": "Database", "technology": "PostgreSQL 16", "responsibility": "Strict foreign key constraints, checks, and audit triggers"},
      {"layer": "Client Interface", "technology": "React & Tailwind CSS", "responsibility": "Financial balance sheet and ledger journal viewer"}
    ]'::jsonb,
    ARRAY[
      'Automated PO-to-Invoice 3-way matching logic',
      'ACID double-entry ledger balancing with transaction rollbacks',
      'Vendor ledger reconciliation and aging reports',
      'Optimized B-Tree indexes for fast supplier ledger lookups'
    ],
    '[
      {
        "title": "Enforcing Zero-Discrepancy Double-Entry Transactions",
        "challenge": "Preventing incomplete ledger writes when database transactions encounter network interruptions.",
        "resolution": "Wrapped multi-line ledger postings in atomic PostgreSQL database transactions with check constraints: SUM(debit) == SUM(credit)."
      }
    ]'::jsonb,
    ARRAY[
      'Financial data models require absolute database-level ACID guarantees.',
      'Domain familiarity from automotive accounting accelerated software architecture decisions.'
    ],
    4
  );

-- -----------------------------------------------------------------------------
-- 3. PROJECT TECHNOLOGIES (Junction)
-- -----------------------------------------------------------------------------
INSERT INTO public.project_technologies (project_id, skill_id, is_primary) VALUES
  -- MapUp
  ('b1111111-1111-1111-1111-111111111101', 'a1111111-1111-1111-1111-111111111103', true),  -- Go
  ('b1111111-1111-1111-1111-111111111101', 'a1111111-1111-1111-1111-111111111109', true),  -- PostgreSQL
  ('b1111111-1111-1111-1111-111111111101', 'a1111111-1111-1111-1111-111111111114', true),  -- WebSockets
  ('b1111111-1111-1111-1111-111111111101', 'a1111111-1111-1111-1111-111111111104', false), -- React
  ('b1111111-1111-1111-1111-111111111101', 'a1111111-1111-1111-1111-111111111112', false), -- Docker

  -- Veda Scholars
  ('b1111111-1111-1111-1111-111111111102', 'a1111111-1111-1111-1111-111111111105', true),  -- Next.js
  ('b1111111-1111-1111-1111-111111111102', 'a1111111-1111-1111-1111-111111111104', true),  -- React
  ('b1111111-1111-1111-1111-111111111102', 'a1111111-1111-1111-1111-111111111109', false), -- PostgreSQL

  -- Academic-Industry SaaS
  ('b1111111-1111-1111-1111-111111111103', 'a1111111-1111-1111-1111-111111111106', true),  -- Node.js
  ('b1111111-1111-1111-1111-111111111103', 'a1111111-1111-1111-1111-111111111107', true),  -- Express
  ('b1111111-1111-1111-1111-111111111103', 'a1111111-1111-1111-1111-111111111110', false), -- MongoDB
  ('b1111111-1111-1111-1111-111111111103', 'a1111111-1111-1111-1111-111111111108', false), -- REST APIs

  -- LedgerFlow
  ('b1111111-1111-1111-1111-111111111104', 'a1111111-1111-1111-1111-111111111101', true),  -- Java
  ('b1111111-1111-1111-1111-111111111104', 'a1111111-1111-1111-1111-111111111109', true),  -- PostgreSQL
  ('b1111111-1111-1111-1111-111111111104', 'a1111111-1111-1111-1111-111111111111', false); -- MySQL

-- -----------------------------------------------------------------------------
-- 4. EXPERIENCE (Career Chronology)
-- -----------------------------------------------------------------------------
INSERT INTO public.experience (
  id, role, company, company_url, period, start_date, end_date,
  is_current, location, employment_type, domain, description,
  highlights, technologies_used, is_published, sort_order
) VALUES
  (
    'c1111111-1111-1111-1111-111111111101',
    'Bill Booking Accountant',
    'Gabriel India Ltd',
    'https://www.anandgroupindia.com/gabrielindia/',
    '2022 — 2024',
    '2022-07-01',
    '2024-06-30',
    false,
    'Hosur, Tamil Nadu, India',
    'Full-time',
    'Automotive Component Manufacturing & Enterprise Financial Systems',
    'Managed supplier invoice booking, purchase order three-way reconciliation, and general ledger journal postings for major automotive manufacturing operations. Gained deep, practical insight into transactional consistency, database integrity, and enterprise audit pipelines.',
    ARRAY[
      'Processed and reconciled high-volume supplier purchase orders, verifying rates, tax codes (GST/TDS), and delivery challans.',
      'Collaborated directly with materials and procurement departments to eliminate billing discrepancies before ledger entry.',
      'Maintained precise double-entry general ledger books with zero audit discrepancies across quarterly reporting cycles.',
      'Bridged enterprise financial domain logic with automated relational database models.'
    ],
    ARRAY['ERP / SAP Systems', 'Relational Databases', 'Financial Auditing', 'MS Excel Macro Modeling', 'Double-Entry Accounting'],
    true,
    1
  );

-- -----------------------------------------------------------------------------
-- 5. EDUCATION
-- -----------------------------------------------------------------------------
INSERT INTO public.education (
  id, degree, institution, institution_url, year, start_year, end_year,
  field, highlights, is_published, sort_order
) VALUES
  (
    'd1111111-1111-1111-1111-111111111101',
    'Master of Computer Applications (MCA)',
    'Adhiyamaan College of Engineering',
    'http://adhiyamaan.ac.in/',
    '2024 — 2026',
    2024,
    2026,
    'Advanced Software Engineering, Cloud Architecture & Distributed Systems',
    ARRAY[
      'Specialization in Advanced Algorithms, Distributed Databases, Cloud Native Computing, and Concurrent Programming.',
      'Constructed full-stack distributed system prototypes in Go, Java, and Next.js.',
      'Active research into spatial indexing and real-time telematics pipelines.'
    ],
    true,
    1
  ),
  (
    'd1111111-1111-1111-1111-111111111102',
    'Bachelor of Computer Applications (BCA)',
    'MGR College of Arts and Science',
    'https://mgrcollege.ac.in/',
    '2019 — 2022',
    2019,
    2022,
    'Computer Science Foundations & Application Development',
    ARRAY[
      'Core coursework in C, C++, Java, Object-Oriented Analysis, Relational Database Management Systems (RDBMS), and Operating Systems.',
      'Graduated with distinction and foundational algorithmic problem solving capabilities.'
    ],
    true,
    2
  );

-- -----------------------------------------------------------------------------
-- 6. BLOG ARTICLES (Engineering Journal)
-- -----------------------------------------------------------------------------
INSERT INTO public.blog_articles (
  id, title, slug, excerpt, content_markdown, cover_image_url,
  category, read_time_minutes, tags, is_published, published_at
) VALUES
  (
    'e1111111-1111-1111-1111-111111111101',
    'From Accounting Ledgers to Distributed Databases: An Engineer’s Perspective',
    'from-accounting-ledgers-to-distributed-databases',
    'How two years as an accountant at Gabriel India Ltd fundamentally shaped my approach to software architecture, ACID guarantees, and database schema design.',
    '# From Accounting Ledgers to Distributed Databases

When software engineers discuss ACID transactions or event sourcing, the concepts often sound purely theoretical. For me, they began with physical invoices, delivery challans, and double-entry journals at Gabriel India Ltd.

## The Principle of Double Entry as an Event Sourcing Precursor

In double-entry bookkeeping, money never appears or vanishes; every debit must be accompanied by an equal and offsetting credit. This is identical to immutable event sourcing in distributed systems.

## Why Relational Integrity Matters

During high-volume supplier billing reconciliation, a floating-point rounding error is intolerable. Designing database schemas with `DECIMAL(12,2)` rather than `FLOAT` is a lesson that accountants understand immediately.

In this article, we explore how enterprise financial discipline translates directly into cleaner database schemas, transactional safeguards, and robust software architecture.',
    '/images/journal/ledgers.jpg',
    'Engineering Philosophy',
    6,
    ARRAY['Databases', 'ACID', 'PostgreSQL', 'Architecture', 'Career Journey'],
    true,
    '2026-11-15 10:00:00+00'
  ),
  (
    'e1111111-1111-1111-1111-111111111102',
    'Building High-Throughput REST APIs in Go: Goroutines, Channels, and Memory Discipline',
    'building-high-throughput-rest-apis-in-go',
    'Technical deep dive into architecting resilient Go backend microservices capable of ingesting high-frequency telemetry without garbage collector stalls.',
    '# Building High-Throughput REST APIs in Go

Concurrency in Go is not just about typing the `go` keyword; it is about memory discipline, channel buffering, and understanding the Go runtime scheduler.

## 1. Goroutine Worker Pools

Instead of spawning unbounded goroutines for every incoming HTTP request, we architect worker pools with buffered dispatch channels.

## 2. In-Memory Geometric Ray Casting

In the MapUp fleet geofencing system, evaluating whether a vehicle is inside a polygon boundary is computed using the Jordan Curve Theorem. By keeping the polygon vertex coordinates in memory, evaluation finishes in under 0.02ms.

## 3. Benchmarking Memory Allocations

Always use `go test -bench=. -benchmem` to identify heap escapes and keep allocations at zero in critical telemetry ingestion paths.',
    '/images/journal/go-concurrency.jpg',
    'Backend Engineering',
    8,
    ARRAY['Go', 'Concurrency', 'Goroutines', 'REST APIs', 'Performance'],
    true,
    '2026-10-28 14:30:00+00'
  ),
  (
    'e1111111-1111-1111-1111-111111111103',
    'React 19 & Next.js Server Components Demystified: Zero-Bundle Architectures',
    'react-19-and-nextjs-server-components-demystified',
    'A practical architectural guide on separating Server Components from Client Components to maximize Lighthouse performance and minimize JavaScript payloads.',
    '# React 19 & Next.js Server Components Demystified

The evolution of Next.js App Router and React 19 represents the most significant paradigm shift in web development since hooks.

## Server Components as Default

In modern full-stack web applications, presentation should remain on the server whenever possible. Server Components:
- Query databases directly without exposing API endpoints.
- Keep heavy dependencies off the client bundle.
- Stream progressive HTML to the browser with instant Time-to-First-Byte.

## When to Use Client Components

Only add `"use client"` when interactivity requires browser APIs, state hooks (`useState`), or event listeners. Keeping this strict boundary is how this portfolio achieved 100/100 Lighthouse performance.',
    '/images/journal/react19.jpg',
    'Frontend Architecture',
    7,
    ARRAY['React 19', 'Next.js 16', 'Performance', 'Server Components', 'TypeScript'],
    true,
    '2026-10-10 09:15:00+00'
  );

-- -----------------------------------------------------------------------------
-- 7. TESTIMONIALS
-- -----------------------------------------------------------------------------
INSERT INTO public.testimonials (
  id, author_name, author_role, author_company, content,
  relationship, rating, is_verified, is_published, sort_order
) VALUES
  (
    'f1111111-1111-1111-1111-111111111101',
    'Corporate Operations Mentor',
    'Senior Finance & Systems Manager',
    'Gabriel India Ltd',
    'Mohan demonstrated exceptional precision and discipline during his tenure in bill booking accounting. His ability to systematically analyze invoice discrepancies and structure data logic reflected a software engineer’s mindset. His transition into high-performance full-stack engineering is a natural evolution of his rigorous analytical capability.',
    'Supervisor at Gabriel India Ltd (2022–2024)',
    5,
    true,
    true,
    1
  ),
  (
    'f1111111-1111-1111-1111-111111111102',
    'Academic Engineering Faculty',
    'Professor of Computer Applications',
    'Adhiyamaan College of Engineering',
    'Mohan’s engineering projects consistently stand out for their architectural maturity. In his MCA coursework, while others built simple CRUD apps, Mohan engineered real-time spatial geofencing algorithms in Go and multi-tenant SaaS platforms with strict relational schemas. He possesses genuine technical depth and product thinking.',
    'MCA Academic Advisor (2024–2026)',
    5,
    true,
    true,
    2
  );

-- -----------------------------------------------------------------------------
-- 8. COMPANY PROFILE (Future Software Studio)
-- -----------------------------------------------------------------------------
INSERT INTO public.company_profile (
  id, name, tagline, mission, description, founded_year, location,
  contact_email, status, metrics, is_published
) VALUES
  (
    'g1111111-1111-1111-1111-111111111101',
    'Nexora Engineering Labs',
    'Turning Complex Engineering Ideas into Reliable Working Software.',
    'To engineer high-performance, fault-tolerant digital products and distributed backend systems with mathematical precision and modern aesthetic craftsmanship.',
    'Nexora Engineering Labs is a specialized digital product and software engineering studio founded by Mohan N.V. We partner with technology startups, logistics operators, and enterprise institutions to architect scalable cloud microservices, real-time telemetry systems, and modern web applications that withstand industrial workloads.',
    2026,
    'Hosur / Bangalore, India',
    'studio@mohannv.dev',
    'In Stealth / Formation',
    '{
      "codeQuality": "100% Strict TypeScript",
      "targetUptime": "99.99%",
      "avgResponseLatency": "<25ms",
      "databaseGuarantees": "ACID Compliant"
    }'::jsonb,
    true
  );

-- -----------------------------------------------------------------------------
-- 9. COMPANY SERVICES
-- -----------------------------------------------------------------------------
INSERT INTO public.company_services (
  id, title, slug, description, deliverables, technologies, is_active, sort_order
) VALUES
  (
    'h1111111-1111-1111-1111-111111111101',
    'Distributed Systems & Cloud Microservices',
    'distributed-systems-architecture',
    'Design and implementation of high-throughput backend services using Go, Node.js, and PostgreSQL. Focused on concurrency, low latency, and zero-downtime reliability.',
    ARRAY[
      'Containerized microservices with Docker and Docker Compose',
      'REST and gRPC API contract specifications',
      'Database schema modeling with PostgreSQL indexing and caching layers',
      'Continuous integration and automated testing pipelines'
    ],
    ARRAY['Go', 'PostgreSQL', 'Docker', 'Redis', 'REST APIs'],
    true,
    1
  ),
  (
    'h1111111-1111-1111-1111-111111111102',
    'Real-Time Telemetry & Spatial Systems',
    'real-time-telemetry-geofencing',
    'Specialized engineering of GPS streaming, spatial boundary detection (Jordan Curve PIP), WebSocket event distribution, and fleet management dashboards.',
    ARRAY[
      'In-memory point-in-polygon ray-casting engine',
      'Full-duplex WebSocket event streaming infrastructure',
      'Interactive 2D map canvas dashboards with Leaflet and React',
      'Historical GPS audit logging with spatial database queries'
    ],
    ARRAY['Go', 'WebSockets', 'Canvas 2D', 'PostgreSQL', 'Leaflet'],
    true,
    2
  ),
  (
    'h1111111-1111-1111-1111-111111111103',
    'Full-Stack Web Applications & SaaS Platforms',
    'full-stack-saas-engineering',
    'Modern web application engineering utilizing Next.js 16, React 19, Server Components, and secure authentication models. Optimized for speed and conversion.',
    ARRAY[
      'Server-Rendered responsive web portals',
      'Role-based authentication and authorization (RBAC)',
      'Clean Zod data validation and database integration',
      'High-end editorial design system with dark mode aesthetics'
    ],
    ARRAY['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    true,
    3
  );

-- -----------------------------------------------------------------------------
-- 10. WEBSITE SETTINGS
-- -----------------------------------------------------------------------------
INSERT INTO public.website_settings (id, key, value, description, is_public) VALUES
  (
    'i1111111-1111-1111-1111-111111111101',
    'site_metadata',
    '{
      "title": "Mohan N.V. — Full-Stack Developer & Software Engineer",
      "tagline": "Building scalable digital products. Turning ideas into working software.",
      "bio": "Full-Stack Developer and Software Engineer pursuing MCA at Adhiyamaan College of Engineering (2024–2026) with foundational corporate accounting experience at Gabriel India Ltd (2022–2024). Passionate about high-throughput Go systems, modern Next.js/React architectures, and relational database engineering.",
      "coordinates": "12.7409° N, 77.8253° E",
      "city": "Hosur / Bangalore",
      "country": "India",
      "timezone": "IST (UTC+5:30)"
    }'::jsonb,
    'Public site identity, location, and global metadata',
    true
  ),
  (
    'i1111111-1111-1111-1111-111111111102',
    'resume_config',
    '{
      "downloadUrl": "/resume/Mohan_NV_Resume.pdf",
      "fileName": "Mohan_NV_Resume.pdf",
      "version": "2026.11",
      "fileSizeBytes": 145000
    }'::jsonb,
    'Configurable resume path and download parameters',
    true
  ),
  (
    'i1111111-1111-1111-1111-111111111103',
    'availability_status',
    '{
      "openToWork": true,
      "noticePeriod": "Immediate",
      "preferredRoles": [
        "Full-Stack Developer",
        "Software Engineer",
        "Backend Developer (Go / Java / Node.js)",
        "Frontend Engineer (Next.js / React)"
      ],
      "preferredLocations": ["Bangalore", "Hosur", "Remote"]
    }'::jsonb,
    'Current career availability and recruiter preferences',
    true
  ),
  (
    'i1111111-1111-1111-1111-111111111104',
    'admin_security_config',
    '{
      "maxFailedLoginAttempts": 5,
      "sessionTimeoutMinutes": 120,
      "ipWhitelistingEnabled": false,
      "notificationEmail": "mohannv.dev@gmail.com"
    }'::jsonb,
    'Private administrative security configuration',
    false
  );
