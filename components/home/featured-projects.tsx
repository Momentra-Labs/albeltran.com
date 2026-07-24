import Link from "next/link";
import { getFeaturedProjects } from "@/content/projects";
import { Section } from "@/components/shared/section";
import { ProjectCard } from "@/components/shared/project-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <Section
      label="Featured projects"
      title="Work that shipped to real users and operators"
      description="Enterprise platforms, solo MVPs, and event-driven fintech systems — each with a full case study."
    >
      <Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured={index === 0}
            />
          ))}
        </div>
        <div className="mt-10">
          <Button asChild variant="secondary">
            <Link href="/projects/">View all projects</Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
