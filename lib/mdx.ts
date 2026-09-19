import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";
import { articleHref } from "@/content/journal";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  draft?: boolean;
  kind?: "article" | "interview";
  takeaways?: string[];
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
  href: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
  readingTime: string;
  readingMinutes: number;
};

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

function frontmatterFrom(data: BlogFrontmatter): BlogFrontmatter {
  return {
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated,
    category: data.category,
    tags: data.tags ?? [],
    image: data.image,
    imageAlt: data.imageAlt,
    draft: data.draft ?? false,
    kind: data.kind,
    takeaways: data.takeaways,
  };
}

export const getPostSlugs = cache(function getPostSlugs(): string[] {
  ensureBlogDir();
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
});

export const getPostMetaBySlug = cache(function getPostMetaBySlug(
  slug: string,
): BlogPostMeta {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const fence = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const { data } = matter(fence ? `---\n${fence[1]}\n---\n` : raw);
  const frontmatter = frontmatterFrom(data as BlogFrontmatter);

  return {
    slug,
    href: articleHref(slug),
    ...frontmatter,
  };
});

export const getPostBySlug = cache(function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const frontmatter = frontmatterFrom(data as BlogFrontmatter);

  return {
    slug,
    href: articleHref(slug),
    content,
    readingTime: stats.text,
    readingMinutes: Math.ceil(stats.minutes),
    ...frontmatter,
  };
});

export const getAllPostMeta = cache(function getAllPostMeta(): BlogPostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostMetaBySlug(slug))
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
});

export const getAllPosts = cache(function getAllPosts(): BlogPost[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
});

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase(),
  );
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) =>
        current.tags.includes(tag),
      ).length;
      const sameCategory = post.category === current.category ? 1 : 0;
      return { post, score: sharedTags * 2 + sameCategory };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

export function getAllCategories(): string[] {
  return [...new Set(getAllPostMeta().map((post) => post.category))].sort();
}

export function getAllTags(): string[] {
  return [...new Set(getAllPostMeta().flatMap((post) => post.tags))].sort();
}
