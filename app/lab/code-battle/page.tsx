import { DynamicCodeBattleStudio } from "@/components/lab/lab-dynamic";
import { LabHubShell } from "@/components/lab/lab-hub-shell";
import { getLabExperience } from "@/content/lab/experiences";
import { CODE_BATTLE_EDUCATION } from "@/content/lab/code-battle";
import { buildMetadata } from "@/lib/seo";

const experience = getLabExperience("code-battle")!;

export const metadata = buildMetadata({
  title: experience.seoTitle,
  description: experience.seoDescription,
  path: experience.href,
});

export default function CodeBattlePage() {
  return (
    <LabHubShell experience={experience} education={CODE_BATTLE_EDUCATION}>
      <DynamicCodeBattleStudio />
    </LabHubShell>
  );
}
