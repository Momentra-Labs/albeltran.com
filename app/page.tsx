import { HomeHero } from "@/components/home/home-hero";
import { WorldMarks } from "@/components/home/world-marks";
import { ChoosePath } from "@/components/home/choose-path";
import { IssueFolio } from "@/components/home/issue-folio";
import { EngineeringSystem } from "@/components/home/engineering-system";
import { SelectedWork } from "@/components/home/selected-work";
import { LabPlayground } from "@/components/home/lab-playground";
import { EngineeringLab } from "@/components/home/engineering-lab";
import { PhilosophyStrip } from "@/components/home/philosophy-strip";
import { CurrentlyBuilding } from "@/components/home/currently-building";
import { ThingsThatDidntWork } from "@/components/home/things-that-didnt-work";
import { ExperienceTimeline } from "@/components/home/experience-timeline";
import { HomeNotes } from "@/components/home/home-notes";
import { HomeContact } from "@/components/home/home-contact";
import { RecruiterStrip } from "@/components/home/recruiter-strip";
import { JsonLd } from "@/components/shared/json-ld";
import { homeFaqs } from "@/content/faqs";
import { featuredExperience } from "@/content/experience";
import { getFeaturedProjects, getLabProjects } from "@/content/projects";
import { getAllPostMeta } from "@/lib/mdx";
import {
  blogItemListSchema,
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
  const posts = getAllPostMeta();
  const schema = graphSchema([
    websiteSchema(),
    personSchema(),
    momentraLabsSchema(),
    labProductsSchema(lab),
    profilePageSchema(),
    worldMarksSchema(),
    faqSchema(homeFaqs),
    blogItemListSchema(posts),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <RecruiterStrip />
      <HomeHero />
      <WorldMarks />
      <EngineeringSystem />
      <ChoosePath />
      <SelectedWork projects={featured} />
      <EngineeringLab projects={lab} />
      <LabPlayground />
      <PhilosophyStrip />
      <CurrentlyBuilding />
      <ThingsThatDidntWork />
      <ExperienceTimeline items={featuredExperience} />
      <HomeNotes />
      <HomeContact />
      <IssueFolio />
    </>
  );
}
