"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChallengeHeader } from "@/components/lab/challenge-header";
import { ChallengeResult } from "@/components/lab/challenge-result";
import { SQL_CHALLENGES, SQL_TABLES, type SqlChallenge } from "@/content/lab/sql-arena";
import { useLabChallengeParam, useSelectedId } from "@/lib/lab/params";
import { recordLabResult } from "@/lib/lab/storage";
import { sqlMatches } from "@/lib/lab/sql-eval";
import { cn } from "@/lib/utils";

export function SqlArenaStudio() {
  const fromUrl = useLabChallengeParam();
  const { id, setId } = useSelectedId(SQL_CHALLENGES[0]?.id ?? "", fromUrl);
  const challenge = SQL_CHALLENGES.find((item) => item.id === id) ?? SQL_CHALLENGES[0];
  if (!challenge) return null;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {SQL_CHALLENGES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setId(item.id)}
            className={cn(
              "border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em]",
              item.id === challenge.id
                ? "border-accent text-foreground"
                : "border-border text-muted hover:text-foreground",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>
      <SqlBoard key={challenge.id} challenge={challenge} />
    </div>
  );
}

function SqlBoard({ challenge }: { challenge: SqlChallenge }) {
  const [query, setQuery] = useState("");
  const [hint, setHint] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [ok, setOk] = useState(false);

  function run() {
    const matched = sqlMatches(query, challenge.accepted);
    setOk(matched);
    const next = matched ? 100 : 0;
    setScore(next);
    if (matched) {
      recordLabResult({
        experienceId: "sql-arena",
        challengeId: challenge.id,
        score: next,
        maxScore: 100,
      });
    }
  }

  return (
    <div>
      <ChallengeHeader
        kicker="SQL Arena"
        title={challenge.title}
        description={challenge.prompt}
        difficulty={challenge.difficulty}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {Object.entries(SQL_TABLES).map(([name, rows]) => (
          <TablePreview key={name} name={name} rows={rows} />
        ))}
      </div>

      <label className="mt-6 block">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          Query
        </span>
        <textarea
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          rows={4}
          spellCheck={false}
          className="mt-2 w-full border border-border bg-transparent p-3 font-mono text-sm text-foreground outline-none focus-visible:border-accent"
          placeholder="SELECT …"
          aria-label="SQL query"
        />
      </label>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="button" variant="hairline" onClick={run}>
          Run
        </Button>
        <Button type="button" variant="ghost" onClick={() => setHint(true)}>
          Show hint
        </Button>
      </div>
      {hint ? <p className="mt-3 text-sm text-muted">{challenge.hint}</p> : null}

      {score !== null ? (
        <div className="mt-8">
          {ok ? (
            <div className="mb-4 overflow-x-auto border border-border">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border font-mono text-muted">
                    {Object.keys(challenge.expected[0] ?? {}).map((key) => (
                      <th key={key} className="px-3 py-2 font-normal">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {challenge.expected.map((row, index) => (
                    <tr key={index} className="border-b border-border last:border-0">
                      {Object.values(row).map((value, cell) => (
                        <td key={cell} className="px-3 py-2 text-foreground">
                          {String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mb-4 text-sm text-muted">
              No match. Check column names, filters, and the accepted statement shape. This is not a
              full SQL engine.
            </p>
          )}
          <ChallengeResult
            experience="SQL Arena"
            challenge={challenge.title}
            score={score}
            maxScore={100}
            path="/lab/sql-arena/"
            note={ok ? challenge.explanation : "Try again — the tables on this page are the whole dataset."}
          />
        </div>
      ) : null}
    </div>
  );
}

function TablePreview({
  name,
  rows,
}: {
  name: string;
  rows: Record<string, string | number | null>[];
}) {
  const columns = Object.keys(rows[0] ?? {});
  return (
    <section className="overflow-x-auto border border-border">
      <h3 className="border-b border-border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
        {name}
      </h3>
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-border text-muted">
            {columns.map((key) => (
              <th key={key} className="px-3 py-2 font-normal">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-border last:border-0">
              {columns.map((key) => (
                <td key={key} className="px-3 py-2 text-foreground">
                  {String(row[key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
