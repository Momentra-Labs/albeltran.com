import { techGroups } from "@/content/person";
import { cn } from "@/lib/utils";

export function TechStack({ className }: { className?: string }) {
  return (
    <ul
      className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {techGroups.map((group) => (
        <li key={group.title} className="border border-border p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            {group.title}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="border border-border px-2.5 py-1.5 text-sm leading-none text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
