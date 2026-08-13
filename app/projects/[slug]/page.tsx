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
      <Container className="py-16">
        <p className="mb-4 text-sm text-muted-dim">{project.role}</p>
        <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted">
          Case study by{" "}
          <Link href="/about/" className="text-accent hover:underline">
            Al Beltran
          </Link>{" "}
          ({person.name}), Senior Software Engineer and Full-Stack Developer.
        </p>

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
          {project.privacyPolicy && (
            <Button asChild variant="secondary">
              <a href={project.privacyPolicy}>Privacy policy</a>
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
              <h2 className="text-2xl font-semibold text-foreground">
                The problem
              </h2>
              <p className="mt-4 leading-relaxed text-muted">{project.problem}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                The solution
              </h2>
              <p className="mt-4 leading-relaxed text-muted">{project.solution}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Architecture & engineering decisions
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
                  <div
                    key={shot.src}
                    className="relative aspect-video w-full overflow-hidden border border-border bg-surface"
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
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Key features
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                {project.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Technical challenges
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
                      <p className="text-sm text-muted">{post.description}</p>
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
            {relatedRoles.length > 0 && (
              <div className="border border-border bg-surface/50 p-5 text-sm">
                <h3 className="font-medium text-foreground">Related experience</h3>
                <ul className="mt-3 space-y-2 text-muted">
                  {relatedRoles.map((role) => (
                    <li key={role.id}>
                      <Link
                        href="/experience/"
                        className="text-accent hover:underline"
                      >
                        {role.role} at {role.company}
                      </Link>
                      <span className="block text-xs text-muted-dim">
                        {role.duration}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="border border-border bg-surface/50 p-5 text-sm text-muted">
              <p>
                More about{" "}
                <Link href="/about/" className="text-accent hover:underline">
                  Al Beltran
                </Link>
                , the full{" "}
                <Link
                  href="/experience/"
                  className="text-accent hover:underline"
                >
                  experience timeline
                </Link>
                , and{" "}
                <Link href="/blog/" className="text-accent hover:underline">
                  engineering writing
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
