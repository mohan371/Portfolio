import { describe, it, expect } from "vitest";
import { problemSolvingData } from "@/content/data/problem-solving";
import { siteConfig } from "@/content/data/site-config";

describe("Problem-Solving Journey (LeetCode 100-Day Challenge) Suite", () => {
  it("1. Verifies authentic initial problem-solving metrics (zero fabrication)", () => {
    expect(problemSolvingData.totalSolved).toBe(0);
    expect(problemSolvingData.currentStreak).toBe(0);
    expect(problemSolvingData.breakdown.easy).toBe(0);
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
});
