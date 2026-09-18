export type CertificationSeal = "anthropic" | "hackerrank";

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issued: string;
  completedOn?: string;
  url: string;
  seal: CertificationSeal;
};

export const certifications: Certification[] = [
  {
    id: "anthropic-ai-fluency",
    name: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic Education",
    issued: "Apr 2026",
    completedOn: "2026-04-27",
    url: "https://verify.skilljar.com/c/nwa32ew8z2ci",
    seal: "anthropic",
  },
  {
    id: "anthropic-agent-skills",
    name: "Introduction to agent skills",
    issuer: "Anthropic Education",
    issued: "Apr 2026",
    completedOn: "2026-04-27",
    url: "https://verify.skilljar.com/c/gtjgsqoc2ymi",
    seal: "anthropic",
  },
  {
    id: "anthropic-subagents",
    name: "Introduction to subagents",
    issuer: "Anthropic Education",
    issued: "Apr 2026",
    completedOn: "2026-04-27",
    url: "https://verify.skilljar.com/c/jh2cdrcc3guh",
    seal: "anthropic",
  },
  {
    id: "hackerrank-frontend-react",
    name: "Frontend Developer (React)",
    issuer: "HackerRank",
    issued: "Jan 2024",
    url: "https://www.hackerrank.com/certificates/8d503b90bd78",
    seal: "hackerrank",
  },
  {
    id: "hackerrank-react-basic",
    name: "React (Basic)",
    issuer: "HackerRank",
    issued: "Jan 2024",
    url: "https://www.hackerrank.com/certificates/01d951aaae9d",
    seal: "hackerrank",
  },
  {
    id: "hackerrank-javascript-intermediate",
    name: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    issued: "Nov 2022",
    url: "https://www.hackerrank.com/certificates/8af4d4f84cd7",
    seal: "hackerrank",
  },
];
