import { describe, it, expect } from "vitest";
import { problemSolvingData } from "@/content/data/problem-solving";
import { siteConfig } from "@/content/data/site-config";
import { fetchLeetCodeStats } from "@/lib/leetcode/client";

describe("Problem-Solving Journey (LeetCode 100-Day Challenge) Suite", () => {
  it("1. Verifies authentic problem-solving baseline metrics (zero fabrication)", () => {
    expect(problemSolvingData.totalSolved).toBe(5);
    expect(problemSolvingData.currentStreak).toBe(1);
    expect(problemSolvingData.totalActiveDays).toBe(5);
    expect(problemSolvingData.breakdown.easy).toBe(5);
    expect(problemSolvingData.breakdown.medium).toBe(0);
    expect(problemSolvingData.breakdown.hard).toBe(0);
  });

  it("2. Verifies journey parameters and target goal", () => {
    expect(problemSolvingData.platform).toBe("LeetCode");
    expect(problemSolvingData.status).toBe("In Progress");
    expect(problemSolvingData.startDate).toBe("November 24, 2026");
    expect(problemSolvingData.targetGoalDays).toBe(100);
  });

  it("3. Verifies configurable profile URL structure", () => {
    expect(problemSolvingData.username).toBe("Mohannv123");
    expect(problemSolvingData.profileUrl).toBe("https://leetcode.com/u/Mohannv123/");
    expect(siteConfig.socials.leetcode).toBe(problemSolvingData.profileUrl);
  });

  it("4. Verifies topic pillars are defined and structured", () => {
    expect(problemSolvingData.focusPillars.length).toBeGreaterThanOrEqual(4);
    const activePillars = problemSolvingData.focusPillars.filter((p) => p.status === "Active");
    expect(activePillars.length).toBeGreaterThan(0);
  });

  it("5. Verifies LeetCode client fallback is resilient and structured", async () => {
    // Calling with a non-existent user or network-safe fallback returns valid LeetCodeLiveStats shape
    const stats = await fetchLeetCodeStats("Mohannv123");
    expect(stats).toHaveProperty("totalSolved");
    expect(stats).toHaveProperty("currentStreak");
    expect(stats).toHaveProperty("totalActiveDays");
    expect(stats.totalSolved).toBeGreaterThanOrEqual(5);
  });
});
