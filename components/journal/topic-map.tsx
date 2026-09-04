import Link from "next/link";
import { JOURNAL_CATALOG, articleHref, topicPath } from "@/content/journal";
import { JOURNAL_TOPICS } from "@/content/journal/topics";

export function TopicMap() {
  return (
    <div className="space-y-12">
      {JOURNAL_TOPICS.map((topic) => {
        const entries = JOURNAL_CATALOG.filter(
          (entry) => entry.category === topic.id,
        );
        return (
          <section key={topic.id} id={topic.id}>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {topic.sectionLabel}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                  <Link href={topicPath(topic.id)} className="hover:text-accent">
                    {topic.label}
                  </Link>
                </h2>
              </div>
              <p className="font-mono text-[11px] text-muted-dim">
                {entries.length} planned ·{" "}
                {entries.filter((entry) => entry.status === "published").length}{" "}
                published
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <caption className="sr-only">
                  Content map for {topic.label}
                </caption>
                <thead className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dim">
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 font-medium">Article</th>
                    <th className="py-2 pr-4 font-medium">Intent</th>
                    <th className="py-2 pr-4 font-medium">Difficulty</th>
                    <th className="py-2 font-medium">Related</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.slug} className="border-b border-border/70">
                      <td className="py-3 pr-4 align-top">
                        {entry.status === "published" ? (
                          <Link
                            href={articleHref(entry.slug)}
                            className="text-foreground hover:text-accent"
                          >
                            {entry.title}
                          </Link>
                        ) : (
                          <span className="text-foreground">{entry.title}</span>
                        )}
                        <p className="mt-1 text-xs text-muted-dim">
                          {entry.status}
                          {entry.section === "interview" ? " · interview" : ""}
                        </p>
                      </td>
                      <td className="py-3 pr-4 align-top text-muted">
                        {entry.targetIntent}
                      </td>
                      <td className="py-3 pr-4 align-top text-muted">
                        {entry.difficulty}
                      </td>
                      <td className="py-3 align-top text-muted-dim">
                        {entry.relatedArticles.slice(0, 3).join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}
