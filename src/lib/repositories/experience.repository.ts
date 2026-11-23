import { createServerSupabaseClient } from "@/lib/supabase/server";
import { experienceData } from "@/content/data/experience";
import { experienceSchema } from "@/lib/validations";
import { ExperienceItem } from "@/types";

export async function getExperience(): Promise<ExperienceItem[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await (supabase as any)
        .from("experience")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return (data as any[]).map((exp) => ({
          id: exp.id,
          role: exp.role,
          company: exp.company,
          companyUrl: exp.company_url || undefined,
          period: exp.period,
          location: exp.location,
          type: exp.employment_type,
          description: exp.description,
          achievements: exp.highlights || [],
          highlights: exp.highlights || [],
          technologies: exp.technologies_used || [],
          metrics: [],
        }));
      }
    }
  } catch (err) {
    console.warn("[ExperienceRepository] Falling back to local data:", err);
  }

  return experienceData;
}

export async function createExperience(rawInput: unknown) {
  const validated = experienceSchema.parse(rawInput);
  const supabase = await createServerSupabaseClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await (supabase as any)
    .from("experience")
    .insert({
      role: validated.role,
      company: validated.company,
      company_url: validated.company_url || null,
      period: validated.period,
      start_date: validated.start_date,
      end_date: validated.end_date || null,
      is_current: validated.is_current,
      location: validated.location,
      employment_type: validated.employment_type,
      domain: validated.domain || null,
      description: validated.description,
      highlights: validated.highlights,
      technologies_used: validated.technologies_used,
      is_published: validated.is_published,
      sort_order: validated.sort_order,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
