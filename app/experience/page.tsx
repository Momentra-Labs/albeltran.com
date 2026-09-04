import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { Timeline } from "@/components/shared/timeline";
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
        <Timeline items={experience} />
      </Container>
    </>
  );
}
