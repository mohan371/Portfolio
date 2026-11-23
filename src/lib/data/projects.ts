import { Project, ProjectFilterOptions } from "@/types";
import { projectsData } from "@/content/data/projects";

/**
 * Decoupled Project Data Access Layer.
 * 
 * Provides an asynchronous interface for querying projects.
 * Currently backed by verified local seed datasets.
 * Designed to switch seamlessly to Supabase PostgreSQL without modifying presentation components.
 */

export async function getProjects(options: ProjectFilterOptions = {}): Promise<Project[]> {
  // If Supabase environment variables are present in the future, connect to PostgreSQL here.
  // const isSupabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

  let results = [...projectsData];

  // 1. Text Search Filter (Case-insensitive)
  if (options.search && options.search.trim() !== "") {
    const query = options.search.toLowerCase().trim();
    results = results.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(query);
      const matchShortDesc = p.shortDescription.toLowerCase().includes(query);
      const matchDetailedDesc = p.detailedDescription.toLowerCase().includes(query);
      const matchTech = p.technologies.some((t) => t.toLowerCase().includes(query));
      const matchCategory = p.category.toLowerCase().includes(query);
      return matchTitle || matchShortDesc || matchDetailedDesc || matchTech || matchCategory;
    });
  }

  // 2. Category Filter
  if (options.category && options.category !== "All") {
    results = results.filter((p) => p.category.toLowerCase() === options.category?.toLowerCase());
  }

  // 3. Technology Filter
  if (options.technology && options.technology !== "All") {
    results = results.filter((p) =>
      p.technologies.some((t) => t.toLowerCase() === options.technology?.toLowerCase())
    );
  }

  // 4. Sorting
  const sortBy = options.sortBy || "featured";
  results.sort((a, b) => {
    if (sortBy === "featured") {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    }
    if (sortBy === "newest") {
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    }
    if (sortBy === "oldest") {
      return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return results;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = projectsData.find((p) => p.slug === slug);
  return project || null;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return projectsData.filter((p) => p.featured);
}

export async function getRelatedProjects(currentSlug: string, limit = 2): Promise<Project[]> {
  const current = projectsData.find((p) => p.slug === currentSlug);
  if (!current) return [];

  // Find projects sharing the same category or overlapping technologies
  const candidates = projectsData.filter((p) => p.slug !== currentSlug);

  candidates.sort((a, b) => {
    const aSameCategory = a.category === current.category ? 2 : 0;
    const bSameCategory = b.category === current.category ? 2 : 0;

    const aTechOverlap = a.technologies.filter((t) => current.technologies.includes(t)).length;
    const bTechOverlap = b.technologies.filter((t) => current.technologies.includes(t)).length;

    const scoreA = aSameCategory + aTechOverlap;
    const scoreB = bSameCategory + bTechOverlap;

    return scoreB - scoreA;
  });

  return candidates.slice(0, limit);
}

export async function getAllCategories(): Promise<string[]> {
  const categories = Array.from(new Set(projectsData.map((p) => p.category)));
  return ["All", ...categories];
}

export async function getAllTechnologies(): Promise<string[]> {
  const set = new Set<string>();
  projectsData.forEach((p) => p.technologies.forEach((t) => set.add(t)));
  return ["All", ...Array.from(set).sort()];
}
