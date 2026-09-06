import type { Achievement } from "./types";

export const LAB_ACHIEVEMENTS: readonly Achievement[] = [
  {
    id: "first-fix",
    title: "First Fix",
    description: "Completed your first Engineering Lab challenge.",
  },
  {
    id: "bug-hunter",
    title: "Bug Hunter",
    description: "Solved 10 debugging challenges.",
  },
  {
    id: "production-hero",
    title: "Production Hero",
    description: "Resolved 5 production incidents.",
  },
  {
    id: "architect",
    title: "Architect",
    description: "Completed 10 system design challenges.",
  },
  {
    id: "speed-demon",
    title: "Speed Demon",
    description: "Finished a timed challenge under the target time.",
  },
  {
    id: "sql-wizard",
    title: "SQL Wizard",
    description: "Completed 10 SQL Arena challenges.",
  },
  {
    id: "senior-mindset",
    title: "Senior Mindset",
    description: "Scored 90% or higher on a senior or staff interview.",
  },
  {
    id: "cost-cutter",
    title: "Cost Cutter",
    description: "Beat a Cloud Cost challenge under budget.",
  },
] as const;
