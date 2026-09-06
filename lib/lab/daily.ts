import { DAILY_PROMPTS } from "@/content/lab/daily";
import type { DailyPrompt } from "@/content/lab/types";

export function utcDayIndex(date = new Date()) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const now = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return Math.floor((now - start) / 86_400_000);
}

export function todaysChallenge(date = new Date()): DailyPrompt {
  const index = utcDayIndex(date) % DAILY_PROMPTS.length;
  return DAILY_PROMPTS[index] ?? DAILY_PROMPTS[0];
}
