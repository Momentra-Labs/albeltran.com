import type { DailyPrompt } from "./types";

export const DAILY_PROMPTS: readonly DailyPrompt[] = [
  {
    id: "traffic-spike",
    experienceId: "production-fire",
    challengeId: "traffic-8x",
    question:
      "Your API suddenly receives 10x traffic. What do you investigate first?",
    href: "/lab/production-fire/?c=traffic-8x",
  },
  {
    id: "cache-miss",
    experienceId: "debug-this",
    challengeId: "cache-stampede",
    question:
      "p95 latency jumped after a deploy. Cache hit rate is 12%. What broke?",
    href: "/lab/debug-this/?c=cache-stampede",
  },
  {
    id: "short-link",
    experienceId: "system-design",
    challengeId: "url-shortener",
    question: "Design a URL shortener that stays cheap at 100M redirects a day.",
    href: "/lab/system-design/url-shortener/",
  },
  {
    id: "n-plus-one",
    experienceId: "sql-arena",
    challengeId: "top-customers",
    question: "Write one query for top customers by order total. No N+1.",
    href: "/lab/sql-arena/?c=top-customers",
  },
  {
    id: "closure-trap",
    experienceId: "code-battle",
    challengeId: "js-closure",
    question: "What does this JavaScript loop print, and why?",
    href: "/lab/code-battle/?c=js-closure",
  },
  {
    id: "chat-fanout",
    experienceId: "system-design",
    challengeId: "chat-app",
    question: "Where do you put presence and fan-out for a chat app?",
    href: "/lab/system-design/chat-app/",
  },
  {
    id: "rollback",
    experienceId: "production-fire",
    challengeId: "bad-deploy",
    question: "Error rate is 18% after a release. Roll forward or roll back?",
    href: "/lab/production-fire/?c=bad-deploy",
  },
  {
    id: "index-miss",
    experienceId: "debug-this",
    challengeId: "missing-index",
    question: "Checkout queries scan 4 million rows. What is the first proof?",
    href: "/lab/debug-this/?c=missing-index",
  },
  {
    id: "staff-tradeoff",
    experienceId: "interview",
    challengeId: "staff-architecture",
    question: "A staff interview: what do you refuse to build this quarter?",
    href: "/lab/interview/?c=staff-architecture",
  },
  {
    id: "cdn-first",
    experienceId: "cloud-cost",
    challengeId: "media-site",
    question: "Cut a media site's bill without making TTFB worse.",
    href: "/lab/cloud-cost/?c=media-site",
  },
  {
    id: "deadlock",
    experienceId: "debug-this",
    challengeId: "db-deadlock",
    question: "Two checkout workers retry forever. Who holds the lock?",
    href: "/lab/debug-this/?c=db-deadlock",
  },
  {
    id: "payments",
    experienceId: "system-design",
    challengeId: "payment-system",
    question: "How do you make a charge idempotent across retries?",
    href: "/lab/system-design/payment-system/",
  },
  {
    id: "join-filter",
    experienceId: "sql-arena",
    challengeId: "unpaid-orders",
    question: "List unpaid orders with the customer email in one statement.",
    href: "/lab/sql-arena/?c=unpaid-orders",
  },
  {
    id: "react-render",
    experienceId: "code-battle",
    challengeId: "react-stale",
    question: "Why is this React state one render behind?",
    href: "/lab/code-battle/?c=react-stale",
  },
] as const;
