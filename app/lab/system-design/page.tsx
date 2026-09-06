import { DynamicSystemDesignStudio } from "@/components/lab/lab-dynamic";
import { LabHubShell } from "@/components/lab/lab-hub-shell";
import { getLabExperience } from "@/content/lab/experiences";
import { SYSTEM_DESIGN_HUB_EDUCATION } from "@/content/lab/system-design";
import { buildMetadata } from "@/lib/seo";

const experience = getLabExperience("system-design")!;

export const metadata = buildMetadata({
  title: experience.seoTitle,
  description: experience.seoDescription,
  path: experience.href,
});

export default function SystemDesignPage() {
  return (
    <LabHubShell experience={experience} education={SYSTEM_DESIGN_HUB_EDUCATION}>
      <DynamicSystemDesignStudio />
    </LabHubShell>
  );
}
