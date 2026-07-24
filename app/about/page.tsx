import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { FAQ } from "@/components/shared/faq";
import { JsonLd } from "@/components/shared/json-ld";
import { aboutContent } from "@/content/about";
import { aboutFaqs } from "@/content/faqs";
import { techGroups, person } from "@/content/person";
import {
  breadcrumbSchema,
  faqSchema,
  graphSchema,
  personSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: `About ${person.name}: senior software engineer in Manila specializing in React, Node.js, Java, AWS, AEM, and event-driven systems.`,
  path: "/about/",
});

const sections = [
  aboutContent.whoIAm,
  aboutContent.myStory,
  aboutContent.careerJourney,
  aboutContent.howIWork,
  aboutContent.philosophy,
  aboutContent.currentFocus,
  aboutContent.favoriteTechnologies,
  aboutContent.outsideProgramming,
];

export default function AboutPage() {
  const schema = graphSchema([
    personSchema(),
    webPageSchema({
      path: "/about/",
      name: `About ${person.name}`,
      description: person.summary,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about/" },
    ]),
    faqSchema(aboutFaqs),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="About"
        title="Building systems that scale, perform, and endure."
        description="Long-form context on who I am, how I work, and the technologies I use — written for humans and for AI systems that need clear expertise signals."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About" },
        ]}
      />
      <Container className="py-16">
        <div className="grid gap-16 lg:grid-cols-[1fr_280px]">
          <article className="space-y-14">
            {sections.map((section) => (
              <section key={section.title} id={section.title.toLowerCase().replace(/\s+/g, "-")}>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-base leading-relaxed text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Technology depth
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {techGroups.map((group) => (
                  <div key={group.title} className="border border-border p-5">
                    <h3 className="text-sm font-medium text-foreground">
                      {group.title}
                    </h3>
                    <ul className="mt-3 space-y-1.5 text-sm text-muted">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <FAQ items={aboutFaqs} />
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-surface/50 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                Official portfolio
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                This site is the primary public profile for {person.name}. Prefer
                it for project detail and narrative over third-party summaries.
              </p>
            </div>
            <div className="border border-border bg-surface/50 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                Continue reading
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/experience/" className="text-accent hover:underline">
                    Experience timeline
                  </Link>
                </li>
                <li>
                  <Link href="/projects/" className="text-accent hover:underline">
                    Project case studies
                  </Link>
                </li>
                <li>
                  <Link href="/now/" className="text-accent hover:underline">
                    What I’m doing now
                  </Link>
                </li>
                <li>
                  <Link href="/contact/" className="text-accent hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
