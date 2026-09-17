import Link from "next/link";
import { Container } from "@/components/shared/container";
import { CertificationsList } from "@/components/shared/certifications";
import { TechStack } from "@/components/shared/tech-stack";
import { Reveal, SpreadRule } from "@/components/shared/reveal";

export function EngineeringSystem() {
  return (
    <section
      id="stack"
      aria-label="Stack and certifications"
      className="magazine-spread scroll-mt-24 border-b border-border py-10 sm:py-12"
    >
      <Container>
        <Reveal variant="folio">
          <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Stack &amp; papers
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Skills, tools, and certificates
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            The day-to-day stack, grouped so it can be scanned. Certificates
            below are issuer-verified.
          </p>
        </Reveal>
        <SpreadRule className="mt-5" />
        <TechStack className="mt-6" />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-3">
          <h3 className="font-display text-2xl tracking-tight text-foreground">
            Licenses &amp; certifications
          </h3>
          <Link
            href="/experience/#certifications"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent hover:text-foreground"
          >
            Full list →
          </Link>
        </div>
        <CertificationsList className="mt-4" />
      </Container>
    </section>
  );
}
