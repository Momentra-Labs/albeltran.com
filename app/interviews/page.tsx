import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { BlogPostList } from "@/components/blog/blog-post-list";
import { JsonLd } from "@/components/shared/json-ld";
import { JournalNav } from "@/components/journal/journal-nav";
import { listPublishedInterviews } from "@/lib/journal";
import { person } from "@/content/person";
import {
  blogItemListSchema,
  breadcrumbSchema,
  collectionPageSchema,
  graphSchema,
  personSchema,
  websiteSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Engineering Interview Lab",
  description: `Interview preparation notes by ${person.shortName}: React, TypeScript, JavaScript, Node.js, SQL, and system design — with the reasoning behind strong answers.`,
  path: "/interviews/",
});

export default function InterviewsPage() {
  const posts = listPublishedInterviews();

  const schema = graphSchema([
    websiteSchema(),
    personSchema(),
    collectionPageSchema({
      path: "/interviews/",
      name: `Interview Lab · ${person.shortName}`,
      description: `Engineering interview notes by ${person.name}.`,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Interview Lab", path: "/interviews/" },
    ]),
    blogItemListSchema(posts, {
      path: "/interviews/",
      name: "Engineering interview articles by Al Beltran",
    }),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Interview Lab"
        title="Interview questions, with the reasoning"
        description="Compact sets instead of 100-question dumps. Each answer explains what interviewers are scoring, a strong reply, and the follow-up they usually ask next."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Interview Lab" },
        ]}
      />
      <Container className="py-16">
        <div className="mb-10">
          <JournalNav current="/interviews/" />
        </div>
        <BlogPostList
          posts={posts}
          emptyMessage="Interview notes will appear here as they are reviewed and published."
        />
      </Container>
    </>
  );
}
