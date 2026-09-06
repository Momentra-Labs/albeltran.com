import type { LabDifficulty, LabEducationBlock } from "./types";

export type DebugEvidence = {
  id: string;
  label: string;
  detail: string;
  relevant: boolean;
};

export type DebugChallenge = {
  id: string;
  title: string;
  difficulty: LabDifficulty;
  summary: string;
  symptoms: string[];
  logs: string[];
  metrics: { label: string; value: string }[];
  evidence: DebugEvidence[];
  causes: { id: string; label: string }[];
  correctCause: string;
  explanation: string;
};

export const DEBUG_CHALLENGES: readonly DebugChallenge[] = [
  {
    id: "cache-stampede",
    title: "Cache stampede after deploy",
    difficulty: "mid",
    summary: "p95 latency jumped from 80ms to 1.9s after a config deploy. Error rate is still low.",
    symptoms: [
      "Checkout feels slow but succeeds",
      "Only the product-detail path is affected",
      "Started at 14:02 UTC, same minute as a config push",
    ],
    logs: [
      "14:02:01 WARN cache: GET product:449 miss",
      "14:02:01 WARN cache: GET product:449 miss",
      "14:02:02 ERROR db: statement timeout after 1500ms SELECT * FROM products WHERE id=449",
      "14:02:03 INFO deploy: cache.ttl_seconds set to 0",
    ],
    metrics: [
      { label: "Cache hit rate", value: "12%" },
      { label: "DB CPU", value: "91%" },
      { label: "Error rate", value: "0.4%" },
    ],
    evidence: [
      { id: "ttl", label: "TTL set to 0", detail: "Config deploy zeroed cache TTL.", relevant: true },
      { id: "db", label: "DB CPU 91%", detail: "Primary is serving every product read.", relevant: true },
      { id: "dns", label: "DNS lookup times", detail: "Unchanged at 12ms.", relevant: false },
      { id: "js", label: "Bundle size", detail: "Frontend bundle did not change.", relevant: false },
    ],
    causes: [
      { id: "ttl-zero", label: "Cache TTL set to 0, stampeding the database" },
      { id: "deadlock", label: "Database deadlock on checkout" },
      { id: "cdn", label: "CDN outage in one region" },
    ],
    correctCause: "ttl-zero",
    explanation:
      "A config deploy set TTL to zero. Every product read missed cache and hit the primary. Errors stayed low because queries still returned — slowly.",
  },
  {
    id: "missing-index",
    title: "Checkout full table scan",
    difficulty: "junior",
    summary: "Checkout query time moved from 20ms to 4s after orders passed 4 million rows.",
    symptoms: ["Timeouts only on order history", "Writes still fast", "Started gradually, not at a deploy"],
    logs: [
      "EXPLAIN SELECT * FROM orders WHERE user_id=18 AND status='open'",
      "Seq Scan on orders  (cost=0.00..188210) rows=4e6",
      "No index matches (user_id, status)",
    ],
    metrics: [
      { label: "Rows", value: "4.1M" },
      { label: "Index hit", value: "0%" },
      { label: "Lock waits", value: "low" },
    ],
    evidence: [
      { id: "explain", label: "Seq scan in EXPLAIN", detail: "Planner is reading the heap.", relevant: true },
      { id: "growth", label: "Table growth", detail: "Row count crossed a few million.", relevant: true },
      { id: "redis", label: "Redis evictions", detail: "None.", relevant: false },
    ],
    causes: [
      { id: "no-index", label: "Missing composite index on (user_id, status)" },
      { id: "gc", label: "Node.js garbage collection pause" },
      { id: "tls", label: "Expired TLS certificate" },
    ],
    correctCause: "no-index",
    explanation:
      "The query was fine at 200k rows and became a sequential scan at millions. An index on the filter columns is the first fix.",
  },
  {
    id: "db-deadlock",
    title: "Checkout deadlock loop",
    difficulty: "senior",
    summary: "Two workers retry the same order pair and never finish.",
    symptoms: ["Intermittent checkout failures", "Retries climb", "Only when two items update stock together"],
    logs: [
      "ERROR deadlock detected",
      "Process 41 waits for transaction 88; Process 88 waits for transaction 41",
      "UPDATE inventory SET qty = qty-1 WHERE sku='A'",
      "UPDATE inventory SET qty = qty-1 WHERE sku='B'",
    ],
    metrics: [
      { label: "Deadlocks / min", value: "14" },
      { label: "Retry storm", value: "yes" },
      { label: "CPU", value: "35%" },
    ],
    evidence: [
      { id: "order", label: "Lock order differs", detail: "Workers lock SKUs in request order.", relevant: true },
      { id: "retry", label: "Unbounded retry", detail: "Both workers retry immediately.", relevant: true },
      { id: "cdn", label: "CDN 5xx", detail: "None.", relevant: false },
    ],
    causes: [
      { id: "lock-order", label: "Inconsistent lock order plus retry storm" },
      { id: "disk", label: "Disk full on the primary" },
      { id: "oauth", label: "OAuth token expiry" },
    ],
    correctCause: "lock-order",
    explanation:
      "Each worker locked SKUs in a different order. Immediate retries reproduced the cycle. Sort lock targets and back off.",
  },
  {
    id: "nplus-api",
    title: "N+1 in the order API",
    difficulty: "junior",
    summary: "A list endpoint takes 3s for 50 orders after a 'clean' rewrite.",
    symptoms: ["Latency linear with page size", "DB QPS spiked 50×", "CPU on API boxes is fine"],
    logs: [
      "GET /orders 50 rows",
      "SELECT * FROM orders LIMIT 50",
      "SELECT * FROM customers WHERE id=…  (×50)",
      "SELECT * FROM items WHERE order_id=…  (×50)",
    ],
    metrics: [
      { label: "Queries / request", value: "101" },
      { label: "p95", value: "3.1s" },
      { label: "API CPU", value: "22%" },
    ],
    evidence: [
      { id: "queries", label: "101 queries", detail: "One list plus per-row lookups.", relevant: true },
      { id: "orm", label: "ORM rewrite", detail: "Lazy relations loaded in a loop.", relevant: true },
      { id: "tls", label: "Handshake errors", detail: "None.", relevant: false },
    ],
    causes: [
      { id: "nplus", label: "N+1 queries after an ORM rewrite" },
      { id: "slow-disk", label: "Slow disk on the API host" },
      { id: "cors", label: "CORS preflight storm" },
    ],
    correctCause: "nplus",
    explanation:
      "The list query is cheap. The per-row customer and item lookups are not. Join or prefetch.",
  },
  {
    id: "jwt-skew",
    title: "Midnight auth outage",
    difficulty: "mid",
    summary: "A slice of users get 401s every night for four minutes.",
    symptoms: ["Only users near a timezone boundary", "Tokens look valid in jwt.io", "Recovers without a deploy"],
    logs: [
      "ERROR jwt expired at 2026-03-10T16:00:00Z",
      "INFO server clock 2026-03-10T16:03:12Z",
      "INFO ntp: offset +214s on auth-3",
    ],
    metrics: [
      { label: "401 rate", value: "9%" },
      { label: "NTP offset auth-3", value: "+214s" },
      { label: "Other auth boxes", value: "ok" },
    ],
    evidence: [
      { id: "ntp", label: "Clock skew", detail: "One auth box drifted.", relevant: true },
      { id: "exp", label: "Expiry errors", detail: "Tokens rejected early.", relevant: true },
      { id: "redis", label: "Session flush", detail: "No flush events.", relevant: false },
    ],
    causes: [
      { id: "skew", label: "Auth node clock skew invalidates JWTs" },
      { id: "bcrypt", label: "bcrypt cost set to 18" },
      { id: "cors", label: "Cookie SameSite change" },
    ],
    correctCause: "skew",
    explanation:
      "One node drifted more than two minutes. Short-lived tokens looked expired only on that box.",
  },
  {
    id: "queue-poison",
    title: "Poison message, growing lag",
    difficulty: "mid",
    summary: "The email queue lag grows all afternoon. Send rate is zero.",
    symptoms: ["Workers restart every 30s", "Oldest message is the same ID", "New mail never sends"],
    logs: [
      "ERROR cannot parse payload orderId=undefined",
      "WARN retry attempt 412 message=msg_9f",
      "INFO worker exit code 1",
    ],
    metrics: [
      { label: "Lag", value: "180k" },
      { label: "In flight", value: "1" },
      { label: "DLQ", value: "empty" },
    ],
    evidence: [
      { id: "same", label: "Same message ID", detail: "The head never advances.", relevant: true },
      { id: "parse", label: "Parse error", detail: "A bad payload crashes the worker.", relevant: true },
      { id: "ses", label: "SES quota", detail: "Unused.", relevant: false },
    ],
    causes: [
      { id: "poison", label: "Poison message with no dead-letter path" },
      { id: "ses", label: "Email vendor outage" },
      { id: "dns", label: "MX record removed" },
    ],
    correctCause: "poison",
    explanation:
      "One bad payload crashed the worker. Visibility timeout returned it to the head. A DLQ and a guard would unblock the rest.",
  },
  {
    id: "cors-preflight",
    title: "Checkout blocked in the browser",
    difficulty: "junior",
    summary: "API health checks are green. The SPA checkout button does nothing.",
    symptoms: ["Only the new web client fails", "curl to the API works", "Mobile app works"],
    logs: [
      "OPTIONS /checkout 403",
      "Access-Control-Allow-Origin does not match https://app.example.com",
      "GET /health 200",
    ],
    metrics: [
      { label: "API 2xx", value: "99.9%" },
      { label: "Browser console", value: "CORS error" },
      { label: "Mobile errors", value: "0" },
    ],
    evidence: [
      { id: "origin", label: "Origin mismatch", detail: "Allowed list missed the new host.", relevant: true },
      { id: "options", label: "OPTIONS 403", detail: "Preflight dies.", relevant: true },
      { id: "db", label: "Slow queries", detail: "None.", relevant: false },
    ],
    causes: [
      { id: "cors", label: "CORS allow-list missing the new SPA origin" },
      { id: "db-down", label: "Database failover" },
      { id: "jwt", label: "JWT secret rotated" },
    ],
    correctCause: "cors",
    explanation:
      "Health checks never send a browser Origin. The SPA preflight does. The allow-list was stale.",
  },
  {
    id: "disk-full",
    title: "Silent 500s on one node",
    difficulty: "junior",
    summary: "One API instance returns 500s. The load balancer still sends it traffic.",
    symptoms: ["Errors from a single instance IP", "Others healthy", "Started after a log-level change"],
    logs: [
      "ERROR no space left on device",
      "WARN failed to write /var/log/app.log",
      "ERROR cannot create temp upload",
    ],
    metrics: [
      { label: "Disk api-4", value: "100%" },
      { label: "5xx share", value: "only api-4" },
      { label: "CPU", value: "18%" },
    ],
    evidence: [
      { id: "disk", label: "Disk full", detail: "Debug logs filled the volume.", relevant: true },
      { id: "lb", label: "LB still routing", detail: "Health check only hits /health in memory.", relevant: true },
      { id: "code", label: "New exception type", detail: "No new throw sites.", relevant: false },
    ],
    causes: [
      { id: "full", label: "Disk full from debug logs; health check too shallow" },
      { id: "oom", label: "Cluster-wide OOM" },
      { id: "ssl", label: "Certificate expired" },
    ],
    correctCause: "full",
    explanation:
      "Debug logging filled the disk. In-memory health still passed, so the balancer kept sending users to a node that could not write.",
  },
  {
    id: "feature-flag",
    title: "Flag on for 100%",
    difficulty: "mid",
    summary: "A '10% experiment' is on for everyone and calls a new pricing service that times out.",
    symptoms: ["Checkout p95 8s", "Started when a flag changed", "Old pricing path is fine when the flag is off"],
    logs: [
      "INFO flag pricing_v2=100%",
      "ERROR pricing-v2 timeout 5000ms",
      "WARN fallback disabled",
    ],
    metrics: [
      { label: "Flag", value: "100%" },
      { label: "pricing-v2 p95", value: "5.1s" },
      { label: "Old path p95", value: "90ms" },
    ],
    evidence: [
      { id: "flag", label: "100% rollout", detail: "Intended 10%.", relevant: true },
      { id: "no-fb", label: "Fallback off", detail: "Timeouts fail the request.", relevant: true },
      { id: "db", label: "DB locks", detail: "Normal.", relevant: false },
    ],
    causes: [
      { id: "flag-all", label: "Feature flag at 100% with fallback disabled" },
      { id: "index", label: "Missing index on prices" },
      { id: "cdn", label: "CDN purge loop" },
    ],
    correctCause: "flag-all",
    explanation:
      "The experiment targeted 10% and shipped at 100% with no fallback. The new dependency's timeout became everyone's checkout.",
  },
  {
    id: "connection-pool",
    title: "Pool exhaustion after a deploy",
    difficulty: "senior",
    summary: "Requests queue in the API. The database reports few active queries.",
    symptoms: ["p99 climbs, then cliffs", "Happens under modest traffic", "New HTTP client per request in a PR"],
    logs: [
      "WARN checkout: waiting for connection from pool",
      "INFO Pool size=10 idle=0 waiting=84",
      "DEBUG created new MysqlDataSource in request thread",
    ],
    metrics: [
      { label: "DB sessions", value: "12" },
      { label: "API waiters", value: "84" },
      { label: "Traffic", value: "normal" },
    ],
    evidence: [
      { id: "pool", label: "Pool waiters", detail: "Threads wait, DB is idle.", relevant: true },
      { id: "new-ds", label: "New datasource per request", detail: "Leak / no reuse.", relevant: true },
      { id: "slow-sql", label: "Slow query log", detail: "Empty.", relevant: false },
    ],
    causes: [
      { id: "pool-leak", label: "Connection pool leak from a per-request client" },
      { id: "vacuum", label: "Postgres autovacuum storm" },
      { id: "bgp", label: "BGP flap" },
    ],
    correctCause: "pool-leak",
    explanation:
      "The database was fine. The app opened clients and never returned them. Waits piled up in the pool, not in SQL.",
  },
];

export function getDebugChallenge(id: string) {
  return DEBUG_CHALLENGES.find((item) => item.id === id);
}

export const DEBUG_EDUCATION: LabEducationBlock = {
  howItWorks: [
    "Read symptoms, logs, and metrics. Mark the evidence that actually matters.",
    "Pick one root cause. The score rewards the cause and the relevant evidence — not every highlighted line.",
  ],
  keyConcepts: [
    {
      title: "Change + signal",
      body: "Incidents usually start with a deploy, a flag, growth, or a dependency. Tie the timestamp to a signal.",
    },
    {
      title: "Disconfirm",
      body: "Green health checks and unused systems are useful. They stop you from boiling the ocean.",
    },
  ],
  commonMistakes: [
    "Blaming the database because it is on the dashboard, even when it is idle.",
    "Selecting every log line so the score looks thorough.",
  ],
  interviewTips: [
    "Say what you would check first and what would falsify it.",
    "Separate user symptom, system signal, and recent change.",
  ],
};
