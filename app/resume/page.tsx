import Link from "next/link";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/content/experience";
import { person, techGroups } from "@/content/person";
import {
  breadcrumbSchema,
  graphSchema,
  personSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resume",
  description: `Resume for ${person.name}, ${person.currentRole} and founder of ${person.labs} — download PDF and review experience highlights.`,
  path: "/resume/",
});

export default function ResumePage() {
  const schema = graphSchema([
    personSchema(),
    webPageSchema({
      path: "/resume/",
      name: `Resume · ${person.shortName}`,
      description: person.summary,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Resume", path: "/resume/" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Resume"
        title={`${person.name}`}
        description={`${person.currentRole} · ${person.founderTitle} · ${person.location}`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Resume" },
        ]}
      />
      <Container className="py-16">
        <div className="mb-10 flex flex-wrap gap-3">
          <Button asChild>
            <a href="/resume.pdf" download>
              <Download className="h-4 w-4" /> Download PDF
            </a>
          </Button>
          <Button asChild variant="hairline">
            <Link href="/contact/">Contact</Link>
          </Button>
        </div>

        <div className="space-y-12 print:space-y-8">
          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Summary
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted">
              {person.summary}
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Experience
            </h2>
            <ul className="mt-5 space-y-6">
              {experience.map((item) => (
                <li key={item.id} className="border-b border-border pb-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium text-foreground">
                      {item.role} · {item.company}
                    </p>
                    <p className="font-mono text-xs text-muted">{item.duration}</p>
                  </div>
                  <p className="mt-2 text-sm text-muted">{item.summary}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                    {item.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Skills
            </h2>
            <div className="mt-4 space-y-4">
              {techGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-2 text-sm text-muted-dim">{group.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
