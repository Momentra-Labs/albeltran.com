import Link from "next/link";
import type { BlogPost } from "@/lib/mdx";
import { Container } from "@/components/shared/container";

export function LatestWriting({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="writing" className="py-24">
      <Container>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Latest writing
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Notes from production systems
            </h2>
          </div>
          <Link
            href="/blog/"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-foreground"
            data-cursor="→"
          >
            All articles
          </Link>
        </div>
        <ol className="divide-y divide-border border-y border-border">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}/`}
                className="grid gap-3 py-6 transition-colors hover:text-accent sm:grid-cols-[64px_1fr_auto]"
                data-cursor="→"
              >
                <span className="font-mono text-[11px] text-muted-dim">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-lg font-medium text-foreground">
                    {post.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {post.description}
                  </span>
                </span>
                <time
                  dateTime={post.date}
                  className="font-mono text-[11px] text-muted-dim"
                >
                  {post.date.slice(0, 4)}
                </time>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
