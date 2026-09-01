"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/content/projects";
import { Container } from "@/components/shared/container";
import { ProjectCover } from "@/components/shared/project-cover";
import { ProjectDrawer } from "@/components/projects/project-drawer";
import { Reveal, RevealItem } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

export function SelectedWork({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="work" className="py-16 sm:py-20">
      <Container>
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              The work
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              Systems that had to ship
            </h2>
          </div>
          <Link
            href="/projects/"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-foreground"
            data-cursor="→"
          >
            All work
          </Link>
        </Reveal>

        <div className="space-y-12">
          {projects.map((project, index) => {
            const reverse = index % 2 === 1;
            return (
              <RevealItem key={project.slug} index={index}>
                <article className="grid gap-6 border-t border-border pt-8 lg:grid-cols-2 lg:items-end lg:gap-12">
                <div className={cn(reverse && "lg:order-2")}>
                  <p className="font-mono text-[11px] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                    {project.name}
                  </h3>
                  <p className="mt-4 max-w-md text-muted">{project.tagline}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-4 font-mono text-[10px] uppercase tracking-[0.16em]">
                    <div>
                      <dt className="text-muted-dim">Category</dt>
                      <dd className="mt-1 text-foreground">
                        {project.kind === "lab" ? "Lab" : "Engineering"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-dim">Year</dt>
                      <dd className="mt-1 text-foreground">{project.year}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-sm text-muted-dim">{project.role}</p>
                  <button
                    type="button"
                    data-cursor="VIEW"
                    className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-accent hover:text-accent-hover"
                    onClick={() => setActive(project)}
                  >
                    Explore project
                  </button>
                </div>
                <motion.button
                  type="button"
                  className={cn(
                    "group relative aspect-16/10 overflow-hidden border border-border",
                    reverse && "lg:order-1",
                  )}
                  onClick={() => setActive(project)}
                  data-cursor="VIEW"
                  whileHover={reduce ? undefined : { scale: 1.01 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProjectCover
                    project={project}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.button>
                <p className="sr-only">
                  {project.overview} Problem: {project.problem} Solution:{" "}
                  {project.solution}
                </p>
              </article>
              </RevealItem>
            );
          })}
        </div>
      </Container>
      <ProjectDrawer
        project={active}
        open={Boolean(active)}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      />
    </section>
  );
}
