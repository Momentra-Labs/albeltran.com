import type { JournalEntry } from "@/content/journal/types";
import type {
  ArticleDifficulty,
  ArticlePriority,
  ArticleSection,
  ArticleStatus,
  JournalTopicId,
  SearchIntent,
} from "@/content/journal/topics";

type Draft = {
  slug: string;
  title: string;
  subcategory: string;
  description: string;
  targetIntent: SearchIntent;
  difficulty?: ArticleDifficulty;
  technologies: string[];
  tags: string[];
  relatedArticles: string[];
  status?: ArticleStatus;
  priority?: ArticlePriority;
  section?: ArticleSection;
};

function entries(category: JournalTopicId, items: Draft[]): JournalEntry[] {
  return items.map((item) => ({
    id: item.slug,
    slug: item.slug,
    title: item.title,
    category,
    subcategory: item.subcategory,
    description: item.description,
    targetIntent: item.targetIntent,
    difficulty: item.difficulty ?? "intermediate",
    technologies: item.technologies,
    tags: item.tags,
    relatedArticles: item.relatedArticles,
    status: item.status ?? "planned",
    priority: item.priority ?? "medium",
    section: item.section ?? "notes",
  }));
}

export const react = entries("react", [
  {
    slug: "react-interview-questions",
    title: "React Interview Questions, With the Reasoning",
    subcategory: "Interview Lab",
    description:
      "A compact React interview set: hooks, rendering, state, and architecture — with what interviewers are actually scoring.",
    targetIntent: "interview",
    difficulty: "mixed",
    technologies: ["React", "JavaScript"],
    tags: ["react", "interviews", "hooks"],
    relatedArticles: [
      "react-hooks-mental-model",
      "javascript-interview-questions",
      "react-stale-closures",
    ],
    status: "published",
    priority: "high",
    section: "interview",
  },
  {
    slug: "react-hooks-mental-model",
    title: "A Mental Model for React Hooks That Survives Production",
    subcategory: "Hooks",
    description:
      "Treat hooks as subscriptions to render, not lifecycle methods with new names. The model that prevents stale state and mystery effects.",
    targetIntent: "educational",
    difficulty: "intermediate",
    technologies: ["React"],
    tags: ["react", "hooks"],
    relatedArticles: [
      "react-interview-questions",
      "react-effects-vs-events",
      "react-stale-closures",
    ],
    status: "published",
    priority: "high",
  },
  {
    slug: "react-useeffect-dependencies",
    title: "useEffect Dependencies: Fix the Warning Without Hiding the Bug",
    subcategory: "Hooks",
    description:
      "Why the exhaustive-deps warning exists, when a ref is the right escape, and when you actually wanted an event handler.",
    targetIntent: "troubleshooting",
    technologies: ["React"],
    tags: ["react", "useEffect"],
    relatedArticles: ["react-hooks-mental-model", "react-effects-vs-events"],
  },
  {
    slug: "react-state-vs-refs",
    title: "React State vs Refs: What Should Trigger a Render",
    subcategory: "State",
    description:
      "A comparison of useState and useRef for values that must, or must not, update the UI.",
    targetIntent: "comparison",
    technologies: ["React"],
    tags: ["react", "state"],
    relatedArticles: ["react-hooks-mental-model", "react-performance-when-to-memo"],
  },
  {
    slug: "react-composition-over-prop-drilling",
    title: "Composition Over Prop Drilling in Product UIs",
    subcategory: "Architecture",
    description:
      "How to pass UI slots instead of threading ten props through a card that does not care.",
    targetIntent: "architecture",
    technologies: ["React"],
    tags: ["react", "composition"],
    relatedArticles: ["react-context-vs-props-vs-store", "react-architecture-for-product-uis"],
  },
  {
    slug: "react-key-prop-reconciliation",
    title: "The key Prop Is a Reconciliation Contract",
    subcategory: "Rendering",
    description:
      "What React does with keys, why index keys break forms, and how lists should identify rows.",
    targetIntent: "educational",
    difficulty: "beginner",
    technologies: ["React"],
    tags: ["react", "reconciliation"],
    relatedArticles: ["react-list-virtualization-when", "react-interview-questions"],
  },
  {
    slug: "react-performance-when-to-memo",
    title: "When memo, useMemo, and useCallback Earn Their Keep",
    subcategory: "Performance",
    description:
      "Measure first. Then memoize the expensive child or the unstable callback that actually invalidates a list.",
    targetIntent: "problem-solving",
    technologies: ["React"],
    tags: ["react", "performance"],
    relatedArticles: ["react-bundle-size-and-code-splitting", "react-list-virtualization-when"],
  },
  {
    slug: "react-server-components-boundaries",
    title: "React Server Component Boundaries That Stay Honest",
    subcategory: "Architecture",
    description:
      "Where the server tree ends, why \"use client\" at the root undoes the model, and how to keep data close to markup.",
    targetIntent: "architecture",
    technologies: ["React", "Next.js"],
    tags: ["react", "rsc", "nextjs"],
    relatedArticles: ["react-suspense-data-fetching", "react-architecture-for-product-uis"],
  },
  {
    slug: "react-error-boundaries-in-production",
    title: "Error Boundaries That Fail a Widget, Not the Magazine",
    subcategory: "Reliability",
    description:
      "How to isolate a broken widget, what boundaries cannot catch, and what to show the user.",
    targetIntent: "problem-solving",
    technologies: ["React"],
    tags: ["react", "reliability"],
    relatedArticles: ["react-architecture-for-product-uis", "javascript-error-handling-patterns"],
  },
  {
    slug: "react-forms-controlled-uncontrolled",
    title: "Controlled vs Uncontrolled Forms in React",
    subcategory: "Forms",
    description:
      "When to own every keystroke, when the DOM can hold the value, and how validation should sit on the boundary.",
    targetIntent: "comparison",
    technologies: ["React"],
    tags: ["react", "forms"],
    relatedArticles: ["react-state-vs-refs", "backend-validation-at-the-edge"],
  },
  {
    slug: "react-context-vs-props-vs-store",
    title: "Context, Props, or a Store: Pick the Smallest Bus",
    subcategory: "State",
    description:
      "A decision guide for passing data in React without inventing a global store for a tooltip.",
    targetIntent: "architecture",
    technologies: ["React"],
    tags: ["react", "state"],
    relatedArticles: ["react-composition-over-prop-drilling", "react-performance-when-to-memo"],
  },
  {
    slug: "react-concurrent-features-practical",
    title: "Concurrent React Features You Can Use Without a Rewrite",
    subcategory: "Rendering",
    description:
      "Transitions, deferred values, and what actually changes for a product engineer.",
    targetIntent: "educational",
    technologies: ["React"],
    tags: ["react", "concurrent"],
    relatedArticles: ["react-performance-when-to-memo", "react-suspense-data-fetching"],
  },
  {
    slug: "react-testing-what-to-test",
    title: "What to Test in a React UI (and What to Leave Alone)",
    subcategory: "Testing",
    description:
      "Test the user-visible contract. Skip implementation details that break on every rename.",
    targetIntent: "educational",
    technologies: ["React"],
    tags: ["react", "testing"],
    relatedArticles: ["react-architecture-for-product-uis", "javascript-error-handling-patterns"],
  },
  {
    slug: "react-typescript-component-props",
    title: "Typing React Component Props Without Ceremony",
    subcategory: "TypeScript",
    description:
      "Props, children, discriminated variants, and the types that keep a design system honest.",
    targetIntent: "educational",
    technologies: ["React", "TypeScript"],
    tags: ["react", "typescript"],
    relatedArticles: ["typescript-api-contracts", "typescript-discriminated-unions"],
  },
  {
    slug: "react-list-virtualization-when",
    title: "When List Virtualization Is Worth the Complexity",
    subcategory: "Performance",
    description:
      "Virtualize long, stable lists. Do not virtualize a 20-row settings page.",
    targetIntent: "problem-solving",
    technologies: ["React"],
    tags: ["react", "performance"],
    relatedArticles: ["react-performance-when-to-memo", "react-key-prop-reconciliation"],
  },
  {
    slug: "react-suspense-data-fetching",
    title: "Suspense for Data Fetching: The Boundary Is the Feature",
    subcategory: "Data",
    description:
      "How fallback trees work, where they leak layout, and when a plain loading flag is clearer.",
    targetIntent: "architecture",
    technologies: ["React"],
    tags: ["react", "suspense"],
    relatedArticles: ["react-server-components-boundaries", "react-error-boundaries-in-production"],
  },
  {
    slug: "react-custom-hooks-design",
    title: "Designing Custom Hooks That Do One Job",
    subcategory: "Hooks",
    description:
      "Extract a hook when two components share behavior, not when you want a shorter file.",
    targetIntent: "architecture",
    technologies: ["React"],
    tags: ["react", "hooks"],
    relatedArticles: ["react-hooks-mental-model", "react-composition-over-prop-drilling"],
  },
  {
    slug: "react-effects-vs-events",
    title: "Effects vs Events: Stop Putting Clicks in useEffect",
    subcategory: "Hooks",
    description:
      "User actions belong in handlers. Effects synchronize with external systems.",
    targetIntent: "educational",
    technologies: ["React"],
    tags: ["react", "useEffect"],
    relatedArticles: ["react-hooks-mental-model", "react-useeffect-dependencies"],
  },
  {
    slug: "react-accessibility-interactive-widgets",
    title: "Accessible Interactive Widgets in React",
    subcategory: "Accessibility",
    description:
      "Focus, keyboard, names, and the dialog patterns that fail first in a custom UI.",
    targetIntent: "educational",
    technologies: ["React"],
    tags: ["react", "a11y"],
    relatedArticles: ["react-portals-and-overlays", "react-architecture-for-product-uis"],
  },
  {
    slug: "react-bundle-size-and-code-splitting",
    title: "React Bundle Size: Split the Route, Not the Atom",
    subcategory: "Performance",
    description:
      "Where dynamic import helps, where it adds waterfalls, and how to read a bundle report.",
    targetIntent: "problem-solving",
    technologies: ["React", "Next.js"],
    tags: ["react", "performance"],
    relatedArticles: ["react-performance-when-to-memo", "react-server-components-boundaries"],
  },
  {
    slug: "react-state-machines-for-ui",
    title: "State Machines for UI That Has More Than Two Modes",
    subcategory: "State",
    description:
      "When a boolean soup should become explicit states, even without a library.",
    targetIntent: "architecture",
    technologies: ["React"],
    tags: ["react", "state"],
    relatedArticles: ["react-forms-controlled-uncontrolled", "react-custom-hooks-design"],
  },
  {
    slug: "react-stale-closures",
    title: "Stale Closures in React, Diagnosed",
    subcategory: "Troubleshooting",
    description:
      "The interval, the subscription, and the handler that saw last week's props.",
    targetIntent: "troubleshooting",
    technologies: ["React", "JavaScript"],
    tags: ["react", "closures"],
    relatedArticles: ["react-hooks-mental-model", "javascript-closures-in-production"],
  },
  {
    slug: "react-portals-and-overlays",
    title: "Portals and Overlays Without Trapping Focus in the Wrong Tree",
    subcategory: "UI",
    description:
      "When to portal a modal, how stacking contexts fight you, and what to restore on close.",
    targetIntent: "educational",
    technologies: ["React"],
    tags: ["react", "portals"],
    relatedArticles: ["react-accessibility-interactive-widgets", "react-error-boundaries-in-production"],
  },
  {
    slug: "react-strict-mode-double-render",
    title: "Strict Mode Double Rendering Is a Feature. Treat It Like One.",
    subcategory: "Troubleshooting",
    description:
      "Why development mounts twice, which effects are unsafe, and how to make setup idempotent.",
    targetIntent: "troubleshooting",
    difficulty: "beginner",
    technologies: ["React"],
    tags: ["react", "strict-mode"],
    relatedArticles: ["react-hooks-mental-model", "react-useeffect-dependencies"],
  },
  {
    slug: "react-architecture-for-product-uis",
    title: "A Product UI Architecture That Stays Editable",
    subcategory: "Architecture",
    description:
      "Page, feature, primitive. Keep data fetching near the route and keep primitives dumb.",
    targetIntent: "architecture",
    difficulty: "senior",
    technologies: ["React", "Next.js"],
    tags: ["react", "architecture"],
    relatedArticles: [
      "react-composition-over-prop-drilling",
      "react-server-components-boundaries",
      "react-testing-what-to-test",
    ],
  },
]);

