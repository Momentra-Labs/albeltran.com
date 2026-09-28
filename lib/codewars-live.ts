import {
  CODEWARS_PAGE_SIZE,
  authoredKatas,
  codewarsRecord,
  hardestKatas,
} from "@/content/codewars";

export type CodewarsKataRow = {
  name: string;
  href: string;
  kyu: number | null;
  rankLabel: string;
  completedAt: string;
};

type CompletedItem = {
  id: string;
  name: string;
  completedAt: string;
};

type CompletedPage = {
  totalPages: number;
  data: CompletedItem[];
};

export type CodewarsLiveRecord = {
  rank: string;
  leaderboardPosition: number;
  katas: CodewarsKataRow[];
  authored: CodewarsKataRow[];
};

const API = "https://www.codewars.com/api/v1";
const CACHE_KEY = "albeltran-codewars-record";
const CACHE_MS = 15 * 60 * 1000;

const knownKyu = new Map(
  hardestKatas.map((kata) => {
    const id = kata.href.split("/").pop() ?? "";
    return [id, kata.kyu] as const;
  }),
);

export const fallbackKatas: CodewarsKataRow[] = hardestKatas.map((kata) => ({
  name: kata.name,
  href: kata.href,
  kyu: kata.kyu,
  rankLabel: String(kata.kyu),
  completedAt: "",
}));

export const fallbackAuthored: CodewarsKataRow[] = authoredKatas.map((kata) => ({
  name: kata.name,
  href: kata.href,
  kyu: kata.kyu,
  rankLabel: kata.rankLabel,
  completedAt: "",
}));

function rankLabelFromKyu(kyu: number | null, name?: string) {
  if (kyu != null) return String(kyu);
  if (!name) return "—";
  const kyuMatch = name.match(/^(\d+)\s+kyu$/i);
  if (kyuMatch) return kyuMatch[1];
  return name;
}

function kyuFromRankName(name?: string) {
  if (!name) return null;
  const kyuMatch = name.match(/^(\d+)\s+kyu$/i);
  return kyuMatch ? Number(kyuMatch[1]) : null;
}

function readCache(): CodewarsLiveRecord | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      savedAt: number;
      rank: string;
      leaderboardPosition?: number;
      katas: CodewarsKataRow[];
      authored?: CodewarsKataRow[];
    };
    if (Date.now() - parsed.savedAt > CACHE_MS) return null;
    if (!Array.isArray(parsed.katas) || parsed.katas.length === 0) return null;
    return {
      rank: parsed.rank,
      leaderboardPosition:
        typeof parsed.leaderboardPosition === "number"
          ? parsed.leaderboardPosition
          : codewarsRecord.leaderboardPosition,
      katas: parsed.katas,
      authored:
        Array.isArray(parsed.authored) && parsed.authored.length > 0
          ? parsed.authored
          : fallbackAuthored,
    };
  } catch {
    return null;
  }
}

function writeCache(record: CodewarsLiveRecord) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), ...record }),
    );
  } catch {
    // private mode
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const res = await fetch(url, {
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) throw new Error(`Codewars ${res.status}`);
      return (await res.json()) as T;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
    }
  }
  throw lastError ?? new Error("Codewars request failed");
}

async function fetchUser() {
  return fetchJson<{
    leaderboardPosition?: number;
    ranks?: { overall?: { name?: string } };
  }>(`${API}/users/${codewarsRecord.username}`);
}

async function fetchAllCompleted() {
  const items: CompletedItem[] = [];
  let page = 0;
  let totalPages = 1;
  do {
    const json = await fetchJson<CompletedPage>(
      `${API}/users/${codewarsRecord.username}/code-challenges/completed?page=${page}`,
    );
    items.push(...(json.data ?? []));
    totalPages = json.totalPages ?? 1;
    page += 1;
  } while (page < totalPages);
  return items;
}

type AuthoredItem = {
  id: string;
  name: string;
  rankName?: string | null;
};

async function fetchAuthored() {
  const json = await fetchJson<{ data?: AuthoredItem[] }>(
    `${API}/users/${codewarsRecord.username}/code-challenges/authored`,
  );
  return json.data ?? [];
}

