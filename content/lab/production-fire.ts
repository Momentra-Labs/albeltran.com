import type { LabDifficulty, LabEducationBlock } from "./types";

export type FireMetrics = {
  downtime: number;
  users: number;
  cost: number;
  latency: number;
  reliability: number;
};

export type FireAction = {
  id: string;
  label: string;
  detail: string;
  effect: Partial<FireMetrics> & { note: string };
  helpful: boolean;
};

export type FireIncident = {
  id: string;
  title: string;
  difficulty: LabDifficulty;
  minutes: number;
  story: string;
  start: FireMetrics;
  actions: FireAction[];
  debrief: string;
};

export const FIRE_INCIDENTS: readonly FireIncident[] = [
  {
    id: "traffic-8x",
    title: "Traffic suddenly increases 8x",
    difficulty: "mid",
    minutes: 4,
    story:
      "A campaign just went live. QPS is 8× normal. Checkout still works for some users. p95 is 2.4s and climbing. Cache hit rate is 31%.",
    start: { downtime: 4, users: 18000, cost: 20, latency: 2400, reliability: 72 },
    actions: [
      {
        id: "scale",
        label: "Scale API servers",
        detail: "Add replicas behind the load balancer.",
        effect: { latency: -600, users: -3000, cost: 18, reliability: 6, note: "More CPU. The database still hurts." },
        helpful: true,
      },
      {
        id: "cache",
        label: "Enable caching for catalog reads",
        detail: "Cache product pages and session-less GETs.",
        effect: { latency: -900, users: -7000, reliability: 10, cost: 4, note: "Hit rate climbs; DB cools down." },
        helpful: true,
      },
      {
        id: "rate",
        label: "Enable rate limiting",
        detail: "Protect checkout and login from bursts and bots.",
        effect: { reliability: 8, users: -4000, latency: -200, note: "Abusive traffic stops eating the pool." },
        helpful: true,
      },
      {
        id: "db-up",
        label: "Increase database capacity",
        detail: "Vertical scale the primary immediately.",
        effect: { latency: -300, cost: 40, reliability: 3, note: "Helps a little. Expensive if the real issue is reads." },
        helpful: false,
      },
      {
        id: "rollback",
        label: "Roll back the last deploy",
        detail: "Revert the API even though this looks like traffic.",
        effect: { downtime: 8, users: 4000, reliability: -6, note: "You spent the window on the wrong change." },
        helpful: false,
      },
      {
        id: "logs",
        label: "Investigate logs",
        detail: "Confirm this is load, not a new exception.",
        effect: { reliability: 2, note: "Logs show saturation, not a new bug." },
        helpful: true,
      },
    ],
    debrief:
      "This is a load incident. Cache and rate limits buy more than a blind rollback. Scale compute after you know the bottleneck.",
  },
  {
    id: "bad-deploy",
    title: "Bad deploy, 18% errors",
    difficulty: "junior",
    minutes: 3,
    story:
      "Error rate jumped to 18% one minute after a release. The change touches tax calculation. Traffic is normal.",
    start: { downtime: 12, users: 9000, cost: 8, latency: 400, reliability: 55 },
    actions: [
      {
        id: "rollback",
        label: "Roll back the deployment",
        detail: "Return to the last good version.",
        effect: { downtime: -10, users: -8000, reliability: 30, note: "Errors collapse. Users recover." },
        helpful: true,
      },
      {
        id: "flag-off",
        label: "Disable the tax feature flag",
        detail: "If the release is flagged, turn it off.",
        effect: { downtime: -8, users: -7000, reliability: 24, note: "Same idea as rollback, smaller blast." },
        helpful: true,
      },
      {
        id: "scale",
        label: "Scale servers",
        detail: "Add boxes because errors feel like load.",
        effect: { cost: 22, reliability: -2, note: "You scaled a broken build." },
        helpful: false,
      },
      {
        id: "db-up",
        label: "Increase database capacity",
        detail: "Assume it is storage.",
        effect: { cost: 30, note: "The database is fine." },
        helpful: false,
      },
      {
        id: "logs",
        label: "Investigate logs",
        detail: "Confirm the new tax path is throwing.",
        effect: { reliability: 4, note: "Null country code on the new branch." },
        helpful: true,
      },
    ],
    debrief:
      "A deploy-correlated error spike is a rollback or flag-off first. Scaling a broken artifact spends money and time.",
  },
  {
    id: "db-failover",
    title: "Primary database failover",
    difficulty: "senior",
    minutes: 4,
    story:
      "The primary is unreachable. A replica is available but the app still points at the dead writer. Reads could continue.",
    start: { downtime: 20, users: 22000, cost: 15, latency: 8000, reliability: 20 },
    actions: [
      {
        id: "promote",
        label: "Fail over to the replica",
        detail: "Promote and point writers at the new primary.",
        effect: { downtime: -14, users: -15000, reliability: 40, latency: -5000, note: "Writes return. Some cache stampedes." },
        helpful: true,
      },
      {
        id: "cache",
        label: "Serve reads from cache",
        detail: "Keep catalog up while writers are dark.",
        effect: { users: -4000, reliability: 10, latency: -1500, note: "Buys time. Checkout still needs a writer." },
        helpful: true,
      },
      {
        id: "rollback",
        label: "Roll back the application",
        detail: "Revert code that did not cause this.",
        effect: { downtime: 4, note: "The primary is still dead." },
        helpful: false,
      },
      {
        id: "scale",
        label: "Scale API servers",
        detail: "More apps waiting on a dead socket.",
        effect: { cost: 16, reliability: -4, note: "More waiters, same outage." },
        helpful: false,
      },
      {
        id: "logs",
        label: "Investigate logs",
        detail: "Confirm connection refused vs application exceptions.",
        effect: { reliability: 3, note: "ECONNREFUSED to the old writer." },
        helpful: true,
      },
    ],
    debrief:
      "Failover is the fix. Cache keeps a storefront readable. Rolling back application code does not resurrect a disk.",
  },
  {
    id: "dependency-timeout",
    title: "Payments vendor timeouts",
    difficulty: "mid",
    minutes: 3,
    story:
      "The payments vendor is slow. Your checkout thread waits 20s per attempt. Thread pools are emptying.",
    start: { downtime: 10, users: 12000, cost: 12, latency: 12000, reliability: 40 },
    actions: [
      {
        id: "timeout",
        label: "Tighten timeouts and circuit-break",
        detail: "Fail fast, queue captures, stop waiting 20s.",
        effect: { latency: -8000, reliability: 25, users: -6000, note: "Threads return. Some users retry later." },
        helpful: true,
      },
      {
        id: "disable",
        label: "Disable the pay-online feature",
        detail: "Keep browse and cash-on-delivery if you have it.",
        effect: { downtime: -4, users: -3000, reliability: 12, note: "You shed the dying dependency." },
        helpful: true,
      },
      {
        id: "scale",
        label: "Scale servers",
        detail: "Add threads that will also block.",
        effect: { cost: 20, reliability: 2, note: "A larger thread pool still blocks on the vendor." },
        helpful: false,
      },
      {
        id: "db-up",
        label: "Increase database capacity",
        detail: "Assume local SQL.",
        effect: { cost: 25, note: "Local SQL is idle." },
        helpful: false,
      },
      {
        id: "logs",
        label: "Investigate logs",
        detail: "See the 20s waits on the vendor host.",
        effect: { reliability: 3, note: "All slowness is outbound HTTPS." },
        helpful: true,
      },
    ],
    debrief:
      "A slow dependency is a timeout and isolation problem. More of your own boxes do not make their API faster.",
  },
  {
    id: "cache-outage",
    title: "Redis cluster down",
    difficulty: "staff",
    minutes: 4,
    story:
      "The cache cluster is unreachable. The app was written to fail closed on cache errors, so every page is 500.",
    start: { downtime: 18, users: 30000, cost: 10, latency: 200, reliability: 10 },
    actions: [
      {
        id: "fallback",
        label: "Fail open to the database",
        detail: "Bypass cache on connection errors.",
        effect: { downtime: -12, users: -20000, reliability: 35, latency: 800, cost: 8, note: "Site returns. DB will get hot." },
        helpful: true,
      },
      {
        id: "rate",
        label: "Enable rate limiting",
        detail: "Protect the database after you fail open.",
        effect: { reliability: 10, users: -4000, note: "Stops a thundering herd." },
        helpful: true,
      },
      {
        id: "scale-db",
        label: "Increase database capacity",
        detail: "If you fail open, you will need headroom.",
        effect: { cost: 28, reliability: 6, latency: -200, note: "Useful after fallback, wasteful before." },
        helpful: true,
      },
      {
        id: "rollback",
        label: "Roll back a random deploy",
        detail: "The last deploy was yesterday.",
        effect: { downtime: 3, note: "Redis is still down." },
        helpful: false,
      },
      {
        id: "logs",
        label: "Investigate logs",
        detail: "Confirm ECONNREFUSED to Redis, not app logic.",
        effect: { reliability: 2, note: "Every 500 is a cache connection error." },
        helpful: true,
      },
    ],
    debrief:
      "Fail-closed cache is an availability choice. In an incident, fail open plus rate limits keep the product up while Redis is recovered.",
  },
];

export function getFireIncident(id: string) {
  return FIRE_INCIDENTS.find((item) => item.id === id);
}

export const FIRE_EDUCATION: LabEducationBlock = {
  howItWorks: [
    "You have a short clock. Each action moves downtime, users, cost, latency, and reliability.",
    "Helpful actions are the ones a sane on-call would take. The score is how healthy the system is when time runs out.",
  ],
  keyConcepts: [
    {
      title: "Mitigate, then investigate",
      body: "Rollback, flag-off, fail open, and rate limits are mitigations. Logs confirm you picked the right one.",
    },
    {
      title: "Do not scale a broken artifact",
      body: "More replicas of a bad deploy or a blocked thread pool make the bill worse.",
    },
  ],
  commonMistakes: [
    "Rolling back when the signal is traffic or a vendor.",
    "Touching the database because it is the most expensive knob.",
  ],
  interviewTips: [
    "State the user impact in one sentence, then the first mitigation.",
    "Say what you would stop doing, not only what you would add.",
  ],
};
