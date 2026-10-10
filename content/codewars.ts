import { SOCIAL_LINKS } from "@/lib/constants";
import catalog from "./codewars-catalog.json";
import stats from "./codewars-stats.json";

export const CODEWARS_PAGE_SIZE = 10;

/** Rank, honor and leaderboard position are refreshed from the Codewars API on every build. */
export const codewarsRecord = {
  username: stats.username,
  statsUsername: stats.username,
  rank: stats.rank,
  honor: stats.honor,
  leaderboardPosition: stats.leaderboardPosition,
  totalCompleted: stats.totalCompleted,
  totalAuthored: stats.totalAuthored,
  updatedAt: stats.fetchedAt,
  href: SOCIAL_LINKS.codewars,
  statsHref: SOCIAL_LINKS.codewarsStats,
} as const;

const formatCount = (value: number) => value.toLocaleString("en-US");

/** One-line record for meta copy, FAQs and AI files, e.g. "1 dan · 80,395 honor · #34 worldwide". */
export const codewarsHeadline = `${codewarsRecord.rank} · ${formatCount(codewarsRecord.honor)} honor · #${codewarsRecord.leaderboardPosition} worldwide`;

export const codewarsSentence = `On Codewars (as ${codewarsRecord.username}), Al Beltran holds the ${codewarsRecord.rank} rank with ${formatCount(codewarsRecord.honor)} honor, is #${codewarsRecord.leaderboardPosition} on the global leaderboard, has solved ${formatCount(codewarsRecord.totalCompleted)} kata and authored ${formatCount(codewarsRecord.totalAuthored)}.`;

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
