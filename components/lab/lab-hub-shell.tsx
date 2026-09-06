import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHeader } from "@/components/shared/page-header";
import { LabEducation } from "@/components/lab/lab-education";
import { LabNav } from "@/components/lab/lab-nav";
import type { LabEducationBlock, LabExperience } from "@/content/lab/types";
import { person } from "@/content/person";
import { labRelated } from "@/lib/lab/pages";
import {
  breadcrumbSchema,
  graphSchema,
  learningResourceSchema,
  personSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/schema";

export function LabHubShell({
  experience,
  education,
  children,
}: {
  experience: LabExperience;
  education: LabEducationBlock;
  children: React.ReactNode;
}) {
  const schema = graphSchema([
    websiteSchema(),
    personSchema(),
    webPageSchema({
      path: experience.href,
      name: experience.seoTitle,
      description: experience.seoDescription,
      mainEntity: "none",
    }),
    learningResourceSchema({
      path: experience.href,
      name: experience.title,
      description: experience.seoDescription,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Engineering Lab", path: "/lab/" },
      { name: experience.title, path: experience.href },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Engineering Lab"
        title={experience.title}
        description={experience.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Lab", href: "/lab/" },
          { name: experience.title },
        ]}
      />
      <Container className="py-12">
        <LabNav current={experience.href} />
        {children}
        <LabEducation education={education} related={labRelated(experience.id)} />
        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
          Built by {person.shortName}
        </p>
      </Container>
    </>
  );
}
