export type PhilosophyCategory =
  | "Engineering Principles"
  | "Learning and Discipline"
  | "Technology and Innovation"
  | "Project Lessons"
  | "Problem-Solving"
  | "Personal Reflections";

export interface PhilosophyItem {
  id: string;
  slug: string;
  title: string;
  category: PhilosophyCategory;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTimeMinutes: number;
  isFeatured: boolean;
  keyTakeaways: string[];
}
