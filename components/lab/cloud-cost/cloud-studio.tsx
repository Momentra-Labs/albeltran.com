"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChallengeHeader } from "@/components/lab/challenge-header";
import { ChallengeResult } from "@/components/lab/challenge-result";
import {
  CLOUD_CHALLENGES,
  type CloudChallenge,
  type CloudInputs,
  type CloudRegion,
} from "@/content/lab/cloud-cost";
import { estimateCloud, scoreCloudChallenge } from "@/lib/lab/score-cloud";
import { useLabChallengeParam, useSelectedId } from "@/lib/lab/params";
import { recordLabResult } from "@/lib/lab/storage";
import { cn } from "@/lib/utils";

export function CloudStudio() {
  const fromUrl = useLabChallengeParam();
  const { id, setId } = useSelectedId(CLOUD_CHALLENGES[0]?.id ?? "", fromUrl);
  const challenge = CLOUD_CHALLENGES.find((item) => item.id === id) ?? CLOUD_CHALLENGES[0];
  if (!challenge) return null;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {CLOUD_CHALLENGES.map((item) => (
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
      <CloudBoard key={challenge.id} challenge={challenge} />
    </div>
  );
}

function CloudBoard({ challenge }: { challenge: CloudChallenge }) {
  const [inputs, setInputs] = useState<CloudInputs>(challenge.start);
  const [submitted, setSubmitted] = useState(false);
  const estimate = estimateCloud(inputs);
  const scored = scoreCloudChallenge({
    monthly: estimate.monthly,
    budget: challenge.budget,
    latency: estimate.latency,
    maxLatency: challenge.maxLatency,
    reliability: estimate.reliability,
    minReliability: challenge.minReliability,
  });

  function submit() {
    setSubmitted(true);
    recordLabResult({
      experienceId: "cloud-cost",
      challengeId: challenge.id,
      score: scored.passed ? 100 : scored.score,
      maxScore: 100,
    });
  }

  return (
    <div>
      <ChallengeHeader
        kicker="Estimates only"
        title={challenge.title}
        description={challenge.story}
        difficulty={challenge.difficulty}
      />

      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        Budget ${challenge.budget} · latency ≤ {challenge.maxLatency}ms · reliability ≥{" "}
        {challenge.minReliability}
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4 border border-border p-4">
          <Slider
            label="Compute units"
            value={inputs.computeUnits}
            min={1}
            max={48}
            onChange={(computeUnits) => setInputs((current) => ({ ...current, computeUnits }))}
          />
          <Slider
            label="Database units"
            value={inputs.dbUnits}
            min={1}
            max={12}
            onChange={(dbUnits) => setInputs((current) => ({ ...current, dbUnits }))}
          />
          <Slider
            label="Storage GB"
            value={inputs.storageGb}
            min={50}
            max={20000}
            step={50}
            onChange={(storageGb) => setInputs((current) => ({ ...current, storageGb }))}
          />
          <Slider
            label="CDN GB"
            value={inputs.cdnGb}
            min={0}
            max={8000}
            step={50}
            onChange={(cdnGb) => setInputs((current) => ({ ...current, cdnGb }))}
          />
          <Slider
            label="Cache GB"
            value={inputs.cacheGb}
            min={0}
            max={64}
            onChange={(cacheGb) => setInputs((current) => ({ ...current, cacheGb }))}
          />
          <Slider
            label="Requests (millions)"
            value={inputs.requestMillions}
            min={0.2}
            max={30}
            step={0.2}
            onChange={(requestMillions) =>
              setInputs((current) => ({ ...current, requestMillions }))
            }
          />
          <label className="block text-sm text-muted">
            Region
            <select
              className="mt-1 w-full border border-border bg-background px-3 py-2 text-foreground"
              value={inputs.region}
              onChange={(event) =>
                setInputs((current) => ({
                  ...current,
                  region: event.target.value as CloudRegion,
                }))
              }
            >
              <option value="us">US</option>
              <option value="eu">EU</option>
              <option value="asia">Asia</option>
            </select>
          </label>
        </div>

        <div className="border border-border p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Estimated monthly
          </p>
          <p className="mt-2 font-display text-4xl text-foreground">${estimate.monthly}</p>
          <ul className="mt-4 space-y-1 font-mono text-xs text-muted">
            {Object.entries(estimate.parts).map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span>{key}</span>
                <span>${value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">Modeled latency {estimate.latency}ms</p>
          <p className="text-sm text-muted">Modeled reliability {estimate.reliability}</p>
          <p className="mt-3 text-xs text-muted-dim">
            Static teaching rates. Not a quote from a cloud vendor.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Button type="button" variant="hairline" onClick={submit}>
          Submit architecture
        </Button>
      </div>

      {submitted ? (
        <div className="mt-8">
          <ChallengeResult
            experience="Cloud Cost"
            challenge={challenge.title}
            score={scored.passed ? 100 : scored.score}
            maxScore={100}
            path="/lab/cloud-cost/"
            note={
              scored.passed
                ? "Under budget with the latency and reliability gates intact."
                : "Missed a gate. Raise CDN/cache, cut unused compute, or move region — without zeroing the database."
            }
          />
        </div>
      ) : null}
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block text-sm text-muted">
      <span className="flex justify-between gap-3">
        <span>{label}</span>
        <span className="font-mono text-foreground">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full"
      />
    </label>
  );
}
