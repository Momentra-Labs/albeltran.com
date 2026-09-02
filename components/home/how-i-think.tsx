import { philosophy } from "@/content/philosophy";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";

export function HowIThink() {
  return (
    <section id="think" className="magazine-spread py-16 sm:py-20" data-hide-recruiter>
      <Container>
        <Reveal variant="folio">
          <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            How I think
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Senior work is a sequence, not a stack
          </h2>
        </Reveal>
        <SpreadRule className="mt-8" />
        <ol className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {philosophy.map((item, index) => (
            <li key={item.index} className="min-h-0">
              <RevealItem index={index} className="h-full">
                <article className="group relative flex h-full min-h-[20rem] flex-col border border-border p-5 transition-colors hover:border-accent/50">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <p className="font-mono text-[11px] text-accent">{item.index}</p>
                  <h3 className="mt-3 min-h-[3.25rem] font-display text-xl tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>
                </article>
              </RevealItem>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
