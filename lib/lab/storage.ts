import type { AchievementId, LabExperienceId } from "@/content/lab/types";

export const LAB_STORAGE_KEY = "lab_progress";

export type LabCompletion = {
  score: number;
  maxScore: number;
  at: string;
  elapsedMs?: number;
  underTarget?: boolean;
};

export type LabStore = {
  version: 1;
  completed: Record<string, LabCompletion>;
  bestByExperience: Partial<Record<LabExperienceId, number>>;
  streak: { count: number; lastDate: string };
  achievements: AchievementId[];
};

const EMPTY: LabStore = {
  version: 1,
  completed: {},
  bestByExperience: {},
  streak: { count: 0, lastDate: "" },
  achievements: [],
};

function utcDate(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

function yesterdayUtc(now = new Date()) {
  const d = new Date(now);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

function cloneStore(store: LabStore): LabStore {
  return {
    version: 1,
    completed: { ...store.completed },
    bestByExperience: { ...store.bestByExperience },
    streak: { ...store.streak },
    achievements: [...store.achievements],
  };
}

export function emptyLabStore(): LabStore {
  return cloneStore(EMPTY);
}

let cachedRaw: string | null = null;
let cachedStore: LabStore = EMPTY;

function parseStore(raw: string | null): LabStore {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw) as LabStore;
    if (parsed.version !== 1 || !parsed.completed) return EMPTY;
    return {
      version: 1,
      completed: parsed.completed ?? {},
      bestByExperience: parsed.bestByExperience ?? {},
      achievements: parsed.achievements ?? [],
      streak: parsed.streak ?? { count: 0, lastDate: "" },
    };
  } catch {
    return EMPTY;
  }
}

/** Stable snapshot for useSyncExternalStore. Same reference until localStorage changes. */
export function getLabStoreSnapshot(): LabStore {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(LAB_STORAGE_KEY);
  if (raw === cachedRaw) return cachedStore;
  cachedRaw = raw;
  cachedStore = parseStore(raw);
  return cachedStore;
}

export function getServerLabStoreSnapshot(): LabStore {
  return EMPTY;
}

export function readLabStore(): LabStore {
  return cloneStore(getLabStoreSnapshot());
}

export function writeLabStore(store: LabStore) {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(store);
  window.localStorage.setItem(LAB_STORAGE_KEY, raw);
  window.localStorage.setItem("lab_scores", JSON.stringify(store.bestByExperience));
  window.localStorage.setItem(
    "lab_completed_challenges",
    JSON.stringify(Object.keys(store.completed)),
  );
  cachedRaw = raw;
  cachedStore = cloneStore(store);
  window.dispatchEvent(new Event("lab-progress"));
}

export function subscribeLabStore(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("lab-progress", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("lab-progress", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function completionKey(experienceId: LabExperienceId, challengeId: string) {
  return `${experienceId}:${challengeId}`;
}

export function recordLabResult(input: {
  experienceId: LabExperienceId;
  challengeId: string;
  score: number;
  maxScore: number;
  elapsedMs?: number;
  underTarget?: boolean;
}): LabStore {
  const store = readLabStore();
  const key = completionKey(input.experienceId, input.challengeId);
  const prev = store.completed[key];
  const nextScore = prev ? Math.max(prev.score, input.score) : input.score;
  store.completed[key] = {
    score: nextScore,
    maxScore: input.maxScore,
    at: new Date().toISOString(),
    elapsedMs: input.elapsedMs,
    underTarget: input.underTarget || prev?.underTarget,
  };

  const pct = Math.round((input.score / input.maxScore) * 100);
  const best = store.bestByExperience[input.experienceId] ?? 0;
  store.bestByExperience[input.experienceId] = Math.max(best, pct);

  const today = utcDate();
  if (store.streak.lastDate === today) {
    // already counted today
  } else if (store.streak.lastDate === yesterdayUtc()) {
    store.streak = { count: store.streak.count + 1, lastDate: today };
  } else {
    store.streak = { count: 1, lastDate: today };
  }

  store.achievements = unlockAchievements(store);
  writeLabStore(store);
  return store;
}

function countExperience(store: LabStore, experienceId: LabExperienceId) {
  const prefix = `${experienceId}:`;
  return Object.keys(store.completed).filter((key) => key.startsWith(prefix)).length;
}

function unlockAchievements(store: LabStore): AchievementId[] {
  const unlocked = new Set(store.achievements);
  const completedCount = Object.keys(store.completed).length;
  if (completedCount >= 1) unlocked.add("first-fix");
  if (countExperience(store, "debug-this") >= 10) unlocked.add("bug-hunter");
  if (countExperience(store, "production-fire") >= 5) unlocked.add("production-hero");
  if (countExperience(store, "system-design") >= 10) unlocked.add("architect");
  if (countExperience(store, "sql-arena") >= 10) unlocked.add("sql-wizard");
  if (Object.values(store.completed).some((item) => item.underTarget)) {
    unlocked.add("speed-demon");
  }
  const senior = store.completed[completionKey("interview", "senior-backend")];
  const staff = store.completed[completionKey("interview", "staff-architecture")];
  if ((senior && senior.score / senior.maxScore >= 0.9) || (staff && staff.score / staff.maxScore >= 0.9)) {
    unlocked.add("senior-mindset");
  }
  const cost = Object.entries(store.completed).some(
    ([key, item]) => key.startsWith("cloud-cost:") && item.score >= item.maxScore,
  );
  if (cost) unlocked.add("cost-cutter");
  return [...unlocked];
}
