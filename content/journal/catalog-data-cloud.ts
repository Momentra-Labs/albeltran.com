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

export const phpLaravel = entries("php-laravel", [
  {
    slug: "laravel-interview-questions",
    title: "Laravel Interview Questions, With the Reasoning",
    subcategory: "Interview Lab",
    description:
      "Container, Eloquent, queues, and authorization — scored as production judgment, not framework trivia.",
    targetIntent: "interview",
    difficulty: "mixed",
    technologies: ["PHP", "Laravel"],
    tags: ["laravel", "interviews"],
    relatedArticles: ["php-interview-questions", "laravel-eloquent-n-plus-one"],
    priority: "high",
    section: "interview",
  },
  {
    slug: "php-interview-questions",
    title: "PHP Interview Questions, With the Reasoning",
    subcategory: "Interview Lab",
    description:
      "Types, requests, errors, and the language behavior that still surprises people who only write Laravel.",
    targetIntent: "interview",
    difficulty: "mixed",
    technologies: ["PHP"],
    tags: ["php", "interviews"],
    relatedArticles: ["laravel-interview-questions", "php-type-system-in-practice"],
    priority: "high",
    section: "interview",
  },
  {
    slug: "laravel-eloquent-n-plus-one",
    title: "Eloquent N+1: with(), then Stop Querying in the View",
    subcategory: "Data",
    description:
      "Eager load, constrain, or write a query. Do not discover relations in a Blade loop.",
    targetIntent: "troubleshooting",
    technologies: ["PHP", "Laravel"],
    tags: ["laravel", "eloquent"],
    relatedArticles: ["spring-data-n-plus-one", "laravel-interview-questions"],
  },
  {
    slug: "laravel-queues-and-failed-jobs",
    title: "Laravel Queues and Failed Jobs You Can Replay",
    subcategory: "Jobs",
    description:
      "Backoff, idempotency, and the failed_jobs table that nobody looks at.",
    targetIntent: "architecture",
    technologies: ["PHP", "Laravel"],
    tags: ["laravel", "queues"],
    relatedArticles: ["background-jobs-vs-request-path", "laravel-horizon-when"],
  },
  {
    slug: "laravel-service-container",
    title: "The Laravel Container: Bindings That Keep Tests Honest",
    subcategory: "Core",
    description:
      "Interfaces, contextual binding, and the facade that hid a singleton you cannot fake.",
    targetIntent: "educational",
    technologies: ["PHP", "Laravel"],
    tags: ["laravel"],
    relatedArticles: ["laravel-interview-questions", "laravel-testing-http"],
  },
  {
    slug: "php-type-system-in-practice",
    title: "PHP Types in Practice: Scalars, Unions, and the Boundary",
    subcategory: "Language",
    description:
      "What PHP 8 actually gives you, and why request arrays still need explicit casts.",
    targetIntent: "educational",
    technologies: ["PHP"],
    tags: ["php"],
    relatedArticles: ["php-interview-questions", "laravel-validation-form-requests"],
  },
  {
    slug: "laravel-policies-vs-gates",
    title: "Policies vs Gates: Put Authorization Next to the Model",
    subcategory: "Security",
    description:
      "When a policy method is clearer than a gate string scattered across controllers.",
    targetIntent: "comparison",
    technologies: ["PHP", "Laravel"],
    tags: ["laravel", "auth"],
    relatedArticles: ["authn-authz-boundaries", "laravel-interview-questions"],
  },
  {
    slug: "laravel-migrations-expand-contract",
    title: "Laravel Migrations the Expand/Contract Way",
    subcategory: "Data",
    description:
      "Additive deploys, dual writes, and the migration that locked production for 20 minutes.",
    targetIntent: "architecture",
    technologies: ["PHP", "Laravel", "SQL"],
    tags: ["laravel", "migrations"],
    relatedArticles: ["migrations-without-downtime", "laravel-eloquent-n-plus-one"],
  },
  {
    slug: "php-composer-and-autoload",
    title: "Composer and Autoload: The Supply Chain You Install",
    subcategory: "Tooling",
    description:
      "Lockfiles, scripts, and the package that ran code on install.",
    targetIntent: "educational",
    technologies: ["PHP"],
    tags: ["php", "composer"],
    relatedArticles: ["supply-chain-security-is-runtime", "php-interview-questions"],
  },
  {
    slug: "laravel-validation-form-requests",
    title: "Form Requests as the HTTP Contract",
    subcategory: "HTTP",
    description:
      "Authorize + rules in one place. Controllers should receive already-valid input.",
    targetIntent: "educational",
    technologies: ["PHP", "Laravel"],
    tags: ["laravel", "validation"],
    relatedArticles: ["backend-validation-at-the-edge", "laravel-api-resources"],
  },
  {
    slug: "laravel-events-vs-jobs",
    title: "Laravel Events vs Jobs: Side Effects vs Work",
    subcategory: "Architecture",
    description:
      "Events notify. Jobs do work. Mixing them is how you double-send email.",
    targetIntent: "comparison",
    technologies: ["PHP", "Laravel"],
    tags: ["laravel"],
    relatedArticles: ["laravel-queues-and-failed-jobs", "background-jobs-vs-request-path"],
  },
  {
    slug: "php-sessions-and-csrf",
    title: "PHP Sessions and CSRF for People Who Ship HTML Forms",
    subcategory: "Security",
    description:
      "Cookie flags, same-site, and the API that should not use cookie sessions by accident.",
    targetIntent: "educational",
    technologies: ["PHP"],
    tags: ["php", "security"],
    relatedArticles: ["laravel-policies-vs-gates", "php-interview-questions"],
  },
  {
    slug: "laravel-testing-http",
    title: "HTTP Tests in Laravel That Assert the Contract",
    subcategory: "Testing",
    description:
      "Acting as a user, asserting JSON, and not mocking Eloquent into fiction.",
    targetIntent: "educational",
    technologies: ["PHP", "Laravel"],
    tags: ["laravel", "testing"],
    relatedArticles: ["nodejs-testing-http-handlers", "laravel-interview-questions"],
  },
  {
    slug: "laravel-config-and-env",
    title: "config() vs env() After Bootstrap",
    subcategory: "Config",
    description:
      "Why env() in a random class breaks config:cache, and what belongs in config files.",
    targetIntent: "troubleshooting",
    technologies: ["PHP", "Laravel"],
    tags: ["laravel"],
    relatedArticles: ["nodejs-env-config-and-secrets", "laravel-interview-questions"],
  },
  {
    slug: "php-error-handling-exceptions",
    title: "PHP Exceptions: What to Catch, What to Report",
    subcategory: "Reliability",
    description:
      "The handler, the report, and the catch that turns a deploy bug into a silent empty page.",
    targetIntent: "educational",
    technologies: ["PHP"],
    tags: ["php"],
    relatedArticles: ["javascript-error-handling-patterns", "php-interview-questions"],
  },
  {
    slug: "laravel-api-resources",
    title: "API Resources as a Serialization Boundary",
    subcategory: "APIs",
    description:
      "Stop returning Eloquent models as JSON. Shape the payload on purpose.",
    targetIntent: "architecture",
    technologies: ["PHP", "Laravel"],
    tags: ["laravel", "apis"],
    relatedArticles: ["typescript-api-contracts", "laravel-validation-form-requests"],
  },
  {
    slug: "laravel-horizon-when",
    title: "When Laravel Horizon Is Worth Running",
    subcategory: "Jobs",
    description:
      "Metrics, balancing, and the Redis bill you accept for visibility.",
    targetIntent: "comparison",
    technologies: ["PHP", "Laravel"],
    tags: ["laravel"],
    relatedArticles: ["laravel-queues-and-failed-jobs", "observability-three-signals"],
  },
  {
    slug: "php-security-file-uploads",
    title: "PHP File Uploads: Names, Types, and Storage",
    subcategory: "Security",
    description:
      "Never trust the client filename. Store outside the docroot unless you have a reason.",
    targetIntent: "educational",
    technologies: ["PHP"],
    tags: ["php", "security"],
    relatedArticles: ["file-uploads-in-node-safely", "php-interview-questions"],
  },
  {
    slug: "laravel-multi-tenancy-patterns",
    title: "Laravel Multi-Tenancy: Database, Schema, or Row",
    subcategory: "Architecture",
    description:
      "Isolation vs cost. The query you forgot to scope is the incident.",
    targetIntent: "architecture",
    difficulty: "senior",
    technologies: ["PHP", "Laravel"],
    tags: ["laravel", "multi-tenant"],
    relatedArticles: ["multi-tenant-isolation", "multi-tenant-request-context"],
  },
  {
    slug: "php-performance-opcache",
    title: "PHP Performance: OPcache First, Then the Query",
    subcategory: "Performance",
    description:
      "What OPcache actually does, and why a missing index still wins the profile.",
    targetIntent: "problem-solving",
    technologies: ["PHP"],
    tags: ["php", "performance"],
    relatedArticles: ["indexes-that-match-the-query", "php-interview-questions"],
  },
]);

