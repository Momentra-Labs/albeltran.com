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
  description: `Career timeline for Al Beltran (Al Andrew Paul Beltran): Software Engineer at Google via High Spring, Maya, National Geographic and Disney via Accenture, Myridius, Asurion, Yondu, freelance, and GoETU.`,
  path: "/experience/",
});

export default function ExperiencePage() {
  const schema = graphSchema([
    personSchema(),
    webPageSchema({
      path: "/experience/",
      name: `Experience · ${person.shortName}`,
      description: `Professional experience for ${person.name}, Senior Software Engineer.`,
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
        title="Google, Maya, Accenture — and the path here"
        description="Software Engineer at Google via High Spring. Fintech at Maya. National Geographic and Disney via Accenture. Technical leadership, enterprise AEM, and full-stack delivery from Manila."
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
