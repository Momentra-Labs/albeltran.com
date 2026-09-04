import type { JournalEntry } from "@/content/journal/types";
import type {
  ArticleDifficulty,
  ArticlePriority,
  ArticleSection,
  ArticleStatus,
  JournalTopicId,
  SearchIntent,
} from "@/content/journal/topics";

type Draft = {
  slug: string;
  title: string;
  subcategory: string;
  description: string;
  targetIntent: SearchIntent;
  difficulty?: ArticleDifficulty;
  technologies: string[];
  tags: string[];
  relatedArticles: string[];
  status?: ArticleStatus;
  priority?: ArticlePriority;
  section?: ArticleSection;
};

function entries(category: JournalTopicId, items: Draft[]): JournalEntry[] {
  return items.map((item) => ({
    id: item.slug,
    slug: item.slug,
    title: item.title,
    category,
    subcategory: item.subcategory,
    description: item.description,
    targetIntent: item.targetIntent,
    difficulty: item.difficulty ?? "intermediate",
    technologies: item.technologies,
    tags: item.tags,
    relatedArticles: item.relatedArticles,
    status: item.status ?? "planned",
    priority: item.priority ?? "medium",
    section: item.section ?? "notes",
  }));
}

export const aem = entries("aem", [
  {
    slug: "aem-interview-questions",
    title: "AEM Interview Questions, With the Reasoning",
    subcategory: "Interview Lab",
    description:
      "Author vs publish, components, dispatcher, and the questions that test whether you have shipped an enterprise CMS.",
    targetIntent: "interview",
    difficulty: "mixed",
    technologies: ["Adobe Experience Manager"],
    tags: ["aem", "interviews"],
    relatedArticles: ["aem-author-developer-contract", "aem-dispatcher-caching"],
    priority: "high",
    section: "interview",
  },
  {
    slug: "aem-author-developer-contract",
    title: "The AEM Author–Developer Contract",
    subcategory: "Authoring",
    description:
      "A component is successful when an author can use it without a Slack thread. Dialogs, names, and defaults are the product.",
    targetIntent: "architecture",
    technologies: ["Adobe Experience Manager"],
    tags: ["aem", "authoring"],
    relatedArticles: [
      "aem-interview-questions",
      "aem-touch-ui-dialogs",
      "aem-reusable-components",
    ],
    status: "published",
    priority: "high",
  },
  {
    slug: "aem-sling-models-without-magic",
    title: "Sling Models Without Hiding the Resource",
    subcategory: "Development",
    description:
      "Inject what you need. Do not turn a model into a god object that queries the world.",
    targetIntent: "educational",
    technologies: ["Adobe Experience Manager", "Java"],
    tags: ["aem", "sling"],
    relatedArticles: ["aem-author-developer-contract", "aem-component-versioning"],
  },
  {
    slug: "aem-editable-templates",
    title: "Editable Templates: Policy vs Author Chaos",
    subcategory: "Templates",
    description:
      "What authors may drop, what is locked, and the template that became a junk drawer.",
    targetIntent: "architecture",
    technologies: ["Adobe Experience Manager"],
    tags: ["aem"],
    relatedArticles: ["aem-author-developer-contract", "aem-multisite-msm"],
  },
  {
    slug: "aem-clientlibs-performance",
    title: "AEM Clientlibs and the Weight Authors Never See",
    subcategory: "Performance",
    description:
      "Categories, embed vs depend, and the CSS that shipped on every page.",
    targetIntent: "problem-solving",
    technologies: ["Adobe Experience Manager"],
    tags: ["aem", "performance"],
    relatedArticles: ["aem-dispatcher-caching", "react-bundle-size-and-code-splitting"],
  },
  {
    slug: "aem-dispatcher-caching",
    title: "Dispatcher Caching: The Layer That Makes or Breaks AEM",
    subcategory: "Operations",
    description:
      "Cache rules, invalidation, and the query string that quietly disabled the cache.",
    targetIntent: "troubleshooting",
    difficulty: "senior",
    technologies: ["Adobe Experience Manager"],
    tags: ["aem", "dispatcher"],
    relatedArticles: ["aem-interview-questions", "caching-where-it-belongs"],
  },
  {
    slug: "aem-content-fragments-vs-pages",
    title: "Content Fragments vs Pages",
    subcategory: "Content",
    description:
      "Channel-neutral content vs a page that is already a layout. Pick based on reuse, not fashion.",
    targetIntent: "comparison",
    technologies: ["Adobe Experience Manager"],
    tags: ["aem"],
    relatedArticles: ["aem-author-developer-contract", "aem-asset-renditions"],
  },
  {
    slug: "aem-osgi-configs",
    title: "OSGi Configs: Environment Differences Without Mystery",
    subcategory: "Config",
    description:
      "What is config vs content, and the runmode that silently used author values on publish.",
    targetIntent: "troubleshooting",
    technologies: ["Adobe Experience Manager"],
    tags: ["aem"],
    relatedArticles: ["spring-profiles-and-config", "aem-author-publish-topology"],
  },
  {
    slug: "aem-workflows-when-not",
    title: "AEM Workflows: When Not to Automate a Human Step",
    subcategory: "Workflows",
    description:
      "Approvals that stall, payloads that fail, and the launcher that fired twice.",
    targetIntent: "comparison",
    technologies: ["Adobe Experience Manager"],
    tags: ["aem"],
    relatedArticles: ["aem-interview-questions", "aem-author-developer-contract"],
  },
  {
    slug: "aem-multisite-msm",
    title: "MSM and Multi-Site: Inheritance That Authors Understand",
    subcategory: "Multi-site",
    description:
      "Live copy vs launch, rollout, and the locale that forked forever.",
    targetIntent: "architecture",
    difficulty: "senior",
    technologies: ["Adobe Experience Manager"],
    tags: ["aem"],
    relatedArticles: ["aem-editable-templates", "aem-content-fragments-vs-pages"],
  },
  {
    slug: "aem-touch-ui-dialogs",
    title: "Touch UI Dialogs Authors Can Finish",
    subcategory: "Authoring",
    description:
      "Field names, defaults, validation, and the multifield that made a simple page impossible.",
    targetIntent: "educational",
    technologies: ["Adobe Experience Manager"],
    tags: ["aem", "authoring"],
    relatedArticles: ["aem-author-developer-contract", "aem-sling-models-without-magic"],
  },
  {
    slug: "aem-querybuilder-vs-sql2",
    title: "Query Builder vs SQL2 in AEM",
    subcategory: "Queries",
    description:
      "When a query belongs in a component (almost never) and when it belongs in a job.",
    targetIntent: "comparison",
    technologies: ["Adobe Experience Manager"],
    tags: ["aem"],
    relatedArticles: ["aem-dispatcher-caching", "aem-interview-questions"],
  },
  {
    slug: "aem-asset-renditions",
    title: "Asset Renditions: Generate Once, Cache, Name Honestly",
    subcategory: "Assets",
    description:
      "Web performance starts in DAM. Authors should not pick a 12MB original for a card.",
    targetIntent: "educational",
    technologies: ["Adobe Experience Manager"],
    tags: ["aem", "assets"],
    relatedArticles: ["aem-clientlibs-performance", "aem-content-fragments-vs-pages"],
  },
  {
    slug: "aem-component-versioning",
    title: "Versioning AEM Components Without Breaking Authored Pages",
    subcategory: "Development",
    description:
      "Compatible dialogs, resource types, and the refactor that emptied a live page.",
    targetIntent: "architecture",
    technologies: ["Adobe Experience Manager"],
    tags: ["aem"],
    relatedArticles: ["aem-author-developer-contract", "aem-sling-models-without-magic"],
  },
  {
    slug: "aem-author-publish-topology",
    title: "Author and Publish Topology in Plain Language",
    subcategory: "Architecture",
    description:
      "Who writes, who serves, how replication fails, and why preview is not production.",
    targetIntent: "informational",
    technologies: ["Adobe Experience Manager"],
    tags: ["aem"],
    relatedArticles: ["aem-dispatcher-caching", "aem-interview-questions"],
  },
]);

