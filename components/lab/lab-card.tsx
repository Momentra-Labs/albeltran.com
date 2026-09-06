import Link from "next/link";
import type { LabExperience } from "@/content/lab/types";

export function LabCard({ experience }: { experience: LabExperience }) {
  return (
    <article className="magazine-plate group flex h-full flex-col border border-border p-5 transition-colors hover:border-border-bright">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
        {experience.kicker}
      </p>
      <h3 className="mt-2 font-display text-2xl tracking-tight text-foreground">
        <Link href={experience.href} data-cursor="VIEW" className="hover:text-accent">
          {experience.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-foreground">{experience.tagline}</p>
      <p className="mt-2 flex-1 text-sm text-muted">{experience.description}</p>
      <Link
        href={experience.href}
        className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground hover:text-accent"
      >
        Enter →
      </Link>
    </article>
  );
}
