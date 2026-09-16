import { DynamicIncidentStudio } from "@/components/lab/lab-dynamic";
import { LabHubShell } from "@/components/lab/lab-hub-shell";
import { getLabExperience } from "@/content/lab/experiences";
import { INCIDENT_EDUCATION } from "@/content/lab/incidents";
import { buildMetadata } from "@/lib/seo";

const experience = getLabExperience("incident")!;

export const metadata = buildMetadata({
  title: experience.seoTitle,
  description: experience.seoDescription,
  path: experience.href,
});

export default function IncidentPage() {
  return (
    <LabHubShell experience={experience} education={INCIDENT_EDUCATION}>
      <DynamicIncidentStudio />
    </LabHubShell>
  );
}
