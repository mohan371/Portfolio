import { NextRequest, NextResponse } from "next/server";
import { fetchLeetCodeStats } from "@/lib/leetcode/client";
import { problemSolvingData } from "@/content/data/problem-solving";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || problemSolvingData.username;

    const stats = await fetchLeetCodeStats(username);

    return NextResponse.json(
      {
        success: true,
        data: stats,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error: any) {
    console.error("[LeetCodeAPI] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch LeetCode statistics",
      },
      { status: 500 }
    );
  }
}
