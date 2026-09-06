import type { LabDifficulty, LabEducationBlock } from "./types";

export type InterviewQuestion = {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  correct: string;
  explanation: string;
};

export type InterviewQuiz = {
  id: string;
  title: string;
  level: LabDifficulty;
  category: string;
  description: string;
  questions: InterviewQuestion[];
};

export const INTERVIEW_QUIZZES: readonly InterviewQuiz[] = [
  {
    id: "junior-javascript",
    title: "Junior JavaScript",
    level: "junior",
    category: "JavaScript",
    description: "Equality, asynchrony, and the boring bugs that show up in week one.",
    questions: [
      {
        id: "eq",
        prompt: "Why is `[] == false` true while `[] === false` is false?",
        options: [
          { id: "coerce", label: "== coerces; === does not" },
          { id: "array", label: "Arrays are booleans" },
          { id: "bug", label: "It is a browser bug" },
        ],
        correct: "coerce",
        explanation: "Loose equality runs ToPrimitive / ToNumber. Strict equality does not.",
      },
      {
        id: "hoist",
        prompt: "What happens if you access a `let` binding before its line runs?",
        options: [
          { id: "tdz", label: "Temporal dead zone; ReferenceError" },
          { id: "undef", label: "undefined, like var" },
          { id: "null", label: "null" },
        ],
        correct: "tdz",
        explanation: "`let` and `const` hoist as bindings but stay uninitialized until the line runs.",
      },
      {
        id: "map",
        prompt: "What does `[1,2,3].map(parseInt)` produce?",
        options: [
          { id: "nan", label: "[1, NaN, NaN] because parseInt gets the index as radix" },
          { id: "123", label: "[1, 2, 3]" },
          { id: "err", label: "It throws" },
        ],
        correct: "nan",
        explanation: "map passes (value, index). parseInt('2', 1) is NaN.",
      },
      {
        id: "event",
        prompt: "In the browser, is a click handler a microtask?",
        options: [
          { id: "no", label: "No. It is an event-loop task; promises queue microtasks" },
          { id: "yes", label: "Yes, all callbacks are microtasks" },
          { id: "sync", label: "It is synchronous with parse HTML" },
        ],
        correct: "no",
        explanation: "User events are tasks. Promise reactions run between tasks as microtasks.",
      },
      {
        id: "copy",
        prompt: "Does `const a = {x:1}; const b = a; b.x = 2` change `a.x`?",
        options: [
          { id: "yes", label: "Yes. Both names point at the same object" },
          { id: "no", label: "No. const copies" },
          { id: "throw", label: "It throws" },
        ],
        correct: "yes",
        explanation: "`const` blocks reassignment of `b`, not mutation of the object.",
      },
    ],
  },
  {
    id: "mid-react",
    title: "Mid-level React",
    level: "mid",
    category: "React",
    description: "Rendering, effects, and data that should not live in state.",
    questions: [
      {
        id: "key",
        prompt: "Why are array index keys a problem when a list can reorder?",
        options: [
          { id: "identity", label: "React reuses the wrong component state" },
          { id: "css", label: "CSS breaks" },
          { id: "ok", label: "Index keys are always fine" },
        ],
        correct: "identity",
        explanation: "Keys are identity. Indexes lie when items move.",
      },
      {
        id: "effect",
        prompt: "An effect fetches on mount and does not abort. What is the bug on a fast navigate?",
        options: [
          { id: "race", label: "A race can set state on an unmounted tree or apply stale data" },
          { id: "hook", label: "You cannot fetch in effects" },
          { id: "ok", label: "React cancels it for you always" },
        ],
        correct: "race",
        explanation: "Ignore or abort the in-flight request when the input or the page changes.",
      },
      {
        id: "memo",
        prompt: "When is `useMemo` actually worth it?",
        options: [
          { id: "cost", label: "When the work is expensive or the reference must stay stable" },
          { id: "always", label: "Around every JSX node" },
          { id: "never", label: "Never; React is fast" },
        ],
        correct: "cost",
        explanation: "Memo is a tool for cost and identity, not a default wrapper.",
      },
      {
        id: "state",
        prompt: "A form's derived full name is `first + last`. Where should it live?",
        options: [
          { id: "derive", label: "Derive it while rendering" },
          { id: "store", label: "A third piece of state updated in two effects" },
          { id: "redux", label: "Redux only" },
        ],
        correct: "derive",
        explanation: "If you can compute it, do not store it. Effects that sync derived state are a smell.",
      },
      {
        id: "server",
        prompt: "In Next.js App Router, why might you keep a form as a client island?",
        options: [
          { id: "state", label: "It needs browser state, handlers, or localStorage" },
          { id: "seo", label: "Client components rank better" },
          { id: "always", label: "All pages must be client" },
        ],
        correct: "state",
        explanation: "Keep the page a server component; push interactivity down.",
      },
    ],
  },
  {
    id: "senior-backend",
    title: "Senior backend",
    level: "senior",
    category: "Backend",
    description: "Transactions, retries, and contracts between services.",
    questions: [
      {
        id: "idemp",
        prompt: "A client retries a POST /charges. What must the server already have?",
        options: [
          { id: "key", label: "An idempotency key and a stored first result" },
          { id: "sleep", label: "A longer timeout" },
          { id: "uuid", label: "A new UUID per retry" },
        ],
        correct: "key",
        explanation: "Retries are normal. New IDs per retry are how you double-charge.",
      },
      {
        id: "tx",
        prompt: "You need to write an order and enqueue an email. What is the safer default?",
        options: [
          { id: "outbox", label: "Transactional outbox, then a worker publishes" },
          { id: "dual", label: "Commit SQL, then fire-and-forget HTTP in the request" },
          { id: "two-db", label: "A distributed transaction across email SaaS" },
        ],
        correct: "outbox",
        explanation: "The queue publish can fail after commit. The outbox is the same transaction as the order.",
      },
      {
        id: "idx",
        prompt: "A query is slow only in production. What do you ask for first?",
        options: [
          { id: "plan", label: "The real EXPLAIN / plan and the row counts" },
          { id: "k8s", label: "More pods" },
          { id: "orm", label: "Rewrite in another ORM immediately" },
        ],
        correct: "plan",
        explanation: "Guessing indexes without a plan is how you add the wrong one.",
      },
      {
        id: "slo",
        prompt: "p99 is 2s but p50 is 40ms. What do you look at?",
        options: [
          { id: "tail", label: "The tail: locks, GC, cold cache, a noisy neighbor, a sync call" },
          { id: "mean", label: "The average only" },
          { id: "css", label: "Frontend CSS" },
        ],
        correct: "tail",
        explanation: "Averages hide the user-visible stall. Senior work lives in the tail.",
      },
      {
        id: "contract",
        prompt: "A producer adds a field. Consumers start failing. What was missing?",
        options: [
          { id: "compat", label: "A compatibility rule: additive optional fields, explicit versions" },
          { id: "json", label: "JSON instead of a binary format" },
          { id: "rest", label: "REST instead of events" },
        ],
        correct: "compat",
        explanation: "The format is not the contract. Evolution rules are.",
      },
      {
        id: "queue",
        prompt: "Consumers are slow. The queue grows. What is the first safe lever?",
        options: [
          { id: "backpressure", label: "Limit concurrency, scale workers, and shed or delay non-critical work" },
          { id: "drop", label: "Drop all messages" },
          { id: "sync", label: "Make the producer synchronous again" },
        ],
        correct: "backpressure",
        explanation: "Unbounded in-flight work turns a lag problem into a crash.",
      },
    ],
  },
  {
    id: "staff-architecture",
    title: "Staff architecture",
    level: "staff",
    category: "Architecture",
    description: "What you refuse, what you sequence, and who pays.",
    questions: [
      {
        id: "refuse",
        prompt: "A PM wants a new real-time dashboard this quarter and a payments rewrite. You can staff one well. What do you do?",
        options: [
          { id: "seq", label: "Sequence: name the user risk, pick one, make the other a measured follow-up" },
          { id: "both", label: "Start both and hope" },
          { id: "rewrite", label: "Always rewrite payments first" },
        ],
        correct: "seq",
        explanation: "Staff work is sequencing under constraint, not collecting initiatives.",
      },
      {
        id: "multi",
        prompt: "When is a new service justified?",
        options: [
          { id: "boundary", label: "A real failure, scale, or ownership boundary — not a folder getting large" },
          { id: "always", label: "Whenever a team is bored" },
          { id: "never", label: "Never; monoliths always win" },
        ],
        correct: "boundary",
        explanation: "Split on change rate, blast radius, and ownership — not file count.",
      },
      {
        id: "risk",
        prompt: "A migration has no rollback. What is your stance?",
        options: [
          { id: "stop", label: "Do not ship it. Dual-write, expand/contract, or a rehearsed backout" },
          { id: "friday", label: "Ship Friday and watch Slack" },
          { id: "feat", label: "Call it a feature flag even if data already moved" },
        ],
        correct: "stop",
        explanation: "Irreversible data movement without a rehearsal is not bravery.",
      },
      {
        id: "cost",
        prompt: "Finance asks why the bill doubled. What do you bring?",
        options: [
          { id: "units", label: "Unit economics: requests, egress, idle capacity, a change that shipped" },
          { id: "vendor", label: "Blame the cloud vendor only" },
          { id: "shrug", label: "Say engineering does not do cost" },
        ],
        correct: "units",
        explanation: "Staff engineers can narrate cost the way they narrate latency.",
      },
      {
        id: "lead",
        prompt: "Two senior engineers disagree in public. What do you optimize for?",
        options: [
          { id: "decide", label: "A decision, an owner, and a date to revisit — not a permanent tie" },
          { id: "consensus", label: "Wait until everyone is happy" },
          { id: "hires", label: "Hire a third person to break the tie forever" },
        ],
        correct: "decide",
        explanation: "Leadership is a recorded choice plus a feedback loop.",
      },
    ],
  },
  {
    id: "mid-databases",
    title: "Mid-level databases",
    level: "mid",
    category: "Databases",
    description: "Indexes, isolation, and the difference between cache and truth.",
    questions: [
      {
        id: "idx",
        prompt: "A composite index is (user_id, created_at). Which filter uses it well?",
        options: [
          { id: "left", label: "WHERE user_id = ? ORDER BY created_at" },
          { id: "right", label: "WHERE created_at > ? only" },
          { id: "or", label: "WHERE email = ? OR user_id = ?" },
        ],
        correct: "left",
        explanation: "Left-prefix. A lone created_at predicate cannot seek that index cleanly.",
      },
      {
        id: "iso",
        prompt: "You read a row, then write it, and lost someone else's update. What was missing?",
        options: [
          { id: "version", label: "A version column, compare-and-swap, or a tighter isolation/lock" },
          { id: "index", label: "A bigger index" },
          { id: "json", label: "Store the row as JSON" },
        ],
        correct: "version",
        explanation: "Lost update. Optimistic versioning or a real transaction around the read-modify-write.",
      },
      {
        id: "cache",
        prompt: "Redis is down. The app 500s. What design choice was that?",
        options: [
          { id: "closed", label: "Fail-closed on cache. Availability was traded for consistency or simplicity" },
          { id: "cap", label: "CAP says you must 500" },
          { id: "sql", label: "SQL cannot run without Redis" },
        ],
        correct: "closed",
        explanation: "Cache is usually an optimization. Fail-open unless you have a reason.",
      },
      {
        id: "null",
        prompt: "Why is `UNIQUE` on a nullable email surprising in some engines?",
        options: [
          { id: "nulls", label: "Multiple NULLs may be allowed; NULLs are not equal to each other" },
          { id: "never", label: "UNIQUE always treats NULL as a value" },
          { id: "pk", label: "UNIQUE is the same as PRIMARY KEY" },
        ],
        correct: "nulls",
        explanation: "If you meant one empty identity, use a real sentinel or a partial unique index.",
      },
      {
        id: "migrate",
        prompt: "How do you add a required column to a large table without a long lock?",
        options: [
          { id: "expand", label: "Add nullable, backfill in batches, then constrain" },
          { id: "one", label: "One ALTER that rewrites the table in a deploy" },
          { id: "dump", label: "Dump and restore on Friday" },
        ],
        correct: "expand",
        explanation: "Expand / contract. Big table rewrites are an outage dressed as a migration.",
      },
    ],
  },
];

export function getInterviewQuiz(id: string) {
  return INTERVIEW_QUIZZES.find((item) => item.id === id);
}

export const INTERVIEW_EDUCATION: LabEducationBlock = {
  howItWorks: [
    "Pick a level. Answer every question, then read the explanations — including the ones you got right.",
    "This is not the interview notes journal. Long-form writeups stay on /interviews/.",
  ],
  keyConcepts: [
    {
      title: "Tradeoffs over trivia",
      body: "Senior and staff prompts are about sequencing, contracts, and failure — not API memorization.",
    },
  ],
  commonMistakes: [
    "Treating a quiz score as a level title.",
    "Skipping the explanation when the answer was lucky.",
  ],
  interviewTips: [
    "Talk in systems: user, data, failure, cost.",
    "If you do not know, say how you would find out in the first hour.",
  ],
};
