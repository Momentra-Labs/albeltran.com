import Link from "next/link";
import { currentlyBuilding } from "@/content/building";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";

export function CurrentlyBuilding() {
  return (
    <section id="building" className="magazine-spread scroll-mt-24 py-10 sm:py-12">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Currently building
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              In the shop
            </h2>
          </div>
          <Link
            href="/now/"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-foreground"
            data-cursor="→"
          >
            Full now page
          </Link>
        </Reveal>
        <SpreadRule className="mt-5" />
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {currentlyBuilding.map((item, index) => (
            <RevealItem key={item.id} index={index}>
              <li className="h-full border border-border p-4">
                <p className="font-mono text-[11px] text-accent">{item.index}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {item.kind}
                </p>
                <h3 className="mt-2 font-display text-xl tracking-tight text-foreground">
                  {item.href ? (
                    <Link href={item.href} data-cursor="VIEW" className="hover:text-accent">
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
              </li>
            </RevealItem>
          ))}
        </ol>
      </Container>
    </section>
  );
}
