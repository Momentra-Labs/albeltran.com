import { type Project, projectStatusLabel } from "@/content/projects";

export function ProjectStatusBadge({ project }: { project: Project }) {
  const label = projectStatusLabel(project);
  if (!label) return null;

  return (
    <span className="pointer-events-none absolute right-4 top-4 z-[5] inline-flex items-center gap-1.5 border border-border bg-background/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground backdrop-blur-[2px]">
      {label === "Live" ? (
        <span className="magazine-live-dot" aria-hidden />
      ) : (
        <span className="magazine-wip-dash" aria-hidden />
      )}
      {label}
    </span>
  );
}
