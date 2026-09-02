import { techGroups, technologies } from "@/content/person";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";

function StackEntry({
  group,
  index,
}: {
  group: (typeof techGroups)[number];
  index: number;
}) {
  return (
    <RevealItem index={index} variant="ink">
      <article className="group border-b border-border py-5">
        <div className="flex items-baseline gap-4">
          <span className="shrink-0 font-mono text-[11px] text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
              {group.title}
            </h3>
            <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-muted transition-colors group-hover:text-foreground">
              {group.items.join(" · ")}
            </p>
          </div>
        </div>
      </article>
    </RevealItem>
  );
}

export function EngineeringSystem() {
  const left = techGroups.slice(0, 3);
  const right = techGroups.slice(3);
  const ticker = technologies;

  return (
    <section id="system" className="magazine-spread border-y border-border py-16 sm:py-20">
      <div className="stack-ticker overflow-hidden border-b border-border pb-8">
        <div className="stack-ticker-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-10 px-5">
              {ticker.map((tech) => (
                <span
                  key={`${copy}-${tech}`}
                  className="shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
                >
                  <span className="mr-3 text-accent">/</span>
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Container className="pt-12">
        <Reveal variant="folio">
          <p className="magazine-spread-kicker">Vol. 01 / Appendix</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Stack
          </p>
          <h2 className="mt-3 max-w-xl font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            What I ship with
          </h2>
        </Reveal>
        <Reveal variant="ink" delay={0.08}>
          <p className="mt-4 max-w-2xl text-muted">
            A practical stack across frontend, backend, cloud, and enterprise
            platforms — chosen for delivery, not novelty.
          </p>
        </Reveal>
        <SpreadRule className="mt-8" />

        <div className="mt-10 grid lg:grid-cols-2">
          <div className="lg:pr-10">
            {left.map((group, index) => (
              <StackEntry key={group.title} group={group} index={index} />
            ))}
          </div>
          <div className="lg:border-l lg:border-border lg:pl-10">
            {right.map((group, index) => (
              <StackEntry
                key={group.title}
                group={group}
                index={index + left.length}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
