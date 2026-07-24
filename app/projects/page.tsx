import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { ProjectCard } from "@/components/shared/project-card";
import { JsonLd } from "@/components/shared/json-ld";
import { projects } from "@/content/projects";
import { person } from "@/content/person";
import {
  breadcrumbSchema,
  graphSchema,
  personSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description: `Selected projects by ${person.name}: Disney Institute, FWD Smart Recruitment, Maya card loyalty, Disney Crew APIs, and serverless ETL.`,
  path: "/projects/",
});

export default function ProjectsPage() {
  const schema = graphSchema([
    personSchema(),
    webPageSchema({
      path: "/projects/",
      name: `Projects · ${person.shortName}`,
      description: `Project case studies by ${person.name}.`,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects/" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Projects"
        title="Projects that ship, scale, and matter"
        description="Each project has a dedicated case study covering problem, solution, architecture, tech stack, challenges, and lessons learned."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Projects" },
        ]}
      />
      <Container className="py-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </>
  );
}
