"use client";

import Link from "next/link";
import type { ExperienceItem } from "@/content/experience";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <section id="experience" className="magazine-spread scroll-mt-24 py-10 sm:py-12">
      <Container>
        <Reveal
          className="mb-4 flex items-end justify-between gap-4"
          variant="folio"
        >
          <div>
            <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Experience
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              A path to owning systems
            </h2>
          </div>
          <Link
            href="/experience/"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-foreground"
            data-cursor="→"
          >
            Full timeline
          </Link>
        </Reveal>
        <SpreadRule className="mb-2" />
        <ol>
          {items.map((item, index) => (
            <li key={item.id} id={item.id} className="scroll-mt-24">
              <RevealItem index={index} variant="ink">
                <article className="grid gap-1 border-b border-border py-3 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
                  <span className="font-mono text-[11px] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-foreground">
                    <span className="font-medium">{item.role}</span>
                    <span className="text-muted"> · {item.company}</span>
                  </p>
                  <p className="font-mono text-[11px] text-muted-dim">
                    {item.duration}
                  </p>
                </article>
              </RevealItem>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
