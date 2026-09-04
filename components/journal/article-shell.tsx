import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import type { BlogPost } from "@/lib/mdx";
import { person } from "@/content/person";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { BlogCover } from "@/components/blog/blog-cover";
import { ArticleProgress } from "@/components/journal/article-progress";
import { ArticleToc } from "@/components/journal/article-toc";
import { AuthorCard } from "@/components/journal/author-card";
import { JournalNav } from "@/components/journal/journal-nav";
import { mdxComponents } from "@/components/journal/mdx-components";
import { extractToc } from "@/lib/headings";
import {
  adjacentInTopic,
  getArticleTopicId,
  getCatalogEntry,
  relatedEntries,
} from "@/lib/journal";
import { getJournalTopic } from "@/content/journal/topics";
import { topicPath } from "@/content/journal";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArticleShell({
  post,
  breadcrumbs,
}: {
  post: BlogPost;
  breadcrumbs: { name: string; href?: string }[];
}) {
  const toc = extractToc(post.content);
  const related = relatedEntries(post.slug);
  const adjacent = adjacentInTopic(post.slug);
  const topicId = getArticleTopicId(post.slug);
  const topic = topicId ? getJournalTopic(topicId) : undefined;
  const catalog = getCatalogEntry(post.slug);
  const takeaways = post.takeaways ?? [];

  return (
    <>
      <ArticleProgress />
      <div className="border-b border-border pb-12 pt-24">
        <Container>
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          <JournalNav
            current={
              catalog?.section === "interview" ? "/interviews/" : "/blog/"
            }
          />
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            {post.category}
            {catalog?.subcategory ? ` · ${catalog.subcategory}` : ""}
          </p>
          <p className="mt-5 text-sm text-muted">
            <Link href="/author/al-beltran/" className="text-foreground hover:text-accent">
              {person.shortName}
            </Link>
            <span className="text-muted-dim"> · </span>
            <Link href="/about/" className="hover:text-foreground">
              {person.jobTitle}
            </Link>
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {post.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-dim">
            <time dateTime={post.date}>Published {formatDate(post.date)}</time>
            {post.updated && post.updated !== post.date ? (
              <>
                <span>·</span>
                <time dateTime={post.updated}>
                  Updated {formatDate(post.updated)}
                </time>
              </>
            ) : null}
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>#{tag}</Badge>
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-16">
        {post.image ? (
          <div className="mb-10 max-w-3xl">
            <BlogCover
              title={post.title}
              category={post.category}
              image={post.image}
              imageAlt={post.imageAlt}
              className="aspect-[16/9]"
              sizes="(min-width: 768px) 768px, 100vw"
              priority
            />
          </div>
        ) : null}

        <div className="grid gap-12 lg:grid-cols-[minmax(0,48rem)_16rem]">
          <div>
            <div className="mb-10 lg:hidden">
              <ArticleToc items={toc} />
            </div>
            <article
              data-article-body
              className="prose-portfolio max-w-3xl"
            >
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    rehypePlugins: [rehypeHighlight],
                  },
                }}
              />
            </article>

            {takeaways.length > 0 ? (
              <section className="mt-12 max-w-3xl border-t border-border pt-10">
                <h2 className="text-2xl font-semibold text-foreground">
                  Key takeaways
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                  {takeaways.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {related.length > 0 ? (
              <section className="mt-12 max-w-3xl border-t border-border pt-10">
                <h2 className="text-2xl font-semibold text-foreground">
                  Related articles
                </h2>
                <ul className="mt-4 space-y-3">
                  {related.map((item) => (
                    <li key={item!.slug}>
                      {item!.href ? (
                        <Link
                          href={item!.href}
                          className="text-accent hover:underline"
                        >
                          {item!.title}
                        </Link>
                      ) : (
                        <span className="text-foreground">{item!.title}</span>
                      )}
                      <p className="text-sm text-muted">{item!.description}</p>
                      {item!.status !== "published" ? (
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dim">
                          Planned — not published yet
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="mt-12 grid gap-6 max-w-3xl border-t border-border pt-10 sm:grid-cols-2">
              {adjacent.previous ? (
                <Link
                  href={adjacent.previous.href}
                  className="block text-sm text-muted hover:text-foreground"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dim">
                    Previous
                  </span>
                  <span className="mt-2 block text-foreground">
                    {adjacent.previous.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {adjacent.next ? (
                <Link
                  href={adjacent.next.href}
                  className="block text-right text-sm text-muted hover:text-foreground"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dim">
                    Next
                  </span>
                  <span className="mt-2 block text-foreground">
                    {adjacent.next.title}
                  </span>
                </Link>
              ) : null}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-10">
              <ArticleToc items={toc} />
              {topic ? (
                <p className="text-sm text-muted">
                  In{" "}
                  <Link
                    href={topicPath(topic.id)}
                    className="text-accent hover:underline"
                  >
                    {topic.label}
                  </Link>
                </p>
              ) : null}
            </div>
          </aside>
        </div>

        <div className="mt-16 max-w-3xl space-y-10">
          <AuthorCard />
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              Explore more engineering notes
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Continue through the journal, the interview lab, or the portfolio
              this writing sits beside.
            </p>
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link href="/blog/" className="text-accent hover:underline">
                Journal
              </Link>
              <Link href="/topics/" className="text-accent hover:underline">
                Topics
              </Link>
              <Link href="/interviews/" className="text-accent hover:underline">
                Interview Lab
              </Link>
              <Link href="/projects/" className="text-accent hover:underline">
                Projects
              </Link>
              <Link href="/experience/" className="text-accent hover:underline">
                Experience
              </Link>
              <Link href="/about/" className="text-accent hover:underline">
                About
              </Link>
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
