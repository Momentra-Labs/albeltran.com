"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";

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
    <section id="lab" className="border-y border-border py-24">
      <Container>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Engineering Lab
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Personal products from Momentra Labs
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          I develop RentaraH, Gloves Up, PocketPOS, and QuickCart as founder of
          Momentra Labs — independent products I own end to end.
        </p>
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
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {visible.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}/`}
              data-cursor="VIEW"
              className="group grid overflow-hidden border border-border transition-colors hover:border-border-bright"
            >
              <div className="relative aspect-16/10">
                <Image
                  src={project.screenshots[0]?.src ?? "/og/default.jpg"}
                  alt={project.screenshots[0]?.alt ?? project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-dim">
                  {project.year}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">
                  {project.name}
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
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
