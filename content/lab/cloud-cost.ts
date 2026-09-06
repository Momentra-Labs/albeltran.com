import type { LabDifficulty, LabEducationBlock } from "./types";

export type CloudRegion = "us" | "eu" | "asia";

export const REGION_MULTIPLIER: Record<CloudRegion, number> = {
  us: 1,
  eu: 1.08,
  asia: 0.92,
};

export const CLOUD_RATES = {
  computeHour: 0.12,
  dbHour: 0.28,
  storageGb: 0.021,
  cdnGb: 0.08,
  cacheGb: 0.12,
  requestMillion: 0.4,
} as const;

export type CloudInputs = {
  computeUnits: number;
  dbUnits: number;
  storageGb: number;
  cdnGb: number;
  cacheGb: number;
  requestMillions: number;
  usersThousands: number;
  region: CloudRegion;
};

export type CloudChallenge = {
  id: string;
  title: string;
  difficulty: LabDifficulty;
  story: string;
  start: CloudInputs;
  budget: number;
  maxLatency: number;
  minReliability: number;
};

export const CLOUD_CHALLENGES: readonly CloudChallenge[] = [
  {
    id: "media-site",
    title: "Media site that forgot the CDN",
    difficulty: "mid",
    story:
      "A reading site ships images from origin compute. Traffic is 4M requests and 8TB of image transfer. Keep p95 under 400ms conceptually (CDN + cache required) and stay under $1,200.",
    start: {
      computeUnits: 24,
      dbUnits: 4,
      storageGb: 4000,
      cdnGb: 0,
      cacheGb: 2,
      requestMillions: 4,
      usersThousands: 800,
      region: "us",
    },
    budget: 1200,
    maxLatency: 400,
    minReliability: 80,
  },
  {
    id: "overprovisioned-api",
    title: "Always-on API farm",
    difficulty: "junior",
    story:
      "Someone set 40 API boxes for a 200k-user internal tool. Cut the bill under $700 without dropping reliability below 85.",
    start: {
      computeUnits: 40,
      dbUnits: 6,
      storageGb: 400,
      cdnGb: 200,
      cacheGb: 4,
      requestMillions: 1.2,
      usersThousands: 200,
      region: "eu",
    },
    budget: 700,
    maxLatency: 500,
    minReliability: 85,
  },
  {
    id: "global-app",
    title: "Global app in one region",
    difficulty: "senior",
    story:
      "Users are mostly in Asia but everything runs in the US. Move region and add edge cache. Budget $900, reliability 88+.",
    start: {
      computeUnits: 18,
      dbUnits: 5,
      storageGb: 1200,
      cdnGb: 400,
      cacheGb: 8,
      requestMillions: 6,
      usersThousands: 1500,
      region: "us",
    },
    budget: 900,
    maxLatency: 350,
    minReliability: 88,
  },
  {
    id: "analytics-hoarder",
    title: "Analytics hoarder",
    difficulty: "mid",
    story:
      "Five years of raw logs sit in hot storage. Move mass to cheaper assumptions by cutting storage. Stay under $800.",
    start: {
      computeUnits: 10,
      dbUnits: 3,
      storageGb: 20000,
      cdnGb: 100,
      cacheGb: 2,
      requestMillions: 0.8,
      usersThousands: 100,
      region: "us",
    },
    budget: 800,
    maxLatency: 600,
    minReliability: 75,
  },
  {
    id: "chatty-client",
    title: "Chatty mobile client",
    difficulty: "junior",
    story:
      "The app polls every 2s. Request volume is the bill. Cut requests and add cache. Budget $500.",
    start: {
      computeUnits: 12,
      dbUnits: 3,
      storageGb: 200,
      cdnGb: 80,
      cacheGb: 1,
      requestMillions: 20,
      usersThousands: 300,
      region: "asia",
    },
    budget: 500,
    maxLatency: 450,
    minReliability: 80,
  },
];

export function getCloudChallenge(id: string) {
  return CLOUD_CHALLENGES.find((item) => item.id === id);
}

export const CLOUD_EDUCATION: LabEducationBlock = {
  howItWorks: [
    "Sliders use static estimate rates, not live AWS or GCP prices.",
    "Each challenge has a budget plus latency and reliability gates. Those gates exist so you cannot zero every resource.",
  ],
  keyConcepts: [
    {
      title: "Egress and requests",
      body: "Bytes out and chatty clients often beat instance count on the invoice.",
    },
    {
      title: "Hot vs cold",
      body: "Years of logs do not belong on the same storage class as the working set.",
    },
  ],
  commonMistakes: [
    "Deleting the database to win a cost game.",
    "Ignoring region. Users far from origin pay in latency even when the bill looks fine.",
  ],
  interviewTips: [
    "Say 'order of magnitude' and the unit: per GB, per hour, per million requests.",
    "Ask who owns egress before you promise a number to finance.",
  ],
};