export const databases = entries("databases", [
  {
    slug: "sql-interview-questions",
    title: "SQL Interview Questions, With the Reasoning",
    subcategory: "Interview Lab",
    description:
      "Joins, indexes, NULL, and transactions — answered the way a production engineer talks about plans.",
    targetIntent: "interview",
    difficulty: "mixed",
    technologies: ["SQL"],
    tags: ["sql", "interviews"],
    relatedArticles: [
      "postgresql-interview-questions",
      "indexes-that-match-the-query",
      "explain-plans-how-to-read",
    ],
    status: "published",
    priority: "high",
    section: "interview",
  },
  {
    slug: "postgresql-interview-questions",
    title: "PostgreSQL Interview Questions, With the Reasoning",
    subcategory: "Interview Lab",
    description:
      "MVCC, indexes, JSONB, and the Postgres-specific answers that are not just \"it's SQL.\"",
    targetIntent: "interview",
    difficulty: "mixed",
    technologies: ["PostgreSQL", "SQL"],
    tags: ["postgresql", "interviews"],
    relatedArticles: ["sql-interview-questions", "postgres-jsonb-when"],
    priority: "high",
    section: "interview",
  },
  {
    slug: "mysql-interview-questions",
    title: "MySQL Interview Questions, With the Reasoning",
    subcategory: "Interview Lab",
    description:
      "InnoDB, isolation, charsets, and the lock waits that show up in interviews because they show up in prod.",
    targetIntent: "interview",
    difficulty: "mixed",
    technologies: ["MySQL", "SQL"],
    tags: ["mysql", "interviews"],
    relatedArticles: ["sql-interview-questions", "mysql-innodb-locks"],
    priority: "high",
    section: "interview",
  },
  {
    slug: "indexes-that-match-the-query",
    title: "Indexes That Match the Query, Not the Table",
    subcategory: "Indexes",
    description:
      "Leftmost prefixes, selectivity, and the index you added that nobody uses.",
    targetIntent: "educational",
    technologies: ["SQL"],
    tags: ["sql", "indexes"],
    relatedArticles: ["explain-plans-how-to-read", "covering-indexes"],
  },
  {
    slug: "explain-plans-how-to-read",
    title: "How to Read an EXPLAIN Plan Without Guessing",
    subcategory: "Performance",
    description:
      "Seq scan vs index, estimated rows, and the filter that ran after the damage.",
    targetIntent: "educational",
    technologies: ["SQL", "PostgreSQL"],
    tags: ["sql", "explain"],
    relatedArticles: ["indexes-that-match-the-query", "sql-interview-questions"],
  },
  {
    slug: "transactions-isolation-levels",
    title: "Transaction Isolation Levels in Plain Language",
    subcategory: "Transactions",
    description:
      "What dirty, non-repeatable, and phantom actually mean for a checkout.",
    targetIntent: "educational",
    technologies: ["SQL"],
    tags: ["sql", "transactions"],
    relatedArticles: ["spring-transactional-boundaries", "mysql-innodb-locks"],
  },
  {
    slug: "postgres-jsonb-when",
    title: "PostgreSQL JSONB: When a Column Is a Document",
    subcategory: "PostgreSQL",
    description:
      "Flexible attributes vs queryable facts. Index GIN when you search it; do not if you only store it.",
    targetIntent: "comparison",
    technologies: ["PostgreSQL"],
    tags: ["postgresql", "jsonb"],
    relatedArticles: ["schema-design-for-events", "postgresql-interview-questions"],
  },
  {
    slug: "mysql-innodb-locks",
    title: "InnoDB Locks: Gap, Next-Key, and the Update That Waited",
    subcategory: "MySQL",
    description:
      "Why a SELECT ... FOR UPDATE locked more rows than you expected.",
    targetIntent: "troubleshooting",
    difficulty: "senior",
    technologies: ["MySQL"],
    tags: ["mysql", "locks"],
    relatedArticles: ["transactions-isolation-levels", "mysql-interview-questions"],
  },
  {
    slug: "foreign-keys-vs-app-invariants",
    title: "Foreign Keys vs Application Invariants",
    subcategory: "Schema",
    description:
      "The database can refuse an orphan. The app can still lie. Pick which layer you trust.",
    targetIntent: "architecture",
    technologies: ["SQL"],
    tags: ["sql"],
    relatedArticles: ["schema-design-for-events", "sql-interview-questions"],
  },
  {
    slug: "migrations-without-downtime",
    title: "Schema Migrations Without Taking the Site Down",
    subcategory: "Migrations",
    description:
      "Expand, deploy, contract. Lock time is a product feature.",
    targetIntent: "architecture",
    difficulty: "senior",
    technologies: ["SQL"],
    tags: ["sql", "migrations"],
    relatedArticles: ["laravel-migrations-expand-contract", "indexes-that-match-the-query"],
  },
  {
    slug: "pagination-and-indexes",
    title: "Pagination That Uses an Index",
    subcategory: "Queries",
    description:
      "Why OFFSET 100000 is a full walk, and how a seek pagination query looks.",
    targetIntent: "problem-solving",
    technologies: ["SQL"],
    tags: ["sql"],
    relatedArticles: ["pagination-cursor-vs-offset", "indexes-that-match-the-query"],
  },
  {
    slug: "sql-null-three-valued-logic",
    title: "NULL and Three-Valued Logic: The Filter That Dropped Rows",
    subcategory: "Language",
    description:
      "UNKNOWN is not false. NOT IN (NULL) will humble you.",
    targetIntent: "educational",
    difficulty: "beginner",
    technologies: ["SQL"],
    tags: ["sql"],
    relatedArticles: ["sql-interview-questions", "sql-injection-still"],
  },
  {
    slug: "postgres-partial-indexes",
    title: "Partial Indexes in PostgreSQL",
    subcategory: "PostgreSQL",
    description:
      "Index the open tickets, not the closed history, when the query always filters that way.",
    targetIntent: "educational",
    technologies: ["PostgreSQL"],
    tags: ["postgresql", "indexes"],
    relatedArticles: ["indexes-that-match-the-query", "postgres-jsonb-when"],
  },
  {
    slug: "mysql-charsets-and-collations",
    title: "MySQL Charsets and Collations: The Equality Bug You Cannot See",
    subcategory: "MySQL",
    description:
      "utf8 vs utf8mb4, case, accents, and the unique key that was not unique.",
    targetIntent: "troubleshooting",
    technologies: ["MySQL"],
    tags: ["mysql"],
    relatedArticles: ["mysql-interview-questions", "sql-null-three-valued-logic"],
  },
  {
    slug: "covering-indexes",
    title: "Covering Indexes: When the Index Is the Table",
    subcategory: "Indexes",
    description:
      "Index-only scans, included columns, and the write cost you accept.",
    targetIntent: "educational",
    technologies: ["SQL"],
    tags: ["sql", "indexes"],
    relatedArticles: ["indexes-that-match-the-query", "explain-plans-how-to-read"],
  },
  {
    slug: "sql-window-functions-practical",
    title: "Window Functions for Rank, Running Totals, and \"Latest Row\"",
    subcategory: "Queries",
    description:
      "ROW_NUMBER for latest-per-group, and the subquery you can delete.",
    targetIntent: "educational",
    technologies: ["SQL"],
    tags: ["sql"],
    relatedArticles: ["sql-interview-questions", "pagination-and-indexes"],
  },
  {
    slug: "connection-pooling",
    title: "Connection Pooling: Size, Timeouts, and Serverless",
    subcategory: "Operations",
    description:
      "Why Lambda plus a naive pool melts max_connections, and what PgBouncer is for.",
    targetIntent: "troubleshooting",
    technologies: ["SQL", "AWS"],
    tags: ["sql", "operations"],
    relatedArticles: ["lambda-failure-modes", "vpc-and-lambda-cold-starts"],
  },
  {
    slug: "read-replicas-lag",
    title: "Read Replicas and the Stale Read After Write",
    subcategory: "Architecture",
    description:
      "Send the write to primary. Do not read the replica for the next screen if the user must see their save.",
    targetIntent: "architecture",
    technologies: ["SQL"],
    tags: ["sql"],
    relatedArticles: ["consistency-vs-availability-product", "connection-pooling"],
  },
  {
    slug: "schema-design-for-events",
    title: "Schema Design When the Facts Are Events",
    subcategory: "Schema",
    description:
      "Append-only facts vs mutable snapshots, and the query you will need on day 30.",
    targetIntent: "architecture",
    difficulty: "senior",
    technologies: ["SQL"],
    tags: ["sql", "events"],
    relatedArticles: ["event-driven-vs-request-response", "postgres-jsonb-when"],
  },
  {
    slug: "sql-injection-still",
    title: "SQL Injection Is Still a Parameter Problem",
    subcategory: "Security",
    description:
      "ORMs help until you concatenate. Prepared statements are the habit.",
    targetIntent: "educational",
    difficulty: "beginner",
    technologies: ["SQL"],
    tags: ["sql", "security"],
    relatedArticles: ["sql-interview-questions", "backend-validation-at-the-edge"],
  },
]);

