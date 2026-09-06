import { DynamicSqlArenaStudio } from "@/components/lab/lab-dynamic";
import { LabHubShell } from "@/components/lab/lab-hub-shell";
import { getLabExperience } from "@/content/lab/experiences";
import { SQL_EDUCATION } from "@/content/lab/sql-arena";
import { buildMetadata } from "@/lib/seo";

const experience = getLabExperience("sql-arena")!;

export const metadata = buildMetadata({
  title: experience.seoTitle,
  description: experience.seoDescription,
  path: experience.href,
});

export default function SqlArenaPage() {
  return (
    <LabHubShell experience={experience} education={SQL_EDUCATION}>
      <DynamicSqlArenaStudio />
    </LabHubShell>
  );
}
