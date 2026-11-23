import { SkillCategory } from "@/types";

export const skillsData: SkillCategory[] = [
  {
    title: "Core Languages & Systems",
    description: "Robust programming languages for building type-safe, high-concurrency, and memory-efficient software.",
    skills: [
      { name: "Java", level: 92, category: "Language", focus: "OOP, multithreading, enterprise backend APIs & Spring basics" },
      { name: "Go (Golang)", level: 88, category: "Language", focus: "Goroutines, channels, fast REST microservices & low memory footprint" },
      { name: "JavaScript (ES6+)", level: 94, category: "Language", focus: "Async/await, event loop, closures, modern ES features" },
      { name: "TypeScript", level: 90, category: "Language", focus: "Strict mode, generic types, Zod runtime validation" },
    ],
  },
  {
    title: "Full-Stack & Frontend Engineering",
    description: "Engineering modern, accessible, and responsive user interfaces with sub-second performance.",
    skills: [
      { name: "React (v18 & v19)", level: 95, category: "Frontend", focus: "Component lifecycles, hooks, concurrent rendering, state management" },
      { name: "Next.js (App Router)", level: 92, category: "Framework", focus: "Server Components (RSC), Server Actions, API routes, SSR & SSG" },
      { name: "Node.js & Express.js", level: 92, category: "Backend", focus: "RESTful API architecture, middleware, JWT authentication, rate limiting" },
      { name: "Tailwind CSS", level: 95, category: "Styling", focus: "Responsive layout design, custom design tokens, dark mode" },
      { name: "REST APIs", level: 96, category: "API Design", focus: "Semantic HTTP methods, payload validation, status codes, OpenAPI/Swagger" },
    ],
  },
  {
    title: "Databases & Data Modeling",
    description: "Designing normalized schemas, query optimization, and handling both relational and document data stores.",
    skills: [
      { name: "PostgreSQL", level: 90, category: "Database", focus: "Complex joins, indexing strategies, transactions (ACID), constraints" },
      { name: "MySQL", level: 92, category: "Database", focus: "Relational modeling, stored procedures, query optimization" },
      { name: "MongoDB", level: 88, category: "Database", focus: "Document schema design, aggregation pipelines, Mongoose ODM" },
      { name: "Database Optimization", level: 86, category: "Performance", focus: "EXPLAIN ANALYZE, B-tree indexes, connection pooling" },
    ],
  },
  {
    title: "DevOps, Tooling & Workflow",
    description: "Modern software development infrastructure for containerization, version control, and reliable delivery.",
    skills: [
      { name: "Docker", level: 88, category: "DevOps", focus: "Multi-stage Dockerfiles, Docker Compose, containerized services" },
      { name: "Git & GitHub", level: 95, category: "Version Control", focus: "Branching strategies, PR workflows, merge resolution, Git hygiene" },
      { name: "Linux / Shell", level: 85, category: "Environment", focus: "Bash scripting, server navigation, package management" },
      { name: "Testing & Debugging", level: 88, category: "Quality", focus: "Unit testing, Postman API testing, browser dev tools" },
    ],
  },
];
