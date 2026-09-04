import fs from "fs";
import path from "path";
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

export type BlogPost = BlogFrontmatter & {
  slug: string;
  href: string;
  content: string;
  readingTime: string;
  readingMinutes: number;
};

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

export function getPostSlugs(): string[] {
  ensureBlogDir();
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const frontmatter = data as BlogFrontmatter;

  return {
    slug,
    href: articleHref(slug),
    content,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    updated: frontmatter.updated,
    category: frontmatter.category,
    tags: frontmatter.tags ?? [],
    image: frontmatter.image,
    imageAlt: frontmatter.imageAlt,
    draft: frontmatter.draft ?? false,
    kind: frontmatter.kind,
    takeaways: frontmatter.takeaways,
    readingTime: stats.text,
    readingMinutes: Math.ceil(stats.minutes),
  };
}

export function getAllPosts(): BlogPost[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

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
  return [...new Set(getAllPosts().map((post) => post.category))].sort();
}

export function getAllTags(): string[] {
  return [...new Set(getAllPosts().flatMap((post) => post.tags))].sort();
}
