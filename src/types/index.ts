/**
 * Scalable Project data model and query interfaces for Mohan N.V. portfolio.
 * Truthfully aligned with official resume credentials.
 */

export type ProjectStatus = "Completed" | "In Development" | "Production" | "Archived";

export interface EngineeringChallenge {
  title: string;
  challenge: string;
  resolution: string;
}

export interface ArchitectureNode {
  layer: string;
  technology: string;
  responsibility: string;
}

export interface ArchitectureSpec {
  summary: string;
  nodes: ArchitectureNode[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  category: string;
  technologies: string[];
  thumbnail: string;
  galleryImages: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  status: ProjectStatus;
  featured: boolean;
  startDate: string;
  completionDate: string;
  problemStatement: string;
  solution: string;
  architecture: ArchitectureSpec;
  keyFeatures: string[];
  engineeringChallenges: EngineeringChallenge[];
  lessonsLearned: string[];
  publishedDate: string;
}

export interface ProjectFilterOptions {
  search?: string;
  category?: string;
  technology?: string;
  sortBy?: "featured" | "newest" | "oldest" | "title";
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  university?: string;
  year: string;
  grade?: string;
  field: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  type: "Full-Time" | "Education" | "Project Work" | "Consulting";
  isCurrent?: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  metrics: string[];
}

export interface SkillItem {
  name: string;
  category: string;
  focus: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  date: string;
  description?: string;
  category: "Hackathon" | "Conference" | "Academic" | "Certification" | "Community" | "Competitive";
}

export interface TimelineMilestone {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  year: string;
  type: "career" | "education" | "achievement";
  isCurrent?: boolean;
  description: string;
  details?: string[];
  skills?: string[];
  location?: string;
  metrics?: string;
}

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentMarkdown: string;
  publishedAt: string;
  readTimeMinutes: number;
  tags: string[];
  featured: boolean;
}

export interface LabExperiment {
  id: string;
  slug: string;
  title: string;
  category: "Algorithm" | "Interactive" | "Database" | "System" | "API";
  description: string;
  componentIdentifier: string;
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
  date: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  title: string;
  positioning: string;
  tagline: string;
  bio: string;
  phone: string;
  resumeUrl: string;
  studio: {
    name: string;
    tagline: string;
  };
  currentFocus: {
    headline: string;
    description: string;
    areas: string[];
  };
  availability: {
    status: "Available for Hire" | "Open to Opportunities" | "Select Engagements";
    notice: string;
  };
  location: {
    city: string;
    country: string;
    timezone: string;
    coordinates: string;
  };
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
  navigation: {
    label: string;
    href: string;
  }[];
}
