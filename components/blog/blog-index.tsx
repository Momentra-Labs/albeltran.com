"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function BlogIndex({
  posts,
  categories,
  tags,
}: {
  posts: BlogPost[];
  categories: string[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCategory = !category || post.category === category;
      const matchesTag = !tag || post.tags.includes(tag);
      return matchesQuery && matchesCategory && matchesTag;
    });
  }, [posts, query, category, tag]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search articles..."
          aria-label="Search articles"
        />
        <button
          type="button"
          className="text-sm text-muted hover:text-foreground"
          onClick={() => {
            setQuery("");
            setCategory(null);
            setTag(null);
          }}
        >
          Clear filters
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(category === item ? null : item)}
          >
            <Badge variant={category === item ? "accent" : "default"}>
              {item}
            </Badge>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTag(tag === item ? null : item)}
            className="text-xs text-muted hover:text-accent"
          >
            #{item}
          </button>
        ))}
      </div>

      <ol className="divide-y divide-border border-y border-border">
        {filtered.map((post) => (
          <li key={post.slug}>
            <article className="py-8">
              <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted-dim">
                <Badge variant="accent">{post.category}</Badge>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
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
        {filtered.length === 0 && (
          <li className="py-8 text-muted">No articles match those filters.</li>
        )}
      </ol>
    </div>
  );
}
