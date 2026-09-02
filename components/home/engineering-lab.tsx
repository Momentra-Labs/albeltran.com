"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { Container } from "@/components/shared/container";
import { ProjectCover } from "@/components/shared/project-cover";
import { Badge } from "@/components/ui/badge";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";
import { ProjectCtas } from "@/components/projects/project-ctas";

export function EngineeringLab({ projects }: { projects: Project[] }) {
  const tags = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.labTags ?? []))),
    [projects],
  );
  const [tag, setTag] = useState<string | null>(null);
  const visible =
    tag === null
      ? projects
      : projects.filter((project) => project.labTags?.includes(tag));
  const showFilters = projects.length >= 2 && tags.length >= 2;

  return (
    <section id="lab" className="magazine-spread py-16 sm:py-20">
      <Container>
        <Reveal variant="folio">
          <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Engineering Lab
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Personal products from Momentra Labs
          </h2>
        </Reveal>
        <Reveal variant="ink" delay={0.08}>
          <p className="mt-4 max-w-2xl text-muted">
            I solo develop RentaraH, Lumina, Gloves Up, PocketPOS, and QuickCart
            as founder of Momentra Labs — independent products I own end to end.
            Try{" "}
            <a
              href="https://rentahub2026.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              RentaraH live
            </a>
            ,{" "}
            <a
              href="https://lumina-momentra-labs.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Lumina live
            </a>
            , or download the Gloves Up Android APK from the card below.
          </p>
        </Reveal>
        <SpreadRule className="mt-8" />
        {showFilters ? (
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              type="button"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-foreground"
              onClick={() => setTag(null)}
            >
              All
            </button>
            {tags.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTag(tag === item ? null : item)}
              >
                <Badge variant={tag === item ? "accent" : "default"}>{item}</Badge>
              </button>
            ))}
          </div>
        ) : null}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {visible.map((project, index) => (
            <RevealItem key={project.slug} index={index}>
              <article className="magazine-plate group grid overflow-hidden border border-border transition-colors hover:border-border-bright">
                <Link
                  href={`/projects/${project.slug}/`}
                  data-cursor="VIEW"
                  className="contents"
                >
                  <div className="magazine-scan relative aspect-16/10">
                    <ProjectCover
                      project={project}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {project.demo ? (
                      <span className="absolute left-3 top-3 z-[5] inline-flex items-center gap-2 border border-border bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground backdrop-blur-[2px]">
                        <span className="magazine-live-dot" aria-hidden />
                        Live
                      </span>
                    ) : null}
                    <span className="pointer-events-none absolute inset-3 z-[3] border border-foreground/0 transition-colors duration-500 group-hover:border-foreground/25" />
                  </div>
                </Link>
                <div className="p-6 sm:p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-dim">
                    {project.year}
                  </p>
                  <h3 className="mt-2 font-display text-2xl tracking-tight text-foreground">
                    <Link
                      href={`/projects/${project.slug}/`}
                      data-cursor="VIEW"
                      className="hover:text-accent"
                    >
                      {project.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {project.tagline}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(project.labTags ?? []).map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                  <ProjectCtas project={project} className="mt-5" />
                </div>
              </article>
            </RevealItem>
          ))}
        </div>
      </Container>
    </section>
  );
}
