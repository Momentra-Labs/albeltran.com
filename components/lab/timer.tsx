"use client";

export function Timer({
  remaining,
  total,
}: {
  remaining: number;
  total: number;
}) {
  const urgent = remaining <= 10;
  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={`${remaining} seconds remaining`}
      className="font-mono text-sm tabular-nums"
    >
      <span className={urgent ? "text-accent" : "text-foreground"}>
        {remaining}s
      </span>
      <span className="text-muted-dim"> / {total}s</span>
    </div>
  );
}
