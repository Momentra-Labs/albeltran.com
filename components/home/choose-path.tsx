import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";

const PATHS = [
  { href: "/#work", label: "See what I built", index: "01" },
  { href: "/#think", label: "See how I think", index: "02" },
  { href: "/lab/incident/?c=4821", label: "Break my systems", index: "03" },
  { href: "/projects/", label: "Read the case studies", index: "04" },
  { href: "/#contact", label: "Work with me", index: "05" },
] as const;

export function ChoosePath() {
  return (
    <section id="path" className="magazine-spread scroll-mt-24 py-10 sm:py-12">
      <Container>
        <Reveal variant="folio">
          <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Contents
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            What are you here for?
          </h2>
        </Reveal>
        <SpreadRule className="mt-5" />
        <ol className="mt-4 divide-y divide-border border-y border-border">
          {PATHS.map((item, index) => (
            <RevealItem key={item.href} index={index}>
              <li>
                <Link
                  href={item.href}
                  data-cursor="→"
                  className="flex min-h-14 min-w-0 items-baseline justify-between gap-3 py-3 sm:gap-4 sm:py-4"
                >
                  <span className="font-mono text-[11px] text-accent">{item.index}</span>
                  <span className="min-w-0 flex-1 font-display text-xl tracking-tight break-words text-foreground sm:text-2xl">
                    {item.label}
                  </span>
                  <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    Open
                  </span>
                </Link>
              </li>
            </RevealItem>
          ))}
        </ol>
      </Container>
    </section>
  );
}
