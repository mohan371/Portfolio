export interface ProblemSolvingData {
  platform: string;
  profileUrl: string;
  username: string;
  status: "In Progress" | "Completed" | "Paused";
  startDate: string;
  targetGoalDays: number;
  currentDay: number;
  totalSolved: number;
  currentStreak: number;
  maxStreak: number;
  breakdown: {
    easy: number;
    medium: number;
    hard: number;
  };
  focusPillars: {
    name: string;
    description: string;
    status: "Active" | "Upcoming" | "Mastered";
  }[];
  notes: string;
}

/**
 * Problem-Solving Journey Tracker
 * 
 * To update your progress:
 * Simply edit `totalSolved`, `currentStreak`, `currentDay`, or `breakdown` below.
 * All progress indicators and percentages update automatically across the site.
 */
export const problemSolvingData: ProblemSolvingData = {
  platform: "LeetCode",
  profileUrl: "https://leetcode.com/u/mohan371",
  username: "mohan371",
  status: "In Progress",
  startDate: "November 24, 2026",
  targetGoalDays: 100,
  currentDay: 1,
  totalSolved: 0,
  currentStreak: 0,
  maxStreak: 0,
  breakdown: {
    easy: 0,
    medium: 0,
    hard: 0,
  },
  focusPillars: [
    {
      name: "Arrays & Two Pointers",
      description: "Hash maps, sliding window, prefix sums, in-place manipulation",
      status: "Active",
    },
    {
      name: "Binary Search & Sorting",
      description: "Search space reduction, monotonic predicates, divide and conquer",
      status: "Active",
    },
    {
      name: "Trees & Recursion",
      description: "Binary Search Trees, DFS / BFS traversals, tree construction",
      status: "Upcoming",
    },
    {
      name: "Dynamic Programming",
      description: "Memoization, tabulation, state transitions, knapsack patterns",
      status: "Upcoming",
    },
    {
      name: "Graphs & Disjoint Sets",
      description: "Topological sort, Dijkstra, Union-Find, cycle detection",
      status: "Upcoming",
    },
  ],
  notes: "Committed to 100 consecutive days of disciplined problem solving on LeetCode. Zero fabricated metrics.",
};
