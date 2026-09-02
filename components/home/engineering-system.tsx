import { technologies } from "@/content/person";

export function EngineeringSystem() {
  return (
    <section
      id="system"
      aria-label="Stack"
      className="stack-ticker overflow-hidden border-y border-border py-5"
    >
      <div className="stack-ticker-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-10 px-5">
            {technologies.map((tech) => (
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
    </section>
  );
}
