import { DynamicInterviewStudio } from "@/components/lab/lab-dynamic";
import { LabHubShell } from "@/components/lab/lab-hub-shell";
import { getLabExperience } from "@/content/lab/experiences";
import { INTERVIEW_EDUCATION } from "@/content/lab/interview";
import { buildMetadata } from "@/lib/seo";

const experience = getLabExperience("interview")!;

export const metadata = buildMetadata({
  title: experience.seoTitle,
  description: experience.seoDescription,
  path: experience.href,
});

export default function InterviewLabPage() {
  return (
    <LabHubShell experience={experience} education={INTERVIEW_EDUCATION}>
      <DynamicInterviewStudio />
    </LabHubShell>
  );
}
