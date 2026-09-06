import { DynamicFireStudio } from "@/components/lab/lab-dynamic";
import { LabHubShell } from "@/components/lab/lab-hub-shell";
import { getLabExperience } from "@/content/lab/experiences";
import { FIRE_EDUCATION } from "@/content/lab/production-fire";
import { buildMetadata } from "@/lib/seo";

const experience = getLabExperience("production-fire")!;

export const metadata = buildMetadata({
  title: experience.seoTitle,
  description: experience.seoDescription,
  path: experience.href,
});

export default function ProductionFirePage() {
  return (
    <LabHubShell experience={experience} education={FIRE_EDUCATION}>
      <DynamicFireStudio />
    </LabHubShell>
  );
}
