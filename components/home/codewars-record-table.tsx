"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import {
  CODEWARS_PAGE_SIZE,
  codewarsRecord,
  fallbackKatas,
  fallbackAuthored,
  formatKataScore,
  formatLeaderboardPosition,
  subscribeCodewarsRecord,
  type CodewarsKataRow,
} from "@/lib/codewars-live";

/** Rank, honor, leaderboard and solved count: rendered in the HTML for crawlers, then kept live. */
export function CodewarsRecordMeta() {
  const [record, setRecord] = useState({
    rank: codewarsRecord.rank,
    honor: codewarsRecord.honor,
    leaderboardPosition: codewarsRecord.leaderboardPosition,
    solved: codewarsRecord.totalCompleted,
  });

  useEffect(
    () =>
      subscribeCodewarsRecord((live) => {
        setRecord((current) => ({
          rank: live.rank,
          honor: live.honor,
          leaderboardPosition: live.leaderboardPosition,
          solved: Math.max(current.solved, live.katas.length),
        }));
      }),
    [],
  );

  const stats = [
    { label: "Rank", value: record.rank },
    { label: "Honor", value: formatKataScore(record.honor) },
    { label: "Leaderboard", value: formatLeaderboardPosition(record.leaderboardPosition) },
    { label: "Solved", value: formatKataScore(record.solved) },
  ];

  return (
    <div className="codewars-stats">
      <dl className="codewars-stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="codewars-stat">
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
      <a
        href={codewarsRecord.href}
        target="_blank"
        rel="me noopener noreferrer"
        data-cursor="→"
        className="codewars-stats-link"
      >
        {codewarsRecord.username} on Codewars
        <ArrowUpRight aria-hidden="true" />
      </a>
    </div>
  );
}

export function CodewarsHonorBadge() {
  const [rank, setRank] = useState<string>(codewarsRecord.rank);
  const [honor, setHonor] = useState<number>(codewarsRecord.honor);

  useEffect(
    () =>
      subscribeCodewarsRecord((record) => {
        setRank(record.rank);
        setHonor(record.honor);
      }),
    [],
  );

  return (
    <a
      href={codewarsRecord.statsHref}
      target="_blank"
      rel="me noopener noreferrer"
      data-cursor="→"
      aria-label={`Codewars ${rank}, honor ${formatKataScore(honor)}`}
      className="magazine-codewars-badge focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/codewars-mark.svg"
        alt=""
        width={16}
        height={16}
        className="magazine-codewars-badge-mark"
      />
      <span className="magazine-codewars-badge-rank">{rank}</span>
      <span className="magazine-codewars-badge-honor">
        {formatKataScore(honor)}
      </span>
    </a>
  );
}

export function CodewarsLeaderboardMark() {
  const [position, setPosition] = useState<number>(
    codewarsRecord.leaderboardPosition,
  );

  useEffect(
    () =>
      subscribeCodewarsRecord((record) => {
        setPosition(record.leaderboardPosition);
      }),
    [],
  );

  const boardLabel = `Leaderboard position: ${formatLeaderboardPosition(position)}`;

  return (
    <a
      href={codewarsRecord.statsHref}
      target="_blank"
      rel="me noopener noreferrer"
      data-cursor="→"
      aria-label={`Codewars ${boardLabel}`}
      className="magazine-portrait-board rounded-sm focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {boardLabel}
    </a>
  );
}

function kataPageItems(current: number, total: number) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index);
  }

  const indexes = new Set<number>([0, total - 1, current]);
  if (current <= 1) {
    indexes.add(1);
    indexes.add(2);
  } else if (current >= total - 2) {
    indexes.add(total - 3);
    indexes.add(total - 2);
  } else {
    indexes.add(current - 1);
    indexes.add(current + 1);
  }

  const sorted = [...indexes]
    .filter((index) => index >= 0 && index < total)
    .sort((a, b) => a - b);
  const items: Array<number | "gap"> = [];
  for (const index of sorted) {
    const previous = items[items.length - 1];
    if (typeof previous === "number" && index - previous > 1) {
      items.push("gap");
    }
    items.push(index);
  }
  return items;
}

