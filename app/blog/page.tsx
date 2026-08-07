import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { BlogIndex } from "@/components/blog/blog-index";
import { JsonLd } from "@/components/shared/json-ld";
import { getAllCategories, getAllPosts, getAllTags } from "@/lib/mdx";
import { person } from "@/content/person";
import {
  breadcrumbSchema,
  graphSchema,
  personSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description: `Engineering articles by ${person.name} on event-driven architecture, AEM, performance, serverless ETL, and AI-augmented workflows.`,
  path: "/blog/",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  const schema = graphSchema([
    personSchema(),
    webPageSchema({
      path: "/blog/",
      name: `Blog · ${person.shortName}`,
      description: `Engineering blog by ${person.name}.`,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog/" },
    ]),
    {
      "@type": "Blog",
      "@id": "https://albeltran.com/blog/#blog",
      name: `${person.shortName} Blog`,
      author: { "@id": "https://albeltran.com/#person" },
    },
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Blog"
        title="Notes on systems that have to work in production"
        description="Searchable articles with categories, tags, and estimated reading time. Written to be useful to engineers and understandable to AI retrieval systems."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Blog" },
        ]}
      />
      <Container className="py-16">
        <BlogIndex posts={posts} categories={categories} tags={tags} />
      </Container>
    </>
  );
}
