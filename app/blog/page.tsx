import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { BlogIndex } from "@/components/blog/blog-index";
import { BlogPostList } from "@/components/blog/blog-post-list";
import { JsonLd } from "@/components/shared/json-ld";
import { JournalNav } from "@/components/journal/journal-nav";
import { listPublishedNotes } from "@/lib/journal";
import { person } from "@/content/person";
import {
  blogItemListSchema,
  breadcrumbSchema,
  collectionPageSchema,
  graphSchema,
  personSchema,
  websiteSchema,
} from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Engineering Journal",
  description: `Al Beltran's engineering journal — production notes on React, TypeScript, Node.js, Java, Laravel, SQL, AWS, AEM, and system design. Written by ${person.name}.`,
  path: "/blog/",
});

export default function BlogPage() {
  const posts = listPublishedNotes();
  const categories = [...new Set(posts.map((post) => post.category))].sort();
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();

  const schema = graphSchema([
    websiteSchema(),
    personSchema(),
    collectionPageSchema({
      path: "/blog/",
      name: `Engineering Journal · ${person.shortName}`,
      description: `Engineering journal by ${person.name}.`,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Journal", path: "/blog/" },
    ]),
    {
      "@type": "Blog",
      "@id": `${SITE_URL}/blog/#blog`,
      name: `${person.shortName}'s Engineering Journal`,
      url: `${SITE_URL}/blog/`,
      author: { "@id": `${SITE_URL}/#person` },
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    blogItemListSchema(posts, {
      name: "Published engineering notes by Al Beltran",
    }),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Engineering Journal"
        title="Notes on systems that have to work in production"
        description="A reviewable knowledge base beside the portfolio. Published notes only. Interview prep lives in the Interview Lab. Planned titles stay in the topic map until they are written."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Journal" },
        ]}
      />
      <Container className="py-16">
        <div className="mb-10">
          <JournalNav current="/blog/" />
        </div>
        <BlogIndex posts={posts} categories={categories} tags={tags}>
          <BlogPostList posts={posts} />
        </BlogIndex>
      </Container>
    </>
  );
}
