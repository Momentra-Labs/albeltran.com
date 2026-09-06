import type { LabEducationBlock, LabExperience, LabExperienceId } from "./types";

export const LAB_EXPERIENCES: readonly LabExperience[] = [
  {
    id: "debug-this",
    href: "/lab/debug-this/",
    title: "Debug This",
    kicker: "Incidents",
    tagline: "Production is broken. Find the root cause.",
    description:
      "Inspect simulated logs, errors, metrics, and symptoms, then name what actually failed.",
    seoTitle: "Debug This — Production Incident Practice | Al Beltran",
    seoDescription:
      "Practice finding root causes from logs, errors, and metrics in Al Beltran's browser-based debugging lab.",
    featured: true,
  },
  {
    id: "system-design",
    href: "/lab/system-design/",
    title: "System Design Simulator",
    kicker: "Architecture",
    tagline: "Design a system that survives millions of users.",
    description:
      "Pick components and architecture decisions, then score scalability, reliability, performance, cost, and complexity.",
    seoTitle:
      "System Design Simulator — Practice Scalable Architecture | Al Beltran",
    seoDescription:
      "Practice system design by building scalable architectures for real-world engineering scenarios with Al Beltran's interactive system design simulator.",
    featured: true,
  },
  {
    id: "code-battle",
    href: "/lab/code-battle/",
    title: "Code Battle",
    kicker: "Timed",
    tagline: "Solve engineering problems before time runs out.",
    description:
      "Timed questions across JavaScript, TypeScript, React, Node.js, Java, Spring Boot, PHP, Laravel, and SQL.",
    seoTitle: "Code Battle — Timed Engineering Challenges | Al Beltran",
    seoDescription:
      "Race through timed JavaScript, TypeScript, React, backend, and SQL challenges in Al Beltran's Engineering Lab.",
  },
  {
    id: "sql-arena",
    href: "/lab/sql-arena/",
    title: "SQL Arena",
    kicker: "Data",
    tagline: "Write the query. Beat the challenge.",
    description:
      "Query a small in-browser dataset. No server and no real database — just SQL-style thinking.",
    seoTitle: "SQL Arena — In-Browser Query Challenges | Al Beltran",
    seoDescription:
      "Practice SQL against a tiny in-browser dataset in Al Beltran's SQL Arena. No backend database required.",
  },
  {
    id: "production-fire",
    href: "/lab/production-fire/",
    title: "Production Is On Fire",
    kicker: "Response",
    tagline: "Your production system is failing. You have limited time.",
    description:
      "Choose incident actions and watch downtime, latency, cost, and users affected change.",
    seoTitle: "Production Is On Fire — Incident Response Simulator | Al Beltran",
    seoDescription:
      "Run timed incident-response scenarios and score downtime, cost, and reliability in Al Beltran's Engineering Lab.",
    featured: true,
  },
  {
    id: "cloud-cost",
    href: "/lab/cloud-cost/",
    title: "Cloud Cost Challenge",
    kicker: "Estimates",
    tagline: "Build the architecture without burning money.",
    description:
      "Tune compute, database, storage, CDN, and cache using static estimate pricing — not live cloud APIs.",
    seoTitle: "Cloud Cost Challenge — Architecture Cost Simulator | Al Beltran",
    seoDescription:
      "Estimate monthly cloud cost from static pricing data and cut spend without breaking performance in Al Beltran's lab.",
  },
  {
    id: "interview",
    href: "/lab/interview/",
    title: "Engineering Interview",
    kicker: "Thinking",
    tagline: "Think like a senior engineer.",
    description:
      "Junior through Staff quizzes on JavaScript, React, backend, system design, databases, DevOps, and leadership.",
    seoTitle: "Engineering Interview — Interactive Practice | Al Beltran",
    seoDescription:
      "Practice junior through staff engineering interview questions with explanations in Al Beltran's Engineering Lab.",
  },
] as const;

export function getLabExperience(id: LabExperienceId) {
  return LAB_EXPERIENCES.find((item) => item.id === id);
}

export function featuredLabExperiences() {
  return LAB_EXPERIENCES.filter((item) => item.featured);
}

export const LAB_HUB_EDUCATION: LabEducationBlock = {
  howItWorks: [
    "Pick an experience. Every challenge runs in the browser against static data.",
    "Your scores, streak, and achievements stay in localStorage on this device only.",
    "Share a result as text or a link. Nothing is uploaded and there are no accounts.",
  ],
  keyConcepts: [
    {
      title: "Practice over pages",
      body: "Each tool is a small engineering experiment: debug, design, query, respond, estimate, and explain.",
    },
    {
      title: "Local progress",
      body: "Completions and high scores never leave the browser. Clear site data and the profile resets.",
    },
  ],
  commonMistakes: [
    "Treating a high score as proof you would ship that design in production.",
    "Skipping the debrief. The explanation is the useful part.",
  ],
  interviewTips: [
    "Say the tradeoff out loud before you pick a component or a root cause.",
    "Time-box. Interviewers care about how you prioritize under pressure.",
  ],
};