export const typescriptJavascript = entries("typescript-javascript", [
  {
    slug: "typescript-interview-questions",
    title: "TypeScript Interview Questions, With the Reasoning",
    subcategory: "Interview Lab",
    description:
      "Types at boundaries, narrowing, generics, and the questions that separate autocomplete from design.",
    targetIntent: "interview",
    difficulty: "mixed",
    technologies: ["TypeScript"],
    tags: ["typescript", "interviews"],
    relatedArticles: [
      "javascript-interview-questions",
      "typescript-api-contracts",
      "typescript-unknown-vs-any",
    ],
    status: "published",
    priority: "high",
    section: "interview",
  },
  {
    slug: "javascript-interview-questions",
    title: "JavaScript Interview Questions, With the Reasoning",
    subcategory: "Interview Lab",
    description:
      "Closures, the event loop, equality, and this — explained as runtime behavior, not trivia.",
    targetIntent: "interview",
    difficulty: "mixed",
    technologies: ["JavaScript"],
    tags: ["javascript", "interviews"],
    relatedArticles: [
      "typescript-interview-questions",
      "javascript-event-loop-for-backend-devs",
      "javascript-closures-in-production",
    ],
    status: "published",
    priority: "high",
    section: "interview",
  },
  {
    slug: "typescript-api-contracts",
    title: "TypeScript as an API Contract, Not a Costume",
    subcategory: "Contracts",
    description:
      "Share types across producer and consumer, validate at the edge, and stop trusting JSON because it compiled once.",
    targetIntent: "architecture",
    technologies: ["TypeScript", "Node.js"],
    tags: ["typescript", "apis"],
    relatedArticles: [
      "typescript-interview-questions",
      "typescript-zod-at-the-edge",
      "backend-validation-at-the-edge",
    ],
    status: "published",
    priority: "high",
  },
  {
    slug: "typescript-unknown-vs-any",
    title: "unknown vs any: One Forces a Decision",
    subcategory: "Types",
    description:
      "Why any disables the checker and unknown just postpones the cast until you know the shape.",
    targetIntent: "comparison",
    difficulty: "beginner",
    technologies: ["TypeScript"],
    tags: ["typescript"],
    relatedArticles: ["typescript-narrowing-at-boundaries", "typescript-interview-questions"],
  },
  {
    slug: "typescript-discriminated-unions",
    title: "Discriminated Unions for States That Cannot Be Two Things",
    subcategory: "Types",
    description:
      "Model idle / loading / error / success as a union so impossible props do not compile.",
    targetIntent: "educational",
    technologies: ["TypeScript"],
    tags: ["typescript", "unions"],
    relatedArticles: ["react-state-machines-for-ui", "typescript-narrowing-at-boundaries"],
  },
  {
    slug: "typescript-generics-without-overkill",
    title: "Generics Without Turning the File Into a Puzzle",
    subcategory: "Types",
    description:
      "One type parameter that captures a relationship. Not four that impress no one in review.",
    targetIntent: "educational",
    technologies: ["TypeScript"],
    tags: ["typescript", "generics"],
    relatedArticles: ["typescript-infer-and-conditional-types", "typescript-utility-types-that-earn-rent"],
  },
  {
    slug: "javascript-event-loop-for-backend-devs",
    title: "The Event Loop for People Who Also Write Servers",
    subcategory: "Runtime",
    description:
      "Microtasks, macrotasks, and why a tight CPU loop starves HTTP in Node the same way it starves paint in the browser.",
    targetIntent: "educational",
    technologies: ["JavaScript", "Node.js"],
    tags: ["javascript", "event-loop"],
    relatedArticles: ["nodejs-cpu-bound-work", "javascript-interview-questions"],
  },
  {
    slug: "javascript-closures-in-production",
    title: "Closures in Production: Leaks, Stale Values, and Useful Privacy",
    subcategory: "Runtime",
    description:
      "When a closure is the right module boundary, and when it holds a whole response in memory.",
    targetIntent: "educational",
    technologies: ["JavaScript"],
    tags: ["javascript", "closures"],
    relatedArticles: ["react-stale-closures", "javascript-memory-leaks-in-spas"],
  },
  {
    slug: "javascript-equality-and-coercion",
    title: "Equality and Coercion: Write === and Still Know ==",
    subcategory: "Language",
    description:
      "What interviewers want when they ask about ==, and why production code should not rely on it.",
    targetIntent: "educational",
    difficulty: "beginner",
    technologies: ["JavaScript"],
    tags: ["javascript"],
    relatedArticles: ["javascript-interview-questions", "javascript-this-binding-without-mythology"],
  },
  {
    slug: "typescript-narrowing-at-boundaries",
    title: "Narrow Types at the Boundary, Trust Them Inside",
    subcategory: "Architecture",
    description:
      "Parse once. Do not sprinkle as Foo through a service that already decided the shape.",
    targetIntent: "architecture",
    technologies: ["TypeScript"],
    tags: ["typescript"],
    relatedArticles: ["typescript-api-contracts", "typescript-zod-at-the-edge"],
  },
  {
    slug: "typescript-utility-types-that-earn-rent",
    title: "Utility Types That Earn Rent: Pick, Omit, and Record",
    subcategory: "Types",
    description:
      "The three utilities that show up in real APIs, and the ones that usually mean you wanted a new type.",
    targetIntent: "educational",
    technologies: ["TypeScript"],
    tags: ["typescript"],
    relatedArticles: ["typescript-generics-without-overkill", "typescript-interview-questions"],
  },
  {
    slug: "javascript-promises-vs-async-await",
    title: "Promises vs async/await: Same Machine, Different Readability",
    subcategory: "Async",
    description:
      "When to Promise.all, when sequential await is the bug, and how errors surface in each style.",
    targetIntent: "comparison",
    technologies: ["JavaScript"],
    tags: ["javascript", "async"],
    relatedArticles: ["javascript-event-loop-for-backend-devs", "nodejs-error-first-and-async-errors"],
  },
  {
    slug: "javascript-this-binding-without-mythology",
    title: "this Binding Without the Mythology",
    subcategory: "Language",
    description:
      "Call site, bind, arrows, and the class methods that lose this in a callback.",
    targetIntent: "educational",
    technologies: ["JavaScript"],
    tags: ["javascript"],
    relatedArticles: ["javascript-interview-questions", "javascript-prototype-and-classes"],
  },
  {
    slug: "typescript-zod-at-the-edge",
    title: "Runtime Validation at the Edge (Zod or Equivalent)",
    subcategory: "Contracts",
    description:
      "TypeScript disappears at runtime. A schema at the HTTP or queue boundary is the real contract.",
    targetIntent: "architecture",
    technologies: ["TypeScript", "Node.js"],
    tags: ["typescript", "validation"],
    relatedArticles: ["typescript-api-contracts", "backend-validation-at-the-edge"],
  },
  {
    slug: "javascript-modules-esm-cjs",
    title: "ESM vs CommonJS: The Interop Bugs You Will Hit",
    subcategory: "Modules",
    description:
      "default export traps, dual packages, and why \"it works in the test file\" is not a module strategy.",
    targetIntent: "troubleshooting",
    technologies: ["JavaScript", "Node.js"],
    tags: ["javascript", "modules"],
    relatedArticles: ["nodejs-interview-questions", "javascript-interview-questions"],
  },
  {
    slug: "typescript-strict-mode-migration",
    title: "Migrating a JavaScript Service to strict TypeScript",
    subcategory: "Migration",
    description:
      "File by file, boundary first. Do not flip strict on a 40k-line folder and call it a week.",
    targetIntent: "problem-solving",
    difficulty: "senior",
    technologies: ["TypeScript"],
    tags: ["typescript", "migration"],
    relatedArticles: ["typescript-unknown-vs-any", "typescript-narrowing-at-boundaries"],
  },
  {
    slug: "javascript-iterators-and-generators",
    title: "Iterators and Generators When Streaming Is the Point",
    subcategory: "Language",
    description:
      "When a generator is a real API, and when it is a party trick in a CRUD handler.",
    targetIntent: "educational",
    technologies: ["JavaScript"],
    tags: ["javascript"],
    relatedArticles: ["nodejs-streams-when-buffers-lie", "javascript-event-loop-for-backend-devs"],
  },
  {
    slug: "typescript-declaration-files-when",
    title: "When to Write a Declaration File (and When to Fork the Types)",
    subcategory: "Tooling",
    description:
      "Ambient modules, untyped deps, and the cost of a local .d.ts that lies.",
    targetIntent: "educational",
    technologies: ["TypeScript"],
    tags: ["typescript"],
    relatedArticles: ["typescript-unknown-vs-any", "supply-chain-security-is-runtime"],
  },
  {
    slug: "javascript-memory-leaks-in-spas",
    title: "JavaScript Memory Leaks in Long-Lived SPAs",
    subcategory: "Performance",
    description:
      "Listeners, closures over large trees, and detached DOM that never quite dies.",
    targetIntent: "troubleshooting",
    technologies: ["JavaScript", "React"],
    tags: ["javascript", "performance"],
    relatedArticles: ["react-custom-hooks-design", "javascript-closures-in-production"],
  },
  {
    slug: "typescript-branded-types-for-ids",
    title: "Branded Types for IDs So You Stop Passing the Wrong UUID",
    subcategory: "Types",
    description:
      "A light brand on UserId vs OrderId. Not a new type system religion.",
    targetIntent: "architecture",
    technologies: ["TypeScript"],
    tags: ["typescript"],
    relatedArticles: ["typescript-api-contracts", "typescript-discriminated-unions"],
  },
  {
    slug: "javascript-error-handling-patterns",
    title: "Error Handling Patterns That Leave a Trace",
    subcategory: "Reliability",
    description:
      "Operational vs programmer errors, cause chains, and what to return on an API.",
    targetIntent: "educational",
    technologies: ["JavaScript", "Node.js"],
    tags: ["javascript", "errors"],
    relatedArticles: ["nodejs-error-first-and-async-errors", "rest-api-versioning-without-chaos"],
  },
  {
    slug: "typescript-infer-and-conditional-types",
    title: "infer and Conditional Types: Read Them Before You Write Them",
    subcategory: "Types",
    description:
      "Useful for libraries. Usually the wrong move in an application service.",
    targetIntent: "educational",
    difficulty: "senior",
    technologies: ["TypeScript"],
    tags: ["typescript"],
    relatedArticles: ["typescript-generics-without-overkill", "typescript-interview-questions"],
  },
  {
    slug: "javascript-debounce-throttle-raf",
    title: "Debounce, Throttle, and requestAnimationFrame",
    subcategory: "Performance",
    description:
      "Which one belongs on search, which on scroll, and which on a canvas frame.",
    targetIntent: "problem-solving",
    technologies: ["JavaScript"],
    tags: ["javascript", "performance"],
    relatedArticles: ["react-performance-when-to-memo", "javascript-event-loop-for-backend-devs"],
  },
  {
    slug: "typescript-enums-vs-unions",
    title: "TypeScript Enums vs String Unions",
    subcategory: "Types",
    description:
      "Why most application code should prefer a union, and when a const object is enough.",
    targetIntent: "comparison",
    technologies: ["TypeScript"],
    tags: ["typescript"],
    relatedArticles: ["typescript-discriminated-unions", "typescript-interview-questions"],
  },
  {
    slug: "javascript-prototype-and-classes",
    title: "Prototypes and Classes: The Same Object Model",
    subcategory: "Language",
    description:
      "What class syntax desugars to, and why you still need to know the prototype chain.",
    targetIntent: "educational",
    technologies: ["JavaScript"],
    tags: ["javascript"],
    relatedArticles: ["javascript-this-binding-without-mythology", "javascript-interview-questions"],
  },
]);
