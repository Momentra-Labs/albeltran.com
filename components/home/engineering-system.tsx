import { techGroups } from "@/content/person";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem } from "@/components/shared/reveal";

function StackEntry({
  group,
  index,
}: {
  group: (typeof techGroups)[number];
  index: number;
}) {
  return (
    <RevealItem index={index}>
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

  return (
    <section id="system" className="border-t border-border py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Stack
          </p>
          <h2 className="mt-3 max-w-xl font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            What I ship with
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            A practical stack across frontend, backend, cloud, and enterprise
            platforms — chosen for delivery, not novelty.
          </p>
        </Reveal>

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
