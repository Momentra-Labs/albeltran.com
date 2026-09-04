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

export const nodejsBackend = entries("nodejs-backend", [
  {
    slug: "nodejs-interview-questions",
    title: "Node.js Interview Questions, With the Reasoning",
    subcategory: "Interview Lab",
    description:
      "The event loop, errors, streams, and production habits — not a list of module names.",
    targetIntent: "interview",
    difficulty: "mixed",
    technologies: ["Node.js"],
    tags: ["nodejs", "interviews"],
    relatedArticles: [
      "javascript-event-loop-for-backend-devs",
      "nodejs-error-first-and-async-errors",
      "lambda-failure-modes",
    ],
    status: "published",
    priority: "high",
    section: "interview",
  },
  {
    slug: "nodejs-error-first-and-async-errors",
    title: "Errors in Node: Callbacks, Rejections, and What You Swallow",
    subcategory: "Reliability",
    description:
      "Unhandled rejections, error-first callbacks, and the difference between crash and continue.",
    targetIntent: "educational",
    technologies: ["Node.js"],
    tags: ["nodejs", "errors"],
    relatedArticles: ["javascript-error-handling-patterns", "nodejs-interview-questions"],
  },
  {
    slug: "nodejs-streams-when-buffers-lie",
    title: "Node Streams When the File Does Not Fit in Memory",
    subcategory: "IO",
    description:
      "When to stream, when a buffer is fine, and how backpressure shows up as a quiet OOM.",
    targetIntent: "educational",
    technologies: ["Node.js"],
    tags: ["nodejs", "streams"],
    relatedArticles: ["file-uploads-in-node-safely", "javascript-iterators-and-generators"],
  },
  {
    slug: "nodejs-clustering-vs-one-process",
    title: "One Node Process vs a Cluster: What You Are Actually Scaling",
    subcategory: "Architecture",
    description:
      "CPU cores, sticky sessions, and why more processes will not fix a synchronous JSON.parse of 20MB.",
    targetIntent: "architecture",
    technologies: ["Node.js"],
    tags: ["nodejs"],
    relatedArticles: ["nodejs-cpu-bound-work", "nodejs-interview-questions"],
  },
  {
    slug: "express-middleware-order",
    title: "Express Middleware Order Is the Bug",
    subcategory: "HTTP",
    description:
      "Auth after the handler, parsers twice, and the 404 that never runs.",
    targetIntent: "troubleshooting",
    technologies: ["Node.js"],
    tags: ["nodejs", "express"],
    relatedArticles: ["backend-validation-at-the-edge", "nodejs-interview-questions"],
  },
  {
    slug: "rest-api-versioning-without-chaos",
    title: "REST API Versioning Without a Permanent v2 Graveyard",
    subcategory: "APIs",
    description:
      "Headers vs paths, expand/contract, and when a new resource beats a new version.",
    targetIntent: "architecture",
    technologies: ["Node.js"],
    tags: ["apis"],
    relatedArticles: ["typescript-api-contracts", "pagination-cursor-vs-offset"],
  },
  {
    slug: "webhook-design-retries-and-signatures",
    title: "Inbound Webhooks: Signatures, Retries, and Idempotency",
    subcategory: "APIs",
    description:
      "Verify the sender, tolerate duplicates, and do not do the expensive work in the request thread if you can avoid it.",
    targetIntent: "architecture",
    technologies: ["Node.js"],
    tags: ["webhooks", "security"],
    relatedArticles: ["designing-idempotent-post-handlers", "designing-webhooks-as-a-product"],
  },
  {
    slug: "nodejs-cpu-bound-work",
    title: "CPU-Bound Work in Node: Move It or Pay the Event Loop",
    subcategory: "Performance",
    description:
      "Worker threads, child processes, or another runtime — pick one before the p95 becomes a mystery.",
    targetIntent: "problem-solving",
    technologies: ["Node.js"],
    tags: ["nodejs", "performance"],
    relatedArticles: ["javascript-event-loop-for-backend-devs", "nodejs-clustering-vs-one-process"],
  },
  {
    slug: "graceful-shutdown-in-node",
    title: "Graceful Shutdown in Node: Finish the Request You Already Accepted",
    subcategory: "Operations",
    description:
      "SIGTERM, in-flight HTTP, open DB pools, and the deploy that killed work mid-write.",
    targetIntent: "troubleshooting",
    technologies: ["Node.js"],
    tags: ["nodejs", "operations"],
    relatedArticles: ["nodejs-timeouts-and-cancellation", "connection-pooling"],
  },
  {
    slug: "nodejs-env-config-and-secrets",
    title: "Config vs Secrets in Node Services",
    subcategory: "Security",
    description:
      "What belongs in env, what belongs in a secret store, and what should never be logged.",
    targetIntent: "educational",
    technologies: ["Node.js"],
    tags: ["nodejs", "security"],
    relatedArticles: ["secrets-manager-vs-env", "nodejs-logging-that-you-can-query"],
  },
  {
    slug: "pagination-cursor-vs-offset",
    title: "Cursor vs Offset Pagination",
    subcategory: "APIs",
    description:
      "Offset is simple and lies under writes. Cursors are honest and need a stable sort.",
    targetIntent: "comparison",
    technologies: ["Node.js", "SQL"],
    tags: ["apis", "sql"],
    relatedArticles: ["pagination-and-indexes", "rest-api-versioning-without-chaos"],
  },
  {
    slug: "backend-validation-at-the-edge",
    title: "Validate at the Edge of the Service, Not in Every Helper",
    subcategory: "Architecture",
    description:
      "One parsed command object. Downstream code should not re-check string length.",
    targetIntent: "architecture",
    technologies: ["Node.js", "TypeScript"],
    tags: ["validation"],
    relatedArticles: ["typescript-zod-at-the-edge", "typescript-api-contracts"],
  },
  {
    slug: "nodejs-testing-http-handlers",
    title: "Testing HTTP Handlers Without Mocking the Universe",
    subcategory: "Testing",
    description:
      "Hit the handler, control the clock, and stub the one dependency that is actually external.",
    targetIntent: "educational",
    technologies: ["Node.js"],
    tags: ["nodejs", "testing"],
    relatedArticles: ["backend-validation-at-the-edge", "nodejs-interview-questions"],
  },
  {
    slug: "file-uploads-in-node-safely",
    title: "File Uploads in Node Without Becoming a Free Disk",
    subcategory: "Security",
    description:
      "Size limits, content types, storage location, and the malware path people forget.",
    targetIntent: "educational",
    technologies: ["Node.js"],
    tags: ["nodejs", "security"],
    relatedArticles: ["nodejs-streams-when-buffers-lie", "php-security-file-uploads"],
  },
  {
    slug: "nodejs-logging-that-you-can-query",
    title: "Structured Logs You Can Query at 2 a.m.",
    subcategory: "Operations",
    description:
      "Request ids, levels, and the fields that make CloudWatch or Grafana useful.",
    targetIntent: "educational",
    technologies: ["Node.js"],
    tags: ["nodejs", "observability"],
    relatedArticles: ["cloudwatch-alarms-that-page", "observability-three-signals"],
  },
  {
    slug: "background-jobs-vs-request-path",
    title: "Background Jobs vs the Request Path",
    subcategory: "Architecture",
    description:
      "If the user is not waiting, do not make them wait. If they are, do not hide the work in a queue without a status.",
    targetIntent: "architecture",
    technologies: ["Node.js"],
    tags: ["jobs"],
    relatedArticles: ["laravel-queues-and-failed-jobs", "designing-idempotent-post-handlers"],
  },
  {
    slug: "nodejs-memory-leaks-common",
    title: "Common Node Memory Leaks (Caches, Listeners, Buffers)",
    subcategory: "Troubleshooting",
    description:
      "Unbounded maps, event listeners, and the buffer you kept \"just in case.\"",
    targetIntent: "troubleshooting",
    technologies: ["Node.js"],
    tags: ["nodejs"],
    relatedArticles: ["javascript-memory-leaks-in-spas", "nodejs-streams-when-buffers-lie"],
  },
  {
    slug: "designing-idempotent-post-handlers",
    title: "Designing Idempotent POST Handlers",
    subcategory: "APIs",
    description:
      "Keys, stored outcomes, and the 409 when the body does not match the first attempt.",
    targetIntent: "architecture",
    technologies: ["Node.js"],
    tags: ["apis", "idempotency"],
    relatedArticles: ["webhook-design-retries-and-signatures", "designing-for-idempotency"],
  },
  {
    slug: "nodejs-timeouts-and-cancellation",
    title: "Timeouts and Cancellation in Node HTTP Clients",
    subcategory: "Reliability",
    description:
      "A timeout that does not abort the socket is a suggestion. Abort signals are the contract.",
    targetIntent: "troubleshooting",
    technologies: ["Node.js"],
    tags: ["nodejs"],
    relatedArticles: ["graceful-shutdown-in-node", "api-gateway-timeouts"],
  },
  {
    slug: "multi-tenant-request-context",
    title: "Request Context for Multi-Tenant Node Services",
    subcategory: "Architecture",
    description:
      "AsyncLocalStorage, tenant ids on every query, and the leak that reads the wrong customer.",
    targetIntent: "architecture",
    difficulty: "senior",
    technologies: ["Node.js"],
    tags: ["nodejs", "multi-tenant"],
    relatedArticles: ["multi-tenant-isolation", "backend-validation-at-the-edge"],
  },
]);

