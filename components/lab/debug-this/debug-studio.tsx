"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChallengeHeader } from "@/components/lab/challenge-header";
import { ChallengeResult } from "@/components/lab/challenge-result";
import { DEBUG_CHALLENGES, type DebugChallenge } from "@/content/lab/debug-this";
import { useLabChallengeParam, useSelectedId } from "@/lib/lab/params";
import { recordLabResult } from "@/lib/lab/storage";
import { cn } from "@/lib/utils";

export function DebugStudio() {
  const fromUrl = useLabChallengeParam();
  const { id, setId } = useSelectedId(DEBUG_CHALLENGES[0]?.id ?? "", fromUrl);
  const challenge = DEBUG_CHALLENGES.find((item) => item.id === id) ?? DEBUG_CHALLENGES[0];
  if (!challenge) return null;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {DEBUG_CHALLENGES.map((item) => (
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
      <DebugBoard key={challenge.id} challenge={challenge} />
    </div>
  );
}

function DebugBoard({ challenge }: { challenge: DebugChallenge }) {
  const [evidence, setEvidence] = useState<string[]>([]);
  const [cause, setCause] = useState("");
  const [score, setScore] = useState<number | null>(null);

  function toggleEvidence(key: string) {
    setEvidence((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
    setScore(null);
  }

  function submit() {
    const relevant = challenge.evidence.filter((item) => item.relevant).map((item) => item.id);
    const noise = challenge.evidence.filter((item) => !item.relevant).map((item) => item.id);
    const hit = relevant.filter((item) => evidence.includes(item)).length;
    const missNoise = noise.filter((item) => evidence.includes(item)).length;
    const causeScore = cause === challenge.correctCause ? 70 : 0;
    const evidenceScore = Math.max(
      0,
      Math.round((hit / Math.max(relevant.length, 1)) * 30) - missNoise * 6,
    );
    const next = Math.max(0, Math.min(100, causeScore + evidenceScore));
    setScore(next);
    recordLabResult({
      experienceId: "debug-this",
      challengeId: challenge.id,
      score: next,
      maxScore: 100,
    });
  }

  return (
    <div>
      <ChallengeHeader
        kicker="Debug this"
        title={challenge.title}
        description={challenge.summary}
        difficulty={challenge.difficulty}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="border border-border p-4">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Symptoms</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
            {challenge.symptoms.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Metrics
          </h3>
          <ul className="mt-3 space-y-1 font-mono text-xs text-foreground">
            {challenge.metrics.map((item) => (
              <li key={item.label}>
                {item.label}: {item.value}
              </li>
            ))}
          </ul>
        </section>
        <section className="border border-border p-4">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Logs</h3>
          <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-muted">
            {challenge.logs.join("\n")}
          </pre>
        </section>
      </div>

      <fieldset className="mt-6 border border-border p-4">
        <legend className="px-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          Mark relevant evidence
        </legend>
        <div className="space-y-2">
          {challenge.evidence.map((item) => (
            <label key={item.id} className="flex items-start gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={evidence.includes(item.id)}
                onChange={() => toggleEvidence(item.id)}
                className="mt-1"
              />
              <span>
                <span className="text-foreground">{item.label}.</span> {item.detail}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-4 border border-border p-4">
        <legend className="px-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          Root cause
        </legend>
        <div className="space-y-2">
          {challenge.causes.map((item) => (
            <label key={item.id} className="flex items-start gap-2 text-sm text-muted">
              <input
                type="radio"
                name="cause"
                checked={cause === item.id}
                onChange={() => {
                  setCause(item.id);
                  setScore(null);
                }}
                className="mt-1"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <Button type="button" variant="hairline" onClick={submit} disabled={!cause}>
          Submit diagnosis
        </Button>
      </div>

      {score !== null ? (
        <div className="mt-8">
          <ChallengeResult
            experience="Debug This"
            challenge={challenge.title}
            score={score}
            maxScore={100}
            path="/lab/debug-this/"
            note={challenge.explanation}
          />
        </div>
      ) : null}
    </div>
  );
}
