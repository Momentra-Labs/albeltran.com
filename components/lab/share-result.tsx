"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatShareText, shareLabResult } from "@/lib/lab/share";
import type { LabScoreBreakdown } from "@/content/lab/types";

export function ShareResult({
  experience,
  challenge,
  score,
  maxScore,
  breakdown,
  url,
}: {
  experience: string;
  challenge?: string;
  score: number;
  maxScore: number;
  breakdown?: LabScoreBreakdown[];
  url: string;
}) {
  const [status, setStatus] = useState<"idle" | "shared" | "copied" | "failed">("idle");

  async function onShare() {
    const text = formatShareText({ experience, challenge, score, maxScore, breakdown });
    const result = await shareLabResult({
      title: "Al Beltran Engineering Lab",
      text,
      url,
    });
    setStatus(result);
  }

  return (
    <div>
      <Button type="button" variant="hairline" onClick={onShare}>
        Share result
      </Button>
      <p className="mt-2 font-mono text-[11px] text-muted" aria-live="polite">
        {status === "copied"
          ? "Copied to clipboard."
          : status === "shared"
            ? "Shared."
            : status === "failed"
              ? "Share cancelled or unavailable."
              : "Can you beat my score?"}
      </p>
    </div>
  );
}
