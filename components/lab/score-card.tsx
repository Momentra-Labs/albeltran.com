import type { LabScoreBreakdown } from "@/content/lab/types";
import { ProgressBar } from "@/components/lab/progress-bar";

export function ScoreCard({
  score,
  maxScore,
  breakdown,
}: {
  score: number;
  maxScore: number;
  breakdown?: LabScoreBreakdown[];
}) {
  return (
    <div className="border border-border bg-surface p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
        Score
      </p>
      <p className="mt-2 font-display text-4xl tracking-tight text-foreground">
        {score} <span className="text-xl text-muted">/ {maxScore}</span>
      </p>
      {breakdown?.length ? (
        <div className="mt-5 space-y-3">
          {breakdown.map((row) => (
            <ProgressBar key={row.label} label={row.label} value={row.value} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
