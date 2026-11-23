import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

/**
 * Privileged Supabase Admin Client using the SERVICE ROLE KEY.
 * 
 * SECURITY MANDATE:
 * - NEVER import or execute this on the client side.
 * - NEVER expose SUPABASE_SERVICE_ROLE_KEY to the browser (no NEXT_PUBLIC prefix).
 * - Used exclusively for privileged administrative jobs and background tasks.
 */
export function createAdminSupabaseClient() {
  if (typeof window !== "undefined") {
    throw new Error(
      "SECURITY VIOLATION: createAdminSupabaseClient must NEVER be called from client-side code."
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
