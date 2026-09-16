import type { LabDifficulty, LabEducationBlock } from "./types";

export type IncidentChannelId =
  | "logs"
  | "metrics"
  | "traces"
  | "database"
  | "cache"
  | "api"
  | "deploys"
  | "changes";

export type IncidentChannel = {
  id: IncidentChannelId;
  label: string;
  signal: "hot" | "warm" | "noise";
  lines: string[];
};

export type IncidentCause = {
  id: string;
  label: string;
};

export type IncidentScenario = {
  id: string;
  number: string;
  title: string;
  difficulty: LabDifficulty;
  category: string;
  environment: string;
  started: string;
  symptoms: { label: string; value: string }[];
  channels: IncidentChannel[];
  causes: IncidentCause[];
  correctCause: string;
  happened: string;
  evidence: string[];
  whySymptoms: string;
  rootCause: string;
  fix: string;
  tradeoffs: string;
  monitor: string;
};

export const INCIDENT_CHANNELS: { id: IncidentChannelId; label: string }[] = [
  { id: "logs", label: "Logs" },
  { id: "metrics", label: "Metrics" },
  { id: "traces", label: "Traces" },
  { id: "database", label: "Database" },
  { id: "cache", label: "Cache" },
  { id: "api", label: "API" },
  { id: "deploys", label: "Deploys" },
  { id: "changes", label: "Changes" },
];

