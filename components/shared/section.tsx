import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  label?: string;
  title?: string;
  description?: string;
};

export function Section({
  children,
  className,
  id,
  label,
  title,
  description,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-24", className)}>
      <Container>
        {(label || title || description) && (
          <header className="mb-10 max-w-2xl">
            {label && (
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                {label}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
