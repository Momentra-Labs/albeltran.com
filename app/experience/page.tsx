import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { Timeline } from "@/components/shared/timeline";
import { CertificationsGallery } from "@/components/shared/certifications-gallery";
import { JsonLd } from "@/components/shared/json-ld";
import { experience } from "@/content/experience";
import { person } from "@/content/person";
import {
  breadcrumbSchema,
  graphSchema,
  personSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Experience — Al Beltran",
  description: `Career timeline for Al Beltran (Al Andrew Paul Beltran): Software Engineering Lead at Anglian Dental, Software Engineer at Google via High Spring, Maya, National Geographic and Disney via Myridius, Accenture, Asurion, Yondu, freelance, and GoETU.`,
  path: "/experience/",
});

export default function ExperiencePage() {
  const schema = graphSchema([
    personSchema(),
    webPageSchema({
      path: "/experience/",
      name: `Experience · ${person.shortName}`,
      description: `Professional experience for ${person.name}, ${person.jobTitle}.`,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Experience", path: "/experience/" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Experience"
        title="Anglian Dental, Google, Maya, Myridius — and the path here"
        description="Software Engineering Lead at Anglian Dental in the United Kingdom. Previously Software Engineer at Google via High Spring. Fintech at Maya. National Geographic and Disney via Myridius. Technical leadership, enterprise AEM, and full-stack delivery from Manila."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Experience" },
        ]}
      />
      <Container className="py-16 sm:py-20">
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted">
          This timeline is the employment record for{" "}
          <Link href="/about/" className="text-accent hover:underline">
            Al Beltran, software engineer
          </Link>
          . Related case studies are on the{" "}
          <Link href="/projects/" className="text-accent hover:underline">
            projects page
          </Link>
          . Notes from that work appear in the{" "}
          <Link href="/blog/" className="text-accent hover:underline">
            engineering journal
          </Link>
          .
        </p>
        <section id="certifications" className="mb-16 scroll-mt-24 sm:mb-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Licenses &amp; certifications
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Issued and verifiable
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            Public certificates from Anthropic Education and HackerRank, as
            listed on{" "}
            <a
              href="https://www.linkedin.com/in/al-beltran/"
              target="_blank"
              rel="me noopener noreferrer"
              className="text-accent hover:underline"
            >
              LinkedIn
            </a>
            . Each plate opens the issuer&apos;s verification page.
          </p>
          <CertificationsGallery className="mt-8" />
        </section>
        <Timeline items={experience} />
      </Container>
    </>
  );
}
