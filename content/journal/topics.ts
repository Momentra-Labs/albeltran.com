export const JOURNAL_TOPIC_IDS = [
  "react",
  "typescript-javascript",
  "nodejs-backend",
  "java-spring",
  "php-laravel",
  "databases",
  "aws-cloud",
  "aem",
  "system-design",
  "engineering-notes",
] as const;

export type JournalTopicId = (typeof JOURNAL_TOPIC_IDS)[number];

export type SearchIntent =
  | "informational"
  | "educational"
  | "interview"
  | "problem-solving"
  | "comparison"
  | "architecture"
  | "troubleshooting";

export type ArticleStatus = "planned" | "draft" | "review" | "published";
export type ArticlePriority = "high" | "medium" | "low";
export type ArticleDifficulty = "beginner" | "intermediate" | "senior" | "mixed";
export type ArticleSection = "notes" | "interview";

export type JournalTopic = {
  id: JournalTopicId;
  label: string;
  sectionLabel: string;
  description: string;
  technologies: string[];
};

export const JOURNAL_TOPICS: JournalTopic[] = [
  {
    id: "react",
    label: "React",
    sectionLabel: "Frontend",
    description:
      "Hooks, rendering, composition, and the boundaries that keep product UIs operable.",
    technologies: ["React", "Next.js", "TypeScript"],
  },
  {
    id: "typescript-javascript",
    label: "TypeScript / JavaScript",
    sectionLabel: "Frontend",
    description:
      "Language contracts, runtime behavior, and types that pay rent at system boundaries.",
    technologies: ["TypeScript", "JavaScript"],
  },
  {
    id: "nodejs-backend",
    label: "Node.js / Backend",
    sectionLabel: "Backend",
    description:
      "HTTP handlers, jobs, validation, and failure modes in Node services.",
    technologies: ["Node.js", "JavaScript", "TypeScript"],
  },
  {
    id: "java-spring",
    label: "Java / Spring Boot",
    sectionLabel: "Backend",
    description:
      "Service boundaries, transactions, and Spring Boot defaults that matter in production.",
    technologies: ["Java", "Spring Boot"],
  },
  {
    id: "php-laravel",
    label: "PHP / Laravel",
    sectionLabel: "Backend",
    description:
      "Laravel delivery patterns, PHP typing, queues, and the mistakes that show up under load.",
    technologies: ["PHP", "Laravel"],
  },
  {
    id: "databases",
    label: "SQL / PostgreSQL / MySQL",
    sectionLabel: "Databases",
    description:
      "Indexes, plans, transactions, and the queries that decide whether a system stays fast.",
    technologies: ["SQL", "PostgreSQL", "MySQL"],
  },
  {
    id: "aws-cloud",
    label: "AWS / Cloud / DevOps",
    sectionLabel: "Cloud",
    description:
      "Lambda, queues, IAM, containers, and the operational details that turn diagrams into systems.",
    technologies: ["AWS", "AWS Lambda", "Docker"],
  },
  {
    id: "aem",
    label: "Adobe Experience Manager",
    sectionLabel: "AEM",
    description:
      "Authoring contracts, components, dispatcher, and enterprise CMS delivery.",
    technologies: ["Adobe Experience Manager"],
  },
  {
    id: "system-design",
    label: "Software Engineering / System Design",
    sectionLabel: "Architecture",
    description:
      "Tradeoffs, interviews, and the design notes that keep teams aligned.",
    technologies: ["System Design", "Software Engineering"],
  },
  {
    id: "engineering-notes",
    label: "Al's Engineering Notes",
    sectionLabel: "Engineering Notes",
    description:
      "Review, mentoring, runbooks, and how engineering work actually gets done.",
    technologies: ["Software Engineering"],
  },
];

export function getJournalTopic(id: string) {
  return JOURNAL_TOPICS.find((topic) => topic.id === id);
}
