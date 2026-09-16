"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { currentlyBuilding } from "@/content/building";
import { issueMeta } from "@/content/issue";
import { DAILY_PROMPTS } from "@/content/lab/daily";
import { todaysChallenge } from "@/lib/lab/daily";
import { Container } from "@/components/shared/container";

const fallback = DAILY_PROMPTS[0];
const building = currentlyBuilding[0];

export function IssueWire() {
  const daily = useSyncExternalStore(
    () => () => {},
    todaysChallenge,
    () => fallback,
  );

  return (
    <section
      aria-label="Current issue"
      className="border-b border-border py-3"
    >
      <Container>
        <ul className="flex min-w-0 flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted sm:tracking-[0.16em] md:flex-row md:flex-wrap md:items-baseline md:gap-x-5 md:gap-y-1">
          <li className="min-w-0 break-words">
            <span className="text-accent">{issueMeta.volume}</span>
            <span className="text-muted-dim"> · {issueMeta.city} · {issueMeta.year}</span>
          </li>
          <li className="hidden min-w-0 break-words sm:block">
            <span className="text-muted-dim">Desk </span>
            <Link href={issueMeta.latestScenario.href} className="text-foreground hover:text-accent">
              {issueMeta.latestScenario.label}
            </Link>
            <span className="text-muted-dim"> · {issueMeta.desks} scenarios · demo data</span>
          </li>
          <li className="min-w-0 break-words md:flex-1">
            <span className="text-muted-dim">Prompt </span>
            <Link href={daily.href} className="text-foreground hover:text-accent">
              {daily.question}
            </Link>
          </li>
          {building ? (
            <li className="hidden min-w-0 break-words lg:block">
              <span className="text-muted-dim">Building </span>
              <Link
                href={building.href ?? "/#building"}
                className="text-foreground hover:text-accent"
              >
                {building.title}
              </Link>
            </li>
          ) : null}
        </ul>
      </Container>
    </section>
  );
}
