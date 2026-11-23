import { CommandCenterData, GitHubRepo } from "@/types/command-center";

export const initialCommandCenterData: CommandCenterData = {
  role: "Software Engineer",
  company: "Veda Scholars",
  location: "Hosur, Tamil Nadu, India",
  status: "Available for select high-impact engineering contracts",
  lastUpdated: "2024-11-23",
  currentlyBuilding: [
    {
      id: "bld-01",
      title: "Veda Scholars Android SaaS Mobile Platform",
      category: "Mobile & Cloud Architecture",
      description: "Developing cross-platform multi-tenant student analytics, automated fee reconciliation, and offline cache synchronization.",
      progressPercent: 88,
      tech: ["React Native", "TypeScript", "Node.js", "PostgreSQL"],
    },
    {
      id: "bld-02",
      title: "Distributed Concurrency Engine & Task Scheduler",
      category: "Systems & Microservices",
      description: "Benchmarking Go worker pool pipelines with Redis streams for parallel vehicle telemetry event ingestion.",
      progressPercent: 75,
      tech: ["Go (Golang)", "Redis Streams", "Docker", "Goroutines"],
    },
    {
      id: "bld-03",
      title: "Nexora Studio Client Portal & Project Estimator",
      category: "Full-Stack Web Application",
      description: "Building an automated client scope builder with instant technical quote generation and milestone tracking.",
      progressPercent: 60,
      tech: ["Next.js 16", "React 19", "PostgreSQL", "Tailwind CSS"],
    },
  ],
  currentlyExploring: [
    {
      id: "exp-01",
      topic: "eBPF (Extended Berkeley Packet Filter)",
      purpose: "Kernel-level network observability and microsecond packet telemetry without user-space context switches.",
      status: "Active R&D",
    },
    {
      id: "exp-02",
      topic: "Distributed Consensus & Raft in Go",
      purpose: "Implementing fault-tolerant leader election and replicated state machine logs for edge clusters.",
      status: "Evaluation",
    },
    {
      id: "exp-03",
      topic: "WebAssembly (Wasm) Micro-Runtimes",
      purpose: "Compiling Go algorithms to run high-performance spatial geometry client-side inside WebWorkers.",
      status: "Benchmarking",
    },
  ],
  engineeringDispatches: [
    {
      id: "dsp-01",
      date: "2024-11-20",
      tag: "PERFORMANCE",
      scope: "Database Query Optimizer",
      note: "Migrated student attendance subqueries to CTE with partial composite B-Tree indexes, dropping median p95 query latency from 140ms to 8ms.",
    },
    {
      id: "dsp-02",
      date: "2024-11-12",
      tag: "SYSTEMS",
      scope: "Go Goroutines & WebSockets",
      note: "Refactored Jordan Curve point-in-polygon ray-casting to utilize worker channels with backpressure buffering, eliminating memory spikes under load.",
    },
    {
      id: "dsp-03",
      date: "2024-10-28",
      tag: "ARCHITECTURE",
      scope: "Next.js 16 App Router",
      note: "Configured zero-FOUC dual-theme tokens with scoped CSS variables, preserving the high-contrast obsidian dark palette while activating enterprise light defaults.",
    },
  ],
  githubProfile: {
    username: "mohan371",
    name: "MOHAN N V",
    publicRepos: 20,
    followers: 26,
    profileUrl: "https://github.com/mohan371",
  },
  recentRepos: [
    {
      name: "Veda_Scholars",
      description: "Full-stack institutional education platform and administrative backend with role-based access control.",
      language: "TypeScript",
      stars: 0,
      url: "https://github.com/mohan371/Veda_Scholars",
      updatedAt: "2024-11-15",
    },
    {
      name: "veda-scholars-app",
      description: "Android SaaS application repository powering student notifications, syllabus tracking, and mobile workflows.",
      language: "Dart",
      stars: 0,
      url: "https://github.com/mohan371/veda-scholars-app",
      updatedAt: "2024-11-10",
    },
    {
      name: "cicd-lab-project",
      description: "Automated containerized deployment pipeline testing Docker images, linting checks, and staging triggers.",
      language: "Dockerfile",
      stars: 0,
      url: "https://github.com/mohan371/cicd-lab-project",
      updatedAt: "2024-10-25",
    },
    {
      name: "load_manager",
      description: "Event-driven asynchronous load manager simulating concurrent request throttles and task queue workers.",
      language: "JavaScript",
      stars: 0,
      url: "https://github.com/mohan371/load_manager",
      updatedAt: "2024-09-30",
    },
  ],
};

/**
 * Server-side helper to fetch live GitHub repository data for mohan371
 * with a 10-minute revalidation cache and graceful fallback.
 */
export async function getLiveCommandCenterData(): Promise<CommandCenterData> {
  try {
    const res = await fetch("https://api.github.com/users/mohan371/repos?sort=updated&per_page=6", {
      headers: {
        "User-Agent": "Mohan-Portfolio-Command-Center",
      },
      next: { revalidate: 600 }, // 10 minutes cache
    });

    if (res.ok) {
      const repos = await res.json();
      if (Array.isArray(repos) && repos.length > 0) {
        const liveRepos: GitHubRepo[] = repos.map((r: any) => ({
          name: r.name,
          description: r.description || "Public repository by Mohan N.V.",
          language: r.language || "TypeScript",
          stars: r.stargazers_count || 0,
          url: r.html_url,
          updatedAt: r.updated_at ? r.updated_at.split("T")[0] : "Recently",
        }));

        return {
          ...initialCommandCenterData,
          recentRepos: liveRepos,
        };
      }
    }
  } catch {
    // Return initial cached data if offline or rate-limited
  }

  return initialCommandCenterData;
}