/** Codewars colour bands: 1–2 kyu purple, 3–4 blue, 5–6 yellow, 7–8 white, dan black, beta outline. */
function kyuTier(kata: CodewarsKataRow) {
  if (/dan/i.test(kata.rankLabel)) return "dan";
  if (kata.kyu == null) return "beta";
  if (kata.kyu <= 2) return "purple";
  if (kata.kyu <= 4) return "blue";
  if (kata.kyu <= 6) return "yellow";
  return "white";
}

function rankText(label: string) {
  if (/^\d+$/.test(label)) return `${label} kyu`;
  // Live kata missing from the local catalog come back without a rank.
  if (!label || label === "—") return "Unrated";
  return label;
}

/** Hardest first: dan, then 1→8 kyu, then beta. */
function rankWeight(label: string) {
  const dan = label.match(/(\d+)\s*dan/i);
  if (dan) return -Number(dan[1]);
  if (/^\d+$/.test(label)) return Number(label);
  return 99;
}

/** Live Codewars rows occasionally arrive without a name. */
function kataName(kata: CodewarsKataRow) {
  return (kata.name ?? "").trim() || "Untitled kata";
}

function KyuPill({ kata }: { kata: CodewarsKataRow }) {
  return (
    <span className="kata-kyu" data-tier={kyuTier(kata)}>
      {rankText(kata.rankLabel)}
    </span>
  );
}

function KataPager({
  page,
  pageCount,
  onPage,
  label,
}: {
  page: number;
  pageCount: number;
  onPage: (page: number) => void;
  label: string;
}) {
  const pageItems = kataPageItems(page, pageCount);
  if (pageCount <= 1) return null;

  return (
    <nav className="kata-pager" aria-label={label}>
      <button
        type="button"
        data-cursor="→"
        disabled={page === 0}
        onClick={() => onPage(Math.max(0, page - 1))}
        className="kata-page-step"
        aria-label="Previous page"
      >
        <ChevronLeft aria-hidden="true" />
        <span className="hidden sm:inline">Prev</span>
      </button>
      <div className="kata-page-list">
        {pageItems.map((item, order) =>
          item === "gap" ? (
            <span key={`gap-${order}`} aria-hidden className="kata-page-gap">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              data-cursor="→"
              aria-label={`Page ${item + 1}`}
              aria-current={item === page ? "page" : undefined}
              onClick={() => onPage(item)}
              className="kata-page-num"
            >
              {item + 1}
            </button>
          ),
        )}
      </div>
      <button
        type="button"
        data-cursor="→"
        disabled={page === pageCount - 1}
        onClick={() => onPage(Math.min(pageCount - 1, page + 1))}
        className="kata-page-step"
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight aria-hidden="true" />
      </button>
    </nav>
  );
}

