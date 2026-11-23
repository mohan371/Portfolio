import { createServerSupabaseClient } from "@/lib/supabase/server";
import { siteConfig } from "@/content/data/site-config";
import { educationSchema } from "@/lib/validations";
import { EducationItem } from "@/types";

export async function getEducation(): Promise<EducationItem[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await (supabase as any)
        .from("education")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return (data as any[]).map((edu) => ({
          id: edu.id,
          degree: edu.degree,
          institution: edu.institution,
          year: edu.year,
          field: edu.field,
          highlights: edu.highlights || [],
        }));
      }
    }
  } catch (err) {
    console.warn("[EducationRepository] Falling back to local data:", err);
  }

  return siteConfig.education;
}

export async function createEducation(rawInput: unknown) {
  const validated = educationSchema.parse(rawInput);
  const supabase = await createServerSupabaseClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await (supabase as any)
    .from("education")
    .insert({
      degree: validated.degree,
      institution: validated.institution,
      institution_url: validated.institution_url || null,
      year: validated.year,
      start_year: validated.start_year,
      end_year: validated.end_year,
      field: validated.field,
      highlights: validated.highlights,
      is_published: validated.is_published,
      sort_order: validated.sort_order,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
