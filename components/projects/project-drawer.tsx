"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCtas } from "@/components/projects/project-ctas";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ArchitectureFlow } from "@/components/projects/architecture-flow";
import type { Project } from "@/content/projects";

export function ProjectDrawer({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-xl overflow-y-auto p-6 sm:p-8">
        {project ? (
          <>
            <SheetHeader className="pr-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {project.year}
              </p>
              <SheetTitle className="text-2xl">{project.name}</SheetTitle>
              <p className="text-sm text-muted-dim">{project.role}</p>
            </SheetHeader>
            <div className="space-y-8 text-sm leading-relaxed text-muted">
              <section>
                <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground">
                  Problem
                </h3>
                <p>{project.problem}</p>
              </section>
              <section>
                <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground">
                  Solution
                </h3>
                <p>{project.solution}</p>
              </section>
              <section>
                <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground">
                  Architecture
                </h3>
                <ArchitectureFlow steps={project.architecture} />
              </section>
              <section>
                <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground">
                  Implementation
                </h3>
                <div className="mb-3 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
                <ul className="list-disc space-y-1 pl-4">
                  {project.features.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground">
                  Outcome
                </h3>
                <ul className="list-disc space-y-1 pl-4">
                  {project.performance.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <Button asChild>
                <Link href={`/projects/${project.slug}/`}>
                  Open full case study
                </Link>
              </Button>
              <ProjectCtas project={project} />
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
