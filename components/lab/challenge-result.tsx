"use client";

import { ScoreCard } from "@/components/lab/score-card";
import { ShareResult } from "@/components/lab/share-result";
import type { LabScoreBreakdown } from "@/content/lab/types";
import { SITE_URL } from "@/lib/constants";

export function ChallengeResult({
  experience,
  challenge,
  score,
  maxScore,
  breakdown,
  path,
  note,
  children,
}: {
  experience: string;
  challenge?: string;
  score: number;
  maxScore: number;
  breakdown?: LabScoreBreakdown[];
  path: string;
  note?: string;
  children?: React.ReactNode;
}) {
  const url = path.startsWith("http") ? path : `${SITE_URL}${path}`;
  return (
    <div className="border border-border bg-background p-5 sm:p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-dim">
        Al Beltran Engineering Lab
      </p>
      <h3 className="mt-2 font-display text-2xl tracking-tight text-foreground">
        {experience}
        {challenge ? ` · ${challenge}` : ""}
      </h3>
      <div className="mt-5">
        <ScoreCard score={score} maxScore={maxScore} breakdown={breakdown} />
      </div>
      {note ? <p className="mt-4 text-sm leading-relaxed text-muted">{note}</p> : null}
      {children}
      <div className="mt-5">
        <ShareResult
          experience={experience}
          challenge={challenge}
          score={score}
          maxScore={maxScore}
          breakdown={breakdown}
          url={url}
        />
      </div>
    </div>
  );
}
