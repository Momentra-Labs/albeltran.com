import Link from "next/link";
import { worldMarks } from "@/content/marks";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";

export function WorldMarks() {
  return (
    <section
      id="record"
      aria-label="The record"
      className="magazine-spread scroll-mt-24 border-b border-border py-16 sm:py-20"
    >
      <Container>
        <Reveal variant="folio">
          <p className="magazine-spread-kicker">Vol. 01 / The record</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Names you already know
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Work the world can place
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Globally recognized rooms I have shipped in — with the engagement
            stated plainly. Google via High Spring. National Geographic and
            Disney via Accenture. Maya in fintech. Momentra Labs as founder.
          </p>
        </Reveal>
        <SpreadRule className="mt-8" />
        <ol className="mt-2">
          {worldMarks.map((mark, index) => (
            <li key={mark.name}>
              <RevealItem index={index} variant="ink">
                <article className="grid gap-2 border-b border-border py-6 sm:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1.1fr)] sm:items-baseline sm:gap-6">
                  <span className="font-mono text-[11px] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[0.92] tracking-tight text-foreground">
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
