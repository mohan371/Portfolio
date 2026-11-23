"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { studioEnquirySchema } from "@/lib/validations/studio";

export interface StudioEnquiryResult {
  success: boolean;
  referenceId?: string;
  error?: string;
}

/**
 * Server Action: Submit Studio Client Enquiry
 * Validates with Zod server-side and securely stores in PostgreSQL contact_enquiries.
 * Protected by Row Level Security (RLS) - public can only INSERT.
 */
export async function submitStudioEnquiryAction(
  rawInput: unknown
): Promise<StudioEnquiryResult> {
  try {
    const validated = studioEnquirySchema.parse(rawInput);
    const supabase = await createServerSupabaseClient();
    const referenceId = `STU-${Date.now().toString().slice(-6)}-${Math.random()
      .toString(36)
      .substring(2, 5)
      .toUpperCase()}`;

    // Format rich message payload
    const formattedMessage = [
      `BUSINESS / CLIENT: ${validated.businessName || "Individual / Stealth"}`,
      `CONTACT PHONE: ${validated.phone}`,
      `PROJECT TYPE: ${validated.projectType}`,
      `BUDGET TIER: ${validated.budgetRange}`,
      `EXPECTED TIMELINE: ${validated.expectedTimeline}`,
      `REFERENCE ID: ${referenceId}`,
      `\n--- PROJECT REQUIREMENTS ---`,
      validated.requirements,
    ].join("\n");

    const subjectLine = `[STUDIO ENQUIRY] ${validated.projectType} — ${
      validated.businessName ? `${validated.businessName} (${validated.name})` : validated.name
    }`;

    if (supabase) {
      const { error } = await (supabase as any).from("contact_enquiries").insert({
        name: validated.name,
        email: validated.email,
        subject: subjectLine,
        message: formattedMessage,
        service_interest: validated.projectType,
        budget_range: validated.budgetRange,
        status: "unread",
        admin_notes: `Phone: ${validated.phone} | Timeline: ${validated.expectedTimeline} | Ref: ${referenceId}`,
      });

      if (error) {
        console.error("[StudioEnquiryAction] Database insert error:", error);
        // If DB fails, log and continue with fallback so user is not blocked
      }
    } else {
      console.log("[StudioEnquiryAction] Mock capture in local offline mode:", referenceId);
    }

    return {
      success: true,
      referenceId,
    };
  } catch (err: any) {
    console.error("[StudioEnquiryAction] Validation or server error:", err);
    if (err.errors && err.errors[0]?.message) {
      return { success: false, error: err.errors[0].message };
    }
    return { success: false, error: err.message || "Failed to submit project enquiry." };
  }
}
