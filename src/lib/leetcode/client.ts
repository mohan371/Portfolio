import { problemSolvingData } from "@/content/data/problem-solving";

export interface LeetCodeLiveStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  currentStreak: number;
  totalActiveDays: number;
  ranking: number | null;
  lastUpdated: string;
  isLive: boolean;
}

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

const USER_DATA_QUERY = `
query getUserData($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      ranking
      realName
    }
    submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    userCalendar {
      streak
      totalActiveDays
    }
  }
}
`;

export async function fetchLeetCodeStats(
  username: string = problemSolvingData.username
): Promise<LeetCodeLiveStats> {
  const fallback: LeetCodeLiveStats = {
    username,
    totalSolved: problemSolvingData.totalSolved,
    easySolved: problemSolvingData.breakdown.easy,
    mediumSolved: problemSolvingData.breakdown.medium,
    hardSolved: problemSolvingData.breakdown.hard,
    currentStreak: problemSolvingData.currentStreak,
    totalActiveDays: problemSolvingData.totalActiveDays,
    ranking: null,
    lastUpdated: new Date().toISOString(),
    isLive: false,
  };

  try {
    const res = await fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: `https://leetcode.com/u/${username}/`,
      },
      body: JSON.stringify({
        query: USER_DATA_QUERY,
        variables: { username },
      }),
      // Revalidate in background every 30 minutes (1800s) on Next.js server
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      console.warn(`[LeetCodeClient] HTTP ${res.status} from LeetCode. Using fallback.`);
      return fallback;
    }

    const json = await res.json();
    const user = json?.data?.matchedUser;

    if (!user) {
      console.warn(`[LeetCodeClient] User ${username} not found in LeetCode response.`);
      return fallback;
    }

    const submissions: Array<{ difficulty: string; count: number }> =
      user.submitStatsGlobal?.acSubmissionNum || [];

    const allItem = submissions.find((s) => s.difficulty === "All");
    const easyItem = submissions.find((s) => s.difficulty === "Easy");
    const mediumItem = submissions.find((s) => s.difficulty === "Medium");
    const hardItem = submissions.find((s) => s.difficulty === "Hard");

    const totalSolved = allItem ? allItem.count : 0;
    const easySolved = easyItem ? easyItem.count : 0;
    const mediumSolved = mediumItem ? mediumItem.count : 0;
    const hardSolved = hardItem ? hardItem.count : 0;

    const currentStreak = user.userCalendar?.streak || 0;
    const totalActiveDays = user.userCalendar?.totalActiveDays || 0;
    const ranking = user.profile?.ranking || null;

    return {
      username: user.username || username,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      currentStreak,
      totalActiveDays,
      ranking,
      lastUpdated: new Date().toISOString(),
      isLive: true,
    };
  } catch (error) {
    console.error("[LeetCodeClient] Network or parsing error:", error);
    return fallback;
  }
}
