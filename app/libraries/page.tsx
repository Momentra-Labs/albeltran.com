import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { libraries, librariesIntro, libraryFaqs } from "@/content/libraries";
import { person } from "@/content/person";
import {
  breadcrumbSchema,
  collectionPageSchema,
  faqSchema,
  graphSchema,
  librariesItemListSchema,
  librarySchema,
  personSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const title = "Open-source libraries";
const description =
  "Open-source libraries by Al Beltran, including @altbeltran/safe-action: reliable TypeScript actions for humans and AI agents.";

export const metadata: Metadata = {
  ...buildMetadata({
    title,
    description,
    path: "/libraries/",
  }),
  keywords: [
    "Al Beltran",
    "open source",
    "TypeScript library",
    "@altbeltran/safe-action",
    "safe-action",
  ],
};

export default function LibrariesPage() {
  const schema = graphSchema([
    personSchema(),
    collectionPageSchema({
      path: "/libraries/",
      name: `${title} by ${person.shortName}`,
      description,
    }),
    librariesItemListSchema(),
    ...libraries.map((library) => librarySchema(library)),
    faqSchema(libraryFaqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Libraries", path: "/libraries/" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Libraries"
        title="Open-source libraries"
        description={librariesIntro}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Libraries" },
        ]}
      />
      <Container className="py-16 sm:py-20">
        <ol className="space-y-10">
          {libraries.map((library) => (
            <li key={library.slug} className="border-b border-border pb-10">
              <article>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {library.language} · {library.license} · v{library.version}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  <Link
                    href={`/libraries/${library.slug}/`}
                    className="hover:text-accent"
                  >
                    {library.packageName}
                  </Link>
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                  {library.tagline} {library.registryNote}
                </p>
                <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <Link
                    href={`/libraries/${library.slug}/`}
                    className="text-accent hover:underline"
                  >
                    Library page
                  </Link>
                  <a
                    href={library.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {library.repository.replace("https://", "")}
                  </a>
                </p>
              </article>
            </li>
          ))}
        </ol>

        <section className="mt-16 max-w-2xl" aria-labelledby="library-faq">
          <h2
            id="library-faq"
            className="text-2xl font-semibold tracking-tight text-foreground"
          >
            Questions
          </h2>
          <dl className="mt-6 space-y-8">
            {libraryFaqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-base font-medium text-foreground">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </Container>
    </>
  );
}
