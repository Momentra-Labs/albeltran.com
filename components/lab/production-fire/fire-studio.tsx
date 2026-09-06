"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChallengeHeader } from "@/components/lab/challenge-header";
import { ChallengeResult } from "@/components/lab/challenge-result";
import { ProgressBar } from "@/components/lab/progress-bar";
import { Timer } from "@/components/lab/timer";
import { FIRE_INCIDENTS, type FireIncident } from "@/content/lab/production-fire";
import { useLabChallengeParam, useSelectedId } from "@/lib/lab/params";
import { applyFireActions, scoreFireIncident } from "@/lib/lab/score-fire";
import { recordLabResult } from "@/lib/lab/storage";
import { cn } from "@/lib/utils";

export function FireStudio() {
  const fromUrl = useLabChallengeParam();
  const { id, setId } = useSelectedId(FIRE_INCIDENTS[0]?.id ?? "", fromUrl);
  const incident = FIRE_INCIDENTS.find((item) => item.id === id) ?? FIRE_INCIDENTS[0];
  if (!incident) return null;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {FIRE_INCIDENTS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setId(item.id)}
            className={cn(
              "border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em]",
              item.id === incident.id
                ? "border-accent text-foreground"
                : "border-border text-muted hover:text-foreground",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>
      <FireBoard key={incident.id} incident={incident} />
    </div>
  );
}

function FireBoard({ incident }: { incident: FireIncident }) {
  const [picked, setPicked] = useState<string[]>([]);
  const [remaining, setRemaining] = useState(incident.minutes * 60);
  const [done, setDone] = useState(false);
  const pickedRef = useRef<string[]>([]);
  const doneRef = useRef(false);
  const remainingRef = useRef(incident.minutes * 60);

  function persist(actionIds: readonly string[]) {
    const metrics = applyFireActions(incident, actionIds);
    const scored = scoreFireIncident(metrics);
    recordLabResult({
      experienceId: "production-fire",
      challengeId: incident.id,
      score: scored.score,
      maxScore: scored.maxScore,
    });
  }

  function closeIncident() {
    if (doneRef.current) return;
    doneRef.current = true;
    setDone(true);
    persist(pickedRef.current);
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      remainingRef.current -= 1;
      const next = Math.max(0, remainingRef.current);
      setRemaining(next);
      if (next === 0) {
        window.clearInterval(timer);
        closeIncident();
      }
    }, 1000);
    return () => window.clearInterval(timer);
    // closeIncident is stable for this remounted board
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const metrics = applyFireActions(incident, picked);
  const scored = scoreFireIncident(metrics);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <ChallengeHeader
          kicker="Production is on fire"
          title={incident.title}
          description={incident.story}
          difficulty={incident.difficulty}
        />
        <Timer remaining={remaining} total={incident.minutes * 60} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <ProgressBar label="Reliability" value={metrics.reliability} />
        <ProgressBar label="Downtime" value={metrics.downtime} />
        <p className="font-mono text-[11px] text-muted">
          Users affected: {metrics.users.toLocaleString()}
        </p>
        <p className="font-mono text-[11px] text-muted">Latency: {metrics.latency}ms</p>
        <p className="font-mono text-[11px] text-muted">Cost units: {metrics.cost}</p>
      </div>

      <div className="mt-6 grid gap-2">
        {incident.actions.map((action) => {
          const on = picked.includes(action.id);
          return (
            <button
              key={action.id}
              type="button"
              disabled={done}
              aria-pressed={on}
              onClick={() => {
                const next = picked.includes(action.id)
                  ? picked.filter((item) => item !== action.id)
                  : [...picked, action.id];
                pickedRef.current = next;
                setPicked(next);
              }}
              className={cn(
                "border px-4 py-3 text-left",
                on ? "border-accent bg-accent-soft" : "border-border hover:border-border-bright",
              )}
            >
              <span className="block text-sm text-foreground">{action.label}</span>
              <span className="mt-1 block text-xs text-muted">{action.detail}</span>
              {on || done ? (
                <span className="mt-2 block text-xs text-muted">{action.effect.note}</span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <Button type="button" variant="hairline" disabled={done} onClick={closeIncident}>
          Close the incident
        </Button>
      </div>

      {done ? (
        <div className="mt-8">
          <ChallengeResult
            experience="Production Fire"
            challenge={incident.title}
            score={scored.score}
            maxScore={scored.maxScore}
            path="/lab/production-fire/"
            note={incident.debrief}
          />
        </div>
      ) : null}
    </div>
  );
}
