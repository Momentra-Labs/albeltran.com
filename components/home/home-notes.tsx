import Link from "next/link";
import { philosophy } from "@/content/philosophy";
import { now } from "@/content/now";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";

const nowGroups = [
  { title: "Building", source: "Current work" },
  { title: "Learning", source: "Current learning" },
  { title: "Exploring", source: "Experiments" },
  { title: "Thinking about", source: "Goals" },
] as const;

export function HomeNotes() {
  return (
    <section id="notes" className="magazine-spread scroll-mt-24 py-10 sm:py-12">
      <Container>
        <Reveal
          className="mb-4 flex flex-wrap items-end justify-between gap-4"
          variant="folio"
        >
          <div>
            <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              Notes from the desk
            </h2>
          </div>
        </Reveal>
        <SpreadRule className="mb-6" />
        <div className="grid gap-8 lg:grid-cols-2">
          <div id="think" className="scroll-mt-24" data-hide-recruiter>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              How I think
            </p>
            <ol className="mt-4 space-y-3">
              {philosophy.map((item, index) => (
                <li key={item.index}>
                  <RevealItem index={index} variant="ink">
                    <p className="text-sm text-muted">
                      <span className="font-mono text-[11px] text-accent">
                        {item.index}
                      </span>
                      <span className="ml-2 text-foreground">{item.title}</span>
                    </p>
                  </RevealItem>
                </li>
              ))}
            </ol>
          </div>
          <div id="now" className="scroll-mt-24">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Now
              </p>
              <Link
                href="/now/"
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted hover:text-foreground"
                data-cursor="→"
              >
                Full now page
              </Link>
            </div>
            <ul className="mt-4 space-y-3">
              {nowGroups.map((group, index) => {
                const section = now.sections.find(
                  (item) => item.title === group.source,
                );
                const item = section?.items[0];
                if (!item) return null;
                return (
                  <li key={group.title}>
                    <RevealItem index={index} variant="ink">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
                        {group.title}
                      </p>
                      <p className="mt-1 text-sm text-foreground">{item}</p>
                    </RevealItem>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
