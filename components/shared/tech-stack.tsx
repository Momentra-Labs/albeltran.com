import { techGroups } from "@/content/person";
import { TechIcon } from "@/components/icons/tech-icons";
import { cn } from "@/lib/utils";

function TechChip({ item }: { item: string }) {
  return (
    <span tabIndex={0} title={item} className="stack-chip">
      <TechIcon name={item} />
      {item}
    </span>
  );
}

export function TechStack({ className }: { className?: string }) {
  return (
    <ul
      className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {techGroups.map((group) => (
        <li key={group.title} className="border border-border bg-surface/40 p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            {group.title}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li key={item}>
                <TechChip item={item} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
