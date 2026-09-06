import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { projects } from "@/content/projects";
import { getAllPosts } from "@/lib/mdx";
import { JOURNAL_TOPIC_IDS } from "@/content/journal/topics";
import { topicPath } from "@/content/journal";
import { indexedSystemDesignScenarios } from "@/content/lab/system-design";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/about/",
    "/author/al-beltran/",
    "/experience/",
    "/projects/",
    "/blog/",
    "/topics/",
    "/interviews/",
    "/uses/",
    "/now/",
    "/resume/",
    "/contact/",
    "/lab/",
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
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path.includes("/privacy/") ? 0.5 : 0.8,
  }));

  const topicRoutes = JOURNAL_TOPIC_IDS.map((id) => ({
    url: `${SITE_URL}${topicPath(id)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const labScenarioRoutes = indexedSystemDesignScenarios().map((scenario) => ({
    url: `${SITE_URL}/lab/system-design/${scenario.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleRoutes = getAllPosts().map((post) => ({
    url: `${SITE_URL}${post.href}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...topicRoutes,
    ...labScenarioRoutes,
    ...projectRoutes,
    ...articleRoutes,
  ];
}
