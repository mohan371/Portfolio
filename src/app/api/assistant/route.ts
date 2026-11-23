import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateAssistantResponse } from "@/lib/ai/engine";
import { checkRateLimit } from "@/lib/ai/rate-limiter";

const RequestSchema = z.object({
  message: z.string().trim().min(1, "Message cannot be empty").max(1000, "Message exceeds 1000 characters"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().max(2000),
      })
    )
    .optional()
    .default([]),
});

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(ip, 20, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please wait a few seconds before asking another question.",
          resetInSec: rateLimit.resetInSec,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetInSec.toString(),
          },
        }
      );
    }

    // 2. Body parsing and Zod validation
    const json = await req.json();
    const parsed = RequestSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || "Invalid payload format.",
        },
        { status: 400 }
      );
    }

    const { message, history } = parsed.data;

    // 3. Engine execution (Gemini with deterministic fallback)
    const result = await generateAssistantResponse(message, history);

    return NextResponse.json({
      success: true,
      answer: result.answer,
      source: result.source,
      suggestedQuestions: result.suggestedQuestions,
      remainingRateLimit: rateLimit.remaining,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Assistant temporarily encountered an internal error. Please try again.",
      },
      { status: 500 }
    );
  }
}
