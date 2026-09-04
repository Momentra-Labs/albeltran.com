import type { JournalEntry } from "@/content/journal/types";

export function PlannedQueue({
  entries,
  title = "Review queue",
}: {
  entries: JournalEntry[];
  title?: string;
}) {
  if (entries.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-10">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Planned notes stay unpublished until they are written and reviewed.
        Titles are listed so the topic map is complete. They are not pages.
      </p>
      <ol className="mt-6 space-y-3">
        {entries.map((entry) => (
          <li key={entry.slug} className="border-b border-border/70 pb-3">
            <p className="text-foreground">{entry.title}</p>
            <p className="mt-1 text-sm text-muted">{entry.description}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dim">
              {entry.targetIntent} · {entry.difficulty} · {entry.priority} priority
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
