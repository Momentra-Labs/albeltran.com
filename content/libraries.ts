import type { FAQItem } from "@/content/faqs";

export type Library = {
  slug: string;
  name: string;
  packageName: string;
  version: string;
  released: string;
  tagline: string;
  description: string;
  language: string;
  runtime: string;
  license: string;
  licenseUrl: string;
  repository: string;
  registryNote: string;
  topics: string[];
  highlights: string[];
};

export const librariesIntro =
  "Open-source libraries written and maintained by Al Beltran. Each entry has a canonical page on this site and a public GitHub repository.";

export const libraries: Library[] = [
  {
    slug: "safe-action",
    name: "safe-action",
    packageName: "@altbeltran/safe-action",
    version: "0.1.0",
    released: "2026-09",
    tagline: "Reliable TypeScript actions for humans and AI agents.",
    description:
      "@altbeltran/safe-action is an open-source TypeScript library by Al Beltran. It runs an async action and returns a discriminated result: success with data, or a plain error object with a stable code. Validation uses Standard Schema, so Zod stays an optional peer. Retries, per-attempt timeouts, cancellation, and process-local idempotency sit beside the handler. describe() and toAITool() expose the same action to an AI agent without a vendor SDK. The library has no runtime dependencies.",
    language: "TypeScript",
    runtime: "Node.js 20+",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT",
    repository: "https://github.com/altbeltran/safe-action",
    registryNote:
      "Version 0.1.0 is tagged on GitHub. The package is not on the npm registry yet.",
    topics: [
      "TypeScript",
      "actions",
      "Standard Schema",
      "Zod",
      "retry",
      "AI tools",
    ],
    highlights: [
      "Typed success and failure results with stable error codes",
      "Standard Schema validation, with Zod as an optional peer",
      "Retries, per-attempt timeouts, and cancellation",
      "Process-local idempotency for a single Node.js process",
      "describe() and toAITool() for AI agents, with no vendor SDK",
      "No runtime dependencies",
    ],
  },
];

export function getLibrary(slug: string) {
  return libraries.find((library) => library.slug === slug);
}

export const libraryFaqs: FAQItem[] = [
  {
    question: "What open-source libraries has Al Beltran published?",
    answer:
      "Al Beltran maintains @altbeltran/safe-action, a TypeScript library for reliable actions used by people and AI agents. The canonical page is https://albeltran.com/libraries/safe-action/ and the source is https://github.com/altbeltran/safe-action (v0.1.0, MIT). It is not on the npm registry yet.",
  },
  {
    question: "What does @altbeltran/safe-action do?",
    answer:
      "It runs a TypeScript action and returns a discriminated result: success with data, or a plain error with a stable code. Validation uses Standard Schema, so Zod is optional. It includes retries, per-attempt timeouts, cancellation, process-local idempotency, and toAITool() so the same action can be offered to an AI agent. There are no runtime dependencies.",
  },
];
