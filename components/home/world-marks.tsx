import Link from "next/link";
import { worldMarks } from "@/content/marks";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";

export function WorldMarks() {
  return (
    <section
      id="record"
      aria-label="The record"
      className="magazine-spread scroll-mt-24 border-b border-border py-10 sm:py-12"
    >
      <Container>
        <Reveal variant="folio" className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="magazine-spread-kicker">Vol. 01 / The record</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              Names you already know
            </h2>
          </div>
        </Reveal>
        <SpreadRule className="mt-5" />
        <ol>
          {worldMarks.map((mark, index) => (
            <li key={mark.name}>
              <RevealItem index={index} variant="ink">
                <article className="grid gap-1 border-b border-border py-3 sm:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.2fr)] sm:items-baseline sm:gap-6">
                  <span className="font-mono text-[11px] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
                    <Link
                      href={mark.href}
                      data-cursor="→"
                      className="transition-colors hover:text-accent"
                    >
                      {mark.name}
                    </Link>
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {mark.note}
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
