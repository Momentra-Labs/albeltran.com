import Link from "next/link";
import { LAB_EXPERIENCES } from "@/content/lab/experiences";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/lab/", label: "Home" },
  ...LAB_EXPERIENCES.map((item) => ({ href: item.href, label: item.title })),
];

export function LabNav({ current }: { current?: string }) {
  return (
    <div className="mb-8 flex min-w-0 flex-col gap-3 border-b border-border pb-4">
      <nav
        aria-label="Engineering Lab"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:thin] md:mx-0 md:flex-wrap md:gap-x-5 md:gap-y-2 md:overflow-visible md:px-0 md:pb-0"
      >
        {LINKS.map((item) => {
          const active = current === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-cursor="→"
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center whitespace-nowrap border border-border px-3 font-mono text-[11px] uppercase tracking-[0.14em] md:min-h-0 md:border-0 md:px-0 md:tracking-[0.16em]",
                active
                  ? "border-accent text-foreground"
                  : "text-muted hover:text-foreground md:border-transparent",
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