export const systemDesign = entries("system-design", [
  {
    slug: "system-design-interview-questions",
    title: "System Design Interview Questions, With the Reasoning",
    subcategory: "Interview Lab",
    description:
      "A small set of design prompts with the tradeoffs interviewers listen for — not a 50-box diagram.",
    targetIntent: "interview",
    difficulty: "mixed",
    technologies: ["System Design"],
    tags: ["system-design", "interviews"],
    relatedArticles: [
      "senior-software-engineer-interview-questions",
      "designing-for-idempotency",
      "consistency-vs-availability-product",
    ],
    status: "published",
    priority: "high",
    section: "interview",
  },
  {
    slug: "senior-software-engineer-interview-questions",
    title: "Senior Software Engineer Interview Questions",
    subcategory: "Interview Lab",
    description:
      "Ownership, tradeoffs, incidents, and mentoring — the loop beyond leetcode.",
    targetIntent: "interview",
    difficulty: "senior",
    technologies: ["Software Engineering"],
    tags: ["interviews", "leadership"],
    relatedArticles: [
      "system-design-interview-questions",
      "how-i-review-a-pull-request",
      "mentoring-without-taking-the-keyboard",
    ],
    priority: "high",
    section: "interview",
  },
  {
    slug: "designing-for-idempotency",
    title: "Designing for Idempotency Across HTTP and Queues",
    subcategory: "Reliability",
    description:
      "Name the attempt. Store the outcome. Assume every client retries.",
    targetIntent: "architecture",
    technologies: ["System Design"],
    tags: ["idempotency"],
    relatedArticles: ["designing-idempotent-post-handlers", "system-design-interview-questions"],
  },
  {
    slug: "rate-limiting-strategies",
    title: "Rate Limiting Strategies: Token, Window, and Product",
    subcategory: "APIs",
    description:
      "Who degrades first, what Retry-After means, and why a global bucket punishes health checks.",
    targetIntent: "architecture",
    technologies: ["System Design"],
    tags: ["rate-limiting"],
    relatedArticles: ["capacity-and-slos", "system-design-interview-questions"],
  },
  {
    slug: "caching-where-it-belongs",
    title: "Caching: Put It Where the Invalidation Story Exists",
    subcategory: "Performance",
    description:
      "Browser, CDN, app, database. A cache without a death story is a bug factory.",
    targetIntent: "architecture",
    technologies: ["System Design"],
    tags: ["cache"],
    relatedArticles: ["aem-dispatcher-caching", "spring-caching-pitfalls"],
  },
  {
    slug: "consistency-vs-availability-product",
    title: "Consistency vs Availability Is a Product Sentence",
    subcategory: "Tradeoffs",
    description:
      "Write the user-visible lie you are willing to tell. Then pick the database topology.",
    targetIntent: "architecture",
    difficulty: "senior",
    technologies: ["System Design"],
    tags: ["consistency"],
    relatedArticles: ["read-replicas-lag", "system-design-interview-questions"],
  },
  {
    slug: "event-driven-vs-request-response",
    title: "Event-Driven vs Request/Response: Who Is Allowed to Wait",
    subcategory: "Architecture",
    description:
      "If the caller must know now, do not hide the work in a topic. If they must not wait, do not do it inline.",
    targetIntent: "comparison",
    technologies: ["System Design"],
    tags: ["events"],
    relatedArticles: ["schema-design-for-events", "background-jobs-vs-request-path"],
  },
  {
    slug: "api-gateway-bff",
    title: "API Gateway vs BFF: Aggregation Is a Product Surface",
    subcategory: "APIs",
    description:
      "A BFF is allowed to be ugly if it matches one client. A public gateway should not be.",
    targetIntent: "comparison",
    technologies: ["System Design"],
    tags: ["apis"],
    relatedArticles: ["rest-api-versioning-without-chaos", "system-design-interview-questions"],
  },
  {
    slug: "multi-tenant-isolation",
    title: "Multi-Tenant Isolation: Row, Schema, or Cluster",
    subcategory: "Tenancy",
    description:
      "The query you forgot to scope is a security incident. Design the default filter first.",
    targetIntent: "architecture",
    difficulty: "senior",
    technologies: ["System Design"],
    tags: ["multi-tenant"],
    relatedArticles: ["laravel-multi-tenancy-patterns", "multi-tenant-request-context"],
  },
  {
    slug: "observability-as-design",
    title: "Observability as a Design Requirement",
    subcategory: "Operations",
    description:
      "If you cannot name the SLI, you are not done designing the path.",
    targetIntent: "architecture",
    technologies: ["System Design"],
    tags: ["observability"],
    relatedArticles: ["observability-three-signals", "capacity-and-slos"],
  },
  {
    slug: "feature-flags-as-architecture",
    title: "Feature Flags as Architecture, Not Leftover Ifs",
    subcategory: "Delivery",
    description:
      "Cohorts, kill switches, and the flag that became a second routing table.",
    targetIntent: "architecture",
    technologies: ["System Design"],
    tags: ["feature-flags"],
    relatedArticles: ["blue-green-vs-flags", "how-i-review-a-pull-request"],
  },
  {
    slug: "data-pipelines-backpressure",
    title: "Backpressure in Data Pipelines",
    subcategory: "Data",
    description:
      "What happens when the consumer is slower than the producer. Drop, buffer, or refuse.",
    targetIntent: "architecture",
    technologies: ["System Design", "AWS"],
    tags: ["pipelines"],
    relatedArticles: ["sqs-visibility-timeout", "queues-and-poison-messages"],
  },
  {
    slug: "authn-authz-boundaries",
    title: "Authentication vs Authorization Boundaries",
    subcategory: "Security",
    description:
      "Who you are is not what you may do. Put the check next to the resource.",
    targetIntent: "educational",
    technologies: ["System Design"],
    tags: ["security"],
    relatedArticles: ["spring-security-filter-chain", "laravel-policies-vs-gates"],
  },
  {
    slug: "search-vs-oltp",
    title: "Search Indexes vs OLTP: Two Jobs, Two Systems",
    subcategory: "Data",
    description:
      "Do not ask Postgres to be your product search forever. Do not ask Elasticsearch to be your ledger.",
    targetIntent: "comparison",
    technologies: ["System Design"],
    tags: ["search", "sql"],
    relatedArticles: ["indexes-that-match-the-query", "system-design-interview-questions"],
  },
  {
    slug: "queues-and-poison-messages",
    title: "Queues and Poison Messages",
    subcategory: "Reliability",
    description:
      "A message that always fails must leave the main queue. DLQ is a process, not a folder.",
    targetIntent: "troubleshooting",
    technologies: ["System Design"],
    tags: ["queues"],
    relatedArticles: ["sqs-visibility-timeout", "lambda-failure-modes"],
  },
  {
    slug: "designing-webhooks-as-a-product",
    title: "Outbound Webhooks as a Product",
    subcategory: "APIs",
    description:
      "Signing, retries, and a dashboard for the partner whose endpoint is down.",
    targetIntent: "architecture",
    technologies: ["System Design"],
    tags: ["webhooks"],
    relatedArticles: ["webhook-design-retries-and-signatures", "rate-limiting-strategies"],
  },
  {
    slug: "capacity-and-slos",
    title: "Capacity and SLOs: The Number Before the Diagram",
    subcategory: "Reliability",
    description:
      "Write p95 and error budget first. The boxes come second.",
    targetIntent: "architecture",
    difficulty: "senior",
    technologies: ["System Design"],
    tags: ["slo"],
    relatedArticles: ["observability-three-signals", "system-design-interview-questions"],
  },
  {
    slug: "migration-strangler",
    title: "Strangler Migrations That Ship Weekly",
    subcategory: "Migration",
    description:
      "Route a slice, keep the old path, delete when the metrics agree.",
    targetIntent: "architecture",
    difficulty: "senior",
    technologies: ["System Design"],
    tags: ["migration"],
    relatedArticles: ["typescript-strict-mode-migration", "saying-no-to-a-rewrite"],
  },
  {
    slug: "documentation-as-a-design-artifact",
    title: "Documentation as a Design Artifact",
    subcategory: "Process",
    description:
      "The contract, the sequence, the failure. If it is only in Slack, it is not designed.",
    targetIntent: "informational",
    technologies: ["Software Engineering"],
    tags: ["docs"],
    relatedArticles: ["writing-system-design-docs-people-read", "what-i-put-in-a-runbook"],
  },
  {
    slug: "tradeoff-logs-not-diagrams",
    title: "Write the Tradeoff Log, Not Just the Diagram",
    subcategory: "Process",
    description:
      "What you rejected, and why. Future you will need it in an incident.",
    targetIntent: "informational",
    difficulty: "senior",
    technologies: ["Software Engineering"],
    tags: ["docs"],
    relatedArticles: ["documentation-as-a-design-artifact", "system-design-interview-questions"],
  },
]);

