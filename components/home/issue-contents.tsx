import Link from "next/link";
import { Reveal, SpreadRule } from "@/components/shared/reveal";

export function IssueContents({ features }: { features: readonly string[] }) {
  return (
    <section
      aria-label="After the cover"
      className="relative z-10 border-y border-border bg-background"
    >
      <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <Reveal variant="folio">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              After the record
            </p>
            <p className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              The well
            </p>
          </Reveal>
          <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-dim sm:block">
            Vol. 01 / Manila
          </p>
        </div>
        <SpreadRule className="mt-6" />
        <Reveal variant="ink" delay={0.06} className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <p className="max-w-2xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-muted">
            {features.join(" · ")}
          </p>
          <Link
            href="#work"
            data-cursor="VIEW"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground hover:text-accent"
          >
            Open the work →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
