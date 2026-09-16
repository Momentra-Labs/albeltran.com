"use client";

import type { Project } from "@/content/projects";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";

const STORY_FIELDS = [
  { key: "constraints", label: "The constraints" },
  { key: "hardPart", label: "The hard part" },
  { key: "tradeoff", label: "The trade-off" },
  { key: "whatBroke", label: "What broke" },
  { key: "whatChanged", label: "What changed" },
  { key: "differently", label: "What I would do differently" },
] as const;

export function ProjectStory({ project }: { project: Project }) {
  const story = project.story;
  const entries = STORY_FIELDS.filter((field) => story?.[field.key]);

  if (entries.length === 0 && !project.diagram?.length) return null;

  return (
    <section className="space-y-8">
      {entries.length > 0 ? (
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            The story
          </h2>
          <dl className="mt-6 grid gap-6">
            {entries.map((field) => (
              <div key={field.key}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {field.label}
                </dt>
                <dd className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {story?.[field.key]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
      {project.diagram && project.diagram.length > 0 ? (
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Diagram
          </h2>
          <ArchitectureDiagram nodes={project.diagram} />
        </div>
      ) : null}
    </section>
  );
}
