import { writeFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const USER = "ZozoFouchtra";
const API = "https://www.codewars.com/api/v1";
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "content", "codewars-catalog.json");
const KYU_CACHE = path.join(ROOT, "tmp-bryl", "codewars-kyu-cache.json");

async function fetchJson(url, attempt = 0) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if ((res.status === 429 || res.status >= 500) && attempt < 6) {
      await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)));
      return fetchJson(url, attempt + 1);
    }
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return res.json();
  } catch (error) {
    if (attempt < 6) {
      await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)));
      return fetchJson(url, attempt + 1);
    }
    throw error;
  }
}

function kyuFromRankName(name) {
  if (!name) return null;
  const kyu = name.match(/^(\d+)\s+kyu$/i);
  return kyu ? Number(kyu[1]) : null;
}

function rankLabelFrom(kyu, name) {
  if (kyu != null) return String(kyu);
  if (name && /dan/i.test(name)) return name.toLowerCase();
  return name || "Beta";
}

function difficultyScore(row) {
  const dan = row.rankLabel.match(/(\d+)\s*dan/i);
  if (dan) return 2000 + Number(dan[1]);
  if (row.kyu != null) return 1000 - row.kyu;
  return 0;
}

function sortHardestFirst(rows) {
  return rows.slice().sort((a, b) => {
    const diff = difficultyScore(b) - difficultyScore(a);
    if (diff !== 0) return diff;
    return (a.name ?? "").localeCompare(b.name ?? "");
  });
}

function toRow(item, rankName, completedAt = "") {
  const kyu = kyuFromRankName(rankName);
  return {
    name: item.name || "Untitled kata",
    href: `https://www.codewars.com/kata/${item.id}`,
    kyu,
    rankLabel: rankLabelFrom(kyu, rankName),
    completedAt,
  };
}

async function readKyuCache() {
  try {
    return JSON.parse(await readFile(KYU_CACHE, "utf8"));
  } catch {
    return {};
  }
}

async function writeKyuCache(cache) {
  await mkdir(path.dirname(KYU_CACHE), { recursive: true });
  await writeFile(KYU_CACHE, JSON.stringify(cache));
}

async function fetchAllCompleted() {
  const items = [];
  let page = 0;
  let totalPages = 1;
  do {
    const json = await fetchJson(
      `${API}/users/${USER}/code-challenges/completed?page=${page}`,
    );
    items.push(...(json.data ?? []));
    totalPages = json.totalPages ?? 1;
    page += 1;
    process.stdout.write(`\rcompleted ${page}/${totalPages} (${items.length})`);
  } while (page < totalPages);
  process.stdout.write("\n");
  return items;
}

async function hydrateRanks(items, cache) {
  const missing = items.filter((item) => cache[item.id] === undefined);
  let done = 0;
  let cursor = 0;
  const workers = Array.from({ length: Math.min(8, missing.length || 1) }, async () => {
    while (cursor < missing.length) {
      const index = cursor;
      cursor += 1;
      const item = missing[index];
      try {
        const challenge = await fetchJson(`${API}/code-challenges/${item.id}`);
        cache[item.id] = challenge.rank?.name ?? null;
      } catch {
        cache[item.id] = null;
      }
      done += 1;
      if (done % 25 === 0 || done === missing.length) {
        process.stdout.write(`\rkyu ${done}/${missing.length}`);
        await writeKyuCache(cache);
      }
    }
  });
  await Promise.all(workers);
  if (missing.length) process.stdout.write("\n");
  return cache;
}

const authoredJson = await fetchJson(
  `${API}/users/${USER}/code-challenges/authored`,
);
const authored = sortHardestFirst(
  (authoredJson.data ?? []).map((item) => toRow(item, item.rankName)),
);

const completed = await fetchAllCompleted();
const cache = await hydrateRanks(completed, await readKyuCache());
const solved = sortHardestFirst(
  completed.map((item) => toRow(item, cache[item.id], item.completedAt)),
);

const catalog = {
  username: USER,
  fetchedAt: new Date().toISOString(),
  solved,
  authored,
};

await writeFile(OUT, `${JSON.stringify(catalog)}\n`);
console.log(
  `wrote ${solved.length} solved, ${authored.length} authored → ${path.relative(ROOT, OUT)}`,
);
