import type { LabDifficulty, LabEducationBlock, SystemComponentId } from "./types";

export const SYSTEM_COMPONENTS: {
  id: SystemComponentId;
  label: string;
  hint: string;
}[] = [
  { id: "client", label: "Client", hint: "Web or mobile entry" },
  { id: "cdn", label: "CDN", hint: "Edge cache for static and some APIs" },
  { id: "load-balancer", label: "Load Balancer", hint: "Spread traffic across APIs" },
  { id: "api", label: "API", hint: "Application services" },
  { id: "cache", label: "Cache", hint: "Hot keys, sessions, counters" },
  { id: "database", label: "Database", hint: "Source of truth" },
  { id: "replica", label: "Database Replica", hint: "Read scale and failover" },
  { id: "queue", label: "Queue", hint: "Async work and backpressure" },
  { id: "object-storage", label: "Object Storage", hint: "Blobs, images, exports" },
  { id: "worker", label: "Worker", hint: "Background jobs" },
  { id: "search", label: "Search", hint: "Inverted index / query service" },
  { id: "rate-limiter", label: "Rate Limiter", hint: "Abuse and burst control" },
];

export type DesignDecision = {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  good: string;
};

export type SystemDesignScenario = {
  id: string;
  slug: string;
  indexed: boolean;
  title: string;
  tagline: string;
  difficulty: LabDifficulty;
  description: string;
  prompt: string;
  required: SystemComponentId[];
  recommended: SystemComponentId[];
  antipatterns: SystemComponentId[];
  expensive: SystemComponentId[];
  decisions: DesignDecision[];
  education: LabEducationBlock;
  seoTitle: string;
  seoDescription: string;
};

