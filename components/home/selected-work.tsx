"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Project } from "@/content/projects";
import { Container } from "@/components/shared/container";
import { ProjectCover } from "@/components/shared/project-cover";
import { ProjectDrawer } from "@/components/projects/project-drawer";
import { Reveal, SpreadRule } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

function WorkSpread({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const reverse = index % 2 === 1;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 0.45, 1], [1.1, 1, 1.04]);
  const folio = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={ref}
      className="relative grid gap-8 border-t border-border py-12 lg:min-h-[72vh] lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-16"
    >
      <div className={cn("relative z-[1]", reverse && "lg:order-2")}>
        <span className="magazine-ghost-folio hidden lg:block" aria-hidden>
          {folio}
        </span>
        <Reveal variant="folio">
          <p className="font-mono text-[11px] text-accent">{folio}</p>
          <h3 className="relative mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl lg:text-5xl">
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
            onClick={() => onOpen(project)}
          >
            Explore project
          </button>
        </Reveal>
      </div>
      <motion.button
        type="button"
        className={cn(
          "group relative aspect-16/10 overflow-hidden border border-border lg:sticky lg:top-28 lg:aspect-[16/10]",
          reverse && "lg:order-1",
        )}
        onClick={() => onOpen(project)}
        data-cursor="VIEW"
      >
        <motion.div
          className="absolute inset-0"
          style={reduce ? undefined : { scale: imageScale }}
        >
          <ProjectCover
            project={project}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
        <span className="magazine-scan pointer-events-none absolute inset-0 z-[2]" />
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-3 z-[3] border border-foreground/25"
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        />
        <span className="magazine-crop magazine-crop-tl left-3 top-3 z-[4] hidden lg:block" />
        <span className="magazine-crop magazine-crop-tr right-3 top-3 z-[4] hidden lg:block" />
        <span className="magazine-crop magazine-crop-bl bottom-3 left-3 z-[4] hidden lg:block" />
        <span className="magazine-crop magazine-crop-br bottom-3 right-3 z-[4] hidden lg:block" />
      </motion.button>
      <p className="sr-only">
        {project.overview} Problem: {project.problem} Solution:{" "}
        {project.solution}
      </p>
    </article>
  );
}

export function SelectedWork({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="magazine-spread py-16 sm:py-20">
      <Container>
        <Reveal className="mb-4 flex flex-wrap items-end justify-between gap-4" variant="folio">
          <div>
            <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              The work
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              Systems that had to ship
            </h2>
            <p className="mt-3 max-w-lg text-muted">
              National Geographic, Disney Experiences, Disney Institute, and
              live product delivery.
            </p>
          </div>
          <Link
            href="/projects/"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-foreground"
            data-cursor="→"
          >
            All work
          </Link>
        </Reveal>
        <SpreadRule className="mb-2" />

        <div>
          {projects.map((project, index) => (
            <WorkSpread
              key={project.slug}
              project={project}
              index={index}
              onOpen={setActive}
            />
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
