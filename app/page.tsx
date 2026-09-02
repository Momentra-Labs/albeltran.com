import { HomeHero } from "@/components/home/home-hero";
import { WorldMarks } from "@/components/home/world-marks";
import { IssueContents } from "@/components/home/issue-contents";
import { IssueFolio } from "@/components/home/issue-folio";
import { EngineeringSystem } from "@/components/home/engineering-system";
import { SelectedWork } from "@/components/home/selected-work";
import { EngineeringLab } from "@/components/home/engineering-lab";
import { ExperienceTimeline } from "@/components/home/experience-timeline";
import { HowIThink } from "@/components/home/how-i-think";
import { Currently } from "@/components/home/currently";
import { LatestWriting } from "@/components/home/latest-writing";
import { HomeAbout } from "@/components/home/home-about";
import { HomeContact } from "@/components/home/home-contact";
import { RecruiterStrip } from "@/components/home/recruiter-strip";
import { JsonLd } from "@/components/shared/json-ld";
import { homeFaqs } from "@/content/faqs";
import { experience } from "@/content/experience";
import { getFeaturedProjects, getLabProjects } from "@/content/projects";
import { getAllPosts } from "@/lib/mdx";
import {
  faqSchema,
  graphSchema,
  personSchema,
  momentraLabsSchema,
  labProductsSchema,
  websiteSchema,
  profilePageSchema,
  worldMarksSchema,
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
  const featured = getFeaturedProjects();
  const lab = getLabProjects();
  const posts = getAllPosts().slice(0, 5);
  const schema = graphSchema([
    websiteSchema(),
    personSchema(),
    momentraLabsSchema(),
    labProductsSchema(lab),
    profilePageSchema(),
    worldMarksSchema(),
    faqSchema(homeFaqs),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <RecruiterStrip />
      <HomeHero />
      <WorldMarks />
      <IssueContents features={featured.map((project) => project.name)} />
      <SelectedWork projects={featured} />
      <EngineeringLab projects={lab} />
      <EngineeringSystem />
      <ExperienceTimeline items={experience} />
      <HowIThink />
      <Currently />
      <LatestWriting posts={posts} />
      <HomeAbout />
      <HomeContact />
      <IssueFolio />
    </>
  );
}
