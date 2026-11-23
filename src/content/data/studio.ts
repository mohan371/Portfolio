import {
  StudioServiceItem,
  StudioPhilosophyPillar,
  StudioProcessStep,
  StudioFaqItem,
} from "@/types/studio";

export const studioConfig = {
  name: "Nexora Engineering Labs",
  brandSubtitle: "Software Development Studio // Founded & Led by Mohan N.V.",
  tagline: "Turning Complex Engineering Ideas into Reliable Working Software.",
  mission:
    "We partner with forward-thinking businesses, founders, and enterprises to design, architect, and engineer high-performance web applications, distributed systems, and modern digital platforms that withstand real-world operational scale.",
  founder: {
    name: "Mohan N.V.",
    role: "Founder & Principal Software Engineer",
    credentials: "MCA (Adhiyamaan 2026) • BCA (MGR 2022) • Software Engineer @ Veda Scholars",
    portfolioUrl: "/",
  },
  location: {
    city: "Hosur, Tamil Nadu",
    country: "India",
    timezone: "IST (UTC+5:30)",
  },
  contact: {
    email: "studio@mohannv.dev",
    directEmail: "mohannv.dev@gmail.com",
    responseTime: "Timely response within standard business hours",
  },
};

export const studioPhilosophy: StudioPhilosophyPillar[] = [
  {
    number: "01",
    title: "Type Safety & Mathematical Rigor",
    principle: "Strict Type Systems Eliminate Runtime Surprises",
    description:
      "We build with strict TypeScript and runtime schema validation (Zod) across all client-server boundaries. Data entering and leaving systems is verified before execution.",
    iconName: "ShieldCheck",
  },
  {
    number: "02",
    title: "Transactional Discipline",
    principle: "Data Integrity is Completely Non-Negotiable",
    description:
      "Our database designs prioritize ACID compliance, clean normalized schemas, indexed queries, and zero data discrepancies.",
    iconName: "Database",
  },
  {
    number: "03",
    title: "Zero-Overhead Performance",
    principle: "Sub-Second Responses Are a Fundamental Feature",
    description:
      "We reject gratuitous JavaScript bloat. Utilizing Next.js Server Components, streaming SSR, and indexed database queries, our platforms are engineered for rapid load times.",
    iconName: "Zap",
  },
  {
    number: "04",
    title: "Direct Source Code Delivery",
    principle: "Un-Obfuscated Repositories with Full Deployment Freedom",
    description:
      "No proprietary runtime lock-in. Clients receive clean Git repository handoffs, environment configuration files, structured documentation, and automated deployment pipelines.",
    iconName: "GitBranch",
  },
];

