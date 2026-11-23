import { createServerSupabaseClient } from "@/lib/supabase/server";
import { contactEnquiryInputSchema, contactEnquiryAdminUpdateSchema } from "@/lib/validations";

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  serviceInterest?: string;
  budgetRange?: string;
  status: "unread" | "in_review" | "responded" | "archived";
  createdAt: string;
  adminNotes?: string;
}

/**
 * Creates a new inbound contact enquiry.
 * PUBLIC ACTION: Any user can submit, but can NEVER read back submissions.
 */
export async function createEnquiry(rawInput: unknown): Promise<{ success: boolean; id?: string }> {
  const validated = contactEnquiryInputSchema.parse(rawInput);
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    console.log("[EnquiriesRepository] Local offline submission captured:", validated.email);
    return { success: true, id: "mock-enquiry-" + Date.now() };
  }

  const { data, error } = await (supabase as any)
    .from("contact_enquiries")
    .insert({
      name: validated.name,
      email: validated.email,
      subject: validated.subject,
      message: validated.message,
      service_interest: validated.service_interest || null,
      budget_range: validated.budget_range || null,
      status: "unread",
    })
    .select("id")
    .single();

  if (error) {
    console.error("[EnquiriesRepository] Insert error:", error);
    throw new Error("Unable to transmit message. Please contact via direct email.");
  }

  return { success: true, id: data.id };
}

/**
 * Lists inbound enquiries.
 * STRICT SECURITY: Restricted exclusively to verified administrators.
 */
export async function getEnquiries(): Promise<ContactEnquiry[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await (supabase as any)
    .from("contact_enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("[EnquiriesRepository] Access restricted by RLS policy:", error.message);
    return [];
  }

  return (data as any[]).map((e) => ({
    id: e.id,
    name: e.name,
    email: e.email,
    subject: e.subject,
    message: e.message,
    serviceInterest: e.service_interest || undefined,
    budgetRange: e.budget_range || undefined,
    status: e.status,
    createdAt: e.created_at,
    adminNotes: e.admin_notes || undefined,
  }));
}

/**
 * Updates status and internal notes on an enquiry (Admin only).
 */
export async function updateEnquiryStatus(id: string, rawInput: unknown) {
  const validated = contactEnquiryAdminUpdateSchema.parse(rawInput);
  const supabase = await createServerSupabaseClient();
  if (!supabase) throw new Error("Supabase is not configured.");

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
  return data;
}
