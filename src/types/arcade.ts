export type ArcadeLevel = 1 | 2 | 3 | 4 | 5;

export interface ChallengeOption {
  id: string;
  text: string;
  fixCode?: string;
  isCorrect: boolean;
}

export interface ArcadeChallenge {
  id: string;
  level: ArcadeLevel;
  levelTitle: string;
  category: "JavaScript" | "React" | "Node.js" | "SQL" | "Advanced Systems";
  title: string;
  scenario: string;
  buggyCode: string;
  language: string;
  options: ChallengeOption[];
  hint: string;
  explanation: string;
}

export interface ArcadeStats {
  score: number;
  highScore: number;
  streak: number;
  highestStreak: number;
  solvedCount: number;
  totalAttempts: number;
}
