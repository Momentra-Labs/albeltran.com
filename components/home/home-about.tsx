import Image from "next/image";
import Link from "next/link";
import { aboutContent } from "@/content/about";
import { person } from "@/content/person";
import { Container } from "@/components/shared/container";

export function HomeAbout() {
  return (
    <section id="about" className="py-24">
      <Container className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            About
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            Founder of Momentra Labs — still writing the code
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
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
        <figure className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-4/5 overflow-hidden border border-border">
            <Image
              src={person.photo}
              alt={`${person.name}, Senior Software Engineer and founder of ${person.labs}`}
              fill
              sizes="(max-width: 1024px) 90vw, 400px"
              className="object-cover object-[center_18%]"
            />
          </div>
        </figure>
      </Container>
    </section>
  );
}
