import { react, typescriptJavascript } from "@/content/journal/catalog";
import { javaSpring, nodejsBackend } from "@/content/journal/catalog-backend";
import { awsCloud, databases, phpLaravel } from "@/content/journal/catalog-data-cloud";
import { aem, engineeringNotes, systemDesign } from "@/content/journal/catalog-design";
import type { JournalEntry } from "@/content/journal/types";
import { JOURNAL_TOPICS, type JournalTopicId } from "@/content/journal/topics";

export const JOURNAL_CATALOG: JournalEntry[] = [
  ...react,
  ...typescriptJavascript,
  ...nodejsBackend,
  ...javaSpring,
  ...phpLaravel,
  ...databases,
  ...awsCloud,
  ...aem,
  ...systemDesign,
  ...engineeringNotes,
];

const slugs = JOURNAL_CATALOG.map((entry) => entry.slug);
const unique = new Set(slugs);

if (JOURNAL_CATALOG.length !== 200) {
  throw new Error(
    `JOURNAL_CATALOG must contain 200 entries, got ${JOURNAL_CATALOG.length}`,
  );
}

if (unique.size !== JOURNAL_CATALOG.length) {
  const dupes = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  throw new Error(`Duplicate journal slugs: ${[...new Set(dupes)].join(", ")}`);
}

export function getCatalogEntry(slug: string) {
  return JOURNAL_CATALOG.find((entry) => entry.slug === slug);
}

export function getCatalogByTopic(topicId: JournalTopicId) {
  return JOURNAL_CATALOG.filter((entry) => entry.category === topicId);
}

export function getPublishedCatalog() {
  return JOURNAL_CATALOG.filter((entry) => entry.status === "published");
}

export function getPlannedCatalog() {
  return JOURNAL_CATALOG.filter((entry) => entry.status === "planned");
}

export function catalogCounts() {
  return JOURNAL_TOPICS.map((topic) => ({
    topic,
    total: getCatalogByTopic(topic.id).length,
    published: getCatalogByTopic(topic.id).filter(
      (entry) => entry.status === "published",
    ).length,
    planned: getCatalogByTopic(topic.id).filter(
      (entry) => entry.status === "planned",
    ).length,
  }));
}

export function isInterviewSlug(slug: string) {
  return getCatalogEntry(slug)?.section === "interview";
}

export function articleHref(slug: string) {
  if (isInterviewSlug(slug)) return `/interviews/${slug}/`;
  return `/blog/${slug}/`;
}

export function topicPath(id: JournalTopicId) {
  return `/topics/${id}/`;
}
