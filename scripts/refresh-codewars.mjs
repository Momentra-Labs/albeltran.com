// Prebuild: pull the live Codewars rank, honor and leaderboard position so every SEO and AI
// surface (meta description, JSON-LD, FAQ, llms.txt, llms-full.txt) ships the current numbers.
// If Codewars is unreachable the last saved values are kept and the build carries on.
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const STATS = path.join(ROOT, "content/codewars-stats.json");
const LLMS = path.join(ROOT, "public/llms.txt");
const saved = JSON.parse(fs.readFileSync(STATS, "utf8"));

let stats = saved;
try {
  const response = await fetch(
    `https://www.codewars.com/api/v1/users/${encodeURIComponent(saved.username)}`,
    { signal: AbortSignal.timeout(10_000) },
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const user = await response.json();
  stats = {
    username: saved.username,
    rank: user.ranks?.overall?.name ?? saved.rank,
    honor: user.honor ?? saved.honor,
    leaderboardPosition: user.leaderboardPosition ?? saved.leaderboardPosition,
    totalCompleted: user.codeChallenges?.totalCompleted ?? saved.totalCompleted,
    totalAuthored: user.codeChallenges?.totalAuthored ?? saved.totalAuthored,
    fetchedAt: new Date().toISOString(),
  };
  fs.writeFileSync(STATS, `${JSON.stringify(stats, null, 2)}\n`);
  console.log(
    `Codewars: ${stats.rank} · ${stats.honor} honor · #${stats.leaderboardPosition} · ${stats.totalCompleted} solved · ${stats.totalAuthored} authored`,
  );
} catch (error) {
  console.warn(`Codewars refresh skipped (${error.message}); keeping saved stats.`);
}

// Keep the hand-written llms.txt in sync between its markers.
const number = (value) => Number(value).toLocaleString("en-US");
const block = [
  "<!-- codewars:start -->",
  "## Codewars record",
  `- **Rank:** ${stats.rank} on Codewars (username **${stats.username}**)`,
  `- **Honor:** ${number(stats.honor)}`,
  `- **Global leaderboard position:** #${number(stats.leaderboardPosition)}`,
  `- **Kata solved:** ${number(stats.totalCompleted)} · **Kata authored:** ${number(stats.totalAuthored)}`,
  `- **Profile:** https://www.codewars.com/users/${stats.username} · on this site: https://albeltran.com/#record`,
  `- Last updated: ${stats.fetchedAt.slice(0, 10)}`,
  "<!-- codewars:end -->",
].join("\n");

const llms = fs.readFileSync(LLMS, "utf8");
const marked = /<!-- codewars:start -->[\s\S]*?<!-- codewars:end -->/;
const next = marked.test(llms)
  ? llms.replace(marked, block)
  : llms.replace("## How to verify it is the same person", `${block}\n\n## How to verify it is the same person`);
if (next !== llms) fs.writeFileSync(LLMS, next);