export const studioServices: StudioServiceItem[] = [
  {
    id: "srv-static",
    slug: "static-websites",
    title: "Static Websites",
    tagline: "Ultra-fast, zero-overhead corporate and editorial web presences.",
    description:
      "Lightweight, beautifully typeset static web platforms pre-rendered at build time. Ideal for portfolios, creative studios, and documentation with near-instantaneous global CDN loading.",
    deliverables: [
      "Prerendered HTML/CSS with minimal server latency",
      "Custom responsive design system with dark/light themes",
      "Semantic HTML, accessible structure, and performance optimization",
      "Automated Git-triggered CDN deployments",
    ],
    technologies: ["Next.js SSG", "React 19", "Tailwind CSS", "TypeScript"],
    estimatedDelivery: "1 — 2 Weeks",
    featured: true,
  },
  {
    id: "srv-dynamic",
    slug: "dynamic-websites",
    title: "Dynamic Websites",
    tagline: "Content-managed web portals with real-time interactivity.",
    description:
      "Dynamic, database-backed web experiences allowing non-technical teams to author content, publish articles, and manage media without touching code.",
    deliverables: [
      "Headless CMS integration (PostgreSQL or Markdown)",
      "Dynamic server-side rendering (SSR) and edge caching",
      "Search, tag filtering, and pagination engines",
      "Role-based administrative control panels",
    ],
    technologies: ["Next.js App Router", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    estimatedDelivery: "2 — 4 Weeks",
  },
  {
    id: "srv-fullstack",
    slug: "full-stack-web-applications",
    title: "Full-Stack Web Applications",
    tagline: "Production-ready digital products with complete business logic.",
    description:
      "End-to-end software product development from relational schema design and authentication to interactive client HUDs and background worker queues.",
    deliverables: [
      "Scalable multi-tiered architecture (Presentation, Logic, Data)",
      "Secure authentication, sessions, and Row Level Security (RLS)",
      "Zod-validated Server Actions and REST API endpoints",
      "Relational PostgreSQL persistence with composite indexing",
    ],
    technologies: ["Next.js 16", "React 19", "PostgreSQL", "Node.js", "Docker"],
    estimatedDelivery: "4 — 8 Weeks",
    featured: true,
  },
  {
    id: "srv-business",
    slug: "business-websites",
    title: "Business Websites",
    tagline: "Credibility-focused digital platforms engineered for conversion.",
    description:
      "Authoritative commercial websites tailored for industrial manufacturers, professional consultancies, healthcare, and engineering firms requiring serious digital presence.",
    deliverables: [
      "Industry-specific brand positioning and editorial copywriting",
      "Interactive service catalogs and specification sheets",
      "Lead generation workflows and contact enquiry routing",
      "Domain setup, TLS certification, and corporate email integration",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Zod", "PostgreSQL"],
    estimatedDelivery: "2 — 4 Weeks",
  },
  {
    id: "srv-landing",
    slug: "landing-pages",
    title: "High-Conversion Landing Pages",
    tagline: "Laser-focused product launch and campaign destinations.",
    description:
      "High-impact, cinematic landing pages optimized to explain complex value propositions and convert visitors into qualified leads or beta signups.",
    deliverables: [
      "Custom motion design and scroll-triggered visual reveals",
      "Clear layout structure with conversion-focused calls to action",
      "Interactive calculator widgets or interactive demos",
      "Mobile-first responsive fluid typography clamps",
    ],
    technologies: ["React 19", "Tailwind CSS", "Motion", "Web Audio API"],
    estimatedDelivery: "1 — 2 Weeks",
    featured: true,
  },
  {
    id: "srv-dashboards",
    slug: "custom-dashboards",
    title: "Custom Dashboards & Analytics",
    tagline: "High-density operational panels and real-time telemetry hubs.",
    description:
      "Specialized administrative dashboards for logistics fleets, financial ledger reconciliation, and IoT monitoring modeled on high-concurrency architecture.",
    deliverables: [
      "High-density data tables with sorting, filtering, and pagination",
      "Interactive canvas charting and telemetry maps",
      "Full-duplex WebSocket event streaming indicators",
      "Role-based permission gating (Superadmin, Manager, Viewer)",
    ],
    technologies: ["React", "Leaflet", "Canvas 2D", "WebSockets", "Go"],
    estimatedDelivery: "3 — 6 Weeks",
    featured: true,
  },
  {
    id: "srv-api",
    slug: "api-integration",
    title: "API Integration & Backend Microservices",
    tagline: "Connecting external services, payment gateways, and telemetry.",
    description:
      "Architecting robust API microservices in Go and Node.js to interconnect third-party platforms, ERP systems, SMS/Email notifications, and spatial telemetry.",
    deliverables: [
      "RESTful API endpoints with structured request/response contracts",
      "Payment gateway integration (Stripe, Razorpay) with secure webhooks",
      "Rate limiting and JWT security middleware",
      "Containerized microservices configured via Docker Compose",
    ],
    technologies: ["Go", "Node.js", "Express.js", "Docker", "REST APIs"],
    estimatedDelivery: "2 — 4 Weeks",
  },
  {
    id: "srv-maintenance",
    slug: "website-maintenance",
    title: "Website Maintenance & Engineering Retainers",
    tagline: "Continuous security updates, performance monitoring, and SLA support.",
    description:
      "Dedicated ongoing technical stewardship ensuring your software platform remains fast, secure, compatible with modern browsers, and continuously backed up.",
    deliverables: [
      "Scheduled dependency patching and security vulnerability audits",
      "Database backup verification and query performance tuning",
      "Performance optimization and Core Web Vitals checks",
      "Prompt bug resolution and minor feature iterations",
    ],
    technologies: ["Next.js", "PostgreSQL", "Docker", "Git", "CI/CD"],
    estimatedDelivery: "Monthly Ongoing Retainer",
  },
];

export const studioProcess: StudioProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Architecture Blueprint",
    timeline: "Week 1",
    summary:
      "We interrogate requirements, define user journeys, and draft an unambiguous architecture document specifying data entities, APIs, and security rules.",
    outputs: ["Technical Architecture Masterplan", "Entity-Relationship Model", "Milestone Roadmap"],
  },
  {
    step: "02",
    title: "Design Systems & Token Architecture",
    timeline: "Week 2",
    summary:
      "We construct custom design tokens (typography clamps, color ramps, hairlines) and interactive wireframe prototypes before writing production application code.",
    outputs: ["Tailwind Design System", "Interactive Component Prototype", "Responsive Layout Specs"],
  },
  {
    step: "03",
    title: "Full-Stack Production Engineering",
    timeline: "Weeks 3 — 5",
    summary:
      "We implement the complete software solution using Next.js App Router, React 19 Server Components, Go/Java microservices, and PostgreSQL database migrations.",
    outputs: ["Strict TypeScript Codebase", "Zod Validation Schemas", "Database Migrations & Seeders"],
  },
  {
    step: "04",
    title: "Security, Testing & Index Optimization",
    timeline: "Week 6",
    summary:
      "We run automated test suites, verify Row Level Security policies, tune database indexes with EXPLAIN ANALYZE, and audit accessibility and mobile performance.",
    outputs: ["Vitest & E2E Test Suite", "PostgreSQL B-Tree/GiST Indexes", "Accessibility & Performance Audit"],
  },
  {
    step: "05",
    title: "Deployment, Handoff & Support",
    timeline: "Week 7+",
    summary:
      "We configure production hosting, wire up custom domains, deliver complete source code repositories, and transition into ongoing maintenance support.",
    outputs: ["Production CDN & Cloud Launch", "Complete Repository Handoff", "Maintenance Documentation"],
  },
];

