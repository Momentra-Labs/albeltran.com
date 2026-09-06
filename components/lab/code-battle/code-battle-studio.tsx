"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChallengeHeader } from "@/components/lab/challenge-header";
import { ChallengeResult } from "@/components/lab/challenge-result";
import { Timer } from "@/components/lab/timer";
import { CODE_BATTLE_CHALLENGES, type CodeBattleChallenge } from "@/content/lab/code-battle";
import { useLabChallengeParam, useSelectedId } from "@/lib/lab/params";
import { recordLabResult } from "@/lib/lab/storage";
import { cn } from "@/lib/utils";

export function CodeBattleStudio() {
  const fromUrl = useLabChallengeParam();
  const { id, setId } = useSelectedId(CODE_BATTLE_CHALLENGES[0]?.id ?? "", fromUrl);
  const challenge =
    CODE_BATTLE_CHALLENGES.find((item) => item.id === id) ?? CODE_BATTLE_CHALLENGES[0];
  if (!challenge) return null;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {CODE_BATTLE_CHALLENGES.map((item) => (
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
            {item.category}
          </button>
        ))}
      </div>
      <BattleBoard key={challenge.id} challenge={challenge} />
    </div>
  );
}

function BattleBoard({ challenge }: { challenge: CodeBattleChallenge }) {
  const [remaining, setRemaining] = useState(challenge.seconds);
  const [pick, setPick] = useState("");
  const [done, setDone] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const pickRef = useRef("");
  const doneRef = useRef(false);
  const remainingRef = useRef(challenge.seconds);

  function lock(answer: string, secondsLeft: number) {
    if (doneRef.current) return;
    const chosen = answer || pickRef.current;
    const correct = chosen === challenge.correct;
    const underTarget = secondsLeft > 0 && correct;
    const next = correct ? (underTarget ? 100 : 80) : secondsLeft === 0 ? 0 : 20;
    doneRef.current = true;
    setDone(true);
    setScore(next);
    recordLabResult({
      experienceId: "code-battle",
      challengeId: challenge.id,
      score: next,
      maxScore: 100,
      elapsedMs: (challenge.seconds - secondsLeft) * 1000,
      underTarget,
    });
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      remainingRef.current -= 1;
      const next = Math.max(0, remainingRef.current);
      setRemaining(next);
      if (next === 0) {
        window.clearInterval(timer);
        lock("", 0);
      }
    }, 1000);
    return () => window.clearInterval(timer);
    // lock is stable for this remounted board
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <ChallengeHeader
          kicker={challenge.category}
          title={challenge.title}
          difficulty={challenge.difficulty}
        />
        <Timer remaining={remaining} total={challenge.seconds} />
      </div>
      <p className="text-sm text-muted">{challenge.prompt}</p>
      {challenge.snippet ? (
        <pre className="mt-4 overflow-x-auto border border-border bg-surface p-4 font-mono text-xs text-foreground">
          {challenge.snippet}
        </pre>
      ) : null}

      <fieldset className="mt-5 space-y-2" disabled={done}>
        <legend className="sr-only">Answer</legend>
        {challenge.options.map((item) => (
          <label key={item.id} className="flex items-start gap-2 text-sm text-muted">
            <input
              type="radio"
              name="battle"
              checked={pick === item.id}
              onChange={() => {
                pickRef.current = item.id;
                setPick(item.id);
              }}
              className="mt-1"
            />
            <span>{item.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="mt-6">
        <Button
          type="button"
          variant="hairline"
          disabled={done || !pick}
          onClick={() => lock(pick, remaining)}
        >
          Lock answer
        </Button>
      </div>

      {score !== null ? (
        <div className="mt-8">
          <ChallengeResult
            experience="Code Battle"
            challenge={challenge.title}
            score={score}
            maxScore={100}
            path="/lab/code-battle/"
            note={challenge.explanation}
          />
        </div>
      ) : null}
    </div>
  );
}