function KataBoard({
  katas,
  searchable,
  caption,
  pagerLabel,
  noun,
}: {
  katas: CodewarsKataRow[];
  searchable: boolean;
  caption: string;
  pagerLabel: string;
  noun: string;
}) {
  const searchId = useId();
  const filterId = useId();
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState<string>("all");
  const [page, setPage] = useState(0);

  const ranks = useMemo(() => {
    const counts = new Map<string, number>();
    for (const kata of katas) {
      counts.set(kata.rankLabel, (counts.get(kata.rankLabel) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => rankWeight(a[0]) - rankWeight(b[0]))
      .map(([label, count]) => ({
        label,
        count,
        sample: katas.find((kata) => kata.rankLabel === label)!,
      }));
  }, [katas]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return katas.filter(
      (kata) =>
        (tier === "all" || kata.rankLabel === tier) &&
        (!needle || kataName(kata).toLowerCase().includes(needle)),
    );
  }, [katas, query, tier]);

  const activeRank = ranks.find((rank) => rank.label === tier);
  const pageCount = Math.max(1, Math.ceil(filtered.length / CODEWARS_PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const from = current * CODEWARS_PAGE_SIZE;
  const rows = filtered.slice(from, from + CODEWARS_PAGE_SIZE);
  const filtering = tier !== "all" || query.trim() !== "";
  const number = (value: number) => value.toLocaleString("en-US");

  function pickTier(next: string) {
    setTier(next);
    setPage(0);
  }

  function clearFilters() {
    setQuery("");
    setTier("all");
    setPage(0);
  }

  return (
    <div className="kata-board">
      <div className="kata-tools">
        {searchable ? (
          <div className="kata-search">
            <label htmlFor={searchId} className="sr-only">
              Search {noun}
            </label>
            <Search className="kata-search-icon" aria-hidden="true" />
            <input
              id={searchId}
              type="search"
              value={query}
              placeholder={`Search ${number(katas.length)} ${noun}…`}
              autoComplete="off"
              spellCheck={false}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(0);
              }}
              className="kata-search-input"
            />
            {query ? (
              <button
                type="button"
                className="kata-search-clear"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("");
                  setPage(0);
                }}
              >
                <X aria-hidden="true" />
              </button>
            ) : null}
          </div>
        ) : null}
        <div className="kata-select">
          <label htmlFor={filterId} className="sr-only">
            Filter by difficulty
          </label>
          <span
            className="kata-select-dot"
            data-tier={activeRank ? kyuTier(activeRank.sample) : "all"}
            aria-hidden="true"
          />
          <select
            id={filterId}
            value={tier}
            onChange={(event) => pickTier(event.target.value)}
            className="kata-select-input"
          >
            <option value="all">All difficulties ({number(katas.length)})</option>
            {ranks.map((rank) => (
              <option key={rank.label} value={rank.label}>
                {rankText(rank.label)} ({number(rank.count)})
              </option>
            ))}
          </select>
          <ChevronDown className="kata-select-chevron" aria-hidden="true" />
        </div>
      </div>

      <p className="kata-summary" aria-live="polite">
        {filtered.length === 0
          ? `No ${noun} match`
          : `Showing ${number(from + 1)}–${number(from + rows.length)} of ${number(filtered.length)}`}
        {filtering ? (
          <button type="button" className="kata-summary-clear" onClick={clearFilters}>
            Clear filters
          </button>
        ) : null}
      </p>

      {rows.length > 0 ? (
        <table className="kata-table">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col" className="kata-col-index">
                #
              </th>
              <th scope="col" className="kata-col-name">
                Kata
              </th>
              <th scope="col" className="kata-col-rank">
                Difficulty
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((kata, index) => (
              <tr key={kata.href}>
                <td className="kata-col-index">{number(from + index + 1)}</td>
                <td className="kata-col-name">
                  <a
                    href={kata.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="→"
                    className="kata-link"
                  >
                    <span>{kataName(kata)}</span>
                    <ArrowUpRight className="kata-link-icon" aria-hidden="true" />
                    <span className="sr-only"> (opens Codewars)</span>
                  </a>
                </td>
                <td className="kata-col-rank">
                  <KyuPill kata={kata} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="kata-empty">
          <p>Nothing here{query.trim() ? ` for “${query.trim()}”` : ""}.</p>
          <button type="button" className="kata-summary-clear" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}

      <KataPager
        page={current}
        pageCount={pageCount}
        onPage={setPage}
        label={pagerLabel}
      />
    </div>
  );
}

export function CodewarsRecordTable() {
  const [katas, setKatas] = useState<CodewarsKataRow[]>(fallbackKatas);

  useEffect(
    () =>
      subscribeCodewarsRecord((record) => {
        setKatas(record.katas);
      }),
    [],
  );

  return (
    <div data-codewars-count={katas.length}>
      <KataBoard
        katas={katas}
        searchable
        noun="kata"
        pagerLabel="Kata pages"
        caption={`Codewars problems solved by ${codewarsRecord.username}, hardest to easiest, ${CODEWARS_PAGE_SIZE} per page`}
      />
    </div>
  );
}

export function CodewarsAuthoredTable() {
  const [authored, setAuthored] = useState<CodewarsKataRow[]>(fallbackAuthored);

  useEffect(
    () =>
      subscribeCodewarsRecord((record) => {
        setAuthored(
          record.authored.length > 0 ? record.authored : fallbackAuthored,
        );
      }),
    [],
  );

  if (authored.length === 0) return null;

  return (
    <div data-codewars-authored-count={authored.length}>
      <KataBoard
        katas={authored}
        searchable={false}
        noun="authored kata"
        pagerLabel="Authored kata pages"
        caption={`Codewars kata authored by ${codewarsRecord.username}, hardest to easiest`}
      />
    </div>
  );
}
