import Link from "next/link";
import { libraries } from "@/content/libraries";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";

export function OpenSourceLibraries() {
  return (
    <section id="libraries" className="magazine-spread scroll-mt-24 py-10 sm:py-12">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Open source
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              Libraries
            </h2>
          </div>
          <Link
            href="/libraries/"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-foreground"
            data-cursor="→"
          >
            All libraries
          </Link>
        </Reveal>
        <SpreadRule className="mt-5" />
        <ol className="mt-4 grid gap-4">
          {libraries.map((library, index) => (
            <RevealItem key={library.slug} index={index}>
              <li className="border border-border p-4 sm:p-5">
                <p className="font-mono text-[11px] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-2xl tracking-tight text-foreground">
                  <Link
                    href={`/libraries/${library.slug}/`}
                    data-cursor="VIEW"
                    className="hover:text-accent"
                  >
                    {library.packageName}
                  </Link>
                </h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {library.language} · {library.license} · v{library.version}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {library.tagline}
                </p>
                <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em]">
                  <Link
                    href={`/libraries/${library.slug}/`}
                    className="text-foreground hover:text-accent"
                  >
                    Read the page
                  </Link>
                  <a
                    href={library.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-foreground"
                  >
                    GitHub
                  </a>
                </p>
              </li>
            </RevealItem>
          ))}
        </ol>
      </Container>
    </section>
  );
}
