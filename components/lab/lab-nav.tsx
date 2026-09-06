import Link from "next/link";
import { LAB_EXPERIENCES } from "@/content/lab/experiences";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/lab/", label: "Home" },
  ...LAB_EXPERIENCES.map((item) => ({ href: item.href, label: item.title })),
];

export function LabNav({ current }: { current?: string }) {
  return (
    <div className="mb-8 flex flex-col gap-3 border-b border-border pb-4">
      <nav aria-label="Engineering Lab" className="flex flex-wrap gap-x-5 gap-y-2">
        {LINKS.map((item) => {
          const active = current === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-cursor="→"
              className={cn(
                "font-mono text-[11px] uppercase tracking-[0.16em]",
                active ? "text-foreground" : "text-muted hover:text-foreground",
              )}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-dim">
        Al Beltran Engineering Lab
      </p>
    </div>
  );
}
