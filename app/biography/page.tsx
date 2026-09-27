import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { FAQ } from "@/components/shared/faq";
import { JsonLd } from "@/components/shared/json-ld";
import { biography } from "@/content/biography";
import { biographyFaqs } from "@/content/faqs";
import { featuredExperience } from "@/content/experience";
import { person } from "@/content/person";
import { SOCIAL_LINKS } from "@/lib/constants";
import {
  aboutPageSchema,
  breadcrumbSchema,
  faqSchema,
  graphSchema,
  momentraLabsSchema,
  personSchema,
  profilePageSchema,
  websiteSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Al Andrew Paul Beltran — Biography",
  description: biography.lede,
  path: "/biography/",
  type: "profile",
  image: "/og/al-beltran-biography.jpg",
  imageAlt: biography.photoAlt,
  keywords: [
    "Al Andrew Paul Beltran",
    "Al Beltran",
    "Al Andrew Paul Teodosio Beltran",
    "Al Beltran biography",
    "Al Beltran software engineer",
    "Software Engineering Lead Manila",
    "Momentra Labs founder",
    "Anglian Dental",
  ],
});

export default function BiographyPage() {
  const schema = graphSchema([
    websiteSchema(),
    personSchema(),
    momentraLabsSchema(),
    aboutPageSchema(),
    profilePageSchema({
      path: "/biography/",
      name: `${person.name} — Biography`,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Biography", path: "/biography/" },
    ]),
    faqSchema(biographyFaqs),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Biography"
        title={biography.title}
        description={biography.lede}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Biography" },
        ]}
      />
      <Container className="py-16">
        <div className="grid gap-16 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)]">
          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <figure>
              <div className="relative aspect-[1200/1304] overflow-hidden border border-border bg-surface">
                <Image
                  src={person.portrait}
                  alt={biography.photoAlt}
                  width={person.imageWidth}
                  height={person.imageHeight}
                  priority
                  sizes="(max-width: 1023px) 92vw, 22rem"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-muted">
                {biography.photoCaption}
              </figcaption>
            </figure>
            <dl className="space-y-3 border-t border-border pt-6">
              {biography.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-dim">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">
                    {"href" in fact && fact.href ? (
                      <a
                        href={fact.href}
                        className="text-accent hover:underline"
                      >
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link href="/about/" className="text-accent hover:underline">
                  First-person about page
                </Link>
              </li>
              <li>
                <Link href="/experience/" className="text-accent hover:underline">
                  Experience timeline
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="text-accent hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </aside>

          <article className="min-w-0 space-y-14">
            {biography.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 72)}
                      className="text-base leading-relaxed text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section id="selected-roles">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Selected roles
              </h2>
              <ol className="mt-6 space-y-5">
                {featuredExperience.map((role) => (
                  <li key={role.id}>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dim">
                      {role.duration}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">
                      {role.role} · {role.company}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {role.summary}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm">
                Full responsibilities and impact are on the{" "}
                <Link href="/experience/" className="text-accent hover:underline">
                  experience page
                </Link>
                .
              </p>
            </section>

            <FAQ items={biographyFaqs} />
          </article>
        </div>
      </Container>
    </>
  );
}
