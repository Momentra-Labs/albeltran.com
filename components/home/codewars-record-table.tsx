"use client";

import { useEffect, useState } from "react";
import {
  CODEWARS_PAGE_SIZE,
  codewarsRecord,
  fallbackKatas,
  fallbackAuthored,
  formatLeaderboardPosition,
  subscribeCodewarsRecord,
  type CodewarsKataRow,
} from "@/lib/codewars-live";

export function CodewarsRecordMeta() {
  const [rank, setRank] = useState<string>(codewarsRecord.rank);

  useEffect(
    () =>
      subscribeCodewarsRecord((record) => {
        setRank(record.rank);
      }),
    [],
  );

  return (
    <a
      href={codewarsRecord.href}
      target="_blank"
      rel="me noopener noreferrer"
      data-cursor="→"
      className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-foreground"
    >
      Codewars · {codewarsRecord.username} · {rank}
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

  const label = `Leaderboard position: ${formatLeaderboardPosition(position)}`;

  return (
    <a
      href={codewarsRecord.href}
      target="_blank"
      rel="me noopener noreferrer"
      data-cursor="→"
      aria-label={`Codewars ${label}`}
      className="magazine-portrait-board rounded-sm focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {label}
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

function KataRowsTable({
  katas,
  page,
  caption,
}: {
  katas: CodewarsKataRow[];
  page: number;
  caption: string;
}) {
  const rows = katas.slice(
    page * CODEWARS_PAGE_SIZE,
    page * CODEWARS_PAGE_SIZE + CODEWARS_PAGE_SIZE,
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[20rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <th className="w-16 py-2.5 pr-4 font-medium">Rank</th>
            <th className="py-2.5 pr-4 font-medium">Kata</th>
            <th className="w-16 py-2.5 text-right font-medium">Kyu</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((kata, index) => {
            const rank = page * CODEWARS_PAGE_SIZE + index + 1;
            return (
              <tr key={kata.href} className="border-b border-border/70">
                <td className="py-3 pr-4 align-middle font-mono text-sm text-muted">
                  {rank}
                </td>
                <td className="py-3 pr-4 align-middle">
                  <a
                    href={kata.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="→"
                    className="inline-flex items-start gap-2.5 text-foreground transition-colors hover:text-accent"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/codewars-mark.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="mt-0.5 h-4 w-4 shrink-0"
                    />
                    <span className="text-sm leading-snug">{kata.name}</span>
                  </a>
                </td>
                <td className="py-3 text-right align-middle font-mono text-sm text-muted">
                  {kata.rankLabel}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
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
    <nav
      className="mt-5 flex items-center justify-between gap-3"
      aria-label={label}
    >
      <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        {String(page + 1).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}
      </p>
      <div className="flex min-w-0 items-center justify-end gap-0.5 sm:gap-1">
        <button
          type="button"
          data-cursor="→"
          disabled={page === 0}
          onClick={() => onPage(Math.max(0, page - 1))}
          className="min-h-11 shrink-0 px-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground hover:text-accent disabled:pointer-events-none disabled:text-muted-dim sm:px-3"
        >
          Prev
        </button>
        {pageItems.map((item, order) =>
          item === "gap" ? (
            <span
              key={`gap-${order}`}
              aria-hidden
              className="px-1 font-mono text-[11px] text-muted-dim"
            >
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
              className={`min-h-11 min-w-8 shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] sm:min-w-11 ${
                item === page
                  ? "text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item + 1}
            </button>
          ),
        )}
        <button
          type="button"
          data-cursor="→"
          disabled={page === pageCount - 1}
          onClick={() => onPage(Math.min(pageCount - 1, page + 1))}
          className="min-h-11 shrink-0 px-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground hover:text-accent disabled:pointer-events-none disabled:text-muted-dim sm:px-3"
        >
          Next
        </button>
      </div>
    </nav>
  );
}

export function CodewarsRecordTable() {
  const [page, setPage] = useState(0);
  const [katas, setKatas] = useState<CodewarsKataRow[]>(fallbackKatas);

  useEffect(
    () =>
      subscribeCodewarsRecord((record) => {
        setKatas(record.katas);
        setPage((current) => {
          const pages = Math.max(
            1,
            Math.ceil(record.katas.length / CODEWARS_PAGE_SIZE),
          );
          return Math.min(current, pages - 1);
        });
      }),
    [],
  );

  const pageCount = Math.max(1, Math.ceil(katas.length / CODEWARS_PAGE_SIZE));

  return (
    <div data-codewars-count={katas.length}>
      <KataRowsTable
        katas={katas}
        page={page}
        caption={`Codewars problems solved by pawpu, ${CODEWARS_PAGE_SIZE} per page`}
      />
      <KataPager
        page={page}
        pageCount={pageCount}
        onPage={setPage}
        label="Kata pages"
      />
    </div>
  );
}

export function CodewarsAuthoredTable() {
  const [page, setPage] = useState(0);
  const [authored, setAuthored] = useState<CodewarsKataRow[]>(fallbackAuthored);

  useEffect(
    () =>
      subscribeCodewarsRecord((record) => {
        setAuthored(record.authored);
        setPage((current) => {
          const pages = Math.max(
            1,
            Math.ceil(record.authored.length / CODEWARS_PAGE_SIZE),
          );
          return Math.min(current, pages - 1);
        });
      }),
    [],
  );

  if (authored.length === 0) return null;

  const pageCount = Math.max(1, Math.ceil(authored.length / CODEWARS_PAGE_SIZE));

  return (
    <div data-codewars-authored-count={authored.length}>
      <KataRowsTable
        katas={authored}
        page={page}
        caption="Codewars kata authored by pawpu"
      />
      <KataPager
        page={page}
        pageCount={pageCount}
        onPage={setPage}
        label="Authored kata pages"
      />
    </div>
  );
}
