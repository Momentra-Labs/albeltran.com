import { philosophy } from "@/content/philosophy";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem } from "@/components/shared/reveal";

export function HowIThink() {
  return (
    <section id="think" className="py-16 sm:py-20" data-hide-recruiter>
      <Container>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            How I think
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-foreground">
            Senior work is a sequence, not a stack
          </h2>
        </Reveal>
        <ol className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {philosophy.map((item, index) => (
            <li key={item.index}>
              <RevealItem index={index}>
                <p className="font-mono text-[11px] text-accent">{item.index}</p>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </RevealItem>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
