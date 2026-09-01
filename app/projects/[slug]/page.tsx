import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Code2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { experience } from "@/content/experience";
import { getProject, projects } from "@/content/projects";
import { person } from "@/content/person";
import { getAllPosts } from "@/lib/mdx";
import {
  breadcrumbSchema,
  graphSchema,
  personSchema,
  projectSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { ArchitectureFlow } from "@/components/projects/architecture-flow";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.name} — Case Study`,
    description: `${project.tagline} Role: ${project.role}. Built by ${person.shortName} using ${project.techStack.slice(0, 5).join(", ")}.`,
    path: `/projects/${project.slug}/`,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const relatedArticles = getAllPosts().filter((post) =>
    project.relatedArticles?.includes(post.slug),
  );
  const relatedRoles = experience.filter((item) =>
    project.relatedExperience?.includes(item.id),
  );

  const schema = graphSchema([
    personSchema(),
    webPageSchema({
      path: `/projects/${project.slug}/`,
      name: `${project.name} — Case Study by ${person.shortName}`,
      description: project.overview,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects/" },
      { name: project.name, path: `/projects/${project.slug}/` },
    ]),
    projectSchema(project),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label={project.year}
        title={project.name}
        description={project.tagline}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects/" },
          { name: project.shortName },
        ]}
      />
      <Container className="py-16 sm:py-20">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-dim">
          {project.kind === "lab" ? "Lab" : "Case study"} · {project.role}
        </p>
        <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted">
          Written by{" "}
          <Link href="/about/" className="text-accent hover:underline">
            Al Beltran
          </Link>{" "}
          ({person.name}), Senior Software Engineer.
        </p>

        <div className="mb-12 flex flex-wrap gap-3">
          {project.demo && (
            <Button asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                Live demo <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.repository && (
            <Button asChild variant="hairline">
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code2 className="h-4 w-4" /> Repository
              </a>
            </Button>
          )}
          {project.privacyPolicy && (
            <Button asChild variant="hairline">
              <a href={project.privacyPolicy}>Privacy policy</a>
            </Button>
          )}
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_240px]">
          <article className="space-y-14">
            <section>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                01 · Problem
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground">
                {project.problem}
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                {project.overview}
              </p>
            </section>
            <section>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                02 · Solution
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                {project.solution}
              </p>
            </section>
            {project.architecture.length > 0 && (
              <section>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  03 · Architecture
                </h2>
                <ArchitectureFlow
                  className="mt-6"
                  steps={project.architecture}
                />
              </section>
            )}
            <section>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Implementation
              </h2>
              <div className="mt-6 grid gap-4">
                {project.screenshots.map((shot) => (
                  <div
                    key={shot.src}
                    className="relative aspect-video w-full overflow-hidden border border-border"
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 720px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <ul className="mt-8 space-y-3 text-muted">
                {project.features.map((item) => (
                  <li key={item} className="border-b border-border pb-3">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Challenges & outcomes
              </h2>
              <div className="mt-6 grid gap-10 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    Challenges
                  </h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
                    {project.challenges.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    Outcomes
                  </h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
                    {project.performance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <h3 className="mt-10 text-sm font-medium text-foreground">
                Lessons
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
                {project.lessons.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            {relatedArticles.length > 0 && (
              <section>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  Related writing
                </h2>
                <ul className="mt-4 space-y-4">
                  {relatedArticles.map((post) => (
                    <li key={post.slug} className="border-b border-border pb-4">
                      <Link
                        href={`/blog/${post.slug}/`}
                        className="text-foreground hover:text-accent"
                      >
                        {post.title}
                      </Link>
                      <p className="mt-1 text-sm text-muted">{post.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Stack
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
            {relatedRoles.length > 0 && (
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  Related experience
                </h3>
                <ul className="mt-3 space-y-3 text-sm text-muted">
                  {relatedRoles.map((role) => (
                    <li key={role.id}>
                      <Link
                        href="/experience/"
                        className="text-foreground hover:text-accent"
                      >
                        {role.role} at {role.company}
                      </Link>
                      <span className="mt-1 block font-mono text-[11px] text-muted-dim">
                        {role.duration}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-sm leading-relaxed text-muted">
              More about{" "}
              <Link href="/about/" className="text-accent hover:underline">
                Al Beltran
              </Link>
              , the{" "}
              <Link href="/experience/" className="text-accent hover:underline">
                experience timeline
              </Link>
              , and{" "}
              <Link href="/blog/" className="text-accent hover:underline">
                engineering writing
              </Link>
              .
            </p>
          </aside>
        </div>
      </Container>
    </>
  );
}
