import { failures } from "@/content/failures";
import { person } from "@/content/person";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHeader } from "@/components/shared/page-header";
import {
  breadcrumbSchema,
  graphSchema,
  personSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const PATH = "/failures/";
const TITLE = "Things That Didn't Work";
const DESCRIPTION =
  "Engineering postmortems and lessons from Al Beltran. Some entries are clearly marked placeholders for later replacement.";

export const metadata = buildMetadata({
  title: "Things That Didn't Work — Engineering Postmortems | Al Beltran",
  description: DESCRIPTION,
  path: PATH,
});

export default function FailuresPage() {
  const schema = graphSchema([
    personSchema(),
    webPageSchema({
      path: PATH,
      name: TITLE,
      description: DESCRIPTION,
      mainEntity: "none",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Things that didn't work", path: PATH },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Vol. 01 / Manila"
        title={TITLE}
        description="What I tried. What broke. What I would do now. Placeholder cards are labeled so they are not mistaken for client postmortems."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Postmortems" },
        ]}
      />
      <Container className="space-y-10 py-16">
        {failures.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="scroll-mt-28 border border-border p-5 sm:p-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              {item.category}
              {item.placeholder ? " · Placeholder" : ""}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              {item.year}
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground">
              {item.title}
            </h2>
            <dl className="mt-8 grid gap-6">
              <Block term="What I tried" text={item.tried} />
              <Block term="Why I thought it would work" text={item.why} />
              <Block term="What actually happened" text={item.happened} />
              <Block term="What broke" text={item.broke} />
              <Block term="What I learned" text={item.learned} />
              <Block term="What I would do now" text={item.now} />
            </dl>
          </article>
        ))}
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
          Written by {person.shortName}
        </p>
      </Container>
    </>
  );
}

function Block({ term, text }: { term: string; text: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{term}</dt>
      <dd className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{text}</dd>
    </div>
  );
}
