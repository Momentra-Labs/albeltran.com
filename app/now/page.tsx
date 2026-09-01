import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { now } from "@/content/now";
import { person } from "@/content/person";
import {
  breadcrumbSchema,
  graphSchema,
  personSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Now",
  description: `What ${person.name} is working on now: current work, learning, books, goals, open source, and experiments. Updated ${now.updated}.`,
  path: "/now/",
});

export default function NowPage() {
  const schema = graphSchema([
    personSchema(),
    webPageSchema({
      path: "/now/",
      name: `Now · ${person.shortName}`,
      description: now.intro,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Now", path: "/now/" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label={`Updated ${now.updated}`}
        title="What I’m doing now"
        description={now.intro}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Now" },
        ]}
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2">
          {now.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {section.title}
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
