"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type ArchitectureNode = {
  id: string;
  label: string;
  purpose: string;
  tradeoff: string;
  scale: string;
};

export function ArchitectureDiagram({
  nodes,
  caption = "Sanitized architecture. Hover is optional — tap or focus a box.",
}: {
  nodes: ArchitectureNode[];
  caption?: string;
}) {
  const labelId = useId();
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? "");
  const active = nodes.find((node) => node.id === activeId) ?? nodes[0];

  if (nodes.length === 0 || !active) return null;

  return (
    <figure className="mt-6 w-full min-w-0 border border-border">
      <p id={labelId} className="border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-dim">
        {caption}
      </p>
      <div
        className="flex w-full min-w-0 flex-col gap-0 p-4 md:flex-row md:flex-wrap md:items-stretch md:justify-center"
        role="list"
        aria-labelledby={labelId}
      >
        {nodes.map((node, index) => {
          const selected = node.id === active.id;
          return (
            <div key={node.id} className="flex min-w-0 flex-col md:flex-row md:items-center" role="listitem">
              {index > 0 ? (
                <span
                  className="mx-auto h-4 w-px bg-border md:mx-0 md:h-px md:w-6"
                  aria-hidden
                />
              ) : null}
              <button
                type="button"
                onClick={() => setActiveId(node.id)}
                onFocus={() => setActiveId(node.id)}
                aria-pressed={selected}
                aria-describedby={`${labelId}-detail`}
                className={cn(
                  "min-h-11 w-full border px-3 py-2 text-left font-mono text-[11px] uppercase tracking-[0.14em] md:w-auto md:min-w-[9.5rem]",
                  selected
                    ? "border-accent text-foreground"
                    : "border-border text-muted hover:border-border-bright hover:text-foreground",
                )}
              >
                {node.label}
              </button>
            </div>
          );
        })}
      </div>
      <figcaption
        id={`${labelId}-detail`}
        className="border-t border-border px-4 py-4"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          {active.label}
        </p>
        <dl className="mt-3 grid gap-3 text-sm leading-relaxed text-muted">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
              Purpose
            </dt>
            <dd className="mt-1 text-foreground">{active.purpose}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
              Trade-off
            </dt>
            <dd className="mt-1">{active.tradeoff}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
              Scale
            </dt>
            <dd className="mt-1">{active.scale}</dd>
          </div>
        </dl>
      </figcaption>
    </figure>
  );
}
