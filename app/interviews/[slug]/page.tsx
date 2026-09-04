import { notFound } from "next/navigation";
import { JsonLd } from "@/components/shared/json-ld";
import { ArticleShell } from "@/components/journal/article-shell";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { isInterviewSlug } from "@/content/journal";
import {
  articleSchema,
  breadcrumbSchema,
  graphSchema,
  personSchema,
  websiteSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs()
    .filter((slug) => isInterviewSlug(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    if (post.draft || !isInterviewSlug(slug)) return {};
    return buildMetadata({
      title: post.title,
      description: post.description,
      path: `/interviews/${post.slug}/`,
      type: "article",
      image: post.image,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    });
  } catch {
    return {};
  }
}

export default async function InterviewArticlePage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  if (post.draft || !isInterviewSlug(slug)) notFound();

  const path = `/interviews/${post.slug}/`;
  const schema = graphSchema([
    websiteSchema(),
    personSchema(),
    webPageSchema({
      path,
      name: post.title,
      description: post.description,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Interview Lab", path: "/interviews/" },
      { name: post.title, path },
    ]),
    articleSchema({
      title: post.title,
      description: post.description,
      path,
      datePublished: post.date,
      dateModified: post.updated,
      tags: post.tags,
      image: post.image,
    }),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <ArticleShell
        post={post}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Interview Lab", href: "/interviews/" },
          { name: post.title },
        ]}
      />
    </>
  );
}
