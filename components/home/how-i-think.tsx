import { philosophy } from "@/content/philosophy";
import { Container } from "@/components/shared/container";

export function HowIThink() {
  return (
    <section id="think" className="border-y border-border py-24" data-hide-recruiter>
      <Container>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          How I think
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-foreground">
          Senior work is a sequence, not a stack
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {philosophy.map((item) => (
            <li key={item.index}>
              <p className="font-mono text-[11px] text-accent">{item.index}</p>
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
