import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

/**
 * Everything is open to everyone ("*"), but AI crawlers are also named explicitly:
 * some only honour rules that mention them, and it documents the intent.
 */
const NAMED_CRAWLERS = [
  // Search engines
  "Googlebot",
  "Bingbot",
  "DuckDuckBot",
  "Applebot",
  // OpenAI: training, ChatGPT search results, and live browsing for users
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic: training, Claude search, and live fetches for users
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  // Perplexity: index and live fetches
  "PerplexityBot",
  "Perplexity-User",
  // Google / Apple AI opt-ins
  "Google-Extended",
  "Applebot-Extended",
  // Other assistants and AI indexes
  "Meta-ExternalAgent",
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
  "cohere-ai",
  "Bytespider",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...NAMED_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
