import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { BlogPostList } from "@/components/blog/blog-post-list";
import { JsonLd } from "@/components/shared/json-ld";
import { JournalNav } from "@/components/journal/journal-nav";
import { PlannedQueue } from "@/components/journal/planned-queue";
import {
  JOURNAL_TOPIC_IDS,
  getJournalTopic,
} from "@/content/journal/topics";
import { topicPath } from "@/content/journal";
import {
  listPlannedForTopic,
  listPublishedForTopic,
} from "@/lib/journal";
import { person } from "@/content/person";
import {
  blogItemListSchema,
  breadcrumbSchema,
  collectionPageSchema,
  graphSchema,
  personSchema,
  websiteSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return JOURNAL_TOPIC_IDS.map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: Props) {
  const { topic: id } = await params;
  const topic = getJournalTopic(id);
  if (!topic) return {};
  return buildMetadata({
    title: `${topic.label} notes`,
    description: `${topic.description} Written by ${person.shortName}.`,
    path: topicPath(topic.id),
  });
}

export default async function TopicPage({ params }: Props) {
  const { topic: id } = await params;
  const topic = getJournalTopic(id);
  if (!topic) notFound();

  const published = listPublishedForTopic(topic.id);
  const planned = listPlannedForTopic(topic.id);
  const path = topicPath(topic.id);

  const schema = graphSchema([
    websiteSchema(),
    personSchema(),
    collectionPageSchema({
      path,
      name: `${topic.label} · ${person.shortName}`,
      description: topic.description,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Topics", path: "/topics/" },
      { name: topic.label, path },
    ]),
    blogItemListSchema(published, {
      path,
      name: `${topic.label} articles by Al Beltran`,
    }),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label={topic.sectionLabel}
        title={topic.label}
        description={topic.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Topics", href: "/topics/" },
          { name: topic.label },
        ]}
      />
      <Container className="py-16">
        <div className="mb-10">
          <JournalNav current="/topics/" />
        </div>
        <p className="mb-8 text-sm text-muted">
          {topic.technologies.join(" · ")} · {published.length} published ·{" "}
          {planned.length} in the review queue.{" "}
          <Link href="/author/al-beltran/" className="text-accent hover:underline">
            Written by {person.shortName}
          </Link>
          .
        </p>
        <BlogPostList
          posts={published}
          emptyMessage="No reviewed articles in this pillar yet. The queue below is the plan."
        />
        <PlannedQueue entries={planned} />
      </Container>
    </>
  );
}
