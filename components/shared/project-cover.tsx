"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

function isLoadableShot(src?: string) {
  if (!src) return false;
  return !/placeholder/i.test(src);
}

function CoverFallback({
  project,
  label,
}: {
  project: Project;
  label: string;
}) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-surface-2"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(79,142,255,0.16),transparent_52%),radial-gradient(ellipse_at_100%_90%,rgba(240,240,245,0.05),transparent_48%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(240,240,245,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(240,240,245,0.16)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute inset-3 border border-border" />
      <span className="magazine-crop magazine-crop-tl left-3 top-3" />
      <span className="magazine-crop magazine-crop-tr right-3 top-3" />
      <span className="magazine-crop magazine-crop-bl bottom-3 left-3" />
      <span className="magazine-crop magazine-crop-br bottom-3 right-3" />
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            {project.kind === "lab" ? "Lab" : "Selected"}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
            {project.year}
          </p>
        </div>
        <div>
          <p className="font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[0.9] tracking-tight text-foreground">
            {project.shortName}
          </p>
          <p className="mt-2 max-w-[22ch] font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProjectCover({
  project,
  shot,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  project: Project;
  shot?: { src: string; alt: string };
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const cover = shot ?? project.screenshots[0];
  const src = cover?.src;
  const alt = cover?.alt ?? `${project.name} cover`;
  const canLoad = isLoadableShot(src);
  const [status, setStatus] = useState<"pending" | "ready" | "missing">(
    canLoad ? "pending" : "missing",
  );
  const showPhoto = canLoad && status !== "missing";

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("relative isolate h-full w-full overflow-hidden bg-surface-2", className)}
    >
      <CoverFallback
        project={project}
        label={project.kind === "lab" ? "Momentra Labs" : "Case study"}
      />
      {showPhoto ? (
        <Image
          src={src!}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          onLoad={(event) => {
            setStatus(event.currentTarget.naturalWidth > 0 ? "ready" : "missing");
          }}
          onError={() => setStatus("missing")}
          className={cn(
            "object-cover transition-[opacity,transform] duration-700 group-hover:scale-105",
            status === "ready" ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}
    </div>
  );
}
