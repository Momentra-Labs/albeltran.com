import Link from "next/link";
import type { BlogPost } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";

function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogPostList({
  posts,
  emptyMessage = "No articles match those filters.",
}: {
  posts: BlogPost[];
  emptyMessage?: string;
}) {
  return (
    <ol className="divide-y divide-border border-y border-border">
      {posts.map((post) => (
        <li key={post.slug}>
          <article className="py-8">
            <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted-dim">
              <Badge variant="accent">{post.category}</Badge>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              <Link
                href={`/blog/${post.slug}/`}
                className="hover:text-accent"
                data-cursor="→"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 max-w-2xl text-muted">{post.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((item) => (
                <span key={item} className="text-xs text-muted-dim">
                  #{item}
                </span>
              ))}
            </div>
          </article>
        </li>
      ))}
      {posts.length === 0 ? (
        <li className="py-8 text-muted">{emptyMessage}</li>
      ) : null}
    </ol>
  );
}