export const studioFaqs: StudioFaqItem[] = [
  {
    category: "Engagement",
    question: "Who will actually build and architect my software project?",
    answer:
      "All architecture, software engineering, and code delivery is led directly by Mohan N.V. You work directly with the software engineer who writes and reviews the code, eliminating communication layers and ensuring strict engineering rigor.",
  },
  {
    category: "Delivery",
    question: "What are your typical project delivery timelines?",
    answer:
      "High-performance static websites and landing pages typically launch within 1 to 2 weeks. Comprehensive full-stack web applications and custom dashboards usually take 4 to 8 weeks depending on database complexity and third-party integrations.",
  },
  {
    category: "Technical",
    question: "Do I receive full access to the source code upon project completion?",
    answer:
      "Yes. Upon project milestone delivery, you receive the full Git repository, design assets, database migration scripts, and deployment configurations without proprietary lock-in.",
  },
  {
    category: "Technical",
    question: "Why do you specialize in Next.js, Go, and PostgreSQL?",
    answer:
      "Next.js App Router with React 19 Server Components delivers efficient server rendering. Go provides unmatched sub-millisecond concurrency for real-time services with minimal memory footprint. PostgreSQL guarantees strict ACID relational compliance and rock-solid B-Tree/GiST spatial indexing.",
  },
  {
    category: "Pricing",
    question: "How are projects priced and invoiced?",
    answer:
      "We operate primarily on milestone-based fixed-price engagements with transparent deliverables agreed upon in advance. Typical starter projects range from ₹50,000 to ₹1,50,000, while custom full-stack enterprise applications range from ₹3,50,000 upwards.",
  },
  {
    category: "Engagement",
    question: "Do you offer post-launch maintenance and technical support?",
    answer:
      "Yes. We offer monthly ongoing technical retainers covering dependency security patching, database performance indexing, server monitoring, and minor iterative feature additions.",
  },
];
