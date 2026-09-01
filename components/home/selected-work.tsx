"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/content/projects";
import { Container } from "@/components/shared/container";
import { ProjectDrawer } from "@/components/projects/project-drawer";

export function SelectedWork({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="work" className="py-24 sm:py-32">
      <Container>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Selected work
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
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
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="grid gap-8 border-t border-border pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12"
            >
              <div>
                <p className="font-mono text-[11px] text-muted-dim">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {project.name}
                </h3>
                <p className="mt-4 text-muted">{project.tagline}</p>
                <p className="mt-3 text-sm text-muted-dim">{project.role}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  {project.techStack.join(" · ")}
                </p>
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
                className="group relative aspect-16/10 overflow-hidden border border-border"
                onClick={() => setActive(project)}
                data-cursor="VIEW"
                whileHover={reduce ? undefined : { scale: 1.01 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={project.screenshots[0]?.src ?? "/og/default.jpg"}
                  alt={project.screenshots[0]?.alt ?? project.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.button>
              <p className="sr-only">
                {project.overview} Problem: {project.problem} Solution:{" "}
                {project.solution}
              </p>
            </article>
          ))}
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
