import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { Section } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";

export function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <Section
      label="Latest articles"
      title="Writing on architecture, performance, and delivery"
      description="Long-form notes for engineers, recruiters, and anyone evaluating how I think about systems."
    >
      <Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col border border-border bg-surface/40 p-6 transition-colors hover:border-border-bright"
            >
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="accent">{post.category}</Badge>
                <span className="text-xs text-muted-dim">{post.readingTime}</span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                <Link
                  href={post.href}
                  className="hover:text-accent"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {post.description}
              </p>
              <time
                dateTime={post.date}
                className="mt-5 text-xs text-muted-dim"
              >
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Button asChild variant="secondary">
            <Link href="/blog/">Read the blog</Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
