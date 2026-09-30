import { SOCIAL_LINKS } from "@/lib/constants";
import catalog from "./codewars-catalog.json";

export const CODEWARS_PAGE_SIZE = 10;

export const codewarsRecord = {
  username: "ZozoFouchtra",
  statsUsername: "ZozoFouchtra",
  rank: "1 dan",
  honor: 80370,
  leaderboardPosition: 34,
  href: SOCIAL_LINKS.codewars,
  statsHref: SOCIAL_LINKS.codewarsStats,
} as const;

export type CodewarsKataSnapshot = {
  name: string;
  href: string;
  kyu: number | null;
  rankLabel: string;
  completedAt: string;
};

export const solvedKatas = catalog.solved as CodewarsKataSnapshot[];
export const authoredKatas = catalog.authored as CodewarsKataSnapshot[];
export const hardestKatas = solvedKatas.slice(0, 20);
