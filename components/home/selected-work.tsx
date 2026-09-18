"use client";

import { useState } from "react";
import Link from "next/link";
import { type Project, projectFolio } from "@/content/projects";
import { Container } from "@/components/shared/container";
import { DeviceCluster, clusterVariantFor } from "@/components/projects/device-cluster";
import { ProjectDrawer } from "@/components/projects/project-drawer";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";

export function SelectedWork({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="magazine-spread scroll-mt-24 py-10 sm:py-12">
      <Container>
        <Reveal
          className="mb-4 flex flex-wrap items-end justify-between gap-4"
          variant="folio"
        >
          <div>
            <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              The work
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
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
        <SpreadRule className="mb-6" />
        <ol className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, index) => {
            const folio = projectFolio(project);
            return (
              <li key={project.slug}>
                <RevealItem index={index}>
                  <button
                    type="button"
                    data-cursor="VIEW"
                    className="group w-full overflow-hidden border border-border text-left transition-colors hover:border-border-bright"
                    onClick={() => setActive(project)}
                  >
                    <div className="magazine-scan relative">
                      <DeviceCluster
                        project={project}
                        variant={clusterVariantFor(project, "card")}
                        priority={index === 0}
                      />
                      <span className="absolute left-4 top-4 z-[5] font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
                        {folio}
                      </span>
                      {project.demo ? (
                        <span className="absolute right-4 top-4 z-[5] inline-flex items-center gap-1.5 border border-border bg-background/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground backdrop-blur-[2px]">
                          <span className="magazine-live-dot" aria-hidden />
                          Live
                        </span>
                      ) : null}
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="font-display text-2xl tracking-tight text-foreground group-hover:text-accent">
                        {project.name}
                      </h3>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted [overflow-wrap:anywhere]">
                        {project.year} · {project.role}
                      </p>
                    </div>
                    <p className="sr-only">{project.overview}</p>
                  </button>
                </RevealItem>
              </li>
            );
          })}
        </ol>
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
