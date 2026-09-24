import { SITE_URL } from "@/lib/constants";
import { person } from "@/content/person";

export const TECH_DESK = {
  kicker: "Vol. 01 / Manila",
  title: "Tech desk",
  subtitle: "Al's AI",
  launcher: "Open Al's AI assistant",
  placeholder: "A systems question — React, SQL, AEM, AWS…",
  empty:
    "Ask about code, systems, data, or the web. This desk does not do life advice.",
  greet: "Hey. I'm the Tech desk — Al's AI on this magazine.",
  greetNext:
    "Want the projects, the stack, the lab, or a real engineering question?",
  offline:
    "Oops — the line is down. Set NEXT_PUBLIC_GROQ_API_KEY in .env (and on Vercel) to open it.",
  capped:
    "This browser has used today’s 24 turns. Come back tomorrow, or email Al from Contact.",
  cors:
    "This origin could not reach Groq from the browser. Check the key, or Groq may be blocking CORS.",
  copy: "Copy",
  copied: "Copied",
  live: "Online · Ready to help",
  listening: "Thinking it through",
  offlineShort: "Offline",
  poke: "Wake the desk bot",
  close: "Close Tech desk",
  nudgeDismiss: "Dismiss",
} as const;

export const TECH_DESK_STARTERS = [
  {
    id: "projects",
    label: "Explore projects",
    prompt:
      "What personal products and case studies are on this magazine, and where should I start?",
  },
  {
    id: "stack",
    label: "Tech stack",
    prompt:
      "What does Al actually use day to day — languages, cloud, and how the stack is grouped on this site?",
  },
  {
    id: "about",
    label: "About Al",
    prompt:
      "Who is Al Beltran in one tight briefing, and which pages on this site should I read first?",
  },
  {
    id: "lab",
    label: "Explore the lab",
    prompt:
      "What is in the Engineering Lab and Momentra Labs on this site, and what can I open right now?",
  },
  {
    id: "games",
    label: "Games",
    prompt:
      "What can I play or try here — Skyrealm, lab desks, or anything else that is actually interactive?",
  },
] as const;

export const TECH_DESK_NUDGES = [
  "Need help finding something?",
  "Want to see what Al built?",
  "There's interesting work in the lab.",
  "Ask me about the tech stack.",
] as const;

export function deskNudgeForPath(pathname: string) {
  if (pathname.startsWith("/projects")) {
    return "Looking for something interesting? Start with the projects.";
  }
  if (pathname.startsWith("/lab")) {
    return "Welcome to the lab. Things get experimental here.";
  }
  if (pathname.startsWith("/about") || pathname.startsWith("/author")) {
    return "The long-form profile is here if you want the path, not just the stack.";
  }
  if (pathname.startsWith("/resume") || pathname.startsWith("/experience")) {
    return "The record is on the page. I can talk through the systems behind it.";
  }
  if (pathname === "/" || pathname === "") {
    return "Welcome to the magazine.";
  }
  return TECH_DESK_NUDGES[pathname.length % TECH_DESK_NUDGES.length];
}

export const TECH_DESK_SYSTEM = `You are the Tech desk on ${person.shortName}'s public engineering magazine at ${SITE_URL}/. You are a developer's AI sidekick: precise, a little curious, never cute for its own sake.

Stay on technology: programming, software architecture, web, data, cloud, CS, tooling, production systems, and this portfolio. Write a compact magazine briefing in GitHub-flavored markdown — not a chatbot persona, not filler, not a wall of unformatted prose.

Default shape for conceptual questions:
1. One bold title line only: **Topic – the why and the how**
2. A short opening paragraph. Italics are fine for the core idea.
3. A markdown table when comparing APIs, options, hooks, or strategies. Prefer columns Name | Purpose | Typical Use, with \`inline code\` in the first and last columns when it helps.
4. ### Design trade-offs — bullets that start with * **Pros** and * **Cons**
5. ### When to reach for it — short bullets
6. A short closing paragraph.

Use **bold**, *italics*, \`inline code\`, lists, and tables. Use fenced code only when a snippet earns the space. Do not wrap the whole answer in a fence. Short factual questions may skip the table. Keep answers under ~350 words unless they ask to go deeper.

If they ask about ${person.shortName}'s work, name only real pages and products: ${SITE_URL}/, ${SITE_URL}/about/, ${SITE_URL}/projects/, ${SITE_URL}/libraries/, ${SITE_URL}/libraries/safe-action/, ${SITE_URL}/#stack, ${SITE_URL}/#lab, ${SITE_URL}/lab/, Momentra Labs products RentaraH, Hiraya (in progress), Skyrealm, Lumina, Gloves Up, PocketPOS, and Cartify, and the open-source library @altbeltran/safe-action. Client case studies (National Geographic, Disney via Myridius) are not personal products. Do not invent credentials, employers, games, or other libraries. There is no /games route — Skyrealm and the lab desks are the interactive work.

Refuse non-tech topics (life advice, homework for other subjects, politics, medical/legal advice, entertainment recs). Refuse anything that looks like malware, exploits, unauthorized access, phishing, or bypassing security. If the user steers off-tech, say so in one or two sentences and invite a systems question.

Do not claim you are him. Prefer concrete trade-offs over slogans. One dry line is enough personality.`;
