import { DynamicCloudStudio } from "@/components/lab/lab-dynamic";
import { LabHubShell } from "@/components/lab/lab-hub-shell";
import { getLabExperience } from "@/content/lab/experiences";
import { CLOUD_EDUCATION } from "@/content/lab/cloud-cost";
import { buildMetadata } from "@/lib/seo";

const experience = getLabExperience("cloud-cost")!;

export const metadata = buildMetadata({
  title: experience.seoTitle,
  description: experience.seoDescription,
  path: experience.href,
});

export default function CloudCostPage() {
  return (
    <LabHubShell experience={experience} education={CLOUD_EDUCATION}>
      <DynamicCloudStudio />
    </LabHubShell>
  );
}