export const awsCloud = entries("aws-cloud", [
  {
    slug: "aws-interview-questions",
    title: "AWS Interview Questions, With the Reasoning",
    subcategory: "Interview Lab",
    description:
      "IAM, failure modes, and the services you should name only if you can describe the blast radius.",
    targetIntent: "interview",
    difficulty: "mixed",
    technologies: ["AWS"],
    tags: ["aws", "interviews"],
    relatedArticles: ["lambda-failure-modes", "iam-least-privilege-in-practice"],
    priority: "high",
    section: "interview",
  },
  {
    slug: "docker-interview-questions",
    title: "Docker Interview Questions, With the Reasoning",
    subcategory: "Interview Lab",
    description:
      "Images, layers, processes, and the difference between \"it runs on my machine\" and a production image.",
    targetIntent: "interview",
    difficulty: "mixed",
    technologies: ["Docker"],
    tags: ["docker", "interviews"],
    relatedArticles: ["docker-multi-stage-builds", "container-image-supply-chain"],
    priority: "high",
    section: "interview",
  },
  {
    slug: "lambda-failure-modes",
    title: "AWS Lambda Failure Modes You Should Budget For",
    subcategory: "Lambda",
    description:
      "Timeouts, retries, partial batch failure, and the handler that is not idempotent.",
    targetIntent: "troubleshooting",
    technologies: ["AWS", "AWS Lambda"],
    tags: ["aws", "lambda"],
    relatedArticles: [
      "aws-interview-questions",
      "sqs-visibility-timeout",
      "designing-idempotent-post-handlers",
    ],
    status: "published",
    priority: "high",
  },
  {
    slug: "iam-least-privilege-in-practice",
    title: "IAM Least Privilege in Practice",
    subcategory: "IAM",
    description:
      "Start from the action the function takes. \"AdministratorAccess for now\" becomes forever.",
    targetIntent: "educational",
    technologies: ["AWS"],
    tags: ["aws", "iam", "security"],
    relatedArticles: ["aws-interview-questions", "secrets-manager-vs-env"],
  },
  {
    slug: "sqs-visibility-timeout",
    title: "SQS Visibility Timeout vs the Work Duration",
    subcategory: "Messaging",
    description:
      "If processing is longer than visibility, you will double-process. If it is too long, failures sit invisible.",
    targetIntent: "troubleshooting",
    technologies: ["AWS"],
    tags: ["aws", "sqs"],
    relatedArticles: ["lambda-failure-modes", "queues-and-poison-messages"],
  },
  {
    slug: "s3-consistency-and-prefixes",
    title: "S3 Prefixes, Listing, and the Consistency You Can Rely On",
    subcategory: "Storage",
    description:
      "What listing costs, how keys should be designed, and what \"read after write\" does not mean for every operation.",
    targetIntent: "informational",
    technologies: ["AWS"],
    tags: ["aws", "s3"],
    relatedArticles: ["aws-interview-questions", "data-pipelines-backpressure"],
  },
  {
    slug: "vpc-and-lambda-cold-starts",
    title: "VPC ENIs and Lambda Cold Starts",
    subcategory: "Lambda",
    description:
      "When the function needs a VPC, what you pay in init, and the alternatives worth checking first.",
    targetIntent: "troubleshooting",
    technologies: ["AWS", "AWS Lambda"],
    tags: ["aws", "lambda"],
    relatedArticles: ["lambda-failure-modes", "connection-pooling"],
  },
  {
    slug: "cloudwatch-alarms-that-page",
    title: "CloudWatch Alarms That Page a Human",
    subcategory: "Operations",
    description:
      "Burn rate, missing data, and the alarm that fired because a batch job is allowed to fail.",
    targetIntent: "educational",
    technologies: ["AWS"],
    tags: ["aws", "observability"],
    relatedArticles: ["observability-three-signals", "capacity-and-slos"],
  },
  {
    slug: "docker-multi-stage-builds",
    title: "Docker Multi-Stage Builds That Keep Secrets Out of Layers",
    subcategory: "Docker",
    description:
      "Build deps vs runtime deps, and the COPY that leaked a .env.",
    targetIntent: "educational",
    technologies: ["Docker"],
    tags: ["docker"],
    relatedArticles: ["docker-interview-questions", "container-image-supply-chain"],
  },
  {
    slug: "ecs-vs-lambda",
    title: "ECS vs Lambda: Pick from the Latency and Ops Budget",
    subcategory: "Compute",
    description:
      "Always-on vs burst. Chatty connections vs request-scoped compute.",
    targetIntent: "comparison",
    technologies: ["AWS"],
    tags: ["aws"],
    relatedArticles: ["lambda-failure-modes", "aws-interview-questions"],
  },
  {
    slug: "step-functions-when",
    title: "When Step Functions Are the Orchestrator (and When They Are a Tax)",
    subcategory: "Orchestration",
    description:
      "Long workflows, retries, and the state machine that should have been a queue.",
    targetIntent: "comparison",
    technologies: ["AWS"],
    tags: ["aws"],
    relatedArticles: ["background-jobs-vs-request-path", "data-pipelines-backpressure"],
  },
  {
    slug: "secrets-manager-vs-env",
    title: "Secrets Manager vs Environment Variables",
    subcategory: "Security",
    description:
      "Rotation, blast radius, and the Lambda env that still shows up in a screenshot.",
    targetIntent: "comparison",
    technologies: ["AWS"],
    tags: ["aws", "security"],
    relatedArticles: ["iam-least-privilege-in-practice", "nodejs-env-config-and-secrets"],
  },
  {
    slug: "cicd-for-static-next",
    title: "CI/CD for a Static Next.js Site Without Drama",
    subcategory: "Delivery",
    description:
      "Build, preview, promote. Keep secrets out of the client bundle.",
    targetIntent: "educational",
    technologies: ["Next.js"],
    tags: ["cicd", "nextjs"],
    relatedArticles: ["blue-green-vs-flags", "feature-flags-as-architecture"],
  },
  {
    slug: "terraform-state-and-blast-radius",
    title: "Terraform State and Blast Radius",
    subcategory: "IaC",
    description:
      "Who can apply, what a workspace contains, and the destroy you will not run from a laptop.",
    targetIntent: "architecture",
    difficulty: "senior",
    technologies: ["AWS"],
    tags: ["terraform", "aws"],
    relatedArticles: ["iam-least-privilege-in-practice", "backup-restore-you-rehearsed"],
  },
  {
    slug: "aws-cost-the-query-you-forgot",
    title: "AWS Cost: The Query, the Log, and the NAT You Forgot",
    subcategory: "Cost",
    description:
      "Chatty Lambdas, chatty logs, and data transfer that does not show up on the architecture slide.",
    targetIntent: "problem-solving",
    technologies: ["AWS"],
    tags: ["aws", "cost"],
    relatedArticles: ["lambda-failure-modes", "s3-consistency-and-prefixes"],
  },
  {
    slug: "blue-green-vs-flags",
    title: "Blue/Green vs Feature Flags",
    subcategory: "Delivery",
    description:
      "Infrastructure cutover vs in-process rollout. You often want both.",
    targetIntent: "comparison",
    technologies: ["AWS"],
    tags: ["delivery"],
    relatedArticles: ["feature-flags-as-architecture", "cicd-for-static-next"],
  },
  {
    slug: "container-image-supply-chain",
    title: "Container Image Supply Chain: Base, Pin, Scan",
    subcategory: "Security",
    description:
      "Digest pins, SBOM habits, and the latest tag that is not a version.",
    targetIntent: "educational",
    technologies: ["Docker"],
    tags: ["docker", "security"],
    relatedArticles: ["docker-interview-questions", "php-composer-and-autoload"],
  },
  {
    slug: "api-gateway-timeouts",
    title: "API Gateway Timeouts vs Lambda Timeouts",
    subcategory: "HTTP",
    description:
      "The shorter timeout wins. The user sees 504 while your function is still writing.",
    targetIntent: "troubleshooting",
    technologies: ["AWS"],
    tags: ["aws"],
    relatedArticles: ["lambda-failure-modes", "nodejs-timeouts-and-cancellation"],
  },
  {
    slug: "observability-three-signals",
    title: "The Three Signals: Latency, Errors, Saturation",
    subcategory: "Operations",
    description:
      "If your dashboard cannot say whether to wake someone, it is not an SLO dashboard.",
    targetIntent: "informational",
    technologies: ["AWS"],
    tags: ["observability"],
    relatedArticles: ["cloudwatch-alarms-that-page", "capacity-and-slos"],
  },
  {
    slug: "backup-restore-you-rehearsed",
    title: "Backups You Have Restored at Least Once",
    subcategory: "Operations",
    description:
      "A backup that has never been restored is a hope. Rehearse the restore.",
    targetIntent: "educational",
    technologies: ["AWS"],
    tags: ["operations"],
    relatedArticles: ["terraform-state-and-blast-radius", "what-i-put-in-a-runbook"],
  },
]);
