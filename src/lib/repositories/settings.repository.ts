import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getPublicSettings(): Promise<Record<string, unknown>> {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await (supabase as any)
        .from("website_settings")
        .select("key, value")
        .eq("is_public", true);

      if (!error && data && data.length > 0) {
        const settingsMap: Record<string, unknown> = {};
        (data as any[]).forEach((row) => {
          settingsMap[row.key] = row.value;
        });
        return settingsMap;
      }
    }
  } catch (err) {
    console.warn("[SettingsRepository] Fallback:", err);
  }

  return {
    resume_config: {
      downloadUrl: "/resume/Mohan_NV_Resume.pdf",
      fileName: "Mohan_NV_Resume.pdf",
    },
    availability_status: {
      openToWork: true,
      noticePeriod: "Immediate",
    },
  };
}

export async function updateSetting(key: string, value: unknown, isPublic = false) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await (supabase as any)
    .from("website_settings")
    .upsert({
      key,
      value: value as any,
      is_public: isPublic,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
