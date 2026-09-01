import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { uses } from "@/content/uses";
import { person } from "@/content/person";
import {
  breadcrumbSchema,
  graphSchema,
  personSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Uses",
  description: `Development setup used by ${person.name}: laptop, monitor, keyboard, editor, extensions, terminal, theme, desk, and software.`,
  path: "/uses/",
});

export default function UsesPage() {
  const schema = graphSchema([
    personSchema(),
    webPageSchema({
      path: "/uses/",
      name: `Uses · ${person.shortName}`,
      description: uses.intro,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Uses", path: "/uses/" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Uses"
        title="Tools I rely on to design and ship software"
        description={uses.intro}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Uses" },
        ]}
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2">
          {uses.categories.map((category) => (
            <section key={category.title}>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {category.title}
              </h2>
              <ul className="mt-5 space-y-5">
                {category.items.map((item) => (
                  <li key={item.name} className="border-b border-border pb-4">
                    <h3 className="text-sm font-medium text-foreground">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
