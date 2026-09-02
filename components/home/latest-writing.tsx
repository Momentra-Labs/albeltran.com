import Link from "next/link";
import type { BlogPost } from "@/lib/mdx";
import { Container } from "@/components/shared/container";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";

export function LatestWriting({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="writing" className="magazine-spread py-16 sm:py-20">
      <Container>
        <Reveal className="mb-4 flex items-end justify-between" variant="folio">
          <div>
            <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Latest writing
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
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
        </Reveal>
        <SpreadRule />
        <ol className="divide-y divide-border border-b border-border">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <RevealItem index={index}>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="group grid gap-3 py-6 sm:grid-cols-[64px_1fr_auto]"
                  data-cursor="→"
                >
                  <span className="font-mono text-[11px] text-muted-dim transition-colors group-hover:text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-lg font-medium text-foreground transition-colors group-hover:text-accent">
                      {post.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {post.description}
                    </span>
                    <span
                      aria-hidden
                      className="mt-3 block h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </span>
                  <time
                    dateTime={post.date}
                    className="font-mono text-[11px] text-muted-dim"
                  >
                    {post.date.slice(0, 4)}
                  </time>
                </Link>
              </RevealItem>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
