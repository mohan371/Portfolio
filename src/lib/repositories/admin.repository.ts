import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface AdminProfile {
  id: string;
  email: string;
  fullName: string;
  role: "superadmin" | "admin" | "editor";
  createdAt: string;
}

export interface AdminAuthResult {
  isAuthenticated: boolean;
  isAdmin: boolean;
  adminProfile?: AdminProfile;
  error?: string;
}

/**
 * Server-side authorization verification.
 * Strictly verifies the JWT claims and validates that auth.uid()
 * is an authorized administrative record in public.admin_users.
 */
export async function verifyAdminSession(): Promise<AdminAuthResult> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return {
      isAuthenticated: false,
      isAdmin: false,
      error: "Supabase client unconfigured.",
    };
  }

  // 1. Verify authenticated user identity with Supabase Auth server
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      isAuthenticated: false,
      isAdmin: false,
      error: "No active session.",
    };
  }

  // 2. Query public.admin_users table (protected by RLS)
  const { data: adminRecord, error: adminError } = await (supabase as any)
    .from("admin_users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (adminError || !adminRecord) {
    return {
      isAuthenticated: true,
      isAdmin: false,
      error: "User is authenticated but does not hold administrative privileges.",
    };
  }

  return {
    isAuthenticated: true,
    isAdmin: true,
    adminProfile: {
      id: adminRecord.id,
      email: adminRecord.email,
      fullName: adminRecord.full_name,
      role: adminRecord.role,
      createdAt: adminRecord.created_at,
    },
  };
}

export async function listAdmins(): Promise<AdminProfile[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await (supabase as any)
    .from("admin_users")
    .select("*")
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  return (data as any[]).map((a) => ({
    id: a.id,
    email: a.email,
    fullName: a.full_name,
    role: a.role,
    createdAt: a.created_at,
  }));
}
