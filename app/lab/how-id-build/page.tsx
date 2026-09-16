import { DynamicBuildStudio } from "@/components/lab/lab-dynamic";
import { LabHubShell } from "@/components/lab/lab-hub-shell";
import { getLabExperience } from "@/content/lab/experiences";
import { BUILD_EDUCATION } from "@/content/lab/how-id-build";
import { buildMetadata } from "@/lib/seo";

const experience = getLabExperience("how-id-build")!;

export const metadata = buildMetadata({
  title: experience.seoTitle,
  description: experience.seoDescription,
  path: experience.href,
});

export default function HowIdBuildPage() {
  return (
    <LabHubShell experience={experience} education={BUILD_EDUCATION}>
      <DynamicBuildStudio />
    </LabHubShell>
  );
}
