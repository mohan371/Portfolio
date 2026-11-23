export interface BuildingProject {
  id: string;
  title: string;
  category: string;
  description: string;
  progressPercent: number;
  tech: string[];
}

export interface ExploringTech {
  id: string;
  topic: string;
  purpose: string;
  status: "Active R&D" | "Evaluation" | "Benchmarking";
  iconName?: string;
}

export interface EngineeringDispatch {
  id: string;
  date: string;
  tag: string;
  note: string;
  scope: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
  updatedAt: string;
}

export interface CommandCenterData {
  role: string;
  company: string;
  location: string;
  status: string;
  lastUpdated: string;
  currentlyBuilding: BuildingProject[];
  currentlyExploring: ExploringTech[];
  engineeringDispatches: EngineeringDispatch[];
  githubProfile: {
    username: string;
    name: string;
    publicRepos: number;
    followers: number;
    profileUrl: string;
  };
  recentRepos: GitHubRepo[];
}