export const javaSpring = entries("java-spring", [
  {
    slug: "spring-boot-interview-questions",
    title: "Spring Boot Interview Questions, With the Reasoning",
    subcategory: "Interview Lab",
    description:
      "Beans, transactions, web, and data — what a strong answer names and what a weak one waves at.",
    targetIntent: "interview",
    difficulty: "mixed",
    technologies: ["Java", "Spring Boot"],
    tags: ["spring", "interviews"],
    relatedArticles: ["java-interview-questions", "spring-transactional-boundaries"],
    priority: "high",
    section: "interview",
  },
  {
    slug: "java-interview-questions",
    title: "Java Interview Questions, With the Reasoning",
    subcategory: "Interview Lab",
    description:
      "Equals, concurrency, collections, and the memory model questions that are not trivia if you run services.",
    targetIntent: "interview",
    difficulty: "mixed",
    technologies: ["Java"],
    tags: ["java", "interviews"],
    relatedArticles: ["spring-boot-interview-questions", "java-equals-hashcode-contracts"],
    priority: "high",
    section: "interview",
  },
  {
    slug: "spring-bean-scopes-that-matter",
    title: "Spring Bean Scopes That Actually Matter",
    subcategory: "Core",
    description:
      "Singleton vs request vs prototype, and the injected singleton that accidentally shares a request field.",
    targetIntent: "educational",
    technologies: ["Java", "Spring Boot"],
    tags: ["spring"],
    relatedArticles: ["spring-boot-interview-questions", "multi-tenant-request-context"],
  },
  {
    slug: "spring-transactional-boundaries",
    title: "Where @Transactional Should Sit (and Where It Silently Does Nothing)",
    subcategory: "Data",
    description:
      "Self-invocation, read-only, propagation, and the service method that never opened a transaction.",
    targetIntent: "troubleshooting",
    technologies: ["Java", "Spring Boot"],
    tags: ["spring", "transactions"],
    relatedArticles: ["transactions-isolation-levels", "spring-data-n-plus-one"],
  },
  {
    slug: "spring-rest-exception-handling",
    title: "Spring REST Exception Handling That Stays Stable",
    subcategory: "HTTP",
    description:
      "Problem details, mapped exceptions, and the catch-all that hides a 500 as a 200.",
    targetIntent: "educational",
    technologies: ["Java", "Spring Boot"],
    tags: ["spring", "apis"],
    relatedArticles: ["javascript-error-handling-patterns", "rest-api-versioning-without-chaos"],
  },
  {
    slug: "spring-data-n-plus-one",
    title: "Spring Data N+1: See It, Then Fetch Join or Redesign",
    subcategory: "Data",
    description:
      "Lazy collections in a loop, entity graphs, and when a query DTO is the real fix.",
    targetIntent: "troubleshooting",
    technologies: ["Java", "Spring Boot"],
    tags: ["spring", "jpa"],
    relatedArticles: ["jpa-entity-vs-domain", "laravel-eloquent-n-plus-one"],
  },
  {
    slug: "spring-security-filter-chain",
    title: "The Spring Security Filter Chain as a Product Decision",
    subcategory: "Security",
    description:
      "What runs before the controller, how to fail closed, and the permitAll you added for a health check.",
    targetIntent: "architecture",
    difficulty: "senior",
    technologies: ["Java", "Spring Boot"],
    tags: ["spring", "security"],
    relatedArticles: ["authn-authz-boundaries", "spring-boot-interview-questions"],
  },
  {
    slug: "java-equals-hashcode-contracts",
    title: "equals and hashCode: The Contract That Breaks HashMaps",
    subcategory: "Language",
    description:
      "Mutability, identity vs value, and JPA entities that should not be map keys.",
    targetIntent: "educational",
    technologies: ["Java"],
    tags: ["java"],
    relatedArticles: ["java-interview-questions", "jpa-entity-vs-domain"],
  },
  {
    slug: "java-optional-as-return-type",
    title: "Optional as a Return Type, Not a Field Type",
    subcategory: "Language",
    description:
      "When Optional communicates absence, and when it is a null with extra steps.",
    targetIntent: "educational",
    technologies: ["Java"],
    tags: ["java"],
    relatedArticles: ["java-interview-questions", "java-records-for-dtos"],
  },
  {
    slug: "spring-profiles-and-config",
    title: "Spring Profiles and Config That Do Not Surprise Production",
    subcategory: "Config",
    description:
      "What is allowed to differ by env, and the default that silently used H2 in prod once.",
    targetIntent: "troubleshooting",
    technologies: ["Java", "Spring Boot"],
    tags: ["spring"],
    relatedArticles: ["nodejs-env-config-and-secrets", "secrets-manager-vs-env"],
  },
  {
    slug: "java-concurrency-for-web-services",
    title: "Java Concurrency for Request-Scoped Services",
    subcategory: "Concurrency",
    description:
      "Shared mutability, thread pools, and the work that should not sit on a Tomcat thread.",
    targetIntent: "educational",
    difficulty: "senior",
    technologies: ["Java"],
    tags: ["java", "concurrency"],
    relatedArticles: ["java-memory-visibility", "spring-async-and-executors"],
  },
  {
    slug: "spring-testing-slices",
    title: "Spring Test Slices: @WebMvcTest vs the Full Context",
    subcategory: "Testing",
    description:
      "Faster tests, honest boundaries, and the slice that mocks the thing you meant to test.",
    targetIntent: "educational",
    technologies: ["Java", "Spring Boot"],
    tags: ["spring", "testing"],
    relatedArticles: ["nodejs-testing-http-handlers", "spring-boot-interview-questions"],
  },
  {
    slug: "java-records-for-dtos",
    title: "Java Records for DTOs and Why Entities Are Not Records",
    subcategory: "Language",
    description:
      "Immutable API shapes vs mutable persistence models.",
    targetIntent: "educational",
    technologies: ["Java"],
    tags: ["java"],
    relatedArticles: ["jpa-entity-vs-domain", "typescript-api-contracts"],
  },
  {
    slug: "spring-validation-and-binding",
    title: "Spring Validation and Binding Errors That Reach the Client",
    subcategory: "HTTP",
    description:
      "Bean Validation, @ControllerAdvice, and the field names clients can actually fix.",
    targetIntent: "educational",
    technologies: ["Java", "Spring Boot"],
    tags: ["spring", "validation"],
    relatedArticles: ["backend-validation-at-the-edge", "spring-rest-exception-handling"],
  },
  {
    slug: "jpa-entity-vs-domain",
    title: "JPA Entities Are Not Your Domain Model (Usually)",
    subcategory: "Architecture",
    description:
      "When a dedicated domain type is worth the mapping, and when anemic entities are honest enough.",
    targetIntent: "architecture",
    difficulty: "senior",
    technologies: ["Java", "Spring Boot"],
    tags: ["jpa", "architecture"],
    relatedArticles: ["spring-data-n-plus-one", "senior-java-service-boundaries"],
  },
  {
    slug: "spring-actuator-what-to-expose",
    title: "Spring Actuator: Expose Health, Not Your Internals",
    subcategory: "Operations",
    description:
      "What belongs on a public health check versus a locked-down ops port.",
    targetIntent: "educational",
    technologies: ["Java", "Spring Boot"],
    tags: ["spring", "operations"],
    relatedArticles: ["observability-three-signals", "spring-security-filter-chain"],
  },
  {
    slug: "java-gc-basics-for-services",
    title: "GC Basics for People Who Run JVM Services",
    subcategory: "Performance",
    description:
      "Allocation, pause, and the heap flag you copied from a blog in 2018.",
    targetIntent: "informational",
    technologies: ["Java"],
    tags: ["java", "performance"],
    relatedArticles: ["java-concurrency-for-web-services", "java-interview-questions"],
  },
  {
    slug: "spring-async-and-executors",
    title: "Spring @Async and the Executor You Forgot to Name",
    subcategory: "Concurrency",
    description:
      "Default pools, rejected execution, and work that still runs on the request thread.",
    targetIntent: "troubleshooting",
    technologies: ["Java", "Spring Boot"],
    tags: ["spring"],
    relatedArticles: ["java-concurrency-for-web-services", "background-jobs-vs-request-path"],
  },
  {
    slug: "java-checked-exceptions-in-apis",
    title: "Checked Exceptions at Service Boundaries",
    subcategory: "Language",
    description:
      "When wrapping is honesty, and when it is a stack trace laundry service.",
    targetIntent: "educational",
    technologies: ["Java"],
    tags: ["java"],
    relatedArticles: ["spring-rest-exception-handling", "java-interview-questions"],
  },
  {
    slug: "spring-boot-fat-jar-vs-layers",
    title: "Fat JARs vs Layered Images in Spring Boot",
    subcategory: "Packaging",
    description:
      "Cold start, cache layers, and what Docker actually invalidates.",
    targetIntent: "comparison",
    technologies: ["Java", "Spring Boot", "Docker"],
    tags: ["spring", "docker"],
    relatedArticles: ["docker-multi-stage-builds", "docker-interview-questions"],
  },
  {
    slug: "java-streams-when-not-to",
    title: "Java Streams: When a for-loop Is the Senior Choice",
    subcategory: "Language",
    description:
      "Readability, allocation, and the parallel() you should almost never add.",
    targetIntent: "comparison",
    technologies: ["Java"],
    tags: ["java"],
    relatedArticles: ["java-interview-questions", "java-gc-basics-for-services"],
  },
  {
    slug: "spring-caching-pitfalls",
    title: "Spring Cache Pitfalls: Keys, Eviction, and Local vs Shared",
    subcategory: "Performance",
    description:
      "A local cache that lies in a two-instance deploy, and the key that ignored the tenant.",
    targetIntent: "troubleshooting",
    technologies: ["Java", "Spring Boot"],
    tags: ["spring", "cache"],
    relatedArticles: ["caching-where-it-belongs", "multi-tenant-isolation"],
  },
  {
    slug: "java-memory-visibility",
    title: "Memory Visibility in Java Without a PhD",
    subcategory: "Concurrency",
    description:
      "volatile, happens-before, and the flag another thread never sees.",
    targetIntent: "educational",
    difficulty: "senior",
    technologies: ["Java"],
    tags: ["java", "concurrency"],
    relatedArticles: ["java-concurrency-for-web-services", "java-interview-questions"],
  },
  {
    slug: "spring-openapi-contracts",
    title: "OpenAPI Contracts in Spring: Generate or Write, Pick One Source",
    subcategory: "APIs",
    description:
      "Code-first vs contract-first, and the drift that breaks the mobile client.",
    targetIntent: "architecture",
    technologies: ["Java", "Spring Boot"],
    tags: ["spring", "apis"],
    relatedArticles: ["typescript-api-contracts", "rest-api-versioning-without-chaos"],
  },
  {
    slug: "senior-java-service-boundaries",
    title: "Senior-Level Java Service Boundaries",
    subcategory: "Architecture",
    description:
      "Modules, packages, and the \"utils\" folder that became the real architecture.",
    targetIntent: "architecture",
    difficulty: "senior",
    technologies: ["Java"],
    tags: ["java", "architecture"],
    relatedArticles: ["jpa-entity-vs-domain", "tradeoff-logs-not-diagrams"],
  },
]);
