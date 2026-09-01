import { now } from "@/content/now";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem } from "@/components/shared/reveal";
import Link from "next/link";

const groups = [
  { title: "Building", source: "Current work" },
  { title: "Learning", source: "Current learning" },
  { title: "Exploring", source: "Experiments" },
  { title: "Thinking about", source: "Goals" },
] as const;

export function Currently() {
  return (
    <section id="now" className="py-16 sm:py-20">
      <Container>
        <Reveal className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Currently
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
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
        <div className="grid gap-8 sm:grid-cols-2">
          {groups.map((group, index) => {
            const section = now.sections.find((item) => item.title === group.source);
            if (!section) return null;
            return (
              <RevealItem key={group.title} index={index}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
