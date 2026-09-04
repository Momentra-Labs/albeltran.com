import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { JournalNav } from "@/components/journal/journal-nav";
import { aboutContent } from "@/content/about";
import { featuredExperience } from "@/content/experience";
import { person, techGroups } from "@/content/person";
import { getFeaturedProjects, getLabProjects } from "@/content/projects";
import { SOCIAL_LINKS } from "@/lib/constants";
import {
  authorProfilePageSchema,
  breadcrumbSchema,
  graphSchema,
  labProductsSchema,
  momentraLabsSchema,
  personSchema,
  websiteSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Al Beltran — Author",
  description: `${person.shortName} (${person.name}) writes the engineering journal on this site: Software Engineering Lead at Anglian Dental, full-stack engineer, founder of Momentra Labs.`,
  path: "/author/al-beltran/",
});

export default function AuthorPage() {
  const featured = getFeaturedProjects();
  const labs = getLabProjects();
  const schema = graphSchema([
    websiteSchema(),
    personSchema(),
    momentraLabsSchema(),
    labProductsSchema(labs),
    authorProfilePageSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Author", path: "/author/al-beltran/" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Author"
        title={person.shortName}
        description={`${person.jobTitle}. ${person.occupation}. Founder of ${person.labs}. The byline on every journal article is this page.`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Author" },
        ]}
      />
      <Container className="py-16">
        <div className="mb-10">
          <JournalNav current="/author/al-beltran/" />
        </div>
        <div className="grid gap-16 lg:grid-cols-[1fr_280px]">
          <article className="space-y-14">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Who writes this journal
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {person.name} — also {person.legalName} — is a full-stack
                software engineer based in Manila. He currently works as{" "}
                {person.currentRole} in the United Kingdom. He is the founder of{" "}
                {person.labs}. Previously he was a Software Engineer at Google
                via High Spring. Through Myridius he contributed to National
                Geographic and Disney enterprise platforms.
              </p>
              {aboutContent.whoIAm.paragraphs.slice(1).map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="mt-4 text-base leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Engineering interests
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                The journal follows the same work as the portfolio: product UI
                in React and TypeScript, services in Node.js, Java/Spring Boot,
                and Laravel, data in PostgreSQL and MySQL, delivery on Docker
                and AWS, and enterprise authoring on Adobe Experience Manager.
                The Interview Lab exists because those interviews are how
                engineering teams actually hire.
              </p>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {techGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
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

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Professional experience
              </h2>
              <ol className="mt-6 space-y-6">
                {featuredExperience.map((role) => (
                  <li key={role.id}>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dim">
                      {role.duration}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">
                      {role.role} · {role.company}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {role.summary}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm">
                <Link href="/experience/" className="text-accent hover:underline">
                  Full experience timeline
                </Link>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Projects
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Independent products under {person.labs}:{" "}
                {person.personalProducts.join(", ")}. Client and enterprise
                case studies live on the projects index, including National
                Geographic and Disney work via Myridius.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {[...featured, ...labs].map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/projects/${project.slug}/`}
                      className="text-accent hover:underline"
                    >
                      {project.name}
                    </Link>
                    <span className="text-muted"> — {project.tagline}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm">
                <Link href="/projects/" className="text-accent hover:underline">
                  All project case studies
                </Link>
              </p>
            </section>
          </article>

          <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Identity
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {person.name}
                <br />
                {person.jobTitle}
                <br />
                {person.location}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Links
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/about/" className="text-accent hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-accent hover:underline">
                    Portfolio home
                  </Link>
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
                  <Link href="/blog/" className="text-accent hover:underline">
                    Engineering journal
                  </Link>
                </li>
                <li>
                  <Link href="/interviews/" className="text-accent hover:underline">
                    Interview Lab
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
