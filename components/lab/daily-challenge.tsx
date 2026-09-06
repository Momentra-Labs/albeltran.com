"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { DAILY_PROMPTS } from "@/content/lab/daily";
import { todaysChallenge } from "@/lib/lab/daily";

const fallback = DAILY_PROMPTS[0];

export function DailyChallenge() {
  const daily = useSyncExternalStore(
    () => () => {},
    todaysChallenge,
    () => fallback,
  );

  return (
    <section className="border border-border bg-surface p-5 sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        Today&apos;s engineering challenge
      </p>
      <h2 className="mt-2 font-display text-2xl tracking-tight text-foreground">
        {daily.question}
      </h2>
      <Link
        href={daily.href}
        className="mt-4 inline-flex font-mono text-[11px] uppercase tracking-[0.16em] text-foreground hover:text-accent"
      >
        Open today&apos;s lab →
      </Link>
    </section>
  );
}
