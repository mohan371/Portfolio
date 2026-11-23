import { SkillCategory } from "@/types";

export const skillsData: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core languages utilized for application logic, backend microservices, and algorithmic problem solving.",
    skills: [
      { name: "JavaScript", category: "Language", focus: "ES6+, Async/Await, DOM, Event Loop, Closures & Modern Web Standards" },
      { name: "Java", category: "Language", focus: "Object-Oriented Programming, Multithreading, Data Structures & JVM Fundamentals" },
    ],
  },
  {
    title: "Frontend Development",
    description: "Crafting responsive, high-performance user interfaces and interactive web applications.",
    skills: [
      { name: "React.js", category: "Frontend", focus: "Component Architecture, Hooks, State Management, Virtual DOM & Lifecycle" },
      { name: "Next.js", category: "Framework", focus: "App Router, Server Components (RSC), SSR, SSG, Dynamic Routes & SEO" },
      { name: "HTML5", category: "Markup", focus: "Semantic Markup, Accessibility (a11y), Modern Web APIs & Document Structure" },
      { name: "CSS3", category: "Styling", focus: "Flexbox, CSS Grid, Media Queries, Custom Properties & Responsive Design" },
      { name: "Tailwind CSS", category: "CSS Framework", focus: "Utility-First Styling, Custom Design Tokens, Theme Tokens & Responsive Layouts" },
    ],
  },
  {
    title: "Backend & API Engineering",
    description: "Designing reliable RESTful APIs, authentication workflows, and server-side business logic.",
    skills: [
      { name: "Node.js", category: "Runtime", focus: "Event-Driven I/O, Package Ecosystem (npm), Streams & Backend Architecture" },
      { name: "Express.js", category: "Backend Framework", focus: "Middleware Routing, Request Pipelines, Error Handling & Controller Separation" },
      { name: "REST API Development", category: "API Architecture", focus: "Semantic Endpoints, Status Codes, Payload Validation & OpenAPI Design" },
      { name: "JWT Authentication", category: "Security", focus: "Stateless Token Verification, Role-Based Access Control (RBAC) & Feature Gating" },
    ],
  },
  {
    title: "Databases & Storage",
    description: "Modeling normalized relational schemas and flexible document stores for reliable data persistence.",
    skills: [
      { name: "MongoDB", category: "Document Database", focus: "Document Modeling, Aggregation Pipelines, Mongoose ODM & Indexing" },
      { name: "MySQL", category: "Relational Database", focus: "Relational Schema Normalization, Joins, Constraints, Transactions & ACID" },
      { name: "SQLite", category: "Embedded Database", focus: "Lightweight Storage, Local Relational Caching & Zero-Config Persistence" },
    ],
  },
  {
    title: "Tools, Platforms & Deployment",
    description: "Modern developer tooling, mobile client building, and cloud hosting infrastructure.",
    skills: [
      { name: "Git & GitHub", category: "Version Control", focus: "Branching Strategies, Pull Requests, Code Reviews & Commit Hygiene" },
      { name: "VS Code", category: "IDE", focus: "Extensions, Debugging, Workspace Configuration & Rapid Development" },
      { name: "Android Studio", category: "Mobile Tooling", focus: "Android SDK, Emulator Testing, Gradle Builds & Release APK Output" },
      { name: "Figma", category: "UI/UX Design", focus: "Design-to-Code Translation, Component Layouts & Design System Inspection" },
      { name: "Netlify", category: "Cloud Hosting", focus: "Continuous Deployment, Edge Routing, Static Site Hosting & Form Ingestion" },
      { name: "Render", category: "Cloud Platform", focus: "Web Service Hosting, Node.js Deployments, Docker Services & Background Jobs" },
    ],
  },
];
