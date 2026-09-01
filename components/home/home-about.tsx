import Link from "next/link";
import { aboutContent } from "@/content/about";
import { Container } from "@/components/shared/container";

export function HomeAbout() {
  return (
    <section id="about" className="py-16 sm:py-20">
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end lg:gap-12">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            About
          </p>
          <h2 className="mt-3 max-w-[12ch] font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Founder of Momentra Labs — still writing the code
          </h2>
        </div>
        <div>
          <div className="space-y-4 text-base leading-relaxed text-muted">
            {aboutContent.whoIAm.paragraphs.slice(0, 2).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <p>{aboutContent.outsideProgramming.paragraphs[0]}</p>
          </div>
          <Link
            href="/about/"
            className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-accent"
            data-cursor="→"
          >
            Full about page
          </Link>
        </div>
      </Container>
    </section>
  );
}
