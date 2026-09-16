"use client";

import { useMemo, useState } from "react";
import { ChallengeResult } from "@/components/lab/challenge-result";
import {
  BUILD_CHALLENGES,
  type BuildChallenge,
  type BuildChoice,
} from "@/content/lab/how-id-build";
import { useLabChallengeParam, useSelectedId } from "@/lib/lab/params";
import { recordLabResult } from "@/lib/lab/storage";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { cn } from "@/lib/utils";

export function BuildStudio() {
  const fromUrl = useLabChallengeParam();
  const { id, setId } = useSelectedId(BUILD_CHALLENGES[0]?.id ?? "", fromUrl);
  const challenge =
    BUILD_CHALLENGES.find((item) => item.id === id) ?? BUILD_CHALLENGES[0];
  if (!challenge) return null;

  return (
    <div className="min-w-0">
      <div className="mb-6 grid gap-2 sm:flex sm:flex-wrap">
        {BUILD_CHALLENGES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setId(item.id)}
            className={cn(
              "min-h-11 w-full border px-3 py-2 text-left font-mono text-[11px] uppercase tracking-[0.12em] sm:w-auto",
              item.id === challenge.id
                ? "border-accent text-foreground"
                : "border-border text-muted hover:text-foreground",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>
      <BuildBoard key={challenge.id} challenge={challenge} />
    </div>
  );
}

function BuildBoard({ challenge }: { challenge: BuildChallenge }) {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [committed, setCommitted] = useState(false);

  const selected = useMemo(() => {
    return challenge.steps
      .map((step) => {
        const choice = step.options.find((item) => item.id === picks[step.id]);
        return choice ? { step: step.label, choice } : null;
      })
      .filter((item): item is { step: string; choice: BuildChoice } => Boolean(item));
  }, [challenge.steps, picks]);

  const complete = selected.length === challenge.steps.length;

  function choose(stepId: string, optionId: string) {
    setPicks((current) => ({ ...current, [stepId]: optionId }));
    setCommitted(false);
  }

  function commit() {
    if (!complete) return;
    setCommitted(true);
    recordLabResult({
      experienceId: "how-id-build",
      challengeId: challenge.id,
      score: 100,
      maxScore: 100,
    });
  }

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)]">
      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          How I&apos;d build this
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground">
          {challenge.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{challenge.prompt}</p>
        <p className="mt-2 text-sm text-muted-dim">{challenge.tagline} No single right stack.</p>

        <div className="mt-6 space-y-5">
          {challenge.steps.map((step) => (
            <fieldset key={step.id} className="border border-border p-4">
              <legend className="px-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {step.label}
              </legend>
              <p className="mb-3 text-sm text-foreground">{step.prompt}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {step.options.map((option) => {
                  const on = picks[step.id] === option.id;
                  return (
                    <label
                      key={option.id}
                      className={cn(
                        "flex min-h-11 cursor-pointer items-center gap-2 border px-3 py-2 text-sm",
                        on
                          ? "border-accent text-foreground"
                          : "border-border text-muted hover:text-foreground",
                      )}
                    >
                      <input
                        type="radio"
                        name={`${challenge.id}-${step.id}`}
                        checked={on}
                        onChange={() => choose(step.id, option.id)}
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <button
          type="button"
          disabled={!complete}
          onClick={commit}
          className="mt-5 min-h-11 border border-accent px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground disabled:border-border disabled:text-muted"
        >
          Read the trade-offs
        </button>
      </div>

      <aside className="min-w-0 space-y-4 lg:sticky lg:top-28 lg:self-start">
        <ArchitectureDiagram
          caption="The diagram fills in as you choose. Notes wait until you commit."
          nodes={[
            {
              id: "client",
              label: "Client",
              purpose: "Browser or mobile. The thing that hits your edge.",
              tradeoff: "Keep this path boring.",
              scale: "CDN and cache headers do the cheap work.",
            },
            {
              id: "api",
              label: "API",
              purpose: "The contract the client speaks.",
              tradeoff: "Every extra hop on the read path is a bill.",
              scale: "Stateless replicas. State lives below.",
            },
            ...selected.map(({ step, choice }) => ({
              id: `${step}-${choice.id}`,
              label: choice.node,
              purpose: choice.strengths[0] ?? choice.label,
              tradeoff: choice.weaknesses[0] ?? choice.bottleneck,
              scale: choice.scale,
            })),
          ]}
        />
        {committed && complete ? (
          <div className="space-y-4 border border-border p-4">
            {selected.map(({ step, choice }) => (
              <section key={step}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {step} · {choice.label}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  <span className="text-foreground">Strengths.</span> {choice.strengths.join(" ")}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  <span className="text-foreground">Weaknesses.</span> {choice.weaknesses.join(" ")}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Bottleneck: {choice.bottleneck}. Scale: {choice.scale}. Consistency:{" "}
                  {choice.consistency}. Ops: {choice.ops}
                </p>
              </section>
            ))}
            <section>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                What I would change
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{challenge.iWouldChange}</p>
            </section>
            <ChallengeResult
              experience="How I'd Build This"
              challenge={challenge.title}
              score={100}
              maxScore={100}
              path={`/lab/how-id-build/?c=${challenge.id}`}
              note="Logged as complete so the Lab profile can remember you sat with the trade-offs. The score is not a grade."
            />
          </div>
        ) : (
          <p className="border border-border p-4 text-sm text-muted">
            Choose every layer. The diagram fills in as you go. Notes wait until you commit.
          </p>
        )}
      </aside>
    </div>
  );
}

