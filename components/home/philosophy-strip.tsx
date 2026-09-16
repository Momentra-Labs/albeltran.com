import { philosophy } from "@/content/philosophy";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";

export function PhilosophyStrip() {
  return (
    <section id="think" className="magazine-spread scroll-mt-24 py-10 sm:py-12">
      <Container>
        <Reveal variant="folio">
          <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Engineering philosophy
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            How I decide
          </h2>
        </Reveal>
        <SpreadRule className="mt-5" />
        <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {philosophy.map((item, index) => (
            <RevealItem key={item.index} index={index}>
              <li className="h-full border border-border p-4">
                <p className="font-mono text-[11px] text-accent">{item.index}</p>
                <h3 className="mt-3 font-display text-xl tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            </RevealItem>
          ))}
        </ol>
      </Container>
    </section>
  );
}
