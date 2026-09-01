export type SystemNode = {
  id: string;
  label: string;
  children: string[];
};

export const systemCenter = "Al Beltran";

export const systemNodes: SystemNode[] = [
  {
    id: "frontend",
    label: "Frontend",
    children: ["React", "TypeScript", "Next.js", "HTML/CSS", "AEM"],
  },
  {
    id: "backend",
    label: "Backend",
    children: ["Java", "Spring Boot", "Node.js", "PHP", "Laravel"],
  },
  {
    id: "data",
    label: "Data",
    children: ["MySQL", "PostgreSQL", "SQL", "Elasticsearch"],
  },
  {
    id: "cloud",
    label: "Cloud",
    children: ["AWS", "Docker", "Lambda", "SQS / SNS", "API Gateway"],
  },
  {
    id: "architecture",
    label: "Architecture",
    children: ["REST APIs", "Event-driven systems", "Serverless", "Distributed systems"],
  },
];
