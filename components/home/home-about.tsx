import Link from "next/link";
import { aboutContent } from "@/content/about";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";

export function HomeAbout() {
  return (
    <section id="about" className="py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            About
          </p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            <span className="block">Founder of Momentra Labs</span>
            <span className="mt-2 block text-muted">still writing the code</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p
            aria-hidden
            className="hidden font-mono text-[11px] uppercase tracking-[0.2em] lg:block lg:invisible"
          >
            About
          </p>
          <div className="space-y-4 text-base leading-relaxed text-muted lg:mt-3">
            {aboutContent.whoIAm.paragraphs.slice(0, 2).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <p>{aboutContent.outsideProgramming.paragraphs[0]}</p>
          </div>
          <Link
            href="/about/"
            className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-accent"
            data-cursor="→"
          >
            Full about page
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
