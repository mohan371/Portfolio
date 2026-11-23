"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  projectSchema,
  skillSchema,
  experienceSchema,
  educationSchema,
  blogArticleSchema,
  testimonialSchema,
  companyProfileSchema,
  companyServiceSchema,
  contactEnquiryAdminUpdateSchema,
  websiteSettingSchema,
} from "@/lib/validations";

/**
 * Server Action: Save Project (Create or Update)
 */
export async function saveProjectAction(input: unknown) {
  try {
    const validated = projectSchema.parse(input);
    const supabase = await createServerSupabaseClient();

    if (!supabase) {
      // In offline/mock mode, acknowledge mutation
      return { success: true, message: "Project saved locally in memory buffer.", data: validated };
    }

    const payload = {
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
    };

    if (validated.id) {
      const { data, error } = await (supabase as any)
        .from("projects")
        .update(payload)
        .eq("id", validated.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      revalidatePath("/");
      revalidatePath("/projects");
      revalidatePath(`/projects/${validated.slug}`);
      return { success: true, message: "Project successfully updated.", data };
    } else {
      const { data, error } = await (supabase as any)
        .from("projects")
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      revalidatePath("/");
      revalidatePath("/projects");
      return { success: true, message: "Project successfully created.", data };
    }
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save project." };
  }
}

/**
 * Server Action: Delete Project
 */
export async function deleteProjectAction(id: string, slug?: string) {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { error } = await (supabase as any).from("projects").delete().eq("id", id);
      if (error) throw new Error(error.message);
    }
    revalidatePath("/");
    revalidatePath("/projects");
    if (slug) revalidatePath(`/projects/${slug}`);
    return { success: true, message: "Project deleted from database." };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Server Action: Quick Toggle Project Status
 */
export async function toggleProjectFlagsAction(
  id: string,
  flags: { is_published?: boolean; is_featured?: boolean }
) {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { error } = await (supabase as any).from("projects").update(flags).eq("id", id);
      if (error) throw new Error(error.message);
    }
    revalidatePath("/");
    revalidatePath("/projects");
    return { success: true, message: "Project status updated." };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Server Action: Save Blog Article
 */
export async function saveArticleAction(input: unknown) {
  try {
    const validated = blogArticleSchema.parse(input);
    const supabase = await createServerSupabaseClient();

    if (!supabase) {
      return { success: true, message: "Article saved in memory buffer.", data: validated };
    }

    const payload = {
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
    };

    if (validated.id) {
      const { data, error } = await (supabase as any)
        .from("blog_articles")
        .update(payload)
        .eq("id", validated.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      revalidatePath("/journal");
      revalidatePath(`/journal/${validated.slug}`);
      return { success: true, message: "Article updated successfully.", data };
    } else {
      const { data, error } = await (supabase as any)
        .from("blog_articles")
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      revalidatePath("/journal");
      return { success: true, message: "Article created successfully.", data };
    }
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save article." };
  }
}

/**
 * Server Action: Delete Article
 */
export async function deleteArticleAction(id: string, slug?: string) {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { error } = await (supabase as any).from("blog_articles").delete().eq("id", id);
      if (error) throw new Error(error.message);
    }
    revalidatePath("/journal");
    if (slug) revalidatePath(`/journal/${slug}`);
    return { success: true, message: "Article deleted." };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Server Action: Save Skill
 */
export async function saveSkillAction(input: unknown) {
  try {
    const validated = skillSchema.parse(input);
    const supabase = await createServerSupabaseClient();

    if (!supabase) {
      return { success: true, message: "Skill updated in local buffer.", data: validated };
    }

    const payload = {
      name: validated.name,
      slug: validated.slug,
      category: validated.category,
      level: validated.level,
      years_of_experience: validated.years_of_experience,
      icon_name: validated.icon_name || null,
      is_featured: validated.is_featured,
      sort_order: validated.sort_order,
    };

    if (validated.id) {
      const { data, error } = await (supabase as any)
        .from("skills")
        .update(payload)
        .eq("id", validated.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      revalidatePath("/skills");
      return { success: true, message: "Skill updated.", data };
    } else {
      const { data, error } = await (supabase as any)
        .from("skills")
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      revalidatePath("/skills");
      return { success: true, message: "Skill added.", data };
    }
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Server Action: Delete Skill
 */
export async function deleteSkillAction(id: string) {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { error } = await (supabase as any).from("skills").delete().eq("id", id);
      if (error) throw new Error(error.message);
    }
    revalidatePath("/skills");
    return { success: true, message: "Skill deleted." };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Server Action: Save Experience
 */
export async function saveExperienceAction(input: unknown) {
  try {
    const validated = experienceSchema.parse(input);
    const supabase = await createServerSupabaseClient();

    if (!supabase) return { success: true, message: "Experience updated.", data: validated };

    const payload = {
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
    };

    if (validated.id) {
      const { data, error } = await (supabase as any)
        .from("experience")
        .update(payload)
        .eq("id", validated.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      revalidatePath("/experience");
      return { success: true, message: "Experience updated.", data };
    } else {
      const { data, error } = await (supabase as any)
        .from("experience")
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      revalidatePath("/experience");
      return { success: true, message: "Experience created.", data };
    }
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Server Action: Delete Experience
 */
export async function deleteExperienceAction(id: string) {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { error } = await (supabase as any).from("experience").delete().eq("id", id);
      if (error) throw new Error(error.message);
    }
    revalidatePath("/experience");
    return { success: true, message: "Experience deleted." };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Server Action: Update Inbound Contact Enquiry
 */
export async function updateEnquiryAction(id: string, input: unknown) {
  try {
    const validated = contactEnquiryAdminUpdateSchema.parse(input);
    const supabase = await createServerSupabaseClient();

    if (!supabase) return { success: true, message: "Enquiry status updated." };

    const { data, error } = await (supabase as any)
      .from("contact_enquiries")
      .update({
        status: validated.status,
        admin_notes: validated.admin_notes || null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return { success: true, message: "Enquiry marked as " + validated.status, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Server Action: Delete Enquiry
 */
export async function deleteEnquiryAction(id: string) {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { error } = await (supabase as any).from("contact_enquiries").delete().eq("id", id);
      if (error) throw new Error(error.message);
    }
    return { success: true, message: "Enquiry removed." };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Server Action: Save Website Setting
 */
export async function saveSettingAction(key: string, value: any, isPublic = true) {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return { success: true, message: "Setting saved in local buffer." };

    const { data, error } = await (supabase as any)
      .from("website_settings")
      .upsert({
        key,
        value,
        is_public: isPublic,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    revalidatePath("/");
    return { success: true, message: `Setting '${key}' saved.`, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
