import Link from "next/link";
import { journalNav } from "@/lib/journal";

export function JournalNav({ current }: { current?: string }) {
  return (
    <nav aria-label="Engineering journal" className="flex flex-wrap gap-x-5 gap-y-2">
      {journalNav().map((item) => {
        const active = current === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            data-cursor="→"
            className={
              active
                ? "font-mono text-[11px] uppercase tracking-[0.16em] text-foreground"
                : "font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-foreground"
            }
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
