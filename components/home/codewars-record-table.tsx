"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CODEWARS_PAGE_SIZE,
  codewarsRecord,
  fallbackKatas,
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
  const rows = useMemo(
    () =>
      katas.slice(
        page * CODEWARS_PAGE_SIZE,
        page * CODEWARS_PAGE_SIZE + CODEWARS_PAGE_SIZE,
      ),
    [katas, page],
  );

  return (
    <div data-codewars-count={katas.length}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[20rem] border-collapse text-left">
          <caption className="sr-only">
            Codewars problems solved by pawpu, {CODEWARS_PAGE_SIZE} per page
          </caption>
          <thead>
            <tr className="border-b border-border font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <th className="w-16 py-2.5 pr-4 font-medium">Rank</th>
              <th className="py-2.5 pr-4 font-medium">Kata</th>
              <th className="w-14 py-2.5 text-right font-medium">Kyu</th>
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
      <nav
        className="mt-5 flex flex-wrap items-center justify-between gap-3"
        aria-label="Kata pages"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {String(page + 1).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-cursor="→"
            data-kata-page="prev"
            disabled={page === 0}
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            className="min-h-11 px-3 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground hover:text-accent disabled:pointer-events-none disabled:text-muted-dim"
          >
            Prev
          </button>
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              type="button"
              data-cursor="→"
              data-kata-page={index}
              aria-current={index === page ? "page" : undefined}
              onClick={() => setPage(index)}
              className={`min-h-11 min-w-11 font-mono text-[11px] uppercase tracking-[0.16em] ${
                index === page
                  ? "text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            type="button"
            data-cursor="→"
            data-kata-page="next"
            disabled={page === pageCount - 1}
            onClick={() =>
              setPage((current) => Math.min(pageCount - 1, current + 1))
            }
            className="min-h-11 px-3 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground hover:text-accent disabled:pointer-events-none disabled:text-muted-dim"
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  );
}
