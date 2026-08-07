import { Hero } from "@/components/home/hero";
import { TechMarquee } from "@/components/home/tech-marquee";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { LatestPosts } from "@/components/home/latest-posts";
import { Testimonials } from "@/components/home/testimonials";
import { HomeCTA } from "@/components/home/home-cta";
import { FAQ } from "@/components/shared/faq";
import { JsonLd } from "@/components/shared/json-ld";
import { Section } from "@/components/shared/section";
import { homeFaqs } from "@/content/faqs";
import { person } from "@/content/person";
import {
  faqSchema,
  graphSchema,
  personSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/schema";
import { buildMetadata, PRIMARY_TITLE } from "@/lib/seo";
import { SITE_DESCRIPTION } from "@/lib/constants";

export const metadata = buildMetadata({
  title: PRIMARY_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
  image: "/og/default.jpg",
});

export default function HomePage() {
  const schema = graphSchema([
    websiteSchema(),
    personSchema(),
    webPageSchema({
      path: "/",
      name: PRIMARY_TITLE,
      description: SITE_DESCRIPTION,
    }),
    faqSchema(homeFaqs),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <Hero />
      <TechMarquee />
      <FeaturedProjects />
      <LatestPosts />
      <Testimonials />
      <Section
        label="Discoverability"
        title="Common questions about Al Beltran"
        description="Straight answers for search engines, assistants, and visitors verifying the right engineering profile."
      >
        <FAQ items={homeFaqs} title="FAQ" />
      </Section>
      <HomeCTA />
    </>
  );
}
