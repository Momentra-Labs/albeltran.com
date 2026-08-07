import Link from "next/link";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { person } from "@/content/person";

export function HomeCTA() {
  return (
    <Section className="pb-8">
      <Reveal>
        <div className="relative overflow-hidden border border-border bg-surface/50 px-6 py-12 sm:px-10 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,142,255,0.18),transparent_55%)]"
          />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Let’s build something reliable.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {person.availability} Based in {person.location}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact/">Contact Me</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/about/">About Al Beltran</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/resume/">View Resume</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
