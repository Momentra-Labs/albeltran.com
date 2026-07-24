import { testimonials } from "@/content/testimonials";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

export function Testimonials() {
  return (
    <Section
      label="Testimonials"
      title="How collaborators describe the work"
      description="Representative peer and stakeholder feedback from delivery contexts. Replace with attributed quotes as you collect them."
    >
      <Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.name}
              className="flex h-full flex-col border border-border bg-surface/40 p-6"
            >
              <p className="flex-1 text-base leading-relaxed text-muted">
                “{item.quote}”
              </p>
              <footer className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-dim">{item.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
