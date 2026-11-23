import { createServerSupabaseClient } from "@/lib/supabase/server";
import { projectsData } from "@/content/data/projects";
import { projectSchema } from "@/lib/validations";
import { Project, ProjectFilterOptions } from "@/types";

/**
 * Repository for Projects.
 * Gracefully bridges Supabase PostgreSQL and local fallback content.
 */
export async function getProjects(options: ProjectFilterOptions = {}): Promise<Project[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      let query = (supabase as any)
        .from("projects")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (options.category && options.category !== "All") {
        query = query.ilike("category", `%${options.category}%`);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return (data as any[]).map((row) => ({
          id: row.id,
          title: row.title,
          slug: row.slug,
          shortDescription: row.short_description,
          detailedDescription: row.detailed_description,
          category: row.category,
          technologies: row.key_features || [],
          thumbnail: row.thumbnail_url,
          galleryImages: [],
          githubUrl: row.github_url || undefined,
          liveDemoUrl: row.live_demo_url || undefined,
          status: row.status,
          featured: Boolean(row.is_featured),
          startDate: row.start_date || "",
          completionDate: row.completion_date || "",
          problemStatement: row.problem_statement || "",
          solution: row.solution || "",
          architecture: {
            summary: row.architecture_summary || "",
            nodes: row.architecture_nodes || [],
          },
          keyFeatures: row.key_features || [],
          engineeringChallenges: row.challenges || [],
          lessonsLearned: row.lessons_learned || [],
          publishedDate: row.published_date,
        }));
      }
    }
  } catch (err) {
    console.warn("[ProjectsRepository] Falling back to local dataset:", err);
  }

  // Graceful fallback to verified local projects
  let result = [...projectsData];
  if (options.category && options.category !== "All") {
    result = result.filter(
      (p) => p.category.toLowerCase() === options.category?.toLowerCase()
    );
  }
  if (options.technology) {
    result = result.filter((p) =>
      p.technologies.some((t) => t.toLowerCase() === options.technology?.toLowerCase())
    );
  }
  if (options.search) {
    const q = options.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }
  return result;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await (supabase as any)
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (!error && data) {
        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          shortDescription: data.short_description,
          detailedDescription: data.detailed_description,
          category: data.category,
          technologies: data.key_features || [],
          thumbnail: data.thumbnail_url,
          galleryImages: [],
          githubUrl: data.github_url || undefined,
          liveDemoUrl: data.live_demo_url || undefined,
          status: data.status,
          featured: Boolean(data.is_featured),
          startDate: data.start_date || "",
          completionDate: data.completion_date || "",
          problemStatement: data.problem_statement || "",
          solution: data.solution || "",
          architecture: {
            summary: data.architecture_summary || "",
            nodes: data.architecture_nodes || [],
          },
          keyFeatures: data.key_features || [],
          engineeringChallenges: data.challenges || [],
          lessonsLearned: data.lessons_learned || [],
          publishedDate: data.published_date,
        };
      }
    }
  } catch (err) {
    console.warn("[ProjectsRepository] Slug fallback:", err);
  }

  return projectsData.find((p) => p.slug === slug) || null;
}

export async function createProject(rawInput: unknown) {
  const validated = projectSchema.parse(rawInput);
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    throw new Error("Supabase is not configured in this environment.");
  }

  const { data, error } = await (supabase as any)
    .from("projects")
    .insert({
      title: validated.title,
      slug: validated.slug,
      short_description: validated.short_description,
      detailed_description: validated.detailed_description,
      category: validated.category,
      thumbnail_url: validated.thumbnail_url,
      github_url: validated.github_url || null,
      live_demo_url: validated.live_demo_url || null,
      status: validated.status,
      is_featured: validated.is_featured,
      is_published: validated.is_published,
      start_date: validated.start_date || null,
      completion_date: validated.completion_date || null,
      problem_statement: validated.problem_statement || null,
      solution: validated.solution || null,
      architecture_summary: validated.architecture_summary || null,
      architecture_nodes: validated.architecture_nodes as any,
      key_features: validated.key_features,
      challenges: validated.challenges as any,
      lessons_learned: validated.lessons_learned,
      sort_order: validated.sort_order,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