function rowsFromCompleted(items: CompletedItem[]): CodewarsKataRow[] {
  return items
    .map((item) => {
      const kyu = knownKyu.get(item.id) ?? null;
      return {
        name: item.name,
        href: `https://www.codewars.com/kata/${item.id}`,
        kyu,
        rankLabel: rankLabelFromKyu(kyu),
        completedAt: item.completedAt,
      };
    })
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt));
}

function rowsFromAuthored(items: AuthoredItem[]): CodewarsKataRow[] {
  return items.map((item) => {
    const kyu = kyuFromRankName(item.rankName ?? undefined);
    return {
      name: item.name,
      href: `https://www.codewars.com/kata/${item.id}`,
      kyu,
      rankLabel: kyu != null ? String(kyu) : "Beta",
      completedAt: "",
    };
  });
}

async function hydrateKyu(rows: CodewarsKataRow[]) {
  const pending = rows
    .map((row, index) => ({ row, index }))
    .filter(({ row }) => row.kyu == null);
  if (pending.length === 0) return rows;

  const next = rows.slice();
  let cursor = 0;
  const workers = Array.from(
    { length: Math.min(4, pending.length) },
    async () => {
      while (cursor < pending.length) {
        const current = cursor;
        cursor += 1;
        const { row, index } = pending[current];
        const id = row.href.split("/").pop();
        if (!id) continue;
        try {
          const challenge = await fetchJson<{ rank?: { name?: string } }>(
            `${API}/code-challenges/${id}`,
          );
          const kyu = kyuFromRankName(challenge.rank?.name);
          next[index] = {
            ...row,
            kyu,
            rankLabel: rankLabelFromKyu(kyu, challenge.rank?.name),
          };
        } catch {
          // keep the placeholder
        }
      }
    },
  );
  await Promise.all(workers);
  return next;
}

const listeners = new Set<(record: CodewarsLiveRecord) => void>();
let current: CodewarsLiveRecord | null = null;
let started = false;

function emit(record: CodewarsLiveRecord) {
  current = record;
  writeCache(record);
  listeners.forEach((listener) => listener(record));
}

async function runLoad() {
  const cached = readCache();
  if (cached) emit(cached);

  const [userResult, completedResult, authoredResult] = await Promise.allSettled([
    fetchUser(),
    fetchAllCompleted(),
    fetchAuthored(),
  ]);
  const rank =
    userResult.status === "fulfilled"
      ? userResult.value.ranks?.overall?.name ?? cached?.rank ?? codewarsRecord.rank
      : cached?.rank ?? codewarsRecord.rank;
  const leaderboardPosition =
    userResult.status === "fulfilled" &&
    typeof userResult.value.leaderboardPosition === "number"
      ? userResult.value.leaderboardPosition
      : cached?.leaderboardPosition ?? codewarsRecord.leaderboardPosition;
  const authored =
    authoredResult.status === "fulfilled"
      ? rowsFromAuthored(authoredResult.value)
      : cached?.authored ?? fallbackAuthored;
  if (
    completedResult.status !== "fulfilled" ||
    completedResult.value.length === 0
  ) {
    emit({
      rank,
      leaderboardPosition,
      katas: cached?.katas ?? fallbackKatas,
      authored,
    });
    return;
  }
  const listed = rowsFromCompleted(completedResult.value);
  emit({ rank, leaderboardPosition, katas: listed, authored });
  try {
    const hydrated = await hydrateKyu(listed);
    emit({ rank, leaderboardPosition, katas: hydrated, authored });
  } catch {
    // names stay live even if kyu lookups fail
  }
}

export function subscribeCodewarsRecord(
  listener: (record: CodewarsLiveRecord) => void,
) {
  listeners.add(listener);
  if (current) listener(current);
  if (!started) {
    started = true;
    void runLoad().catch(() => {
      started = false;
    });
  }
  return () => {
    listeners.delete(listener);
  };
}

export function formatLeaderboardPosition(position: number) {
  return `#${position.toLocaleString("en-US")}`;
}

export { CODEWARS_PAGE_SIZE, codewarsRecord };
