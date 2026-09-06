import { DifficultyBadge } from "@/components/lab/difficulty-badge";
import type { LabDifficulty } from "@/content/lab/types";

export function ChallengeHeader({
  kicker,
  title,
  description,
  difficulty,
}: {
  kicker?: string;
  title: string;
  description?: string;
  difficulty?: LabDifficulty;
}) {
  return (
    <header className="mb-6">
      <div className="flex flex-wrap items-center gap-3">
        {kicker ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            {kicker}
          </p>
        ) : null}
        {difficulty ? <DifficultyBadge level={difficulty} /> : null}
      </div>
      <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-sm text-muted">{description}</p> : null}
    </header>
  );
}
