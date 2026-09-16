"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChallengeResult } from "@/components/lab/challenge-result";
import {
  INCIDENT_CHANNELS,
  INCIDENT_SCENARIOS,
  type IncidentChannelId,
  type IncidentScenario,
} from "@/content/lab/incidents";
import { useLabChallengeParam, useSelectedId } from "@/lib/lab/params";
import { recordLabResult } from "@/lib/lab/storage";
import { cn } from "@/lib/utils";

export function IncidentStudio() {
  const fromUrl = useLabChallengeParam();
  const { id, setId } = useSelectedId(INCIDENT_SCENARIOS[0]?.id ?? "", fromUrl);
  const scenario =
    INCIDENT_SCENARIOS.find((item) => item.id === id) ?? INCIDENT_SCENARIOS[0];
  if (!scenario) return null;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {INCIDENT_SCENARIOS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setId(item.id)}
            className={cn(
              "min-h-11 border px-3 py-2 text-left font-mono text-[11px] uppercase tracking-[0.12em]",
              item.id === scenario.id
                ? "border-accent text-foreground"
                : "border-border text-muted hover:text-foreground",
            )}
          >
            #{item.number} · {item.title}
          </button>
        ))}
      </div>
      <IncidentDesk key={scenario.id} scenario={scenario} />
    </div>
  );
}

function IncidentDesk({ scenario }: { scenario: IncidentScenario }) {
  const [open, setOpen] = useState<IncidentChannelId[]>([]);
  const [cause, setCause] = useState("");
  const [score, setScore] = useState<number | null>(null);

  const active = open[open.length - 1];
  const channel = scenario.channels.find((item) => item.id === active);
  const hotIds = scenario.channels.filter((item) => item.signal === "hot").map((item) => item.id);

  function toggle(id: IncidentChannelId) {
    setOpen((current) =>
      current.includes(id) ? current.filter((item) => item !== id).concat(id) : [...current, id],
    );
    setScore(null);
  }

  function submit() {
    const openedHot = hotIds.filter((id) => open.includes(id)).length;
    const causeScore = cause === scenario.correctCause ? 70 : 0;
    const deskScore = Math.round((openedHot / Math.max(hotIds.length, 1)) * 30);
    const next = Math.max(0, Math.min(100, causeScore + deskScore));
    setScore(next);
    recordLabResult({
      experienceId: "incident",
      challengeId: scenario.id,
      score: next,
      maxScore: 100,
    });
  }

  const canName = open.length >= 2;

  return (
    <div>
      <header className="border border-border p-4 sm:p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Incident #{scenario.number}
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {scenario.category} · {scenario.environment}
        </p>
        <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground">
          {scenario.title}
        </h2>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-dim">
          Started {scenario.started} · demo data, not live telemetry
        </p>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          {scenario.symptoms.map((item) => (
            <div key={item.label} className="border border-border/80 px-3 py-2">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                {item.label}
              </dt>
              <dd className="mt-1 font-mono text-sm text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]">
        <nav aria-label="Evidence channels" className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {INCIDENT_CHANNELS.map((item) => {
            const meta = scenario.channels.find((channel) => channel.id === item.id);
            const seen = open.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggle(item.id)}
                className={cn(
                  "min-h-11 border px-3 py-2 text-left font-mono text-[11px] uppercase tracking-[0.14em]",
                  active === item.id
                    ? "border-accent text-foreground"
                    : seen
                      ? "border-border-bright text-foreground"
                      : "border-border text-muted hover:text-foreground",
                )}
              >
                {item.label}
                {seen && meta ? (
                  <span className="mt-1 block text-[10px] tracking-[0.12em] text-muted-dim">
                    {meta.signal}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <section className="min-h-52 border border-border p-4" aria-live="polite">
          {channel ? (
            <>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {channel.label}
              </h3>
              <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-muted">
                {channel.lines.join("\n")}
              </pre>
            </>
          ) : (
            <p className="text-sm text-muted">
              Open a channel. You do not need all of them. Two is enough to name a cause.
            </p>
          )}
        </section>
      </div>

      <fieldset className="mt-6 border border-border p-4">
        <legend className="px-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          Root cause
        </legend>
        {!canName ? (
          <p className="text-sm text-muted">Open at least two channels before you name it.</p>
        ) : (
          <div className="space-y-2">
            {scenario.causes.map((item) => (
              <label key={item.id} className="flex min-h-11 items-start gap-2 text-sm text-muted">
                <input
                  type="radio"
                  name={`cause-${scenario.id}`}
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
        )}
        <Button className="mt-4" type="button" disabled={!canName || !cause} onClick={submit}>
          Close the incident
        </Button>
      </fieldset>

      {score !== null ? <Debrief scenario={scenario} score={score} opened={open} /> : null}
    </div>
  );
}

function Debrief({
  scenario,
  score,
  opened,
}: {
  scenario: IncidentScenario;
  score: number;
  opened: IncidentChannelId[];
}) {
  const openedLabels = useMemo(
    () =>
      opened
        .map((id) => INCIDENT_CHANNELS.find((item) => item.id === id)?.label)
        .filter(Boolean)
        .join(" · "),
    [opened],
  );

  return (
    <div className="mt-6 space-y-4 border border-border p-4 sm:p-5">
      <ChallengeResult
        experience="Incident Desk"
        challenge={`#${scenario.number}`}
        score={score}
        maxScore={100}
        breakdown={[
          { label: "Cause", value: score >= 70 ? 70 : 0 },
          { label: "Hot channels opened", value: Math.max(0, score - (score >= 70 ? 70 : 0)) },
        ]}
        path={`/lab/incident/?c=${scenario.id}`}
      />
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
        You opened {openedLabels || "nothing"}
      </p>
      <Note kicker="What happened" body={scenario.happened} />
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Evidence</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
          {scenario.evidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <Note kicker="Why the symptoms" body={scenario.whySymptoms} />
      <Note kicker="Root cause" body={scenario.rootCause} />
      <Note kicker="How to fix it" body={scenario.fix} />
      <Note kicker="Trade-offs" body={scenario.tradeoffs} />
      <Note kicker="What I would monitor" body={scenario.monitor} />
    </div>
  );
}

function Note({ kicker, body }: { kicker: string; body: string }) {
  return (
    <section>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{kicker}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </section>
  );
}
