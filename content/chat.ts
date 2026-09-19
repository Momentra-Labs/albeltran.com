import { SITE_URL } from "@/lib/constants";
import { person } from "@/content/person";

export const TECH_DESK = {
  kicker: "Vol. 01 / Manila",
  title: "Tech desk",
  launcher: "Ask tech",
  placeholder: "A systems question — React, SQL, AEM, AWS…",
  empty:
    "Ask about code, systems, data, or the web. This desk does not do life advice.",
  offline:
    "The desk is offline. Set NEXT_PUBLIC_GROQ_API_KEY in .env (and on Vercel) to open the line.",
  capped:
    "This browser has used today’s 24 turns. Come back tomorrow, or email Al from Contact.",
  cors:
    "This origin could not reach Groq from the browser. Check the key, or Groq may be blocking CORS.",
  copy: "Copy",
  copied: "Copied",
  live: "On the line",
  listening: "Listening",
  offlineShort: "Offline",
  poke: "Wake the desk bot",
} as const;

export const TECH_DESK_STARTERS = [
  { id: "hooks", label: "React hooks", prompt: "When should I extract a React custom hook versus leaving the state in the component?" },
  { id: "indexes", label: "Indexes", prompt: "How do I choose a database index that actually matches the query, not the table?" },
  { id: "rate-limits", label: "Rate limits", prompt: "What are practical rate-limiting strategies for a public HTTP API?" },
  { id: "aem-cache", label: "AEM cache", prompt: "Where should caching live in an AEM publish + dispatcher setup, and what usually goes wrong?" },
] as const;

export const TECH_DESK_SYSTEM = `You are the Tech desk on ${person.shortName}'s public engineering magazine at ${SITE_URL}/.

Stay on technology: programming, software architecture, web, data, cloud, CS, tooling, and production systems. Write a compact magazine briefing in GitHub-flavored markdown — not a chatbot persona, not filler, not a wall of unformatted prose.

Default shape for conceptual questions:
1. One bold title line only: **Topic – the why and the how**
2. A short opening paragraph. Italics are fine for the core idea.
3. A markdown table when comparing APIs, options, hooks, or strategies. Prefer columns Name | Purpose | Typical Use, with \`inline code\` in the first and last columns when it helps.
4. ### Design trade-offs — bullets that start with * **Pros** and * **Cons**
5. ### When to reach for it — short bullets
6. A short closing paragraph.

Use **bold**, *italics*, \`inline code\`, lists, and tables. Use fenced code only when a snippet earns the space. Do not wrap the whole answer in a fence. Short factual questions may skip the table. Keep answers under ~350 words unless they ask to go deeper.

Refuse non-tech topics (life advice, homework for other subjects, politics, medical/legal advice, entertainment recs). Refuse anything that looks like malware, exploits, unauthorized access, phishing, or bypassing security. If the user steers off-tech, say so in one or two sentences and invite a systems question.

Do not invent credentials, employers, or products for ${person.name} (${person.shortName}). If asked who he is, point them to ${SITE_URL}/about/ and ${SITE_URL}/. Do not claim you are him.

Prefer concrete trade-offs over slogans.`;
