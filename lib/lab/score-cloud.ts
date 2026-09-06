import {
  CLOUD_RATES,
  REGION_MULTIPLIER,
  type CloudInputs,
} from "@/content/lab/cloud-cost";

const clamp = (value: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, Math.round(value)));

export function estimateCloud(input: CloudInputs) {
  const hours = 730;
  const region = REGION_MULTIPLIER[input.region];
  const compute = input.computeUnits * CLOUD_RATES.computeHour * hours;
  const database = input.dbUnits * CLOUD_RATES.dbHour * hours;
  const storage = input.storageGb * CLOUD_RATES.storageGb;
  const cdn = input.cdnGb * CLOUD_RATES.cdnGb;
  const cache = input.cacheGb * CLOUD_RATES.cacheGb;
  const requests = input.requestMillions * CLOUD_RATES.requestMillion;
  const monthly = (compute + database + storage + cdn + cache + requests) * region;

  const latency = clamp(
    720 -
      Math.min(input.cdnGb, 4000) * 0.04 -
      input.cacheGb * 10 -
      Math.min(input.computeUnits, 16) * 8 +
      (input.cdnGb < 50 ? 220 : 0) +
      (input.region === "us" && input.usersThousands > 1000 ? 80 : 0) -
      (input.region === "asia" ? 40 : 0),
    80,
    1600,
  );

  const reliability = clamp(
    48 +
      Math.min(input.computeUnits, 18) * 1.6 +
      Math.min(input.dbUnits, 6) * 4 +
      (input.cacheGb >= 2 ? 6 : 0) +
      (input.cdnGb >= 100 ? 4 : 0) -
      (input.computeUnits < 2 ? 22 : 0) -
      (input.dbUnits < 1 ? 28 : 0),
  );

  return {
    monthly: Math.round(monthly),
    parts: {
      compute: Math.round(compute * region),
      database: Math.round(database * region),
      storage: Math.round(storage * region),
      cdn: Math.round(cdn * region),
      cache: Math.round(cache * region),
      requests: Math.round(requests * region),
    },
    latency,
    reliability,
  };
}

export function scoreCloudChallenge(input: {
  monthly: number;
  budget: number;
  latency: number;
  maxLatency: number;
  reliability: number;
  minReliability: number;
}) {
  const underBudget = input.monthly <= input.budget;
  const latencyOk = input.latency <= input.maxLatency;
  const reliabilityOk = input.reliability >= input.minReliability;
  const budgetRatio = Math.min(input.budget / Math.max(input.monthly, 1), 1.4);
  const score = clamp(
    (underBudget ? 40 : 10 * budgetRatio) +
      (latencyOk ? 30 : 8) +
      (reliabilityOk ? 30 : 6),
  );
  return {
    score,
    maxScore: 100,
    passed: underBudget && latencyOk && reliabilityOk,
  };
}
