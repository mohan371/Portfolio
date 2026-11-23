import { PhilosophyItem, PhilosophyCategory } from "@/types/philosophy";

export const philosophyCategories: PhilosophyCategory[] = [
  "Engineering Principles",
  "Learning and Discipline",
  "Technology and Innovation",
  "Project Lessons",
  "Problem-Solving",
  "Personal Reflections",
];

export const initialPhilosophyData: PhilosophyItem[] = [
  {
    id: "phil-01",
    slug: "financial-ledgers-to-acid-databases",
    title: "From Financial Ledgers to ACID Databases: Why Precision is Non-Negotiable",
    category: "Engineering Principles",
    excerpt: "Two years reconciling high-volume corporate invoices at Gabriel India Ltd taught me more about database atomicity and distributed consensus than any textbook ever could.",
    content: `Before stepping into software engineering as a full-time profession, I spent two years as a Bill Booking Accountant at Gabriel India Ltd. 

In accounting, there is no such thing as "mostly correct." If a vendor invoice deviates by three paise, the ledger reconciliation breaks down during statutory audit. You cannot wave away discrepancies with optimistic UI updates. Every credit must have an offsetting debit; every ledger entry must be immutable and timestamped.

When I transitioned into building distributed systems and database backends in PostgreSQL and Go, I realized that relational database transactions (ACID) are the computational equivalent of double-entry bookkeeping.

The principles I hold sacred today were forged under real corporate audit scrutiny:
1. Atomicity: In financial operations and distributed inventory, either the complete batch succeeds or nothing changes.
2. Idempotency: Network retries are inevitable. If a client transmits a payment or IoT telemetry ping three times, your backend must process it exactly once.
3. Auditability: A system that cannot trace how a database row reached its current state is a liability waiting to surface under high load.

Engineers often reach for trendy NoSQL stores or eventual consistency because it seems easier upfront. But when money, grades, or vehicle safety boundaries are at stake, deterministic precision is the only standard that matters.`,
    publishedAt: "2024-10-18",
    readTimeMinutes: 5,
    isFeatured: true,
    keyTakeaways: [
      "Double-entry bookkeeping is the ideological forefather of database transactional atomicity.",
      "Idempotency must be designed into API ingress from day zero, not patched as an afterthought.",
      "Auditable immutability protects production systems from silent data drift.",
    ],
  },
  {
    id: "phil-02",
    slug: "academic-rigor-and-the-92-percent",
    title: "Academic Rigor as an Engineering Superpower: Earning 92% in MCA",
    category: "Learning and Discipline",
    excerpt: "Why deep theoretical foundations in automata, discrete mathematics, and database normalization produce superior software engineers compared to rapid tutorial skimming.",
    content: `In the modern developer ecosystem, there is an unfortunate trend toward devaluing academic computer science in favor of superficial framework familiarity. People learn how to call a hook or install a package, but stumble when confronted with a memory leak or an unindexed B-Tree scan.

When I enrolled in my Master of Computer Applications (MCA) at Adhiyamaan College of Engineering, I treated academic rigor as a deliberate discipline. Maintaining a 9.2 CGPA (92% First Class with Distinction) was not about rote memorization—it was about mastering first principles:

- Understanding why B-Tree branch factor minimizes disk I/O seek latency.
- Analyzing algorithmic complexity beyond Big-O best cases to include cache locality and spatial memory fragmentation.
- Deriving finite state machines to model complex UI workflows and WebSocket connection lifecycles without race conditions.

When you understand the underlying runtime mechanics—how the V8 engine optimizes hidden classes, how the Go scheduler multiplexes M goroutines across N OS threads, or how TCP flow control handles packet loss—frameworks cease being mysterious black boxes. You debug faster, write tighter code, and anticipate edge cases before they reach production.`,
    publishedAt: "2024-09-05",
    readTimeMinutes: 4,
    isFeatured: true,
    keyTakeaways: [
      "Mastery of data structures and runtime internals makes frameworks trivially easy to adopt.",
      "Academic computer science provides the diagnostic intuition needed to debug edge cases in production.",
      "Disciplined consistency in study directly translates to disciplined consistency in code reviews.",
    ],
  },
  {
    id: "phil-03",
    slug: "ray-casting-and-spatial-intuition",
    title: "Point-in-Polygon & Spatial Intuition: Lessons from the Fleet Geofencing Engine",
    category: "Project Lessons",
    excerpt: "Implementing the Jordan Curve Theorem on high-frequency vehicle telemetry taught me that mathematical elegance beats brute-force compute every time.",
    content: `When designing the MapUp fleet geofencing simulator for industrial zones across Hosur, the primary challenge was latency. GPS telemetry pings arrive from dozens of vehicles every second. For each ping, the system must determine whether the vehicle has breached an irregular polygon boundary.

A naive approach might involve spatial database plugins or external GIS APIs, introducing unnecessary network hops and roundtrip latency.

Instead, I implemented the Jordan Curve Theorem directly using ray-casting:
1. Cast an imaginary horizontal ray from the vehicle's coordinate to infinity.
2. Count how many times the ray intersects the polygon's edges.
3. If the intersection count is odd, the vehicle is inside. If even, outside.

The real beauty lay in handling mathematical edge cases: collinear segments, vertex singularities, and half-open coordinate intervals. 

By solving the problem with foundational geometric mathematics rather than heavy infrastructure, the resulting Go engine processes tens of thousands of point-in-polygon calculations per millisecond with zero external dependencies.

Elegance in software engineering is not about writing more code—it is about finding the mathematical core of the problem and letting that do the heavy lifting.`,
    publishedAt: "2024-08-14",
    readTimeMinutes: 6,
    isFeatured: false,
    keyTakeaways: [
      "Foundational computational geometry can outperform bloated third-party microservices by orders of magnitude.",
      "Edge cases (vertex grazing, collinear lines) define whether an algorithm survives in production.",
      "Low latency is achieved by eliminating network boundaries, not by upgrading server specs.",
    ],
  },
  {
    id: "phil-04",
    slug: "pragmatic-fullstack-vs-resume-driven-development",
    title: "Pragmatic Engineering vs. Resume-Driven Development",
    category: "Problem-Solving",
    excerpt: "Why boring, battle-tested technologies like PostgreSQL, strict TypeScript, and Go microservices will always outperform over-engineered multi-cloud architectures.",
    content: `Every few months, the tech industry is swept by a new wave of architectural hype. Monoliths are declared dead, then microservices are declared an anti-pattern. Frameworks churn faster than software development cycles can complete.

At Veda Scholars and in my independent software studio practice, I adhere to a strict rule: choose boring, predictable technology for 95% of your architecture so you can spend your innovation tokens where they actually matter to the user.

- PostgreSQL handles JSON documents, full-text search, relational constraints, and spatial indexes reliably. You rarely need four separate specialized databases before reaching millions of users.
- Strict TypeScript catches contract violations at compile time, eliminating an entire category of production runtime crashes.
- Go delivers predictable garbage collection, fast startup times, and tiny Docker footprints without runtime overhead.

Before introducing a new dependency or distributed message broker into a platform, I ask three questions:
1. What failure modes does this introduce into our operational debugging loop?
2. Can this problem be solved with a properly indexed SQL table and an ACID transaction?
3. Will another engineer be able to reason about this code at 2:00 AM without reading a 50-page architecture spec?

Simplicity is not a compromise; it is the ultimate mark of architectural maturity.`,
    publishedAt: "2024-07-22",
    readTimeMinutes: 5,
    isFeatured: false,
    keyTakeaways: [
      "Boring, battle-tested technologies minimize operational surprises and production outages.",
      "PostgreSQL is capable of handling relational, document, and search workloads efficiently without architectural sprawl.",
      "Every added tool is a maintenance obligation and potential point of failure.",
    ],
  },
];
