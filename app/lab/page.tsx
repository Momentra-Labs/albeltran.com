import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { DailyChallenge } from "@/components/lab/daily-challenge";
import { EngineerProfileCard } from "@/components/lab/engineer-profile";
import { LabCard } from "@/components/lab/lab-card";
import { LabEducation } from "@/components/lab/lab-education";
import { LabNav } from "@/components/lab/lab-nav";
import { LAB_EXPERIENCES, LAB_HUB_EDUCATION } from "@/content/lab/experiences";
import { person } from "@/content/person";
import {
  breadcrumbSchema,
  collectionPageSchema,
  graphSchema,
  learningResourceSchema,
  personSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const PATH = "/lab/";
const TITLE = "Al Beltran Engineering Lab";
const DESCRIPTION =
  "Production problems, system failures, and architectural trade-offs. Investigate fictional incidents and sit with design decisions in Al Beltran's Engineering Lab.";

export const metadata = buildMetadata({
  title: "Engineering Lab — Interactive Challenges for Developers | Al Beltran",
  description: DESCRIPTION,
  path: PATH,
});

export default function LabPage() {
  const schema = graphSchema([
    websiteSchema(),
    personSchema(),
    webPageSchema({
      path: PATH,
      name: TITLE,
      description: DESCRIPTION,
      mainEntity: "none",
    }),
    collectionPageSchema({
      path: PATH,
      name: TITLE,
      description: DESCRIPTION,
    }),
    learningResourceSchema({
      path: PATH,
      name: TITLE,
      description: DESCRIPTION,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Engineering Lab", path: PATH },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <header className="border-b border-border pb-12 pt-24">
        <Container>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Vol. 01 / Manila
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {person.shortName}
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl tracking-tight break-words text-foreground sm:text-5xl lg:text-6xl">
            Engineering Lab
          </h1>
          <p className="mt-5 max-w-2xl text-base text-foreground sm:text-lg">
            Production problems. System failures. Architectural trade-offs. You investigate.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Interactive desks for incidents, design, SQL, and interviews. Everything runs in the
            browser. Progress stays on this device. Nothing here is live production telemetry.
          </p>
        </Container>
      </header>
      <Container className="py-12">
        <LabNav current={PATH} />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
          <DailyChallenge />
          <EngineerProfileCard />
        </div>
        <h2 className="mt-14 font-display text-3xl tracking-tight text-foreground">
          Experiences
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {LAB_EXPERIENCES.map((experience) => (
            <LabCard key={experience.id} experience={experience} />
          ))}
        </div>
        <LabEducation education={LAB_HUB_EDUCATION} />
      </Container>
    </>
  );
}
