import { createServerSupabaseClient } from "@/lib/supabase/server";
import { skillsData } from "@/content/data/skills";
import { skillSchema } from "@/lib/validations";

export interface SkillItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  level: "Expert" | "Advanced" | "Proficient" | "Familiar";
  yearsOfExperience: number;
  iconName?: string;
  isFeatured: boolean;
  sortOrder: number;
}

export async function getSkills(category?: string): Promise<SkillItem[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      let query = (supabase as any)
        .from("skills")
        .select("*")
        .order("sort_order", { ascending: true });

      if (category && category !== "all") {
        query = query.eq("category", category);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((s: any) => ({
          id: s.id,
          name: s.name,
          slug: s.slug,
          category: s.category,
          level: s.level,
          yearsOfExperience: Number(s.years_of_experience) || 1,
          iconName: s.icon_name || undefined,
          isFeatured: Boolean(s.is_featured),
          sortOrder: s.sort_order || 0,
        }));
      }
    }
  } catch (err) {
    console.warn("[SkillsRepository] Falling back to local data:", err);
  }

  // Local fallback: Flatten SkillCategory[]
  const flatSkills: SkillItem[] = [];
  let counter = 1;
  skillsData.forEach((cat) => {
    cat.skills.forEach((sk) => {
      flatSkills.push({
        id: `skill-${counter}`,
        name: sk.name,
        slug: sk.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        category: cat.title,
        level: sk.level > 90 ? "Advanced" : "Proficient",
        yearsOfExperience: 3,
        iconName: "Code2",
        isFeatured: counter <= 8,
        sortOrder: counter++,
      });
    });
  });

  if (category && category !== "all") {
    return flatSkills.filter((s) => s.category.toLowerCase().includes(category.toLowerCase()));
  }
  return flatSkills;
}

export async function createSkill(rawInput: unknown) {
  const validated = skillSchema.parse(rawInput);
  const supabase = await createServerSupabaseClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await (supabase as any)
    .from("skills")
    .insert({
      name: validated.name,
      slug: validated.slug,
      category: validated.category,
      level: validated.level,
      years_of_experience: validated.years_of_experience,
      icon_name: validated.icon_name || null,
      is_featured: validated.is_featured,
      sort_order: validated.sort_order,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
