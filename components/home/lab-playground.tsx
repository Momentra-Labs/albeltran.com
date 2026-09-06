import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";
import { featuredLabExperiences } from "@/content/lab/experiences";

export function LabPlayground() {
  const featured = featuredLabExperiences();

  return (
    <section id="playground" className="magazine-spread scroll-mt-24 py-10 sm:py-12">
      <Container>
        <Reveal variant="folio">
          <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Engineering Lab
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Don&apos;t just read my portfolio. Break something.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Browser-only simulators for debugging, system design, incidents, and interviews.
          </p>
        </Reveal>
        <SpreadRule className="mt-5" />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {featured.map((experience, index) => (
            <RevealItem key={experience.id} index={index}>
              <article className="magazine-plate flex h-full flex-col border border-border p-4 transition-colors hover:border-border-bright">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {experience.kicker}
                </p>
                <h3 className="mt-2 font-display text-xl tracking-tight text-foreground">
                  <Link href={experience.href} data-cursor="VIEW" className="hover:text-accent">
                    {experience.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted">{experience.tagline}</p>
              </article>
            </RevealItem>
          ))}
        </div>
        <Link
          href="/lab/"
          data-cursor="→"
          className="mt-6 inline-flex font-mono text-[11px] uppercase tracking-[0.18em] text-foreground hover:text-accent"
        >
          Enter the Lab →
        </Link>
      </Container>
    </section>
  );
}
