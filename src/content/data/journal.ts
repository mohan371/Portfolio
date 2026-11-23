import { JournalPost } from "@/types";

export const journalData: JournalPost[] = [
  {
    id: "post-1",
    slug: "from-accounting-ledgers-to-distributed-databases",
    title: "Relational Ledger Architecture: Designing Reliable Distributed Databases and Atomic Workflows",
    excerpt: "Why ACID transactions, idempotent APIs, and immutable audit trails are non-negotiable when building reliable backend systems.",
    contentMarkdown: `
### The Unforgiving Nature of State and Data Integrity

In financial systems and mission-critical applications, every single transaction and ledger update must balance precisely. A state corruption or dropped transition halts operations and creates severe discrepancies.

When designing relational database schemas and transactional APIs:

> **Resilient software design and relational architectures depend on deterministic transactional boundaries and verifiable state.**

### Core Principles for Resilient Systems

1. **Idempotency is Mandatory**: Just as a financial record must never be duplicated, an HTTP POST request to an invoice or payment endpoint must be strictly idempotent using unique deduplication tokens.
2. **ACID Transactions Over Compromises**: In relational databases like PostgreSQL and MySQL, financial operations cannot rely on eventual consistency. Multi-row updates must be locked in atomic transactions.
3. **Audit Trails (Event Sourcing)**: Never overwrite historical records. Append state transitions so every modification has a timestamp, actor, and immutable diff.

\`\`\`sql
-- Ensuring atomic ledger balance update with row-level locks
BEGIN;
SELECT balance FROM accounts WHERE id = $1 FOR UPDATE;
UPDATE accounts SET balance = balance - $2 WHERE id = $1;
INSERT INTO ledger_audit_log (account_id, delta, reason, created_at)
VALUES ($1, -$2, 'INVOICE_SETTLEMENT', NOW());
COMMIT;
\`\`\`

By approaching software engineering with strict data integrity standards, the applications we build become inherently dependable, fault-tolerant, and predictable.
    `,
    publishedAt: "2026-11-10",
    readTimeMinutes: 6,
    tags: ["Databases", "Engineering Discipline", "PostgreSQL", "Architecture"],
    featured: true,
  },
  {
    id: "post-2",
    slug: "building-high-throughput-rest-apis-in-go",
    title: "Building High-Throughput REST APIs in Go: Concurrency, Channels, and Zero-Allocation Routing",
    excerpt: "A deep dive into Go's runtime model, benchmarked against Node.js and Java, for writing lightweight web services that handle 40,000+ QPS.",
    contentMarkdown: `
### Why Go for Backend Services?

When architecting microservices that must ingest high-velocity data without consuming gigabytes of memory, **Go (Golang)** stands out as the ultimate balance between developer productivity and raw execution speed.

Compared to traditional JVM runtimes that require hefty heap allocations or single-threaded event loops that can bottleneck on CPU-heavy JSON parsing, Go's goroutines consume only ~2KB of initial stack memory.

\`\`\`go
// Lightweight concurrent task worker pool in Go
func StartWorkerPool(numWorkers int, jobs <-chan Job, results chan<- Result) {
    for w := 1; w <= numWorkers; w++ {
        go func(id int) {
            for j := range jobs {
                res := processJob(j)
                results <- res
            }
        }(w)
    }
}
\`\`\`

### Practical Architecture Rules

- **Use Connection Pooling**: Always tune \`SetMaxOpenConns\` and \`SetMaxIdleConns\` when talking to PostgreSQL.
- **Context Timeouts**: Propagate \`context.WithTimeout\` on every external HTTP request and database query.
- **Graceful Shutdown**: Intercept SIGINT/SIGTERM to allow inflight requests to complete without dropping connections.
    `,
    publishedAt: "2026-10-18",
    readTimeMinutes: 8,
    tags: ["Go", "REST APIs", "Concurrency", "Backend"],
    featured: true,
  },
  {
    id: "post-3",
    slug: "react-19-and-nextjs-server-components-demystified",
    title: "React 19 & Next.js App Router: When to Render on the Server vs. the Client",
    excerpt: "Demystifying Server Components, streaming SSR, and avoiding unnecessary client JavaScript for maximum Core Web Vitals performance.",
    contentMarkdown: `
### The Shift to Server Components

React 19 formalizes the division of labor between server and client. The server handles heavy data fetching, database connections, and static layout generation. The client is reserved strictly for interactive user gestures.

\`\`\`tsx
// Server Component - 0KB JS sent to browser
export async function ProjectCatalog() {
  const projects = await getProjectsFromDB();
  return (
    <div className="grid grid-cols-3 gap-6">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}
\`\`\`

By minimizing the client bundle, mobile devices render our pages in under 700ms, scoring near-perfect 100/100 Lighthouse benchmarks.
    `,
    publishedAt: "2026-09-05",
    readTimeMinutes: 5,
    tags: ["React 19", "Next.js", "Frontend", "Performance"],
    featured: false,
  },
];
