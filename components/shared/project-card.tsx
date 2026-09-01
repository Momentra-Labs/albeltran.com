import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col border border-border p-6 transition-colors hover:border-border-bright sm:p-8",
        featured && "sm:col-span-2",
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          {project.kind === "lab" ? "Lab" : project.year}
        </p>
        <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        <Link
          href={`/projects/${project.slug}/`}
          className="after:absolute after:inset-0"
          data-cursor="VIEW"
        >
          {project.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-muted-dim">{project.role}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted sm:text-base">
        {project.tagline}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.techStack.slice(0, 5).map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
    </article>
  );
}
