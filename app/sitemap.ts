import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { projects } from "@/content/projects";
import { libraries } from "@/content/libraries";
import { getAllPostMeta } from "@/lib/mdx";
import { JOURNAL_TOPIC_IDS } from "@/content/journal/topics";
import { topicPath } from "@/content/journal";
import { indexedSystemDesignScenarios } from "@/content/lab/system-design";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMeta();
  // Only send dates we actually know. A build-time "now" on every URL tells crawlers
  // everything changed on every deploy, so they learn to ignore lastmod.
  const latestPost = posts.reduce<Date | undefined>((latest, post) => {
    const date = new Date(post.updated ?? post.date);
    return !latest || date > latest ? date : latest;
  }, undefined);
  const feedPages = new Set(["", "/blog/", "/topics/"]);
  const staticRoutes = [
    "",
    "/biography/",
    "/about/",
    "/author/al-beltran/",
    "/experience/",
    "/projects/",
    "/libraries/",
    "/blog/",
    "/topics/",
    "/interviews/",
    "/uses/",
    "/now/",
    "/resume/",
    "/contact/",
    "/failures/",
    "/lab/",
    "/lab/incident/",
    "/lab/how-id-build/",
    "/lab/debug-this/",
    "/lab/system-design/",
    "/lab/code-battle/",
    "/lab/sql-arena/",
    "/lab/production-fire/",
    "/lab/cloud-cost/",
    "/lab/interview/",
    "/apps/gloves-up/privacy/",
  ].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    ...(feedPages.has(path) && latestPost ? { lastModified: latestPost } : {}),
    changeFrequency: "monthly" as const,
    priority:
      path === ""
        ? 1
        : path === "/biography/"
          ? 0.95
          : path.includes("/privacy/")
            ? 0.5
            : 0.8,
  }));

  const topicRoutes = JOURNAL_TOPIC_IDS.map((id) => ({
    url: `${SITE_URL}${topicPath(id)}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const labScenarioRoutes = indexedSystemDesignScenarios().map((scenario) => ({
    url: `${SITE_URL}/lab/system-design/${scenario.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const libraryRoutes = libraries.map((library) => ({
    url: `${SITE_URL}/libraries/${library.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleRoutes = posts.map((post) => ({
    url: `${SITE_URL}${post.href}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...topicRoutes,
    ...labScenarioRoutes,
    ...libraryRoutes,
    ...projectRoutes,
    ...articleRoutes,
  ];
}
