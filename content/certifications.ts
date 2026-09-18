export type CertificationSeal = "anthropic" | "hackerrank";

export type CertificationCategory = "role" | "skill" | "training";

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issued: string;
  completedOn?: string;
  url: string;
  seal: CertificationSeal;
  category: CertificationCategory;
  image?: {
    src: string;
    alt: string;
  };
};

export const CERTIFICATION_CATEGORIES: {
  id: CertificationCategory;
  label: string;
  shortLabel: string;
}[] = [
  { id: "role", label: "Role certification", shortLabel: "Role" },
  { id: "skill", label: "Skill certification", shortLabel: "Skill" },
  { id: "training", label: "Basic certification", shortLabel: "Basic" },
];

export const certifications: Certification[] = [
  {
    id: "hackerrank-software-engineer",
    name: "Software Engineer",
    issuer: "HackerRank",
    issued: "Sep 2026",
    completedOn: "2026-09-18",
    url: "https://www.hackerrank.com/certificates/9a70c3c2bb8a",
    seal: "hackerrank",
    category: "role",
    image: {
      src: "/certification/softwareengineer.png",
      alt: "HackerRank Software Engineer role certificate presented to Al Andrew Paul Beltran",
    },
  },
  {
    id: "hackerrank-frontend-react",
    name: "Frontend Developer (React)",
    issuer: "HackerRank",
    issued: "Jan 2024",
    url: "https://www.hackerrank.com/certificates/8d503b90bd78",
    seal: "hackerrank",
    category: "role",
    image: {
      src: "/certification/frontenddeveloper.png",
      alt: "HackerRank Frontend Developer (React) role certificate presented to Al Andrew Paul Beltran",
    },
  },
  {
    id: "hackerrank-javascript-intermediate",
    name: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    issued: "Nov 2022",
    completedOn: "2022-11-12",
    url: "https://www.hackerrank.com/certificates/8af4d4f84cd7",
    seal: "hackerrank",
    category: "skill",
    image: {
      src: "/certification/javascriptintermediate.png",
      alt: "HackerRank JavaScript (Intermediate) skill certificate presented to Al Andrew Paul Beltran",
    },
  },
  {
    id: "hackerrank-sql-advanced",
    name: "SQL (Advanced)",
    issuer: "HackerRank",
    issued: "Sep 2026",
    completedOn: "2026-09-18",
    url: "https://www.hackerrank.com/certificates/06f0e8c0ff2c",
    seal: "hackerrank",
    category: "skill",
    image: {
      src: "/certification/sqladvanced.png",
      alt: "HackerRank SQL (Advanced) skill certificate presented to Al Andrew Paul Beltran",
    },
  },
  {
    id: "hackerrank-react-basic",
    name: "React (Basic)",
    issuer: "HackerRank",
    issued: "Jan 2024",
    url: "https://www.hackerrank.com/certificates/01d951aaae9d",
    seal: "hackerrank",
    category: "skill",
    image: {
      src: "/certification/reactbasic.png",
      alt: "HackerRank React (Basic) skill certificate presented to Al Andrew Paul Beltran",
    },
  },
  {
    id: "anthropic-ai-fluency",
    name: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic Education",
    issued: "Apr 2026",
    completedOn: "2026-04-27",
    url: "https://verify.skilljar.com/c/nwa32ew8z2ci",
    seal: "anthropic",
    category: "training",
    image: {
      src: "/certification/anthropic/aifluency.jpg",
      alt: "Anthropic Education AI Fluency: Framework & Foundations certificate presented to Al Andrew Paul Beltran",
    },
  },
  {
    id: "anthropic-agent-skills",
    name: "Introduction to agent skills",
    issuer: "Anthropic Education",
    issued: "Apr 2026",
    completedOn: "2026-04-27",
    url: "https://verify.skilljar.com/c/gtjgsqoc2ymi",
    seal: "anthropic",
    category: "training",
    image: {
      src: "/certification/anthropic/introductiontoagentskills.jpg",
      alt: "Anthropic Education Introduction to agent skills certificate presented to Al Andrew Paul Beltran",
    },
  },
  {
    id: "anthropic-subagents",
    name: "Introduction to subagents",
    issuer: "Anthropic Education",
    issued: "Apr 2026",
    completedOn: "2026-04-27",
    url: "https://verify.skilljar.com/c/jh2cdrcc3guh",
    seal: "anthropic",
    category: "training",
    image: {
      src: "/certification/anthropic/introductiontosubagents.png",
      alt: "Anthropic Education Introduction to subagents certificate presented to Al Andrew Paul Beltran",
    },
  },
];

export function certificationsByCategory() {
  return CERTIFICATION_CATEGORIES.map((category) => ({
    ...category,
    items: certifications.filter((cert) => cert.category === category.id),
  }));
}
