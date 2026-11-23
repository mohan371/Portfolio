import { createServerSupabaseClient } from "@/lib/supabase/server";
import { journalData } from "@/content/data/journal";
import { blogArticleSchema } from "@/lib/validations";
import { JournalPost } from "@/types";

export async function getArticles(): Promise<JournalPost[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await (supabase as any)
        .from("blog_articles")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return (data as any[]).map((a) => ({
          id: a.id,
          slug: a.slug,
          title: a.title,
          excerpt: a.excerpt,
          contentMarkdown: a.content_markdown,
          publishedAt: a.published_at ? a.published_at.split("T")[0] : "",
          readTimeMinutes: Number(a.read_time_minutes) || 5,
          tags: a.tags || [],
          featured: Boolean(a.is_published),
        }));
      }
    }
  } catch (err) {
    console.warn("[ArticlesRepository] Falling back to local data:", err);
  }

  return journalData;
}

export async function getArticleBySlug(slug: string): Promise<JournalPost | null> {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await (supabase as any)
        .from("blog_articles")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (!error && data) {
        return {
          id: data.id,
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt,
          contentMarkdown: data.content_markdown,
          publishedAt: data.published_at ? data.published_at.split("T")[0] : "",
          readTimeMinutes: Number(data.read_time_minutes) || 5,
          tags: data.tags || [],
          featured: Boolean(data.is_published),
        };
      }
    }
  } catch (err) {
    console.warn("[ArticlesRepository] Falling back to local data:", err);
  }

  return journalData.find((a: JournalPost) => a.slug === slug) || null;
}

export async function createArticle(rawInput: unknown) {
  const validated = blogArticleSchema.parse(rawInput);
  const supabase = await createServerSupabaseClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await (supabase as any)
    .from("blog_articles")
    .insert({
      title: validated.title,
      slug: validated.slug,
      excerpt: validated.excerpt,
      content_markdown: validated.content_markdown,
      cover_image_url: validated.cover_image_url || null,
      category: validated.category,
      read_time_minutes: validated.read_time_minutes,
      tags: validated.tags,
      is_published: validated.is_published,
      published_at: validated.published_at || new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
