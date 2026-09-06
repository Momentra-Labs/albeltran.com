import { Badge } from "@/components/ui/badge";
import type { LabDifficulty } from "@/content/lab/types";

const LABEL: Record<LabDifficulty, string> = {
  junior: "Junior",
  mid: "Mid",
  senior: "Senior",
  staff: "Staff",
};

export function DifficultyBadge({ level }: { level: LabDifficulty }) {
  return (
    <Badge variant={level === "staff" || level === "senior" ? "accent" : "default"}>
      {LABEL[level]}
    </Badge>
  );
}