export const engineeringNotes = entries("engineering-notes", [
  {
    slug: "how-i-review-a-pull-request",
    title: "How I Review a Pull Request",
    subcategory: "Review",
    description:
      "Correctness, contracts, and operability — in that order. Style last.",
    targetIntent: "informational",
    technologies: ["Software Engineering"],
    tags: ["review"],
    relatedArticles: [
      "senior-software-engineer-interview-questions",
      "writing-system-design-docs-people-read",
    ],
    priority: "high",
  },
  {
    slug: "writing-system-design-docs-people-read",
    title: "Writing System Design Docs People Actually Read",
    subcategory: "Docs",
    description:
      "Context, decision, consequences. Keep the sequence diagram for the part that is not obvious.",
    targetIntent: "educational",
    technologies: ["Software Engineering"],
    tags: ["docs"],
    relatedArticles: ["documentation-as-a-design-artifact", "tradeoff-logs-not-diagrams"],
  },
  {
    slug: "when-to-stop-abstracting",
    title: "When to Stop Abstracting",
    subcategory: "Design",
    description:
      "The third copy might want a function. The first copy wanted to ship.",
    targetIntent: "informational",
    technologies: ["Software Engineering"],
    tags: ["design"],
    relatedArticles: ["saying-no-to-a-rewrite", "how-i-review-a-pull-request"],
  },
  {
    slug: "debugging-production-without-guessing",
    title: "Debugging Production Without Guessing",
    subcategory: "Incidents",
    description:
      "Reproduce the signal, narrow the blast radius, change one thing.",
    targetIntent: "problem-solving",
    technologies: ["Software Engineering"],
    tags: ["debugging"],
    relatedArticles: ["what-i-put-in-a-runbook", "observability-three-signals"],
  },
  {
    slug: "mentoring-without-taking-the-keyboard",
    title: "Mentoring Without Taking the Keyboard",
    subcategory: "Leadership",
    description:
      "Ask for the plan. Review the diff. Do not become the only person who can ship.",
    targetIntent: "informational",
    difficulty: "senior",
    technologies: ["Software Engineering"],
    tags: ["mentoring"],
    relatedArticles: [
      "senior-software-engineer-interview-questions",
      "how-i-review-a-pull-request",
    ],
  },
  {
    slug: "estimating-under-uncertainty",
    title: "Estimating Under Uncertainty",
    subcategory: "Delivery",
    description:
      "Ranges, risks, and the unknown you write down so it does not become a silent week.",
    targetIntent: "educational",
    technologies: ["Software Engineering"],
    tags: ["delivery"],
    relatedArticles: ["writing-system-design-docs-people-read", "saying-no-to-a-rewrite"],
  },
  {
    slug: "saying-no-to-a-rewrite",
    title: "Saying No to a Rewrite (Most of the Time)",
    subcategory: "Leadership",
    description:
      "Strangle a seam. Rewrites need a reason that survives contact with the calendar.",
    targetIntent: "informational",
    difficulty: "senior",
    technologies: ["Software Engineering"],
    tags: ["rewrites"],
    relatedArticles: ["migration-strangler", "when-to-stop-abstracting"],
  },
  {
    slug: "on-call-that-does-not-burn-people",
    title: "On-Call That Does Not Burn People",
    subcategory: "Operations",
    description:
      "Pages that mean user pain. Runbooks that work at 2 a.m. Handoffs that are written.",
    targetIntent: "informational",
    technologies: ["Software Engineering"],
    tags: ["on-call"],
    relatedArticles: ["what-i-put-in-a-runbook", "cloudwatch-alarms-that-page"],
  },
  {
    slug: "what-i-put-in-a-runbook",
    title: "What I Put in a Runbook",
    subcategory: "Operations",
    description:
      "Symptoms, checks, actions, escalate. No novel. No \"restart it\" without a why.",
    targetIntent: "educational",
    technologies: ["Software Engineering"],
    tags: ["runbooks"],
    relatedArticles: ["debugging-production-without-guessing", "on-call-that-does-not-burn-people"],
  },
  {
    slug: "building-in-public-without-leaking-secrets",
    title: "Building in Public Without Leaking Secrets",
    subcategory: "Practice",
    description:
      "Share the pattern, not the customer. No tokens, no internal hostnames, no screenshots of prod.",
    targetIntent: "informational",
    technologies: ["Software Engineering"],
    tags: ["writing"],
    relatedArticles: ["how-i-review-a-pull-request", "documentation-as-a-design-artifact"],
  },
]);
