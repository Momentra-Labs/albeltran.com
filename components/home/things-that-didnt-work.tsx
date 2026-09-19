import Link from "next/link";
import { failures } from "@/content/failures";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";

export function ThingsThatDidntWork() {
  const preview = failures.slice(0, 3);

  return (
    <section id="failures" className="magazine-spread scroll-mt-24 py-10 sm:py-12">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Things that didn&apos;t work
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              Postmortems
            </h2>
          </div>
          <Link
            href="/failures/"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-foreground"
            data-cursor="→"
          >
            All entries
          </Link>
        </Reveal>
        <SpreadRule className="mt-5" />
        <ol className="mt-4 space-y-4">
          {preview.map((item, index) => (
            <RevealItem key={item.id} index={index}>
              <li className="border border-border p-4 sm:p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-mono text-[11px] text-accent">
                    {String(index + 1).padStart(2, "0")}
                    {item.placeholder ? " · Placeholder" : ""}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {item.category} · {item.year}
                  </p>
                </div>
                <h3 className="mt-2 font-display text-2xl tracking-tight text-foreground">
                  <Link href={`/failures/#${item.id}`} className="hover:text-accent">
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.learned}</p>
              </li>
            </RevealItem>
          ))}
        </ol>
      </Container>
    </section>
  );
}
