import type { LabEducationBlock } from "./types";

export type BuildChoice = {
  id: string;
  label: string;
  node: string;
  strengths: string[];
  weaknesses: string[];
  bottleneck: string;
  scale: string;
  consistency: string;
  ops: string;
};

export type BuildStep = {
  id: string;
  label: string;
  prompt: string;
  options: BuildChoice[];
};

export type BuildChallenge = {
  id: string;
  title: string;
  tagline: string;
  prompt: string;
  steps: BuildStep[];
  iWouldChange: string;
};

export const BUILD_CHALLENGES: readonly BuildChallenge[] = [
  {
    id: "url-shortener",
    title: "URL shortener",
    tagline: "100M redirects a day. Writes are rare.",
    prompt:
      "Design a short-link service. Redirects dominate. IDs should be unique and not trivial to guess. Analytics can be async.",
    iWouldChange:
      "I would keep the redirect path tiny: cache the mapping, 301 from the edge when a key is hot, and push click counts onto a queue. I would not put search or a wide analytics write on the 301.",
    steps: [
      {
        id: "database",
        label: "Database",
        prompt: "Where does the mapping live?",
        options: [
          {
            id: "postgres",
            label: "PostgreSQL",
            node: "PostgreSQL",
            strengths: ["Simple transactions", "Easy backups", "Good enough at this QPS with a cache"],
            weaknesses: ["Primary can become a hotspot on cache miss"],
            bottleneck: "Write-unique IDs and miss storms",
            scale: "Add a replica for failover; do not serve 100M reads from the primary",
            consistency: "Strong on create. Redirects can be slightly stale if cached.",
            ops: "Familiar. Watch sequence/range allocation if you shard later.",
          },
          {
            id: "dynamo",
            label: "DynamoDB",
            node: "DynamoDB",
            strengths: ["Key-value fits a short code", "Managed partitions"],
            weaknesses: ["Hot keys on popular links", "Cost surprises without TTL/cache"],
            bottleneck: "A celebrity slug",
            scale: "Still needs a cache in front of hot partitions",
            consistency: "Choose keys so creates do not scan",
            ops: "Less server care, more capacity planning on partition keys",
          },
          {
            id: "mongo",
            label: "MongoDB",
            node: "MongoDB",
            strengths: ["Flexible documents if you later store campaign metadata"],
            weaknesses: ["Overkill for a two-field mapping"],
            bottleneck: "Same as any primary without a cache",
            scale: "Cache first. Do not grow the document.",
            consistency: "Fine if the write path stays single-key",
            ops: "Another cluster to patch for little gain",
          },
          {
            id: "cassandra",
            label: "Cassandra",
            node: "Cassandra",
            strengths: ["Write-friendly if you later log every click in the same store"],
            weaknesses: ["Heavy ops for a mapping table"],
            bottleneck: "Team time, not QPS",
            scale: "You will still cache redirects",
            consistency: "Tunable — usually more than you want here",
            ops: "High. I would not start here.",
          },
        ],
      },
      {
        id: "cache",
        label: "Cache",
        prompt: "How do popular redirects stay cheap?",
        options: [
          {
            id: "redis",
            label: "Redis",
            node: "Redis",
            strengths: ["Predictable hot-key path", "Easy TTL"],
            weaknesses: ["Another failover story"],
            bottleneck: "A few keys can still pin one shard",
            scale: "Pair with a CDN for the hottest 301s",
            consistency: "Accept stale mapping for minutes after an edit",
            ops: "Memory and eviction policy matter more than CPU",
          },
          {
            id: "cdn",
            label: "CDN only",
            node: "CDN",
            strengths: ["Cheapest at 100M", "No origin on the hottest keys"],
            weaknesses: ["Purge/edit lag", "First miss still hits origin"],
            bottleneck: "Origin on cold keys and after purge",
            scale: "Excellent for public 301s",
            consistency: "Eventual. Fine for links.",
            ops: "Cache headers and purge rights",
          },
          {
            id: "memory",
            label: "Application memory",
            node: "In-process",
            strengths: ["Zero network on a box"],
            weaknesses: ["Per-replica miss", "Lost on deploy"],
            bottleneck: "Every new replica stamps the database",
            scale: "Does not survive horizontal scale",
            consistency: "Divergent between boxes",
            ops: "Looks simple until you have twelve APIs",
          },
          {
            id: "none",
            label: "No cache",
            node: "Origin",
            strengths: ["Simplest diagram"],
            weaknesses: ["You will pay for every redirect"],
            bottleneck: "The database",
            scale: "Fails the 100M brief",
            consistency: "Always fresh, always expensive",
            ops: "Invoice is the monitor",
          },
        ],
      },
      {
        id: "messaging",
        label: "Messaging",
        prompt: "Where do click counts go?",
        options: [
          {
            id: "kafka",
            label: "Kafka",
            node: "Kafka",
            strengths: ["Replay, multiple consumers, durable analytics"],
            weaknesses: ["Ops weight for a counter"],
            bottleneck: "Cluster cost vs value",
            scale: "Fine if you already run Kafka",
            consistency: "Redirect succeeds even if the consumer lags",
            ops: "I would not introduce Kafka only for this",
          },
          {
            id: "sqs",
            label: "SQS",
            node: "SQS",
            strengths: ["Managed, cheap, good enough for counts"],
            weaknesses: ["No replay story like a log"],
            bottleneck: "Consumer lag, not the 301",
            scale: "Easy",
            consistency: "At-least-once — counts are approximate",
            ops: "Low. Fits a first version.",
          },
          {
            id: "rabbit",
            label: "RabbitMQ",
            node: "RabbitMQ",
            strengths: ["Familiar if the shop already has it"],
            weaknesses: ["Another broker to nurse"],
            bottleneck: "Same as any queue: consumers",
            scale: "Fine for this volume",
            consistency: "Decoupled from the redirect",
            ops: "Only if it already exists",
          },
          {
            id: "none",
            label: "None — write counts inline",
            node: "Inline write",
            strengths: ["No extra moving part"],
            weaknesses: ["Redirect now depends on analytics storage"],
            bottleneck: "The 301 path",
            scale: "Breaks the read-heavy brief",
            consistency: "Exact counts, slower links",
            ops: "Looks cheap until a dashboard join lands on the hot path",
          },
        ],
      },
    ],
  },
  {
    id: "chat",
    title: "Real-time chat",
    tagline: "Presence, history, and fan-out.",
    prompt:
      "Design 1:1 and small-room chat. History matters. Presence is nice. Do not pretend this is WhatsApp at a billion users on day one.",
    iWouldChange:
      "I would separate the write of a message from fan-out. Store once, push to sockets from a worker, and keep presence on a TTL store. I would not start with a global mesh.",
    steps: [
      {
        id: "database",
        label: "Database",
        prompt: "Where does history live?",
        options: [
          {
            id: "postgres",
            label: "PostgreSQL",
            node: "PostgreSQL",
            strengths: ["Transactions, pagination, simple rooms"],
            weaknesses: ["Fan-out is not its job"],
            bottleneck: "Hot rooms if you write receipts inline",
            scale: "Partition by room later",
            consistency: "Strong history. Presence should not live here.",
            ops: "Start here for most products",
          },
          {
            id: "dynamo",
            label: "DynamoDB",
            node: "DynamoDB",
            strengths: ["Room+time keys paginate well"],
            weaknesses: ["Access patterns must be known early"],
            bottleneck: "A celebrity room",
            scale: "Works if keys are honest",
            consistency: "Per-item. Cross-item receipts need care.",
            ops: "Managed, but you will redesign keys once",
          },
          {
            id: "mongo",
            label: "MongoDB",
            node: "MongoDB",
            strengths: ["Embedded last-message previews"],
            weaknesses: ["Document growth in busy rooms"],
            bottleneck: "Fat room documents",
            scale: "Prefer a message collection keyed by room",
            consistency: "Good enough for chat",
            ops: "Watch document size",
          },
          {
            id: "cassandra",
            label: "Cassandra",
            node: "Cassandra",
            strengths: ["Time-series writes"],
            weaknesses: ["Overhead before you have the volume"],
            bottleneck: "Team expertise",
            scale: "Makes sense after Postgres hurts",
            consistency: "Tunable, easy to get wrong for reads",
            ops: "High",
          },
        ],
      },
      {
        id: "cache",
        label: "Cache",
        prompt: "Presence and recent rooms?",
        options: [
          {
            id: "redis",
            label: "Redis",
            node: "Redis",
            strengths: ["TTL presence, pub/sub or streams for fan-out"],
            weaknesses: ["Memory for large presence sets"],
            bottleneck: "Online-user sets for huge rooms",
            scale: "Shard presence by room",
            consistency: "Presence is allowed to be approximate",
            ops: "This is the usual answer for a reason",
          },
          {
            id: "cdn",
            label: "CDN only",
            node: "CDN",
            strengths: ["Good for avatars and attachments"],
            weaknesses: ["Cannot do presence"],
            bottleneck: "Wrong tool for sockets",
            scale: "Use it for media, not messages",
            consistency: "n/a for chat frames",
            ops: "Keep it for static assets",
          },
          {
            id: "memory",
            label: "Application memory",
            node: "In-process",
            strengths: ["Fine for a single-box prototype"],
            weaknesses: ["Presence dies on deploy"],
            bottleneck: "Sticky sessions forever",
            scale: "Stops at the second replica",
            consistency: "Split-brain presence",
            ops: "Prototype only",
          },
          {
            id: "none",
            label: "No cache",
            node: "DB only",
            strengths: ["Fewer parts"],
            weaknesses: ["Every presence ping is a write"],
            bottleneck: "The database",
            scale: "Hurts before message volume does",
            consistency: "Accurate and expensive",
            ops: "You will add Redis later",
          },
        ],
      },
      {
        id: "messaging",
        label: "Messaging",
        prompt: "How do you fan out a send?",
        options: [
          {
            id: "kafka",
            label: "Kafka",
            node: "Kafka",
            strengths: ["Replay, multiple consumers, durable rooms"],
            weaknesses: ["Latency and ops for small rooms"],
            bottleneck: "Consumer groups, not the socket",
            scale: "Right when you have many downstreams",
            consistency: "History in DB, fan-out async",
            ops: "Worth it at a platform, not a first room",
          },
          {
            id: "sqs",
            label: "SQS",
            node: "SQS",
            strengths: ["Simple offline push / email fallback"],
            weaknesses: ["Not a socket fabric"],
            bottleneck: "You still need a realtime layer",
            scale: "Good for notifications beside chat",
            consistency: "Decoupled",
            ops: "Use as a side path, not the chat bus",
          },
          {
            id: "rabbit",
            label: "RabbitMQ",
            node: "RabbitMQ",
            strengths: ["Routing keys for rooms"],
            weaknesses: ["Broker is now in the chat SLO"],
            bottleneck: "Broker memory on slow consumers",
            scale: "OK for a mid-size fleet",
            consistency: "Delivery depends on acks",
            ops: "Known quantity in many shops",
          },
          {
            id: "none",
            label: "None — write and push in the request",
            node: "Inline fan-out",
            strengths: ["Lowest latency for 1:1"],
            weaknesses: ["A 200-user room blocks the request"],
            bottleneck: "The API thread",
            scale: "Fails as soon as rooms grow",
            consistency: "Looks simple",
            ops: "Fine for a prototype, not a product",
          },
        ],
      },
    ],
  },
  {
    id: "notifications",
    title: "Notification platform",
    tagline: "Email, push, and SMS without waking the product API.",
    prompt:
      "Design a notification service used by several products. Templates, preferences, and retries matter more than a pretty dashboard.",
    iWouldChange:
      "I would take a write to an inbox table, enqueue work, and let workers talk to vendors. Preferences live next to the user, not in each product. I would not let checkout wait on Twilio.",
    steps: [
      {
        id: "database",
        label: "Database",
        prompt: "Source of truth for sends?",
        options: [
          {
            id: "postgres",
            label: "PostgreSQL",
            node: "PostgreSQL",
            strengths: ["Preferences, templates, idempotency keys in one place"],
            weaknesses: ["Hot if you also store every vendor payload inline"],
            bottleneck: "Write volume at peak campaigns",
            scale: "Partition delivery log by day",
            consistency: "Idempotency keys belong here",
            ops: "Start here",
          },
          {
            id: "dynamo",
            label: "DynamoDB",
            node: "DynamoDB",
            strengths: ["High write rate for delivery logs"],
            weaknesses: ["Preferences + templates become extra tables"],
            bottleneck: "Access patterns for 'all sends to user X'",
            scale: "Good for the log, awkward for the CMS",
            consistency: "Use a key per (user, event, day)",
            ops: "Split log vs config stores if you pick this",
          },
          {
            id: "mongo",
            label: "MongoDB",
            node: "MongoDB",
            strengths: ["Template JSON is natural"],
            weaknesses: ["Delivery log growth"],
            bottleneck: "Campaign fan-out writes",
            scale: "Keep templates small; log elsewhere",
            consistency: "OK for drafts",
            ops: "Two concerns in one cluster",
          },
          {
            id: "cassandra",
            label: "Cassandra",
            node: "Cassandra",
            strengths: ["Time-series delivery log"],
            weaknesses: ["Preferences are a poor fit"],
            bottleneck: "You will still want SQL for config",
            scale: "Log-only",
            consistency: "Eventual reads of 'did we send?'",
            ops: "Only for the log at serious volume",
          },
        ],
      },
      {
        id: "cache",
        label: "Cache",
        prompt: "What is worth caching?",
        options: [
          {
            id: "redis",
            label: "Redis",
            node: "Redis",
            strengths: ["Preference lookups, rate limits, idempotency locks"],
            weaknesses: ["Do not treat it as the send log"],
            bottleneck: "A campaign that skips the cache",
            scale: "Per-user keys",
            consistency: "Preferences can lag a minute",
            ops: "Low if you already have it",
          },
          {
            id: "cdn",
            label: "CDN only",
            node: "CDN",
            strengths: ["Hosted images in templates"],
            weaknesses: ["Not for preferences"],
            bottleneck: "Wrong layer",
            scale: "Use for assets",
            consistency: "n/a",
            ops: "Keep for media",
          },
          {
            id: "memory",
            label: "Application memory",
            node: "In-process",
            strengths: ["Template compile cache"],
            weaknesses: ["Preference updates take a deploy to vanish"],
            bottleneck: "Stale opt-outs",
            scale: "Dangerous for compliance",
            consistency: "Worst place for 'do not send'",
            ops: "Cache templates, not legal state",
          },
          {
            id: "none",
            label: "No cache",
            node: "DB on every send",
            strengths: ["Always current preferences"],
            weaknesses: ["Campaigns stamp the database"],
            bottleneck: "Preference reads",
            scale: "Add Redis when a campaign hurts",
            consistency: "Safest for opt-out",
            ops: "Acceptable at low volume",
          },
        ],
      },
      {
        id: "messaging",
        label: "Messaging",
        prompt: "How do workers hear about a send?",
        options: [
          {
            id: "kafka",
            label: "Kafka",
            node: "Kafka",
            strengths: ["Replay a failed vendor hour", "Many consumers"],
            weaknesses: ["Ops if this is your first bus"],
            bottleneck: "Consumer lag during a campaign",
            scale: "Right for a platform team",
            consistency: "Produce after the inbox row commits",
            ops: "I would use it if the company already has it",
          },
          {
            id: "sqs",
            label: "SQS",
            node: "SQS",
            strengths: ["Retries, DLQ, per-channel queues"],
            weaknesses: ["Fan-out to many products needs extra wiring"],
            bottleneck: "Visibility timeout vs vendor latency",
            scale: "Excellent first bus",
            consistency: "At-least-once — idempotency keys required",
            ops: "My default for this brief",
          },
          {
            id: "rabbit",
            label: "RabbitMQ",
            node: "RabbitMQ",
            strengths: ["Routing by channel"],
            weaknesses: ["Broker in the send SLO"],
            bottleneck: "Unacked campaign bursts",
            scale: "Fine",
            consistency: "Ack after vendor accept, not after render",
            ops: "Fine if it already exists",
          },
          {
            id: "none",
            label: "None — call the vendor in request",
            node: "Inline vendor",
            strengths: ["Easy to demo"],
            weaknesses: ["Checkout waits on SMS"],
            bottleneck: "Vendor latency",
            scale: "Fails the platform brief",
            consistency: "One shot, no replay",
            ops: "Do not ship this",
          },
        ],
      },
    ],
  },
];

export const BUILD_EDUCATION: LabEducationBlock = {
  howItWorks: [
    "Pick one option per layer. There is no single correct stack.",
    "The diagram and the notes update from your choices. Strengths and weaknesses are both real.",
    "The closing note is how I would steer a first version — not a claim about a specific employer system.",
  ],
  keyConcepts: [
    {
      title: "Hot path vs async path",
      body: "If a user is waiting, do less. Counts, mail, and fan-out can be late.",
    },
    {
      title: "Ops is a requirement",
      body: "A beautiful store you cannot run is a worse design than a boring one you can.",
    },
  ],
  commonMistakes: [
    "Choosing Cassandra because it sounds like scale.",
    "Writing analytics on the request that has to be fast.",
  ],
  interviewTips: [
    "Name QPS, payload size, and who pages before you name a brand.",
    "Say what you would change at 10×. That is the design.",
  ],
};

export function getBuildChallenge(id: string) {
  return BUILD_CHALLENGES.find((item) => item.id === id);
}
