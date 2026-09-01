import { Download, ExternalLink } from "lucide-react";
import type { Project } from "@/content/projects";
import { Button } from "@/components/ui/button";

export function ProjectCtas({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  if (!project.demo && !project.apk) return null;

  return (
    <div className={`relative z-10 flex flex-wrap gap-3 ${className}`}>
      {project.demo ? (
        <Button asChild size="sm">
          <a href={project.demo} target="_blank" rel="noopener noreferrer">
            Open live site <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      ) : null}
      {project.apk ? (
        <Button asChild size="sm" variant="hairline">
          <a href={project.apk} download>
            Download APK <Download className="h-3.5 w-3.5" />
          </a>
        </Button>
      ) : null}
    </div>
  );
}
