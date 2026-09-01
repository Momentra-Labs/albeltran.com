import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { ProjectCard } from "@/components/shared/project-card";
import { JsonLd } from "@/components/shared/json-ld";
import { getLabProjects, getSelectedProjects } from "@/content/projects";
import { person } from "@/content/person";
import {
  breadcrumbSchema,
  graphSchema,
  personSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects by Al Beltran",
  description: `Software engineering case studies by Al Beltran (Al Andrew Paul Beltran): Disney Institute AEM platform, FWD Smart Recruitment, Maya card loyalty, Disney Crew APIs, and serverless ETL systems.`,
  path: "/projects/",
});

export default function ProjectsPage() {
  const selected = getSelectedProjects();
  const lab = getLabProjects();
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
      <Container className="space-y-16 py-16">
        <section>
          <h2 className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Selected work
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {selected.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
        {lab.length > 0 && (
          <section>
            <h2 className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Engineering lab
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {lab.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
