import { DynamicDebugStudio } from "@/components/lab/lab-dynamic";
import { LabHubShell } from "@/components/lab/lab-hub-shell";
import { getLabExperience } from "@/content/lab/experiences";
import { DEBUG_EDUCATION } from "@/content/lab/debug-this";
import { buildMetadata } from "@/lib/seo";

const experience = getLabExperience("debug-this")!;

export const metadata = buildMetadata({
  title: experience.seoTitle,
  description: experience.seoDescription,
  path: experience.href,
});

export default function DebugThisPage() {
  return (
    <LabHubShell experience={experience} education={DEBUG_EDUCATION}>
      <DynamicDebugStudio />
    </LabHubShell>
  );
}
