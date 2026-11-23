import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Mohan N.V.",
  role: "Full-Stack Developer & Software Engineer",
  title: "Full-Stack Developer & Software Engineer",
  positioning: "Building scalable digital products. Turning ideas into working software.",
  tagline: "Full-Stack Developer & Software Engineer passionate about building scalable digital products, high-throughput APIs, and clean interactive web experiences.",
  bio: "Software engineer equipped with a rigorous analytical mindset, holding an MCA from Adhiyamaan College of Engineering (2026) and BCA from MGR College of Arts and Science (2022). Experienced in enterprise workflows and financial ledger precision from tenure at Gabriel India Ltd, now dedicated to engineering robust, scalable web products in Go, Java, React, Next.js, and Node.js.",
  resumeUrl: "/resume/Mohan_NV_Resume.pdf",
  studio: {
    name: "NV LABS",
    tagline: "Engineering Scalable Digital Products",
  },
  currentFocus: {
    headline: "High-Concurrency Web Systems & Production Next.js Architecture",
    description: "Currently engineering high-throughput REST APIs in Go and Java, architecting production-grade React 19 / Next.js web applications, and refining relational database query optimization across PostgreSQL and MySQL.",
    areas: [
      "Building resilient REST & microservice APIs with Go and Java",
      "Full-stack web application development with React & Next.js",
      "Relational & document database modeling (PostgreSQL, MongoDB, MySQL)",
      "Containerized deployments using Docker and automated Git CI/CD pipelines",
    ],
  },
  availability: {
    status: "Available for Hire",
    notice: "Actively seeking full-time software engineering roles and high-impact full-stack opportunities.",
  },
  location: {
    city: "Hosur / Bangalore",
    country: "India",
    timezone: "IST (UTC+5:30)",
    coordinates: "12.7409° N, 77.8253° E",
  },
  education: [
    {
      id: "edu-1",
      degree: "Master of Computer Applications (MCA)",
      institution: "Adhiyamaan College of Engineering",
      year: "2024 — 2026",
      field: "Computer Applications & Advanced Software Engineering",
      highlights: [
        "Specialized in Advanced Data Structures, Cloud Computing, Object-Oriented Software Engineering, and Database Internals.",
        "Engineered full-stack capstone projects in Java, Go, React, and PostgreSQL.",
      ],
    },
    {
      id: "edu-2",
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "MGR College of Arts and Science",
      year: "2019 — 2022",
      field: "Computer Science & Application Fundamentals",
      highlights: [
        "Core coursework in C, C++, Java, Web Development, Relational Databases (RDBMS), and Operating Systems.",
        "Graduated with distinction and strong algorithmic problem-solving foundations.",
      ],
    },
  ],
  socials: {
    github: "https://github.com/mohannv",
    linkedin: "https://linkedin.com/in/mohannv",
    twitter: "https://x.com/mohannv",
    email: "mohannv.dev@gmail.com",
  },
  navigation: [
    { label: "Overview", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Journey", href: "/experience" },
    { label: "Lab", href: "/lab" },
    { label: "Studio", href: "/studio" },
    { label: "Journal", href: "/journal" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ],
};
