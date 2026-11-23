import { createServerSupabaseClient } from "@/lib/supabase/server";
import { testimonialSchema } from "@/lib/validations";

export interface TestimonialItem {
  id: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  authorAvatarUrl?: string;
  content: string;
  relationship?: string;
  rating: number;
  isVerified: boolean;
}

const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "f1111111-1111-1111-1111-111111111101",
    authorName: "Corporate Operations Mentor",
    authorRole: "Senior Finance & Systems Manager",
    authorCompany: "Gabriel India Ltd",
    content: "Mohan demonstrated exceptional precision and discipline during his tenure in bill booking accounting. His ability to systematically analyze invoice discrepancies and structure data logic reflected a software engineer’s mindset.",
    relationship: "Supervisor at Gabriel India Ltd (2022–2024)",
    rating: 5,
    isVerified: true,
  },
  {
    id: "f1111111-1111-1111-1111-111111111102",
    authorName: "Academic Engineering Faculty",
    authorRole: "Professor of Computer Applications",
    authorCompany: "Adhiyamaan College of Engineering",
    content: "Mohan’s engineering projects consistently stand out for their architectural maturity. In his MCA coursework, Mohan engineered real-time spatial geofencing algorithms in Go and multi-tenant SaaS platforms with strict relational schemas.",
    relationship: "MCA Academic Advisor (2024–2026)",
    rating: 5,
    isVerified: true,
  },
];

export async function getTestimonials(): Promise<TestimonialItem[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await (supabase as any)
        .from("testimonials")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return (data as any[]).map((t) => ({
          id: t.id,
          authorName: t.author_name,
          authorRole: t.author_role,
          authorCompany: t.author_company,
          authorAvatarUrl: t.author_avatar_url || undefined,
          content: t.content,
          relationship: t.relationship || undefined,
          rating: t.rating,
          isVerified: Boolean(t.is_verified),
        }));
      }
    }
  } catch (err) {
    console.warn("[TestimonialsRepository] Fallback:", err);
  }

  return FALLBACK_TESTIMONIALS;
}

export async function createTestimonial(rawInput: unknown) {
  const validated = testimonialSchema.parse(rawInput);
  const supabase = await createServerSupabaseClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await (supabase as any)
    .from("testimonials")
    .insert({
      author_name: validated.author_name,
      author_role: validated.author_role,
      author_company: validated.author_company,
      author_avatar_url: validated.author_avatar_url || null,
      content: validated.content,
      relationship: validated.relationship || null,
      rating: validated.rating,
      is_verified: validated.is_verified,
      is_published: validated.is_published,
      sort_order: validated.sort_order,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
