export type LabDifficulty = "junior" | "mid" | "senior" | "staff";

export type LabExperienceId =
  | "debug-this"
  | "system-design"
  | "code-battle"
  | "sql-arena"
  | "production-fire"
  | "cloud-cost"
  | "interview";

export type LabExperience = {
  id: LabExperienceId;
  href: string;
  title: string;
  kicker: string;
  tagline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  featured?: boolean;
};

export type LabScoreBreakdown = {
  label: string;
  value: number;
};

export type LabEducationBlock = {
  howItWorks: string[];
  keyConcepts: { title: string; body: string }[];
  commonMistakes: string[];
  interviewTips: string[];
  recommended?: string[];
};

export type DailyPrompt = {
  id: string;
  experienceId: LabExperienceId;
  challengeId?: string;
  question: string;
  href: string;
};

export type AchievementId =
  | "bug-hunter"
  | "production-hero"
  | "architect"
  | "speed-demon"
  | "sql-wizard"
  | "senior-mindset"
  | "cost-cutter"
  | "first-fix";

export type Achievement = {
  id: AchievementId;
  title: string;
  description: string;
};

export type SystemComponentId =
  | "client"
  | "cdn"
  | "load-balancer"
  | "api"
  | "cache"
  | "database"
  | "replica"
  | "queue"
  | "object-storage"
  | "worker"
  | "search"
  | "rate-limiter";