export const SYSTEM_DESIGN_SCENARIOS: readonly SystemDesignScenario[] = [
  {
    id: "url-shortener",
    slug: "url-shortener",
    indexed: true,
    title: "URL Shortener",
    tagline: "100M redirects a day without a surprise invoice.",
    difficulty: "mid",
    description:
      "Design a service that creates short links and redirects at high read volume.",
    prompt:
      "Build a URL shortener for 100 million redirects per day. Writes are rare. Reads must stay fast and cheap. IDs should be unique and hard to guess.",
    required: ["client", "api", "database", "cache"],
    recommended: ["cdn", "rate-limiter", "load-balancer"],
    antipatterns: ["search"],
    expensive: ["search", "replica"],
    decisions: [
      {
        id: "ids",
        prompt: "How should short IDs be created?",
        options: [
          { id: "auto-inc", label: "Auto-increment integers" },
          { id: "hash", label: "Hash + collision check, or a unique counter range" },
          { id: "uuid", label: "Raw UUIDs in the path" },
        ],
        good: "hash",
      },
      {
        id: "hot",
        prompt: "Where do popular redirects live?",
        options: [
          { id: "db-only", label: "Primary database on every hit" },
          { id: "cache-cdn", label: "Cache the mapping; CDN for the hottest keys" },
          { id: "files", label: "Static files in object storage only" },
        ],
        good: "cache-cdn",
      },
    ],
    seoTitle: "URL Shortener System Design — Practice Scenario | Al Beltran",
    seoDescription:
      "Practice designing a URL shortener for high-read redirect traffic. Score cache, ID generation, and cost tradeoffs in the browser.",
    education: {
      howItWorks: [
        "Redirects dominate writes. Cache the mapping and keep the write path small.",
        "IDs need uniqueness and some entropy. Sequential IDs leak volume and are guessable.",
      ],
      keyConcepts: [
        {
          title: "Read-heavy mapping",
          body: "A short link is a tiny key-value record. Most traffic never needs a join or a search index.",
        },
        {
          title: "Cache before replicas",
          body: "A replica helps failover. A cache and CDN absorb the 100M redirects.",
        },
      ],
      commonMistakes: [
        "Putting Elasticsearch in front of a two-column lookup.",
        "Hitting the primary database on every 301.",
      ],
      recommended: [
        "Client → CDN/API → cache → database. Rate-limit create. Optional replica for reads if cache misses spike.",
      ],
      interviewTips: [
        "Estimate QPS and key size before you draw boxes.",
        "Call out analytics as async — do not write a click row on the redirect path.",
      ],
    },
  },
  {
    id: "chat-app",
    slug: "chat-app",
    indexed: true,
    title: "Chat App",
    tagline: "Presence, fan-out, and messages that stay in order.",
    difficulty: "senior",
    description: "Design 1:1 and group chat with online presence and fan-out.",
    prompt:
      "Design a chat system for 5 million daily users. Support 1:1 and group rooms, presence, and near-real-time delivery. History must be searchable later, but the live path should stay thin.",
    required: ["client", "api", "database", "cache", "queue", "worker"],
    recommended: ["load-balancer", "rate-limiter", "search"],
    antipatterns: ["cdn"],
    expensive: ["search"],
    decisions: [
      {
        id: "fanout",
        prompt: "How do you deliver a group message?",
        options: [
          { id: "write-all", label: "Write a copy into every member inbox on send" },
          { id: "write-room", label: "Write once to the room; push via connections or a queue" },
          { id: "email", label: "Email every member" },
        ],
        good: "write-room",
      },
      {
        id: "presence",
        prompt: "Where does presence live?",
        options: [
          { id: "sql-row", label: "A SQL row updated on every heartbeat" },
          { id: "cache-ttl", label: "An in-memory store with TTLs and heartbeats" },
          { id: "s3", label: "Object storage" },
        ],
        good: "cache-ttl",
      },
    ],
    seoTitle: "Chat App System Design — Practice Scenario | Al Beltran",
    seoDescription:
      "Practice chat architecture: fan-out, presence, queues, and search. Interactive system design in Al Beltran's Engineering Lab.",
    education: {
      howItWorks: [
        "Live delivery and durable history are different jobs. Split them.",
        "Presence is ephemeral. Do not treat it like an orders table.",
      ],
      keyConcepts: [
        {
          title: "Fan-out on write vs read",
          body: "Huge groups should not clone a message into millions of inboxes on send.",
        },
        {
          title: "Backpressure",
          body: "A queue plus workers keep typing indicators and push from blocking the write API.",
        },
      ],
      commonMistakes: [
        "Using a CDN as the realtime plane.",
        "Storing last-seen timestamps in a heavily locked SQL table.",
      ],
      recommended: [
        "Websocket or long-poll API, cache for presence, database for messages, queue/workers for push and search indexing.",
      ],
      interviewTips: [
        "Ask about group size. 8-person rooms and 200k-person rooms are different products.",
      ],
    },
  },
  {
    id: "payment-system",
    slug: "payment-system",
    indexed: true,
    title: "Payment System",
    tagline: "Idempotent charges, ledgers, and retries that do not double-bill.",
    difficulty: "staff",
    description: "Design a charge and ledger path that survives retries and provider lag.",
    prompt:
      "Design a payment service that charges cards through a provider, records a ledger, and handles webhooks that arrive late or twice. Double charges are unacceptable.",
    required: ["client", "api", "database", "queue", "worker", "rate-limiter"],
    recommended: ["load-balancer", "cache"],
    antipatterns: ["cdn", "search"],
    expensive: ["search"],
    decisions: [
      {
        id: "idem",
        prompt: "What makes a charge safe to retry?",
        options: [
          { id: "hope", label: "Retry the provider and hope" },
          { id: "key", label: "Idempotency key stored before the provider call" },
          { id: "uuid-later", label: "Generate a new UUID after the provider responds" },
        ],
        good: "key",
      },
      {
        id: "ledger",
        prompt: "How do you record money movement?",
        options: [
          { id: "update-balance", label: "UPDATE users SET balance = balance - amount" },
          { id: "append", label: "Append-only ledger entries, then derived balances" },
          { id: "cache-only", label: "Keep the balance only in Redis" },
        ],
        good: "append",
      },
    ],
    seoTitle: "Payment System Design — Practice Scenario | Al Beltran",
    seoDescription:
      "Practice payment architecture: idempotency keys, ledgers, queues, and webhook workers in Al Beltran's system design simulator.",
    education: {
      howItWorks: [
        "Store the intent first. The provider call is a side effect of a recorded command.",
        "Webhooks are not a source of truth until you reconcile them to that command.",
      ],
      keyConcepts: [
        {
          title: "Idempotency",
          body: "The same key must return the same charge, even when the client, the worker, and the webhook all retry.",
        },
        {
          title: "Ledger before cache",
          body: "Balances derived from an append-only log survive a Redis flush. The reverse does not.",
        },
      ],
      commonMistakes: [
        "Mutating a single balance column under contention.",
        "Trusting a CDN or search cluster for money state.",
      ],
      recommended: [
        "API with idempotency keys, durable database/ledger, queue and workers for provider I/O and webhooks, rate limits on charge endpoints.",
      ],
      interviewTips: [
        "Walk a double-submit and a delayed webhook as two sequence diagrams.",
      ],
    },
  },
  {
    id: "news-feed",
    slug: "news-feed",
    indexed: true,
    title: "News Feed",
    tagline: "Fan-out, ranking, and a timeline that still loads.",
    difficulty: "senior",
    description: "Design a social or product feed with follow graphs and ranking.",
    prompt:
      "Design a news feed for 2 million daily users. People follow thousands of creators. The home timeline should feel instant; ranking can be approximate.",
    required: ["client", "api", "database", "cache", "queue", "worker"],
    recommended: ["load-balancer", "cdn", "search"],
    antipatterns: [],
    expensive: ["search"],
    decisions: [
      {
        id: "model",
        prompt: "How do you build the home timeline?",
        options: [
          { id: "pull", label: "On every open, query every followee" },
          { id: "hybrid", label: "Fan-out to cache for normal users; pull for celebrities" },
          { id: "email-digest", label: "Daily email only" },
        ],
        good: "hybrid",
      },
    ],
    seoTitle: "News Feed System Design — Practice Scenario | Al Beltran",
    seoDescription:
      "Practice news-feed fan-out, caching, and ranking tradeoffs in Al Beltran's interactive system design simulator.",
    education: {
      howItWorks: [
        "Celebrity fan-out on write explodes. Hybrid pull for huge follow graphs is the usual escape hatch.",
        "Precompute a short cached timeline. Rank asynchronously.",
      ],
      keyConcepts: [
        {
          title: "Fan-out on write",
          body: "Works when most users have a modest follower count.",
        },
        {
          title: "Cache as the product",
          body: "The home API should read a prepared list, not run a graph query live.",
        },
      ],
      commonMistakes: [
        "JOIN follows × posts on every homepage load.",
        "Blocking publish until ranking finishes.",
      ],
      recommended: [
        "API + cache timeline, database for graph and posts, queue/workers for fan-out and ranking, CDN for media.",
      ],
      interviewTips: [
        "Ask what 'seen' means and whether ranking is personal or chronological.",
      ],
    },
  },
  {
    id: "file-storage",
    slug: "file-storage",
    indexed: true,
    title: "File Storage",
    tagline: "Uploads, metadata, and downloads that skip your API.",
    difficulty: "mid",
    description: "Design object storage for user uploads with metadata and access control.",
    prompt:
      "Design a file storage product: users upload images and PDFs, share links, and download at high bandwidth. The API should not proxy every byte.",
    required: ["client", "api", "database", "object-storage"],
    recommended: ["cdn", "queue", "worker", "rate-limiter"],
    antipatterns: ["search"],
    expensive: ["search"],
    decisions: [
      {
        id: "bytes",
        prompt: "Where do the bytes travel?",
        options: [
          { id: "through-api", label: "Upload and download through the application API" },
          { id: "signed", label: "API issues signed URLs; client talks to object storage / CDN" },
          { id: "email", label: "Email the file as an attachment" },
        ],
        good: "signed",
      },
    ],
    seoTitle: "File Storage System Design — Practice Scenario | Al Beltran",
    seoDescription:
      "Practice designing uploads with signed URLs, object storage, and CDN delivery in Al Beltran's Engineering Lab.",
    education: {
      howItWorks: [
        "Metadata and ACLs live in your database. Bytes live in object storage.",
        "Signed URLs keep credentials off the client and bandwidth off your API boxes.",
      ],
      keyConcepts: [
        {
          title: "Control plane vs data plane",
          body: "Auth, virus scan, and sharing rules are control-plane work. Transfer is data-plane.",
        },
      ],
      commonMistakes: [
        "Streaming 2 GB PDFs through Next.js or Spring controllers.",
        "Using a search cluster as a file system.",
      ],
      recommended: [
        "API + database for metadata, object storage for bytes, CDN for public/hot files, workers for scan and thumbnails.",
      ],
      interviewTips: [
        "Mention multipart upload and content-type allow-lists without being asked twice.",
      ],
    },
  },
  {
    id: "rate-limited-api",
    slug: "rate-limited-api",
    indexed: false,
    title: "Public API Gateway",
    tagline: "Keys, quotas, and bursty partners.",
    difficulty: "mid",
    description: "Design a public API with per-key rate limits and usage metering.",
    prompt:
      "Partners call your public API. Some send bursts. You need per-key limits, fair use, and a usage log that does not sit on the request path.",
    required: ["client", "api", "rate-limiter", "database"],
    recommended: ["cache", "load-balancer", "queue", "worker"],
    antipatterns: ["cdn"],
    expensive: ["search"],
    decisions: [
      {
        id: "limit",
        prompt: "Where is the limit enforced?",
        options: [
          { id: "app-if", label: "An if-statement inside each controller" },
          { id: "edge", label: "A gateway / limiter in front of the API, backed by cache counters" },
          { id: "nightly", label: "A nightly invoice that bans them tomorrow" },
        ],
        good: "edge",
      },
    ],
    seoTitle: "",
    seoDescription: "",
    education: {
      howItWorks: [
        "Counters belong in a fast store. The durable usage log can be async.",
      ],
      keyConcepts: [
        {
          title: "Token bucket",
          body: "Burst is allowed; sustained abuse is not. Say the algorithm.",
        },
      ],
      commonMistakes: ["Letting every service implement its own limiter."],
      interviewTips: ["Ask if limits are per key, per IP, or per customer."],
    },
  },
  {
    id: "video-streaming",
    slug: "video-streaming",
    indexed: false,
    title: "Video Streaming",
    tagline: "Encode once, watch many, never transcode on the API.",
    difficulty: "senior",
    description: "Design upload, transcode, and playback for user videos.",
    prompt:
      "Users upload videos. You must transcode, store renditions, and play them worldwide. The watch path should not touch your application servers.",
    required: ["client", "api", "object-storage", "queue", "worker", "cdn"],
    recommended: ["database", "load-balancer"],
    antipatterns: ["search"],
    expensive: ["search"],
    decisions: [
      {
        id: "play",
        prompt: "How does playback work?",
        options: [
          { id: "api-stream", label: "API streams bytes from disk" },
          { id: "hls-cdn", label: "Workers emit HLS/DASH; CDN serves segments" },
          { id: "email-mp4", label: "Email the MP4" },
        ],
        good: "hls-cdn",
      },
    ],
    seoTitle: "",
    seoDescription: "",
    education: {
      howItWorks: ["Upload to object storage, enqueue transcode, publish a playlist to the CDN."],
      keyConcepts: [
        { title: "Renditions", body: "Bitrate ladders are a worker problem, not a request problem." },
      ],
      commonMistakes: ["Transcoding inside the upload HTTP request."],
      interviewTips: ["Mention DRM only if they ask; mention CDN always."],
    },
  },
  {
    id: "ecommerce-cart",
    slug: "ecommerce-cart",
    indexed: false,
    title: "E-commerce Cart",
    tagline: "Inventory, carts, and a checkout that still has stock.",
    difficulty: "mid",
    description: "Design cart and checkout with inventory reservation.",
    prompt:
      "Design cart and checkout for a store that sells limited stock. Two people must not buy the last item. Catalog browse should stay fast.",
    required: ["client", "api", "database", "cache"],
    recommended: ["cdn", "queue", "worker", "load-balancer"],
    antipatterns: [],
    expensive: ["search"],
    decisions: [
      {
        id: "stock",
        prompt: "How do you hold the last item?",
        options: [
          { id: "hope-stock", label: "Check stock in the UI only" },
          { id: "reserve", label: "Reserve stock in the database with a short TTL" },
          { id: "cache-decr", label: "DECR a Redis key and never write SQL" },
        ],
        good: "reserve",
      },
    ],
    seoTitle: "",
    seoDescription: "",
    education: {
      howItWorks: ["Browse is cache/CDN. Checkout is a transactional reserve."],
      keyConcepts: [
        { title: "Reservation", body: "Hold inventory briefly; expire it if payment never finishes." },
      ],
      commonMistakes: ["Letting the cache be the inventory system of record."],
      interviewTips: ["Talk about overselling before you talk about Kubernetes."],
    },
  },
  {
    id: "notification-service",
    slug: "notification-service",
    indexed: false,
    title: "Notification Service",
    tagline: "Email, push, and SMS without blocking the product API.",
    difficulty: "junior",
    description: "Design async notifications with retries and preferences.",
    prompt:
      "Product events should fan out to email, push, and SMS. The product API must not wait on Twilio. Users have preferences and quiet hours.",
    required: ["api", "queue", "worker", "database"],
    recommended: ["cache", "rate-limiter"],
    antipatterns: ["cdn"],
    expensive: ["search"],
    decisions: [
      {
        id: "send",
        prompt: "When do you send?",
        options: [
          { id: "inline", label: "Inside the product request" },
          { id: "queue-it", label: "Enqueue a job; workers honor preferences and retry" },
          { id: "cron-all", label: "A daily cron that resends everything" },
        ],
        good: "queue-it",
      },
    ],
    seoTitle: "",
    seoDescription: "",
    education: {
      howItWorks: ["The product writes an event. Workers apply preferences and talk to vendors."],
      keyConcepts: [
        { title: "At-least-once", body: "Retries happen. Keep sends idempotent per event + channel." },
      ],
      commonMistakes: ["Calling the email vendor in the request thread."],
      interviewTips: ["Mention quiet hours and unsubscribe as first-class data."],
    },
  },
  {
    id: "ride-matching",
    slug: "ride-matching",
    indexed: false,
    title: "Ride Matching",
    tagline: "Geo queries, offers, and a match that expires.",
    difficulty: "staff",
    description: "Design matching between riders and nearby drivers.",
    prompt:
      "Match a rider to nearby drivers in a city. Locations update often. A match is an offer with a short TTL, not a forever assignment.",
    required: ["client", "api", "database", "cache", "queue", "worker"],
    recommended: ["load-balancer", "rate-limiter"],
    antipatterns: ["cdn"],
    expensive: ["search"],
    decisions: [
      {
        id: "geo",
        prompt: "How do you find nearby drivers?",
        options: [
          { id: "full-scan", label: "SELECT * FROM drivers" },
          { id: "geo-index", label: "Geo index or geohash buckets in a fast store, then rank" },
          { id: "cdn-geo", label: "Ask the CDN" },
        ],
        good: "geo-index",
      },
    ],
    seoTitle: "",
    seoDescription: "",
    education: {
      howItWorks: ["Location is hot data. Matching is a short-lived workflow on a queue."],
      keyConcepts: [
        { title: "TTL offers", body: "A driver who never accepts must free the rider quickly." },
      ],
      commonMistakes: ["Treating driver location as a slowly changing SQL dimension."],
      interviewTips: ["Separate location updates from the match transaction."],
    },
  },
];

export function getSystemDesignScenario(slug: string) {
  return SYSTEM_DESIGN_SCENARIOS.find((item) => item.slug === slug);
}

export function indexedSystemDesignScenarios() {
  return SYSTEM_DESIGN_SCENARIOS.filter((item) => item.indexed);
}

export const SYSTEM_DESIGN_HUB_EDUCATION: LabEducationBlock = {
  howItWorks: [
    "Select the components you would actually ship, then answer the decision prompts.",
    "The score is a rubric, not a production audit. Missing a required piece hurts more than adding a nice-to-have.",
  ],
  keyConcepts: [
    {
      title: "Control vs data plane",
      body: "APIs, ledgers, and metadata stay in your services. Bytes and hot reads often should not.",
    },
    {
      title: "Async by default",
      body: "Queues and workers keep user requests off vendor I/O, ranking, and fan-out.",
    },
  ],
  commonMistakes: [
    "Adding search, replicas, and a CDN to every diagram.",
    "Never saying what you would not build.",
  ],
  interviewTips: [
    "Start with QPS, payload size, and consistency needs.",
    "Name one failure mode and how the design degrades.",
  ],
};
