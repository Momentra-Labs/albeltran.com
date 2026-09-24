import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { getLibrary, libraries } from "@/content/libraries";
import { person } from "@/content/person";
import {
  breadcrumbSchema,
  graphSchema,
  librarySchema,
  personSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return libraries.map((library) => ({ slug: library.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const library = getLibrary(slug);
  if (!library) return {};
  return {
    ...buildMetadata({
      title: `${library.packageName} — TypeScript library`,
      description: `${library.tagline} Open-source ${library.language} library by ${person.shortName}. ${library.license} license, no runtime dependencies.`,
      path: `/libraries/${library.slug}/`,
    }),
    keywords: [
      library.packageName,
      library.name,
      person.shortName,
      person.name,
      "open source",
      "TypeScript library",
      ...library.topics,
    ],
  };
}

export default async function LibraryPage({ params }: Props) {
  const { slug } = await params;
  const library = getLibrary(slug);
  if (!library) notFound();

  const schema = graphSchema([
    personSchema(),
    webPageSchema({
      path: `/libraries/${library.slug}/`,
      name: `${library.packageName} by ${person.shortName}`,
      description: library.description,
      mainEntity: "none",
    }),
    librarySchema(library),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Libraries", path: "/libraries/" },
      { name: library.packageName, path: `/libraries/${library.slug}/` },
    ]),
  ]);

  const facts = [
    ["Package", library.packageName],
    ["Version", library.version],
    ["Released", library.released],
    ["Language", library.language],
    ["Runtime", library.runtime],
    ["License", library.license],
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Open-source library"
        title={library.packageName}
        description={library.tagline}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Libraries", href: "/libraries/" },
          { name: library.name },
        ]}
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-16 lg:grid-cols-[1fr_280px]">
          <article className="max-w-2xl space-y-12">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                What it is
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {library.description}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Maintained by{" "}
                <Link href="/author/al-beltran/" className="text-accent hover:underline">
                  {person.name}
                </Link>
                . {library.registryNote}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                What it includes
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
                {library.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <p className="text-sm">
              <a
                href={library.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Source on GitHub
              </a>
              <span className="text-muted"> · </span>
              <a
                href={library.licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {library.license} license
              </a>
            </p>
          </article>

          <aside>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Details
            </h2>
            <dl className="mt-5 space-y-4">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-dim">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">{value}</dd>
                </div>
              ))}
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-dim">
                  Repository
                </dt>
                <dd className="mt-1 text-sm">
                  <a
                    href={library.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-accent hover:underline"
                  >
                    {library.repository.replace("https://github.com/", "")}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </Container>
    </>
  );
}
