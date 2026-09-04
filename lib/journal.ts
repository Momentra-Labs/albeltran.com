import {
  JOURNAL_CATALOG,
  articleHref,
  getCatalogByTopic,
  getCatalogEntry,
  isInterviewSlug,
} from "@/content/journal";
import { getJournalTopic, type JournalTopicId } from "@/content/journal/topics";
import { getAllPosts, getPostBySlug, getRelatedPosts, type BlogPost } from "@/lib/mdx";

export const LEGACY_PILLARS: Record<string, JournalTopicId> = {
  "event-driven-loyalty": "system-design",
  "ai-augmented-engineering": "engineering-notes",
  "aem-reusable-components": "aem",
  "performance-15s-to-2s": "nodejs-backend",
  "serverless-etl-lessons": "aws-cloud",
  "chip-vendor-model-hub": "engineering-notes",
  "agents-need-monitoring-layers": "engineering-notes",
  "sqlite-at-the-edge": "databases",
  "rag-demos-die-in-production": "engineering-notes",
  "idempotency-keys-are-the-contract": "system-design",
  "post-quantum-tls-is-an-ops-problem": "aws-cloud",
  "platform-engineering-is-not-a-portal": "engineering-notes",
  "serverless-still-has-a-latency-budget": "aws-cloud",
  "observability-without-slos": "system-design",
  "typescript-won-the-integration-layer": "typescript-javascript",
  "css-caught-up-to-layout": "react",
  "feature-flags-beat-long-lived-branches": "system-design",
  "supply-chain-security-is-runtime": "aws-cloud",
  "spa-hangover-and-server-components": "react",
  "local-first-sync-is-a-product-problem": "system-design",
  "sql-still-compounds": "databases",
  "rate-limits-are-product-design": "system-design",
  "wasm-on-the-server": "nodejs-backend",
  "event-sourcing-without-religion": "system-design",
  "webgpu-browser-as-compute": "react",
};

export { articleHref, isInterviewSlug };

export function publishedArticleSlugs() {
  const fromCatalog = JOURNAL_CATALOG.filter(
    (entry) => entry.status === "published",
  ).map((entry) => entry.slug);
  const fromPosts = getAllPosts().map((post) => post.slug);
  return [...new Set([...fromCatalog, ...fromPosts])];
}

export function getArticleTopicId(slug: string): JournalTopicId | undefined {
  return getCatalogEntry(slug)?.category ?? LEGACY_PILLARS[slug];
}

export function listPublishedForTopic(topicId: JournalTopicId): BlogPost[] {
  return getAllPosts().filter((post) => getArticleTopicId(post.slug) === topicId);
}

export function listPlannedForTopic(topicId: JournalTopicId) {
  return getCatalogByTopic(topicId).filter((entry) => entry.status === "planned");
}

export function listPublishedInterviews(): BlogPost[] {
  return getAllPosts().filter((post) => isInterviewSlug(post.slug));
}

export function relatedEntries(slug: string, limit = 4) {
  const entry = getCatalogEntry(slug);
  const relatedSlugs = entry?.relatedArticles ?? [];
  const posts = getAllPosts();
  const fromCatalog = relatedSlugs
    .map((related) => {
      const live = posts.find((post) => post.slug === related);
      const planned = getCatalogEntry(related);
      if (live) {
        return {
          slug: live.slug,
          title: live.title,
          description: live.description,
          href: articleHref(live.slug),
          status: "published" as const,
        };
      }
      if (planned) {
        return {
          slug: planned.slug,
          title: planned.title,
          description: planned.description,
          href: planned.status === "published" ? articleHref(planned.slug) : undefined,
          status: planned.status,
        };
      }
      return null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .slice(0, limit);

  if (fromCatalog.length >= limit) return fromCatalog;

  const topicId = getArticleTopicId(slug);
  const extras = topicId
    ? listPublishedForTopic(topicId)
        .filter((post) => post.slug !== slug)
        .filter((post) => !relatedSlugs.includes(post.slug))
        .slice(0, limit - fromCatalog.length)
        .map((post) => ({
          slug: post.slug,
          title: post.title,
          description: post.description,
          href: articleHref(post.slug),
          status: "published" as const,
        }))
    : [];

  const combined = [...fromCatalog, ...extras];
  if (combined.length >= limit) return combined;

  const fallback = getRelatedPosts(slug, limit)
    .filter((post) => post.slug !== slug)
    .filter((post) => !combined.some((item) => item?.slug === post.slug))
    .slice(0, limit - combined.length)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      href: articleHref(post.slug),
      status: "published" as const,
    }));

  return [...combined, ...fallback];
}

export function adjacentInTopic(slug: string) {
  const topicId = getArticleTopicId(slug);
  if (!topicId) return { previous: undefined, next: undefined };
  const posts = listPublishedForTopic(topicId);
  const index = posts.findIndex((post) => post.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: posts[index + 1],
    next: posts[index - 1],
  };
}

export function listPublishedNotes(): BlogPost[] {
  return getAllPosts().filter((post) => !isInterviewSlug(post.slug));
}

export function getLivePost(slug: string) {
  try {
    const post = getPostBySlug(slug);
    if (post.draft) return null;
    return post;
  } catch {
    return null;
  }
}

export function journalNav() {
  return [
    { href: "/blog/", label: "Journal" },
    { href: "/topics/", label: "Topics" },
    { href: "/interviews/", label: "Interview Lab" },
    { href: "/author/al-beltran/", label: "Author" },
  ] as const;
}

export { getJournalTopic, getCatalogEntry, JOURNAL_CATALOG };
