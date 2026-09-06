import type { LabDifficulty, LabEducationBlock } from "./types";

export type CodeBattleChallenge = {
  id: string;
  title: string;
  category: string;
  difficulty: LabDifficulty;
  seconds: number;
  prompt: string;
  snippet?: string;
  options: { id: string; label: string }[];
  correct: string;
  explanation: string;
};

export const CODE_BATTLE_CHALLENGES: readonly CodeBattleChallenge[] = [
  {
    id: "js-closure",
    title: "Loop closures",
    category: "JavaScript",
    difficulty: "junior",
    seconds: 45,
    prompt: "What does this print?",
    snippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    options: [
      { id: "012", label: "0 1 2" },
      { id: "333", label: "3 3 3" },
      { id: "err", label: "Throws" },
    ],
    correct: "333",
    explanation: "`var` is function-scoped. The timeout callbacks share one `i`, which is 3 after the loop.",
  },
  {
    id: "ts-narrow",
    title: "Type narrowing",
    category: "TypeScript",
    difficulty: "mid",
    seconds: 50,
    prompt: "Which check lets you use `value.toUpperCase()` when `value` is `string | number`?",
    options: [
      { id: "typeof", label: "typeof value === \"string\"" },
      { id: "as", label: "value as string, always" },
      { id: "any", label: "Cast to any" },
    ],
    correct: "typeof",
    explanation: "A typeof guard narrows the union. A blind assertion just silences the compiler.",
  },
  {
    id: "react-stale",
    title: "Stale state",
    category: "React",
    difficulty: "mid",
    seconds: 50,
    prompt: "A click handler does `setCount(count + 1)` twice in the same event. What is the next count if it started at 0?",
    options: [
      { id: "2", label: "2" },
      { id: "1", label: "1" },
      { id: "0", label: "0" },
    ],
    correct: "1",
    explanation: "Both updates read the same `count` from that render. Use `setCount(c => c + 1)` to chain.",
  },
  {
    id: "node-eventloop",
    title: "Microtasks",
    category: "Node.js",
    difficulty: "mid",
    seconds: 50,
    prompt: "In Node, what order do these logs run: console.log('a'); Promise.resolve().then(() => console.log('b')); setTimeout(() => console.log('c'), 0);",
    options: [
      { id: "abc", label: "a b c" },
      { id: "acb", label: "a c b" },
      { id: "bac", label: "b a c" },
    ],
    correct: "abc",
    explanation: "Synchronous first, then microtasks (promise), then the timer.",
  },
  {
    id: "java-equals",
    title: "String equals",
    category: "Java",
    difficulty: "junior",
    seconds: 40,
    prompt: "Which comparison is correct for string value equality?",
    options: [
      { id: "eq", label: "a.equals(b) after a null check" },
      { id: "dbleq", label: "a == b always" },
      { id: "hash", label: "a.hashCode() == b.hashCode()" },
    ],
    correct: "eq",
    explanation: "`==` is reference equality for objects. Hash collisions are not equality.",
  },
  {
    id: "spring-tx",
    title: "Self-invocation",
    category: "Spring Boot",
    difficulty: "senior",
    seconds: 55,
    prompt: "A `@Transactional` method called from another method on the same class does not open a transaction. Why?",
    options: [
      { id: "proxy", label: "Spring AOP proxies do not intercept self-invocation" },
      { id: "jpa", label: "JPA only works from controllers" },
      { id: "readonly", label: "The method must be private" },
    ],
    correct: "proxy",
    explanation: "The proxy wraps the bean. `this.other()` never leaves the target object.",
  },
  {
    id: "php-ref",
    title: "foreach by reference",
    category: "PHP",
    difficulty: "mid",
    seconds: 45,
    prompt: "After `foreach ($arr as &$v) {}` you later `foreach ($arr as $v) {}` without unset. What is a common bug?",
    options: [
      { id: "last", label: "The last element is overwritten on the second loop" },
      { id: "empty", label: "The array becomes empty" },
      { id: "fatal", label: "It always fatals" },
    ],
    correct: "last",
    explanation: "`$v` still references the last element. Unset it after a by-ref loop.",
  },
  {
    id: "laravel-nplus",
    title: "Eloquent N+1",
    category: "Laravel",
    difficulty: "junior",
    seconds: 40,
    prompt: "How do you avoid N+1 when listing posts with authors?",
    options: [
      { id: "with", label: "Post::with('author')->get()" },
      { id: "lazy", label: "Access $post->author inside the blade loop only" },
      { id: "raw", label: "Never use Eloquent" },
    ],
    correct: "with",
    explanation: "Eager load the relation. Lazy access in a loop is the N+1.",
  },
  {
    id: "sql-null",
    title: "NULL in SQL",
    category: "SQL",
    difficulty: "junior",
    seconds: 40,
    prompt: "What does `WHERE email != 'a@b.com'` do with NULL emails?",
    options: [
      { id: "drop", label: "Drops the NULL rows; UNKNOWN is not true" },
      { id: "keep", label: "Keeps the NULL rows" },
      { id: "err", label: "The query errors" },
    ],
    correct: "drop",
    explanation: "NULL comparisons yield UNKNOWN. Use `IS NULL` / `IS DISTINCT FROM` when you mean it.",
  },
  {
    id: "eng-slo",
    title: "SLO vs SLA",
    category: "General Engineering",
    difficulty: "mid",
    seconds: 40,
    prompt: "Which statement is accurate?",
    options: [
      { id: "slo", label: "An SLO is an internal target; an SLA is the customer contract" },
      { id: "same", label: "They are the same number" },
      { id: "uptime", label: "SLA is only uptime, SLO is only latency" },
    ],
    correct: "slo",
    explanation: "SLIs measure, SLOs target, SLAs contract. Do not promise the SLO as the SLA.",
  },
];

export function getCodeBattleChallenge(id: string) {
  return CODE_BATTLE_CHALLENGES.find((item) => item.id === id);
}

export const CODE_BATTLE_EDUCATION: LabEducationBlock = {
  howItWorks: [
    "Each prompt is timed. Pick an answer before the clock hits zero.",
    "There is no code runner. These are output, API, and judgment questions.",
  ],
  keyConcepts: [
    {
      title: "Language mechanics",
      body: "Closures, narrowing, and ORM loading show up in real interviews because they show up in real bugs.",
    },
  ],
  commonMistakes: [
    "Reading the snippet as if `let` and `var` were the same.",
    "Assuming a framework annotation always wraps `this`.",
  ],
  interviewTips: [
    "Say the mental model in one sentence, then pick.",
    "If you are stuck, eliminate the option that would always crash.",
  ],
};
