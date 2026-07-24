import Link from "next/link";
import type { ExperienceItem } from "@/content/experience";
import { Badge } from "@/components/ui/badge";

export function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="relative space-y-0 border-l border-border pl-6 sm:pl-8">
      {items.map((item) => (
        <li key={item.id} className="relative pb-12 last:pb-0">
          <span className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background sm:-left-[2.15rem]" />
          <div className="grid gap-4 lg:grid-cols-[200px_1fr]">
            <div>
              <p className="font-mono text-xs text-accent">{item.duration}</p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {item.company}
              </p>
              <p className="text-sm text-muted">{item.role}</p>
            </div>
            <div className="space-y-5">
              <p className="text-base leading-relaxed text-muted">{item.summary}</p>

              <div>
                <h3 className="mb-2 text-sm font-medium text-foreground">
                  Responsibilities
                </h3>
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted">
                  {item.responsibilities.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-foreground">
                  Achievements
                </h3>
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted">
                  {item.achievements.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-foreground">
                  Business impact
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {item.businessImpact}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>

              {item.relatedProjects && item.relatedProjects.length > 0 && (
                <p className="text-sm text-muted">
                  Related:{" "}
                  {item.relatedProjects.map((slug, index) => (
                    <span key={slug}>
                      {index > 0 && ", "}
                      <Link
                        href={`/projects/${slug}/`}
                        className="text-accent underline-offset-3 hover:underline"
                      >
                        {slug}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
