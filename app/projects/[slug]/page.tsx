import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Code2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProject, projects } from "@/content/projects";
import { getAllPosts } from "@/lib/mdx";
import {
  breadcrumbSchema,
  graphSchema,
  personSchema,
  projectSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.name,
    description: project.tagline,
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

  const schema = graphSchema([
    personSchema(),
    webPageSchema({
      path: `/projects/${project.slug}/`,
      name: project.name,
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
      <Container className="py-16">
        <p className="mb-10 text-sm text-muted-dim">{project.role}</p>

        <div className="mb-10 flex flex-wrap gap-3">
          {project.demo && (
            <Button asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                Live demo <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.repository && (
            <Button asChild variant="secondary">
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code2 className="h-4 w-4" /> Repository
              </a>
            </Button>
          )}
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <article className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold text-foreground">Overview</h2>
              <p className="mt-4 leading-relaxed text-muted">{project.overview}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground">Problem</h2>
              <p className="mt-4 leading-relaxed text-muted">{project.problem}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground">Solution</h2>
              <p className="mt-4 leading-relaxed text-muted">{project.solution}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Architecture
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                {project.architecture.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Screenshots
              </h2>
              <div className="mt-4 grid gap-4">
                {project.screenshots.map((shot) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    className="w-full border border-border bg-surface"
                  />
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground">Features</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                {project.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Challenges
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                {project.challenges.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Performance improvements
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                {project.performance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Lessons learned
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                {project.lessons.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            {relatedArticles.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-foreground">
                  Related articles
                </h2>
                <ul className="mt-4 space-y-2">
                  {relatedArticles.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}/`}
                        className="text-accent hover:underline"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-surface/50 p-5">
              <h3 className="text-sm font-medium text-foreground">Tech stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
            <div className="border border-border bg-surface/50 p-5 text-sm text-muted">
              <p>
                See also{" "}
                <Link href="/experience/" className="text-accent hover:underline">
                  experience
                </Link>{" "}
                and{" "}
                <Link href="/blog/" className="text-accent hover:underline">
                  writing
                </Link>{" "}
                related to this work.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
