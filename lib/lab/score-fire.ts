import type { FireIncident, FireMetrics } from "@/content/lab/production-fire";

const clamp = (value: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, Math.round(value)));

export function applyFireActions(incident: FireIncident, actionIds: readonly string[]): FireMetrics {
  const next: FireMetrics = { ...incident.start };
  for (const id of actionIds) {
    const action = incident.actions.find((item) => item.id === id);
    if (!action) continue;
    next.downtime = clamp(next.downtime + (action.effect.downtime ?? 0));
    next.users = Math.max(0, Math.round(next.users + (action.effect.users ?? 0)));
    next.cost = Math.max(0, Math.round(next.cost + (action.effect.cost ?? 0)));
    next.latency = Math.max(80, Math.round(next.latency + (action.effect.latency ?? 0)));
    next.reliability = clamp(next.reliability + (action.effect.reliability ?? 0));
  }
  return next;
}

export function scoreFireIncident(metrics: FireMetrics) {
  const score = clamp(
    metrics.reliability * 0.42 +
      (100 - metrics.downtime) * 0.22 +
      Math.max(0, 100 - metrics.users / 400) * 0.16 +
      Math.max(0, 100 - metrics.latency / 80) * 0.12 +
      Math.max(0, 100 - metrics.cost) * 0.08,
  );
  return { score, maxScore: 100 };
}
