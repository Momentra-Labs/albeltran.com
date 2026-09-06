"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChallengeHeader } from "@/components/lab/challenge-header";
import { ChallengeResult } from "@/components/lab/challenge-result";
import {
  SYSTEM_COMPONENTS,
  SYSTEM_DESIGN_SCENARIOS,
  type SystemDesignScenario,
} from "@/content/lab/system-design";
import type { SystemComponentId } from "@/content/lab/types";
import { useLabChallengeParam, useSelectedId } from "@/lib/lab/params";
import { recordLabResult } from "@/lib/lab/storage";
import { scoreSystemDesign } from "@/lib/lab/score-system-design";
import { cn } from "@/lib/utils";

export function SystemDesignStudio({
  initialSlug,
}: {
  initialSlug?: string;
}) {
  const fromUrl = useLabChallengeParam();
  const fallback = initialSlug ?? SYSTEM_DESIGN_SCENARIOS[0]?.slug ?? "url-shortener";
  const { id: slug, setId } = useSelectedId(fallback, initialSlug ? null : fromUrl);
  const scenario =
    SYSTEM_DESIGN_SCENARIOS.find((item) => item.slug === slug) ?? SYSTEM_DESIGN_SCENARIOS[0];

  if (!scenario) return null;

  return (
    <div>
      {!initialSlug ? (
        <div className="mb-6 flex flex-wrap gap-2" role="listbox" aria-label="Scenarios">
          {SYSTEM_DESIGN_SCENARIOS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={item.slug === slug}
              onClick={() => setId(item.slug)}
              className={cn(
                "border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em]",
                item.slug === slug
                  ? "border-accent text-foreground"
                  : "border-border text-muted hover:text-foreground",
              )}
            >
              {item.title}
            </button>
          ))}
        </div>
      ) : null}
      <ScenarioBoard key={scenario.id} scenario={scenario} />
    </div>
  );
}

function ScenarioBoard({ scenario }: { scenario: SystemDesignScenario }) {
  const [selected, setSelected] = useState<SystemComponentId[]>([]);
  const [decisions, setDecisions] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ReturnType<typeof scoreSystemDesign> | null>(null);

  function toggle(id: SystemComponentId) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
    setResult(null);
  }

  function score() {
    const next = scoreSystemDesign(scenario, selected, decisions);
    setResult(next);
    recordLabResult({
      experienceId: "system-design",
      challengeId: scenario.id,
      score: next.score,
      maxScore: next.maxScore,
    });
  }

  return (
    <div>
      <ChallengeHeader
        kicker="System design"
        title={scenario.title}
        description={scenario.prompt}
        difficulty={scenario.difficulty}
      />
      <fieldset className="border border-border p-4">
        <legend className="px-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          Components
        </legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SYSTEM_COMPONENTS.map((item) => {
            const on = selected.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(item.id)}
                className={cn(
                  "border px-3 py-3 text-left",
                  on
                    ? "border-accent bg-accent-soft"
                    : "border-border hover:border-border-bright",
                )}
              >
                <span className="block text-sm text-foreground">{item.label}</span>
                <span className="mt-1 block text-xs text-muted">{item.hint}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 space-y-5">
        {scenario.decisions.map((item) => (
          <fieldset key={item.id} className="border border-border p-4">
            <legend className="px-2 text-sm text-foreground">{item.prompt}</legend>
            <div className="mt-2 flex flex-col gap-2">
              {item.options.map((option) => (
                <label key={option.id} className="flex items-start gap-2 text-sm text-muted">
                  <input
                    type="radio"
                    name={item.id}
                    value={option.id}
                    checked={decisions[item.id] === option.id}
                    onChange={() => {
                      setDecisions((current) => ({ ...current, [item.id]: option.id }));
                      setResult(null);
                    }}
                    className="mt-1"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-6">
        <Button type="button" variant="hairline" onClick={score}>
          Score architecture
        </Button>
      </div>

      {result ? (
        <div className="mt-8">
          <ChallengeResult
            experience="System Design"
            challenge={scenario.title}
            score={result.score}
            maxScore={result.maxScore}
            breakdown={result.breakdown}
            path={scenario.indexed ? `/lab/system-design/${scenario.slug}/` : "/lab/system-design/"}
            note="A rubric, not a production review. Read the recommended architecture below."
          />
        </div>
      ) : null}
    </div>
  );
}
