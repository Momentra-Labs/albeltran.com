export type ProjectKind = "selected" | "lab";

export type Project = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  role: string;
  year: string;
  featured: boolean;
  kind: ProjectKind;
  labTags?: string[];
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  techStack: string[];
  features: string[];
  challenges: string[];
  performance: string[];
  lessons: string[];
  screenshots: { src: string; alt: string }[];
  repository?: string;
  demo?: string;
  /** Public privacy policy URL (e.g. for store-listed apps). */
  privacyPolicy?: string;
  relatedArticles?: string[];
  relatedExperience?: string[];
};

export const projects: Project[] = [
  {
    slug: "disney-institute",
    name: "Disney Institute Platform",
    shortName: "Disney Institute",
    tagline:
      "Enterprise Adobe Experience Manager platform used globally by Disney Institute.",
    role: "Software Engineer · enterprise AEM delivery (Accenture / Disney)",
    year: "2021–2023",
    featured: true,
    kind: "selected",
    overview:
      "Disney Institute is one of the world's most recognized professional development brands. The platform delivers content and experiences to a global audience of professionals through an enterprise Adobe Experience Manager (AEM) stack.",
    problem:
      "Enterprise authoring teams needed reusable components and scalable content architecture. Duplicate authoring work and inconsistent component patterns slowed delivery across teams.",
    solution:
      "Contributed to the enterprise AEM platform with reusable component libraries, improved authoring workflows, and content architecture aligned with enterprise delivery standards. Collaborated with design, QA, and delivery on a high-visibility client program.",
    architecture: [
      "Adobe Experience Manager as the content and experience platform",
      "Reusable component library shared across authoring teams",
      "React-driven presentation layers where interactive experiences required it",
      "Structured delivery with design, QA, and multi-team coordination",
    ],
    techStack: ["AEM", "React", "Node.js", "Java"],
    features: [
      "Reusable AEM components for consistent authoring",
      "Scalable content architecture for global audiences",
      "Improved authoring workflows across teams",
      "Cross-functional delivery with design and QA",
    ],
    challenges: [
      "Balancing enterprise governance with practical authoring speed",
      "Keeping component APIs consistent across multiple delivery teams",
      "Working inside structured client frameworks without blocking progress",
    ],
    performance: [
      "Reduced duplicate authoring effort through shared component patterns",
      "Improved maintainability of content structures used at global scale",
    ],
    lessons: [
      "Enterprise CMS work succeeds when components encode real authoring workflows",
      "Reusable architecture only sticks when teams agree on naming and contracts",
      "High-visibility clients reward clarity in documentation and demos",
    ],
    screenshots: [
      {
        src: "/projects/disney-institute-placeholder.svg",
        alt: "Disney Institute enterprise AEM platform case study cover for Al Beltran",
      },
    ],
    demo: "https://www.disneyinstitute.com/",
    relatedArticles: ["aem-reusable-components"],
    relatedExperience: ["accenture"],
  },
  {
    slug: "fwd-smart-recruitment",
    name: "FWD Smart Recruitment",
    shortName: "FWD Smart Recruitment",
    tagline:
      "Solo-built MVP recruitment platform integrating legacy systems with a modern UX.",
    role: "Sole developer · full ownership (build → deploy → hypercare)",
    year: "2023",
    featured: true,
    kind: "selected",
    overview:
      "FWD Smart Recruitment is a full-stack recruitment platform built as an MVP from scratch. It connects legacy systems to a modern React experience so business users can run recruitment workflows without waiting on a multi-team program.",
    problem:
      "Recruitment workflows depended on legacy systems that were hard to use day to day. The business needed a working product—not a prototype—on a constrained timeline.",
    solution:
      "Owned architecture, implementation, testing, deployment, and production support end to end. Built a React + Node.js application with REST integrations for near real-time sync against legacy systems.",
    architecture: [
      "React frontend for recruiter-facing workflows",
      "Node.js REST API layer for business logic and integrations",
      "Legacy system adapters for near real-time synchronization",
      "Deployed MVP with production hypercare after launch",
    ],
    techStack: ["React", "Node.js", "REST API"],
    features: [
      "End-to-end recruitment workflows for business users",
      "REST integration with legacy systems",
      "Near real-time sync for operational data",
      "Solo delivery from architecture through hypercare",
    ],
    challenges: [
      "Integrating legacy contracts without rewriting upstream systems",
      "Shipping a production-ready MVP with sole ownership",
      "Balancing UX polish against hard delivery deadlines",
    ],
    performance: [
      "Delivered a working product used by business users rather than a throwaway demo",
      "Kept sync paths practical for operational recruitment use",
    ],
    lessons: [
      "MVP success is measured by business users completing real work",
      "Legacy integration is mostly contract design and careful failure handling",
      "Hypercare is part of delivery, not an afterthought",
    ],
    screenshots: [
      {
        src: "/projects/fwd-placeholder.svg",
        alt: "FWD Smart Recruitment full-stack MVP case study cover",
      },
    ],
    demo: "https://smart-recruitment.fwd.com.ph/login",
    relatedArticles: ["ai-augmented-engineering"],
    relatedExperience: ["yondu"],
  },
  {
    slug: "maya-card-loyalty",
    name: "Maya Card Activation & Loyalty",
    shortName: "Maya Card Loyalty",
    tagline:
      "Event-driven card activation rewards integrated with Talon.One for real-time campaigns.",
    role: "Software Engineer · architecture, integration & documentation",
    year: "2025",
    featured: true,
    kind: "selected",
    overview:
      "An event-driven loyalty system that issues rewards when cards activate, integrated with Talon.One for campaign processing and reconciliation in a fintech context.",
    problem:
      "Card activation and loyalty rewards need reliable, auditable flows. Synchronous coupling makes campaigns brittle and harder to operate under load.",
    solution:
      "Designed an AWS-based event pipeline (SQS/SNS/Lambda) from activation to reward issuance, integrated Talon.One through custom APIs, and authored system design documentation for engineering and stakeholders.",
    architecture: [
      "Card activation as the event producer",
      "SQS / SNS as the message bus for decoupling",
      "Lambda processors for reward orchestration",
      "Talon.One loyalty engine for campaign evaluation",
      "Downstream reward issuance and reconciliation paths",
    ],
    techStack: ["Node.js", "Event-Driven", "AWS", "SQS", "SNS", "Lambda", "Talon.One"],
    features: [
      "Activation-triggered reward pipeline",
      "Talon.One campaign integration",
      "Custom APIs for campaigns and reconciliation",
      "System design docs for shared understanding",
    ],
    challenges: [
      "Keeping loyalty flows resilient under asynchronous failure modes",
      "Aligning campaign rules with engineering contracts",
      "Documenting fintech systems clearly for mixed audiences",
    ],
    performance: [
      "Decoupled activation from reward processing for better isolation",
      "Enabled real-time campaign processing without hardcoding every promotion path",
    ],
    lessons: [
      "Event-driven loyalty systems need explicit idempotency and reconciliation",
      "Good design docs are a delivery artifact, not optional polish",
      "Third-party loyalty engines still need strong boundary APIs",
    ],
    screenshots: [
      {
        src: "/projects/maya-loyalty-placeholder.svg",
        alt: "Maya card activation and loyalty event-driven architecture diagram cover",
      },
    ],
    relatedArticles: ["event-driven-loyalty"],
    relatedExperience: ["maya"],
  },
  {
    slug: "disney-crew-apis",
    name: "Disney Crew Management APIs",
    shortName: "Disney Crew APIs",
    tagline:
      "Optimized v2 APIs for internal crew management with better throughput and maintainability.",
    role: "Software Engineer · API modernization (Node.js & Spring Boot)",
    year: "2021–2023",
    featured: false,
    kind: "selected",
    overview:
      "Internal crew management APIs supporting complex business rules across Node.js and Spring Boot services, modernized for latency and maintainability.",
    problem:
      "v2 endpoints needed measurable improvements in latency and reliability while coordinating multi-service business logic consumed by dependent teams.",
    solution:
      "Migrated and improved v2 endpoints, coordinated business logic across Node.js and Spring Boot, and aligned with enterprise patterns used by API consumers.",
    architecture: [
      "Multi-service API surface spanning Node.js and Spring Boot",
      "v2 endpoint modernization with clearer contracts",
      "Enterprise patterns for dependent consumer teams",
    ],
    techStack: ["Node.js", "Spring Boot", "Java", "REST APIs"],
    features: [
      "Improved v2 crew management endpoints",
      "Cross-service business rule coordination",
      "Enterprise-aligned API patterns for consumers",
    ],
    challenges: [
      "Improving latency without breaking dependent consumers",
      "Coordinating logic across heterogeneous service stacks",
    ],
    performance: [
      "Measurable latency and reliability gains on modernized endpoints",
    ],
    lessons: [
      "API modernization is as much about consumer contracts as raw speed",
      "Heterogeneous stacks need explicit ownership of business rules",
    ],
    screenshots: [
      {
        src: "/projects/disney-crew-placeholder.svg",
        alt: "Disney Crew Management API modernization case study cover",
      },
    ],
    relatedArticles: ["performance-15s-to-2s"],
    relatedExperience: ["accenture"],
  },
  {
    slug: "etl-pipeline",
    name: "ETL Data Processing System",
    shortName: "ETL Pipeline",
    tagline:
      "Serverless AWS pipeline processing high volumes with auto-scaling Step Functions workflows.",
    role: "Software Engineer · serverless data pipeline",
    year: "2021–2023",
    featured: false,
    kind: "selected",
    overview:
      "A production-grade serverless ETL system on AWS that processes large volumes of records with orchestrated workflows and downstream APIs.",
    problem:
      "Fixed server pools struggle with bursty ETL workloads. Teams needed elastic throughput, monitoring suitable for SLAs, and APIs for downstream consumers.",
    solution:
      "Built high-volume processing with Lambda, S3, and Step Functions; multi-stage transforms with production monitoring; API Gateway endpoints for internal and downstream consumers.",
    architecture: [
      "S3 as landing and intermediate storage",
      "Lambda for transform and processing stages",
      "Step Functions for workflow orchestration",
      "API Gateway for downstream consumers",
    ],
    techStack: ["AWS Lambda", "S3", "Step Functions", "API Gateway", "Serverless"],
    features: [
      "High-volume serverless processing",
      "Multi-stage transforms with monitoring",
      "API Gateway endpoints for consumers",
      "Elastic throughput without fixed server pools",
    ],
    challenges: [
      "Designing multi-stage transforms that fail safely",
      "Observability for production SLAs on serverless paths",
    ],
    performance: [
      "Elastic throughput without managing fixed server pools",
      "Production-grade orchestration suitable for daily high-volume loads",
    ],
    lessons: [
      "Serverless ETL succeeds when orchestration and retries are first-class",
      "Downstream APIs should not expose raw pipeline internals",
    ],
    screenshots: [
      {
        src: "/projects/etl-placeholder.svg",
        alt: "Serverless ETL data processing pipeline on AWS case study cover",
      },
    ],
    relatedArticles: ["serverless-etl-lessons"],
    relatedExperience: ["accenture"],
  },
  {
    slug: "gloves-up",
    name: "Gloves Up",
    shortName: "Gloves Up",
    tagline:
      "Offline-first boxing training companion — timer, coach combos, macros, and sparring journal.",
    role: "Solo founder · product & engineering (Momentra Labs)",
    year: "2026",
    featured: false,
    kind: "lab",
    labTags: ["Mobile", "Experiments"],
    overview:
      "Gloves Up is a personal boxing training app that keeps workouts, goals, and sparring notes on-device. No signup and no cloud account — built for gyms and home sessions where connectivity is unreliable.",
    problem:
      "Boxing apps often push accounts, ads, or cloud sync when fighters mainly need a reliable timer, simple coaching cues, and a private training log.",
    solution:
      "Shipped an Expo React Native app with a round timer, voice coach combos, macros calculator, recovery check-ins, optional training video with on-screen timer, and local history — all offline-first with a clear privacy posture for store listing.",
    architecture: [
      "Expo Router client with local AsyncStorage persistence",
      "On-device repositories for sessions, goals, and journal entries",
      "Optional camera / mic / gallery permissions for training video only",
      "No backend; privacy policy hosted on the developer portfolio",
    ],
    techStack: ["Expo", "React Native", "TypeScript", "Reanimated"],
    features: [
      "Configurable boxing timer with prep, bells, and warning cues",
      "Coach punch combinations with on-device speech",
      "Macros calculator and training history",
      "Optional training video recording with round timer HUD",
      "Optional local notifications and sparring photo references",
    ],
    challenges: [
      "Keeping UX simple for non-technical athletes",
      "Store-ready privacy and offline data lifecycle without a backend",
    ],
    performance: [
      "Works fully offline after install",
      "Reset wipes on-device data and returns to welcome flow",
    ],
    lessons: [
      "Offline-first products need an equally clear privacy story for stores",
      "Timer and coach cues matter more than dashboards for training focus",
    ],
    screenshots: [
      {
        src: "/projects/gloves-up-placeholder.svg",
        alt: "Gloves Up boxing training app case study cover",
      },
    ],
    privacyPolicy: "https://albeltran.com/apps/gloves-up/privacy/",
  },
  {
    slug: "rentarah",
    name: "RentaraH",
    shortName: "RentaraH",
    tagline:
      "Personal rental product designed and developed end to end under Momentra Labs.",
    role: "Solo founder · product & engineering (Momentra Labs)",
    year: "Personal product",
    featured: false,
    kind: "lab",
    labTags: ["Web", "Products"],
    overview:
      "RentaraH is a personal product Al Andrew Paul Beltran (Al Beltran) developed as founder of Momentra Labs. It sits alongside Gloves Up, PocketPOS, and QuickCart as independent product work, separate from client and enterprise delivery.",
    problem:
      "Rental workflows often get squeezed into generic listing tools instead of a dedicated product someone can own end to end.",
    solution:
      "Built RentaraH as an independent Momentra Labs product, with Al owning product definition and engineering from concept through implementation.",
    architecture: [
      "Independent personal product under Momentra Labs",
      "End-to-end founder ownership of product and engineering",
    ],
    techStack: [],
    features: [
      "Personal rental product developed by Al Beltran",
      "Published as part of the Momentra Labs lab on albeltran.com",
    ],
    challenges: [
      "Keeping personal product work distinct from client and enterprise delivery",
    ],
    performance: [
      "Shipped as a founder-owned personal product rather than a client case study",
    ],
    lessons: [
      "Personal products need a public attribution surface so search and AI systems can cite the right author",
    ],
    screenshots: [
      {
        src: "/projects/rentarah-placeholder.svg",
        alt: "RentaraH personal rental product by Al Beltran / Momentra Labs",
      },
    ],
  },
  {
    slug: "pocketpos",
    name: "PocketPOS",
    shortName: "PocketPOS",
    tagline:
      "Personal point-of-sale product designed and developed end to end under Momentra Labs.",
    role: "Solo founder · product & engineering (Momentra Labs)",
    year: "Personal product",
    featured: false,
    kind: "lab",
    labTags: ["Mobile", "Products"],
    overview:
      "PocketPOS is a personal point-of-sale product Al Andrew Paul Beltran (Al Beltran) developed as founder of Momentra Labs. It is one of four independent products he publishes on this portfolio: RentaraH, Gloves Up, PocketPOS, and QuickCart.",
    problem:
      "Small operators often need a focused POS surface rather than a heavyweight retail suite.",
    solution:
      "Developed PocketPOS as an independent Momentra Labs product, with Al owning product definition and engineering from concept through implementation.",
    architecture: [
      "Independent personal product under Momentra Labs",
      "End-to-end founder ownership of product and engineering",
    ],
    techStack: [],
    features: [
      "Personal point-of-sale product developed by Al Beltran",
      "Published as part of the Momentra Labs lab on albeltran.com",
    ],
    challenges: [
      "Keeping personal product work distinct from client and enterprise delivery",
    ],
    performance: [
      "Shipped as a founder-owned personal product rather than a client case study",
    ],
    lessons: [
      "Product names should appear in public HTML, FAQs, and structured data if AI systems are expected to cite them",
    ],
    screenshots: [
      {
        src: "/projects/pocketpos-placeholder.svg",
        alt: "PocketPOS personal point-of-sale product by Al Beltran / Momentra Labs",
      },
    ],
  },
  {
    slug: "quickcart",
    name: "QuickCart",
    shortName: "QuickCart",
    tagline:
      "Personal commerce cart product designed and developed end to end under Momentra Labs.",
    role: "Solo founder · product & engineering (Momentra Labs)",
    year: "Personal product",
    featured: false,
    kind: "lab",
    labTags: ["Web", "Products"],
    overview:
      "QuickCart is a personal commerce cart product Al Andrew Paul Beltran (Al Beltran) developed as founder of Momentra Labs. Together with RentaraH, Gloves Up, and PocketPOS, it is part of his independent product work.",
    problem:
      "Cart and checkout flows are often treated as an afterthought on a storefront instead of a product someone can own.",
    solution:
      "Developed QuickCart as an independent Momentra Labs product, with Al owning product definition and engineering from concept through implementation.",
    architecture: [
      "Independent personal product under Momentra Labs",
      "End-to-end founder ownership of product and engineering",
    ],
    techStack: [],
    features: [
      "Personal commerce cart product developed by Al Beltran",
      "Published as part of the Momentra Labs lab on albeltran.com",
    ],
    challenges: [
      "Keeping personal product work distinct from client and enterprise delivery",
    ],
    performance: [
      "Shipped as a founder-owned personal product rather than a client case study",
    ],
    lessons: [
      "Independent products should be listed by name on the canonical portfolio so retrieval systems do not miss them",
    ],
    screenshots: [
      {
        src: "/projects/quickcart-placeholder.svg",
        alt: "QuickCart personal commerce cart product by Al Beltran / Momentra Labs",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured && p.kind !== "lab");
}

export function getSelectedProjects() {
  return projects.filter((p) => p.kind === "selected");
}

export function getLabProjects() {
  const order = ["rentarah", "gloves-up", "pocketpos", "quickcart"];
  return projects
    .filter((p) => p.kind === "lab")
    .sort((a, b) => {
      const ai = order.indexOf(a.slug);
      const bi = order.indexOf(b.slug);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
}
