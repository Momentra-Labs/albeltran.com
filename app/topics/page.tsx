import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { JournalNav } from "@/components/journal/journal-nav";
import { TopicMap } from "@/components/journal/topic-map";
import { JOURNAL_TOPICS } from "@/content/journal/topics";
import { catalogCounts, topicPath } from "@/content/journal";
import { person } from "@/content/person";
import {
  breadcrumbSchema,
  collectionPageSchema,
  graphSchema,
  personSchema,
  websiteSchema,
} from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Engineering Topics",
  description: `Topic map for Al Beltran's engineering journal: React, TypeScript, Node.js, Java, Laravel, SQL, AWS, AEM, and system design. 200 planned notes; only reviewed articles are published.`,
  path: "/topics/",
});

export default function TopicsPage() {
  const counts = catalogCounts();

  const schema = graphSchema([
    websiteSchema(),
    personSchema(),
    collectionPageSchema({
      path: "/topics/",
      name: `Engineering topics · ${person.shortName}`,
      description: "Pillars and planned articles in the engineering journal.",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Topics", path: "/topics/" },
    ]),
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/topics/#pillars`,
      name: "Engineering journal pillars",
      numberOfItems: JOURNAL_TOPICS.length,
      itemListElement: JOURNAL_TOPICS.map((topic, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: topic.label,
        url: `${SITE_URL}${topicPath(topic.id)}`,
        description: topic.description,
      })),
    },
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Topics"
        title="A map of the journal, not a pile of keywords"
        description="Ten pillars. Two hundred planned articles. Only reviewed writing is a page. Everything else stays in the queue so the architecture is visible without publishing empty posts."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Topics" },
        ]}
      />
      <Container className="py-16">
        <div className="mb-10">
          <JournalNav current="/topics/" />
        </div>
        <ol className="mb-16 grid gap-6 md:grid-cols-2">
          {counts.map(({ topic, total, published, planned }) => (
            <li key={topic.id} className="border border-border bg-surface/40 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {topic.sectionLabel}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-foreground">
                <Link href={topicPath(topic.id)} className="hover:text-accent">
                  {topic.label}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {topic.description}
              </p>
              <p className="mt-4 font-mono text-[11px] text-muted-dim">
                {published} published · {planned} planned · {total} in the map
              </p>
              <p className="mt-3 text-xs text-muted-dim">
                {topic.technologies.join(" · ")}
              </p>
            </li>
          ))}
        </ol>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-foreground">
          Content map
        </h2>
        <TopicMap />
      </Container>
    </>
  );
}
