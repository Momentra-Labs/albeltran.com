import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Project, labSurfaceLabel, projectFolio } from "@/content/projects";
import { DeviceCluster, clusterVariantFor } from "@/components/projects/device-cluster";
import { Badge } from "@/components/ui/badge";
import { ProjectCtas } from "@/components/projects/project-ctas";
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
        "group relative flex h-full flex-col overflow-hidden border border-border transition-colors hover:border-border-bright",
        featured && "sm:col-span-2",
      )}
    >
      <div className="relative">
        <DeviceCluster
          project={project}
          variant={clusterVariantFor(project, "card")}
        />
        <span className="pointer-events-none absolute left-4 top-4 z-[5] font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
          {project.kind === "lab" ? labSurfaceLabel(project) : projectFolio(project)}
        </span>
        {project.demo ? (
          <span className="pointer-events-none absolute right-4 top-4 z-[5] inline-flex items-center gap-1.5 border border-border bg-background/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground backdrop-blur-[2px]">
            <span className="magazine-live-dot" aria-hidden />
            Live
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-4 flex items-start justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            {project.kind === "lab" ? "Lab" : project.year}
          </p>
          <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          <Link href={`/projects/${project.slug}/`} data-cursor="VIEW">
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
        <ProjectCtas project={project} className="mt-6" />
      </div>
    </article>
  );
}
