import { notFound } from "next/navigation";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHeader } from "@/components/shared/page-header";
import { LabEducation } from "@/components/lab/lab-education";
import { LabNav } from "@/components/lab/lab-nav";
import { DynamicSystemDesignStudio } from "@/components/lab/lab-dynamic";
import {
  getSystemDesignScenario,
  indexedSystemDesignScenarios,
  SYSTEM_DESIGN_SCENARIOS,
} from "@/content/lab/system-design";
import { person } from "@/content/person";
import {
  breadcrumbSchema,
  graphSchema,
  learningResourceSchema,
  personSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return indexedSystemDesignScenarios().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const scenario = getSystemDesignScenario(slug);
  if (!scenario?.indexed) return {};
  return buildMetadata({
    title: scenario.seoTitle,
    description: scenario.seoDescription,
    path: `/lab/system-design/${scenario.slug}/`,
  });
}

export default async function SystemDesignScenarioPage({ params }: Props) {
  const { slug } = await params;
  const scenario = getSystemDesignScenario(slug);
  if (!scenario?.indexed) notFound();
  const path = `/lab/system-design/${scenario.slug}/`;
  const related = SYSTEM_DESIGN_SCENARIOS.filter(
    (item) => item.indexed && item.slug !== scenario.slug,
  )
    .slice(0, 3)
    .map((item) => ({
      href: `/lab/system-design/${item.slug}/`,
      title: item.title,
    }));

  const schema = graphSchema([
    websiteSchema(),
    personSchema(),
    webPageSchema({
      path,
      name: scenario.seoTitle,
      description: scenario.seoDescription,
      mainEntity: "none",
    }),
    learningResourceSchema({
      path,
      name: scenario.title,
      description: scenario.seoDescription,
      educationalLevel: scenario.difficulty,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Engineering Lab", path: "/lab/" },
      { name: "System Design", path: "/lab/system-design/" },
      { name: scenario.title, path },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="System Design Simulator"
        title={scenario.title}
        description={scenario.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Lab", href: "/lab/" },
          { name: "System Design", href: "/lab/system-design/" },
          { name: scenario.title },
        ]}
      />
      <Container className="py-12">
        <LabNav current="/lab/system-design/" />
        <DynamicSystemDesignStudio initialSlug={scenario.slug} />
        <LabEducation education={scenario.education} related={related} />
        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
          Built by {person.shortName}
        </p>
      </Container>
    </>
  );
}
