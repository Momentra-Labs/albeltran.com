import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

type PageHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  breadcrumbs?: { name: string; href?: string }[];
};

export function PageHeader({
  label,
  title,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="border-b border-border pb-12 pt-32">
      <Container>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-8" />}
        {label && (
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            {label}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {description}
          </p>
        )}
      </Container>
    </div>
  );
}