export const INCIDENT_SCENARIOS: readonly IncidentScenario[] = [
  {
    id: "4821",
    number: "4821",
    title: "Checkout latency +382%",
    difficulty: "mid",
    category: "Production / connection pool",
    environment: "EU-WEST-1",
    started: "02:14 UTC",
    symptoms: [
      { label: "Checkout API latency", value: "+382%" },
      { label: "Error rate", value: "7.2%" },
      { label: "Requests/min", value: "18,431" },
      { label: "Database connections", value: "98%" },
    ],
    channels: [
      {
        id: "metrics",
        label: "Metrics",
        signal: "hot",
        lines: [
          "p95 checkout 240ms → 1.16s since 02:14",
          "HTTP 5xx 0.3% → 7.2%",
          "db.connections.active 196 / 200",
          "db.waiters 84 and climbing",
          "cpu.api 41% — boxes are not the bottleneck",
        ],
      },
      {
        id: "logs",
        label: "Logs",
        signal: "hot",
        lines: [
          "02:14:08 WARN checkout: waiting for connection 847ms",
          "02:14:11 ERROR checkout: HikariPool-1 Timeout after 1000ms",
          "02:14:12 WARN checkout: GET /cart reused a request-scoped session",
          "02:15:01 INFO inventory: scheduled sync still holding 40 connections",
        ],
      },
      {
        id: "database",
        label: "Database",
        signal: "hot",
        lines: [
          "pg_stat_activity: 38 idle-in-transaction from inventory-sync",
          "oldest idle-in-transaction: 11m",
          "locks: row exclusive on inventory — not blocking checkout reads",
          "slow query log: checkout SELECTs are 8–12ms when they get a connection",
        ],
      },
      {
        id: "traces",
        label: "Traces",
        signal: "warm",
        lines: [
          "span checkout.handle 1.1s",
          "  ├─ db.acquire 980ms",
          "  └─ db.query 11ms",
          "No downstream timeout on payments.",
        ],
      },
      {
        id: "cache",
        label: "Cache",
        signal: "noise",
        lines: [
          "hit rate 91%",
          "evictions normal",
          "catalog keys unchanged",
        ],
      },
      {
        id: "api",
        label: "API",
        signal: "warm",
        lines: [
          "checkout replicas: 8, healthy",
          "thread pools not saturated",
          "only /checkout and /cart wait on the shared pool",
        ],
      },
      {
        id: "deploys",
        label: "Deploys",
        signal: "warm",
        lines: [
          "01:58 inventory-sync v2.4.1 — added a 15-minute catch-up job",
          "checkout API last ship: yesterday 18:22, error rate flat until 02:14",
        ],
      },
      {
        id: "changes",
        label: "Changes",
        signal: "hot",
        lines: [
          "inventory-sync v2.4.1 opens a session per SKU batch and commits at the end of the run",
          "PR note: 'faster catch-up if we keep the session warm'",
          "No pool-size change. Default max 200.",
        ],
      },
    ],
    causes: [
      { id: "pool-leak", label: "Connection leak / held sessions from inventory-sync" },
      { id: "slow-query", label: "A new unindexed checkout query" },
      { id: "cache-miss", label: "Cache stampede on product pages" },
      { id: "bad-build", label: "Broken checkout deploy at 02:14" },
    ],
    correctCause: "pool-leak",
    happened:
      "The 01:58 inventory-sync job started a catch-up after a delayed feed. It held database sessions idle-in-transaction for the whole batch.",
    evidence: [
      "Pool sat at 98% with waiters while API CPU stayed calm.",
      "Traces spent ~1s in db.acquire, ~11ms in the query.",
      "pg_stat_activity showed idle-in-transaction from inventory-sync, oldest 11 minutes.",
      "Checkout itself had not shipped since yesterday.",
    ],
    whySymptoms:
      "Checkout queries were still cheap. They just could not borrow a connection. Latency and 5xx rose together because the pool timed out.",
    rootCause:
      "A connection leak: the sync job kept sessions open across a long batch instead of borrowing per statement and releasing.",
    fix:
      "Kill the idle transactions, roll the sync to commit-per-batch, set a statement/idle timeout, and cap the job's pool.",
    tradeoffs:
      "Per-batch commits are slower for the catch-up job. A dedicated pool isolates checkout but hides a leak until that pool dies too.",
    monitor:
      "idle-in-transaction age, pool waiters, connections by application_name, and a page if waiters > 0 for 60s.",
  },
  {
    id: "cache-stampede",
    number: "4904",
    title: "Cache hit rate collapse",
    difficulty: "mid",
    category: "Production / cache",
    environment: "US-EAST-1",
    started: "14:02 UTC",
    symptoms: [
      { label: "Product p95", value: "80ms → 1.9s" },
      { label: "Cache hit rate", value: "12%" },
      { label: "DB CPU", value: "91%" },
      { label: "Error rate", value: "0.4%" },
    ],
    channels: [
      {
        id: "metrics",
        label: "Metrics",
        signal: "hot",
        lines: [
          "cache.hit_rate 94% → 12% at 14:02",
          "db.cpu 91%",
          "errors still 0.4% — requests complete, slowly",
        ],
      },
      {
        id: "changes",
        label: "Changes",
        signal: "hot",
        lines: [
          "14:02 config: cache.ttl_seconds = 0",
          "ticket: 'disable cache in staging' — applied to prod cluster",
        ],
      },
      {
        id: "deploys",
        label: "Deploys",
        signal: "hot",
        lines: [
          "14:02 config-service: stampede-hotfix? no — ttl experiment",
          "product-api binary unchanged",
        ],
      },
      {
        id: "logs",
        label: "Logs",
        signal: "hot",
        lines: [
          "14:02:01 WARN cache: GET product:449 miss",
          "14:02:01 WARN cache: GET product:449 miss",
          "14:02:02 ERROR db: statement timeout SELECT * FROM products WHERE id=449",
        ],
      },
      {
        id: "cache",
        label: "Cache",
        signal: "hot",
        lines: [
          "Redis up. Memory fine.",
          "Every GET is a miss because TTL is 0.",
          "No singleflight / request coalescing on the API.",
        ],
      },
      {
        id: "database",
        label: "Database",
        signal: "warm",
        lines: [
          "Same product id requested thousands of times per second",
          "No lock pileup — just read volume",
        ],
      },
      {
        id: "traces",
        label: "Traces",
        signal: "warm",
        lines: [
          "product.show: cache.get miss → db.query 40–1500ms",
        ],
      },
      {
        id: "api",
        label: "API",
        signal: "noise",
        lines: [
          "Replicas healthy. No 5xx storm.",
        ],
      },
    ],
    causes: [
      { id: "ttl-zero", label: "Prod cache TTL set to 0 — stampede on the primary" },
      { id: "redis-down", label: "Redis process crashed" },
      { id: "index", label: "Missing index on products.id" },
      { id: "dns", label: "DNS failure in the region" },
    ],
    correctCause: "ttl-zero",
    happened:
      "A staging config that zeroed cache TTL was applied to the production cluster at 14:02.",
    evidence: [
      "Hit rate collapsed the same minute as the config push.",
      "Logs show repeated misses for the same product key.",
      "Redis itself was up; TTL was the contract that broke.",
    ],
    whySymptoms:
      "Every product read fell through to the database at once. Errors stayed low because most queries still returned.",
    rootCause:
      "TTL 0 plus no request coalescing. That is a cache stampede, not a Redis outage.",
    fix:
      "Revert the config, restore a positive TTL, and coalesce in-flight lookups for a given key.",
    tradeoffs:
      "A short TTL is useful for merchandising freshness. Zero is not a freshness strategy. Singleflight adds a little code and removes a thundering herd.",
    monitor:
      "hit rate, TTL histogram, identical-key miss bursts, and a config-diff alert when prod TTL changes.",
  },
  {
    id: "bad-deploy",
    number: "5110",
    title: "Errors after a tax release",
    difficulty: "junior",
    category: "Production / release",
    environment: "AP-SOUTHEAST-1",
    started: "09:41 UTC",
    symptoms: [
      { label: "Error rate", value: "0.2% → 18%" },
      { label: "Traffic", value: "unchanged" },
      { label: "Failing routes", value: "/checkout/tax only" },
      { label: "Last deploy", value: "09:40" },
    ],
    channels: [
      {
        id: "deploys",
        label: "Deploys",
        signal: "hot",
        lines: [
          "09:40 checkout-api v6.3.0 — tax calculation rewrite",
          "canary was 5% for 90s, then 100%",
          "previous version v6.2.4 still in the rollback slot",
        ],
      },
      {
        id: "logs",
        label: "Logs",
        signal: "hot",
        lines: [
          "09:41 ERROR tax: NullPointerException countryCode",
          "09:41 ERROR tax: unexpected ISO code 'PH '",
          "Only /checkout/tax. /cart and /pay are clean.",
        ],
      },
      {
        id: "api",
        label: "API",
        signal: "hot",
        lines: [
          "18% 500s isolated to the tax handler",
          "payloads with a trailing space in country fail",
        ],
      },
      {
        id: "changes",
        label: "Changes",
        signal: "hot",
        lines: [
          "v6.3.0 dropped trim() on countryCode",
          "unit tests used 'PH' and 'US' only",
        ],
      },
      {
        id: "metrics",
        label: "Metrics",
        signal: "warm",
        lines: [
          "error rate tracks the 09:40 ship",
          "db and cache flat",
        ],
      },
      {
        id: "traces",
        label: "Traces",
        signal: "warm",
        lines: [
          "tax.compute throws before any SQL",
        ],
      },
      {
        id: "database",
        label: "Database",
        signal: "noise",
        lines: [
          "No new queries. No lock waits.",
        ],
      },
      {
        id: "cache",
        label: "Cache",
        signal: "noise",
        lines: [
          "Hit rate unchanged.",
        ],
      },
    ],
    causes: [
      { id: "release-bug", label: "Bad tax deploy — untrimmed country codes throw" },
      { id: "pool", label: "Database connection exhaustion" },
      { id: "stampede", label: "Cache stampede" },
      { id: "certs", label: "Expired TLS certificate" },
    ],
    correctCause: "release-bug",
    happened:
      "checkout-api v6.3.0 rewrote tax lookup and stopped trimming country codes. Existing clients still send 'PH '.",
    evidence: [
      "Errors start one minute after the ship.",
      "Only /checkout/tax fails.",
      "Logs name the NPE and the padded ISO code.",
      "Database and cache did not move.",
    ],
    whySymptoms:
      "Traffic was normal. The new code path threw on real payloads the unit tests never sent.",
    rootCause:
      "A release bug with a thin canary. Rollback or a flag would have stopped the blast.",
    fix:
      "Roll back to v6.2.4, restore trim/validation, add a fixture with padded codes, and keep the canary longer.",
    tradeoffs:
      "A longer canary delays the feature. A feature flag is safer than hoping tests match production strings.",
    monitor:
      "error rate by route, version, and country; rollback time; canary abort rules.",
  },
];

export const INCIDENT_EDUCATION: LabEducationBlock = {
  howItWorks: [
    "Open one channel at a time. You do not need every pane to name the cause.",
    "Hot channels usually explain the symptom. Noise channels are there so you practice skipping them.",
    "After you name a cause, the desk shows evidence, the fix, the trade-off, and what to monitor. This is a demo incident — not live telemetry.",
  ],
  keyConcepts: [
    {
      title: "Acquire time vs query time",
      body: "If traces spend a second getting a connection and 10ms running SQL, you do not have a slow query. You have a pool problem.",
    },
    {
      title: "Config is a deploy",
      body: "A TTL change is a release. Treat it like one: diff, canary, and an abort.",
    },
  ],
  commonMistakes: [
    "Scaling API boxes because latency is up. Check the pool and the cache first.",
    "Reading every channel before forming a hypothesis.",
  ],
  interviewTips: [
    "Say the symptom in one sentence, then pick the cheapest signal that would falsify it.",
    "Name the blast radius and the rollback before you name the elegant fix.",
  ],
};

export function getIncident(id: string) {
  return INCIDENT_SCENARIOS.find((item) => item.id === id);
}
