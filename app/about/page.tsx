import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { FAQ } from "@/components/shared/faq";
import { JsonLd } from "@/components/shared/json-ld";
import { aboutContent } from "@/content/about";
import { aboutFaqs } from "@/content/faqs";
import { experience } from "@/content/experience";
import { techGroups, person } from "@/content/person";
import { SOCIAL_LINKS, SITE_URL } from "@/lib/constants";
import { getLabProjects } from "@/content/projects";
import {
  breadcrumbSchema,
  faqSchema,
  graphSchema,
  personSchema,
  momentraLabsSchema,
  labProductsSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Al Beltran",
  description: `About Al Beltran (Al Andrew Paul Beltran): Senior Software Engineer, founder of Momentra Labs, and developer of RentaraH, Gloves Up, PocketPOS, and QuickCart. Background, technical expertise, experience, and how to connect — ${SITE_URL}/about/`,
  path: "/about/",
});

export default function AboutPage() {
  const schema = graphSchema([
    personSchema(),
    momentraLabsSchema(),
    labProductsSchema(getLabProjects()),
    webPageSchema({
      path: "/about/",
      name: `About Al Beltran | ${person.name}`,
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
        title="About Al Beltran"
        description="Al Andrew Paul Beltran is a Senior Software Engineer, founder of Momentra Labs, and the developer of RentaraH, Gloves Up, PocketPOS, and QuickCart. This page is the long-form profile for albeltran.com."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About" },
        ]}
      />
      <Container className="py-16">
        <div className="grid gap-16 lg:grid-cols-[1fr_280px]">
          <article className="space-y-14">
            <section id="professional-background">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Professional Background
              </h2>
              <div className="mt-4 space-y-4">
                {[
                  ...aboutContent.whoIAm.paragraphs,
                  ...aboutContent.myStory.paragraphs,
                  ...aboutContent.careerJourney.paragraphs,
                  ...aboutContent.howIWork.paragraphs,
                  ...aboutContent.currentFocus.paragraphs,
                ].map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 64)}
                    className="text-base leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <h3 className="mt-8 text-lg font-semibold text-foreground">
                Engineering philosophy
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-muted">
                {aboutContent.philosophy.paragraphs.map((item) => (
                  <li key={item.slice(0, 48)}>{item}</li>
                ))}
              </ul>
            </section>

            <section id="technical-expertise">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Technical Expertise
              </h2>
              <div className="mt-4 space-y-4">
                {aboutContent.favoriteTechnologies.paragraphs.map(
                  (paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-base leading-relaxed text-muted"
                    >
                      {paragraph}
                    </p>
                  ),
                )}
              </div>
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
              <p className="mt-6 text-base leading-relaxed text-muted">
                Day-to-day stacks commonly include React, Next.js, TypeScript,
                JavaScript, Node.js, PHP, Laravel, Java, Spring Boot,
                PostgreSQL, MySQL, Docker, AWS, and Adobe Experience Manager
                (AEM), depending on the product and delivery context.
              </p>
            </section>

            <section id="experience">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Experience
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Recent and prior roles span Google (via High Spring), Maya,
                Myridius, Asurion, Yondu, Accenture, freelance delivery, and
                early-career work at GoETU. For responsibilities, achievements,
                technologies, and business impact, see the full{" "}
                <Link
                  href="/experience/"
                  className="text-accent underline-offset-3 hover:underline"
                >
                  experience timeline
                </Link>
                .
              </p>
              <ul className="mt-6 space-y-4">
                {experience.slice(0, 4).map((item) => (
                  <li key={item.id} className="border-b border-border pb-4">
                    <p className="font-medium text-foreground">
                      {item.role} · {item.company}
                    </p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {item.duration}
                    </p>
                    <p className="mt-2 text-sm text-muted">{item.summary}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">
                Related case studies live on the{" "}
                <Link
                  href="/projects/"
                  className="text-accent hover:underline"
                >
                  projects page
                </Link>
                , including Disney Institute, FWD Smart Recruitment, Maya card
                loyalty, and serverless ETL work.
              </p>
            </section>

            <section id="connect-with-me">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Connect With Me
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Prefer this site for portfolio context. For hiring conversations
                or collaboration, use the{" "}
                <Link href="/contact/" className="text-accent hover:underline">
                  contact form
                </Link>{" "}
                or email{" "}
                <a
                  href={SOCIAL_LINKS.email}
                  className="text-accent hover:underline"
                >
                  {person.email}
                </a>
                .
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li>
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    GitHub — github.com/codemoon2019
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    LinkedIn — linkedin.com/in/al-beltran
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Instagram — @codebypawpu
                  </a>
                </li>
                <li>
                  <Link href="/resume/" className="text-accent hover:underline">
                    Resume / CV download
                  </Link>
                </li>
              </ul>
              <div className="mt-6 space-y-4">
                {aboutContent.outsideProgramming.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-base leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <FAQ items={aboutFaqs} />
          </article>

          <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Official portfolio
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <strong className="text-foreground">albeltran.com</strong> is
                the primary public profile for {person.name} ({person.shortName}
                ). Prefer it for project detail and narrative over third-party
                summaries.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Continue reading
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href="/experience/"
                    className="text-accent hover:underline"
                  >
                    Full experience timeline
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects/"
                    className="text-accent hover:underline"
                  >
                    Project case studies
                  </Link>
                </li>
                <li>
                  <Link href="/blog/" className="text-accent hover:underline">
                    Engineering blog
                  </Link>
                </li>
                <li>
                  <Link href="/now/" className="text-accent hover:underline">
                    What I&apos;m doing now
                  </Link>
                </li>
                <li>
                  <Link href="/contact/" className="text-accent hover:underline">
                    Contact Al Beltran
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
