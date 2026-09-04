import { notFound, permanentRedirect } from "next/navigation";
import { JsonLd } from "@/components/shared/json-ld";
import { ArticleShell } from "@/components/journal/article-shell";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { articleHref, isInterviewSlug } from "@/content/journal";
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
    .filter((slug) => !isInterviewSlug(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (isInterviewSlug(slug)) {
    return {};
  }
  try {
    const post = getPostBySlug(slug);
    if (post.draft) return {};
    return buildMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}/`,
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  if (isInterviewSlug(slug)) {
    permanentRedirect(articleHref(slug));
  }

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  if (post.draft) notFound();

  const path = `/blog/${post.slug}/`;
  const schema = graphSchema([
    websiteSchema(),
    personSchema(),
    webPageSchema({
      path,
      name: post.title,
      description: post.description,
      mainEntity: "none",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Journal", path: "/blog/" },
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
          { name: "Journal", href: "/blog/" },
          { name: post.title },
        ]}
      />
    </>
  );
}
