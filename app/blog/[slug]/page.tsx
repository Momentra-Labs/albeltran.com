import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { Badge } from "@/components/ui/badge";
import {
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
} from "@/lib/mdx";
import {
  articleSchema,
  breadcrumbSchema,
  graphSchema,
  personSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return buildMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}/`,
      type: "article",
    });
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  if (post.draft) notFound();

  const related = getRelatedPosts(slug);
  const schema = graphSchema([
    personSchema(),
    webPageSchema({
      path: `/blog/${post.slug}/`,
      name: post.title,
      description: post.description,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog/" },
      { name: post.title, path: `/blog/${post.slug}/` },
    ]),
    articleSchema({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}/`,
      datePublished: post.date,
      dateModified: post.updated,
      tags: post.tags,
    }),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label={post.category}
        title={post.title}
        description={post.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog/" },
          { name: post.title },
        ]}
      />
      <Container className="py-16">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-muted-dim">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{post.readingTime}</span>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>#{tag}</Badge>
            ))}
          </div>
        </div>

        <article className="prose-portfolio max-w-3xl">
          <MDXRemote source={post.content} />
        </article>

        {related.length > 0 && (
          <section className="mt-16 max-w-3xl border-t border-border pt-10">
            <h2 className="text-2xl font-semibold text-foreground">
              Related posts
            </h2>
            <ul className="mt-4 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}/`}
                    className="text-accent hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-muted">{item.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-12 text-sm text-muted">
          More writing in the{" "}
          <Link href="/blog/" className="text-accent hover:underline">
            blog index
          </Link>
          . Explore related{" "}
          <Link href="/projects/" className="text-accent hover:underline">
            projects
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
