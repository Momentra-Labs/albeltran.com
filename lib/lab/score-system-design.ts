import type { SystemComponentId } from "@/content/lab/types";
import type { SystemDesignScenario } from "@/content/lab/system-design";
import type { LabScoreBreakdown } from "@/content/lab/types";

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function scoreSystemDesign(
  scenario: SystemDesignScenario,
  selected: readonly SystemComponentId[],
  decisions: Record<string, string>,
) {
  const set = new Set(selected);
  const requiredHit = scenario.required.filter((id) => set.has(id)).length;
  const requiredMiss = scenario.required.length - requiredHit;
  const recommendedHit = scenario.recommended.filter((id) => set.has(id)).length;
  const antiHit = scenario.antipatterns.filter((id) => set.has(id)).length;
  const expensiveHit = scenario.expensive.filter((id) => set.has(id)).length;
  const decisionHits = scenario.decisions.filter((item) => decisions[item.id] === item.good).length;
  const decisionTotal = scenario.decisions.length || 1;

  const coverage = requiredHit / Math.max(scenario.required.length, 1);
  const extras = Math.max(0, selected.length - scenario.required.length - recommendedHit);

  const scalability = clamp(
    42 + coverage * 38 + recommendedHit * 5 + decisionHits * 6 - requiredMiss * 12,
  );
  const reliability = clamp(
    40 + coverage * 36 + (set.has("replica") || set.has("queue") ? 10 : 0) + decisionHits * 5 - antiHit * 10,
  );
  const performance = clamp(
    38 +
      (set.has("cache") ? 16 : 0) +
      (set.has("cdn") ? 12 : 0) +
      (set.has("load-balancer") ? 8 : 0) +
      coverage * 20 -
      requiredMiss * 8,
  );
  const cost = clamp(88 - expensiveHit * 14 - extras * 4 - (selected.length > 10 ? 10 : 0) + (set.has("cache") ? 4 : 0));
  const complexity = clamp(90 - extras * 6 - selected.length * 2 + coverage * 10);

  const breakdown: LabScoreBreakdown[] = [
    { label: "Scalability", value: scalability },
    { label: "Reliability", value: reliability },
    { label: "Performance", value: performance },
    { label: "Cost", value: cost },
    { label: "Complexity", value: complexity },
  ];

  const score = clamp(
    breakdown.reduce((sum, row) => sum + row.value, 0) / breakdown.length +
      (decisionHits / decisionTotal) * 6,
  );

  return { score, maxScore: 100, breakdown };
}
