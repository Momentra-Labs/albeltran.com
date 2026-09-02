import { now } from "@/content/now";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";
import Link from "next/link";

const groups = [
  { title: "Building", source: "Current work" },
  { title: "Learning", source: "Current learning" },
  { title: "Exploring", source: "Experiments" },
  { title: "Thinking about", source: "Goals" },
] as const;

export function Currently() {
  return (
    <section id="now" className="magazine-spread py-16 sm:py-20">
      <Container>
        <Reveal className="mb-4 flex items-end justify-between" variant="folio">
          <div>
            <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Currently
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              What I&apos;m focused on now
            </h2>
            <p className="mt-3 text-sm text-muted-dim">Updated {now.updated}</p>
          </div>
          <Link
            href="/now/"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-foreground"
            data-cursor="→"
          >
            Full now page
          </Link>
        </Reveal>
        <SpreadRule className="mb-8" />
        <div className="grid gap-4 sm:grid-cols-2">
          {groups.map((group, index) => {
            const section = now.sections.find((item) => item.title === group.source);
            if (!section) return null;
            return (
              <RevealItem key={group.title} index={index}>
                <article className="h-full border border-border p-5 sm:p-6">
                  <p className="font-mono text-[11px] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground">
                    {group.title}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
