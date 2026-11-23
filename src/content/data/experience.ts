import { ExperienceItem } from "@/types";

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Full-Stack Software Engineer & MCA Scholar",
    company: "Adhiyamaan College of Engineering",
    period: "2024 — 2026 (Graduating Year)",
    location: "Hosur, Tamil Nadu, India",
    type: "Education",
    description: "Pursuing Master of Computer Applications (MCA) with an intensive concentration on distributed systems, high-concurrency Go services, enterprise Java architecture, and modern full-stack web applications.",
    achievements: [
      "Engineered full-stack web systems utilizing Next.js, React, Node.js, Express.js, and PostgreSQL.",
      "Architected microservices in Go and Java featuring REST APIs, connection pooling, and Docker containerization.",
      "Conducted research and hands-on benchmarks on database normalization, indexing, and query plan optimization across PostgreSQL and MySQL.",
    ],
    technologies: ["Java", "Go", "React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "Docker", "Git"],
    metrics: ["MCA 2026 Batch", "8+ Production-Grade Repositories", "100% Test Coverage on Core APIs"],
  },
  {
    id: "exp-2",
    role: "Bill Booking Accountant",
    company: "Gabriel India Ltd",
    period: "2022 — 2024",
    location: "Hosur, Tamil Nadu, India",
    type: "Full-Time",
    description: "Managed high-volume financial transactions, invoice verification, vendor reconciliation, and enterprise ERP bill booking for one of India's leading tier-1 automotive manufacturing enterprises.",
    achievements: [
      "Processed and audited hundreds of vendor invoices weekly with zero discrepancy tolerance, instilling deep discipline in data integrity and ledger accuracy.",
      "Streamlined recurring audit reconciliation workflows by developing structured spreadsheets and automated data verification scripts.",
      "Gained firsthand operational insight into enterprise supply chain logic, relational billing schemas, and multi-department transactional workflows that now inform software architectural design.",
    ],
    technologies: ["Enterprise ERP Systems", "Data Auditing", "Financial Ledger Reconciliation", "Process Optimization"],
    metrics: ["2+ Years Corporate Experience", "10,000+ Invoices Audited", "Zero Discrepancy Compliance"],
  },
  {
    id: "exp-3",
    role: "BCA Graduate & Computer Science Foundations",
    company: "MGR College of Arts and Science",
    period: "2019 — 2022",
    location: "Hosur, Tamil Nadu, India",
    type: "Education",
    description: "Completed Bachelor of Computer Applications (BCA), establishing rigorous foundations in procedural programming, object-oriented paradigms, relational database management systems, and networking.",
    achievements: [
      "Mastered fundamentals of programming in C, C++, and Java with focus on algorithmic logic and memory structures.",
      "Developed interactive database applications using MySQL and Java Swing for inventory and student management.",
      "Graduated with academic distinction, building the foundation for advanced full-stack web engineering.",
    ],
    technologies: ["Java", "C / C++", "MySQL", "HTML5 / CSS3", "JavaScript", "Relational Database Design"],
    metrics: ["BCA 2022 Graduate", "Graduated with Distinction", "Core Algorithmic Foundations"],
  },
];
