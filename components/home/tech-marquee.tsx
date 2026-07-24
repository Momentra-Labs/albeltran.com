import { technologies } from "@/content/person";
import { Section } from "@/components/shared/section";

export function TechMarquee() {
  const items = [...technologies, ...technologies];

  return (
    <Section
      label="Trusted technologies"
      title="Tools I use to design and ship production systems"
      description="A practical stack across frontend, backend, cloud, and enterprise platforms — chosen for delivery, not novelty."
      className="border-y border-border bg-surface/30 !py-16"
    >
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent" />
        <div className="animate-marquee flex w-max gap-3">
          {items.map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
