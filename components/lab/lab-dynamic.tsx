"use client";

import dynamic from "next/dynamic";

export const DynamicSystemDesignStudio = dynamic(
  () =>
    import("@/components/lab/system-design/system-design-studio").then(
      (mod) => mod.SystemDesignStudio,
    ),
  { loading: () => <p className="text-sm text-muted">Loading simulator…</p> },
);

export const DynamicDebugStudio = dynamic(
  () => import("@/components/lab/debug-this/debug-studio").then((mod) => mod.DebugStudio),
  { loading: () => <p className="text-sm text-muted">Loading incident…</p> },
);

export const DynamicCodeBattleStudio = dynamic(
  () =>
    import("@/components/lab/code-battle/code-battle-studio").then((mod) => mod.CodeBattleStudio),
  { loading: () => <p className="text-sm text-muted">Loading battle…</p> },
);

export const DynamicSqlArenaStudio = dynamic(
  () => import("@/components/lab/sql-arena/sql-arena-studio").then((mod) => mod.SqlArenaStudio),
  { loading: () => <p className="text-sm text-muted">Loading arena…</p> },
);

export const DynamicFireStudio = dynamic(
  () => import("@/components/lab/production-fire/fire-studio").then((mod) => mod.FireStudio),
  { loading: () => <p className="text-sm text-muted">Loading incident…</p> },
);

export const DynamicCloudStudio = dynamic(
  () => import("@/components/lab/cloud-cost/cloud-studio").then((mod) => mod.CloudStudio),
  { loading: () => <p className="text-sm text-muted">Loading estimator…</p> },
);

export const DynamicInterviewStudio = dynamic(
  () => import("@/components/lab/interview/interview-studio").then((mod) => mod.InterviewStudio),
  { loading: () => <p className="text-sm text-muted">Loading interview…</p> },
);
