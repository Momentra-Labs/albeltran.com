"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { BlogPost } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BlogPostList } from "@/components/blog/blog-post-list";

export function BlogIndex({
  posts,
  categories,
  tags,
  children,
}: {
  posts: BlogPost[];
  categories: string[];
  tags: string[];
  children: ReactNode;
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

  const isDefault = !query.trim() && !category && !tag;

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

      {isDefault ? children : <BlogPostList posts={filtered} />}
    </div>
  );
}
