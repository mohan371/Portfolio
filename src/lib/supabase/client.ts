import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./types";

/**
 * Creates a browser-side Supabase client for Client Components.
 * Uses only public environment variables (ANON key).
 * Strictly enforces Row Level Security based on active session.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return null when environment variables are not yet configured
    return null;
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
