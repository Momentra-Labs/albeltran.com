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
  /** Direct Android APK download path or URL. */
  apk?: string;
  /** Public privacy policy URL (e.g. for store-listed apps). */
  privacyPolicy?: string;
  relatedArticles?: string[];
  relatedExperience?: string[];
};

export const projects: Project[] = [
  {
    slug: "docindy",
    name: "DocIndy",
    shortName: "DocIndy",
    tagline:
      "Live telehealth web product at docindy.ivisitdoc.com — care discovery, patient start flows, and checkout.",
    role: "Software Engineer · professional product delivery",
    year: "2026",
    featured: true,
    kind: "selected",
    overview:
      "DocIndy is a public telehealth product at docindy.ivisitdoc.com. The site presents weight-loss and related care journeys, a BMI starting point, partner wellness apps, and login/get-started paths into intake. I contributed professional product delivery on this patient-facing web product.",
    problem:
      "A multi-specialty telehealth brand has to move people from care discovery into intake and checkout without fragmenting the journey across weight loss, sexual health, and adjacent specialties.",
    solution:
      "Contributed to the production Vite web product: public care surfaces, patient start flows, and the live frontend that ships at docindy.ivisitdoc.com. Clinical claims on the marketing site are the product's — not personal performance metrics.",
    architecture: [
      "Public Vite SPA at docindy.ivisitdoc.com",
      "Care-category marketing and shop surfaces",
      "Patient login and get-started paths into intake and checkout",
      "Partner wellness app surfaces on the same public site",
    ],
    techStack: ["React", "TypeScript", "Vite"],
    features: [
      "Homepage care journeys spanning weight loss and related specialties",
      "Shop and get-started paths into patient intake",
      "BMI starting-point tool on the public site",
      "Partner wellness apps: Vita247, HealthScan247, and MedTracker",
    ],
    challenges: [
      "Keeping a multi-specialty care story coherent on one public start path",
      "Shipping patient-facing flows without treating marketing copy as clinical proof",
    ],
    performance: [
      "Live production site at https://docindy.ivisitdoc.com/",
      "Shipped as professional product delivery, separate from Momentra Labs personal products",
    ],
    lessons: [
      "Healthcare product sites need a hard line between UI delivery and clinical claims",
      "Multi-specialty journeys still need one obvious next step for patients",
    ],
    screenshots: [
      {
        src: "/covers/docindy.jpg",
        alt: "DocIndy homepage at docindy.ivisitdoc.com — telehealth care journeys and patient start flows",
      },
    ],
    demo: "https://docindy.ivisitdoc.com/",
  },
  {
    slug: "disney-institute",
    name: "Disney Institute Platform",
    shortName: "Disney Institute",
    tagline:
      "Enterprise Adobe Experience Manager platform used globally by Disney Institute.",
    role: "Technical Lead · enterprise AEM delivery (Myridius / Disney)",
    year: "2024–2025",
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
        src: "/covers/disney-institute.jpg",
        alt: "Disney Institute homepage at disneyinstitute.com — professional development courses and keynotes on the enterprise AEM platform",
      },
    ],
    demo: "https://www.disneyinstitute.com/",
    relatedArticles: ["aem-reusable-components"],
    relatedExperience: ["myridius"],
  },
  {
    slug: "national-geographic",
    name: "National Geographic",
    shortName: "National Geographic",
    tagline:
      "Global digital publishing platform for science, exploration, and storytelling.",
    role: "Technical Lead · enterprise web delivery (Myridius)",
    year: "2024–2025",
    featured: true,
    kind: "selected",
    overview:
      "National Geographic is one of the world's most recognized science, exploration, and storytelling brands. The digital platform at nationalgeographic.com delivers journalism, photography, and video to a global audience.",
    problem:
      "A flagship publishing site has to move stories, photography, and video at global scale without fragmenting the reader experience or slowing editorial teams.",
    solution:
      "Contributed to enterprise web delivery on a high-visibility National Geographic program through Myridius. Collaborated with design, QA, and delivery on the public National Geographic experience, with attention to reusable front-end patterns and production-quality publishing workflows.",
    architecture: [
      "Public web experience at nationalgeographic.com",
      "Story, photography, and video surfaces for a global audience",
      "Reusable front-end patterns shared across publishing pages",
      "Structured delivery with design, QA, and multi-team coordination",
    ],
    techStack: ["React", "Node.js", "JavaScript"],
    features: [
      "Homepage and story surfaces for a global readership",
      "Photography-forward layouts that keep editorial hierarchy clear",
      "Reusable UI patterns for publishing teams",
      "Cross-functional delivery with design and QA",
    ],
    challenges: [
      "Shipping on a high-visibility brand without breaking reader trust",
      "Keeping component patterns consistent across a large publishing surface",
      "Working inside structured client frameworks without blocking progress",
    ],
    performance: [
      "Supported a flagship National Geographic publishing experience used worldwide",
      "Improved maintainability of shared front-end patterns on a large content site",
    ],
    lessons: [
      "Editorial platforms succeed when engineering respects story hierarchy",
      "Reusable UI only sticks when teams agree on naming and contracts",
      "High-visibility clients reward clarity in documentation and demos",
    ],
    screenshots: [
      {
        src: "/covers/national-geographic.jpg",
        alt: "National Geographic homepage at nationalgeographic.com — science, exploration, and storytelling platform",
      },
    ],
    demo: "https://www.nationalgeographic.com/",
    relatedArticles: ["ai-augmented-engineering"],
    relatedExperience: ["myridius"],
  },
  {
    slug: "disney-experiences",
    name: "Disney Experiences",
    shortName: "Disney Experiences",
    tagline:
      "Global parks, resorts, cruise, and consumer products platform for Disney Experiences.",
    role: "Technical Lead · enterprise web delivery (Myridius / Disney)",
    year: "2024–2025",
    featured: true,
    kind: "selected",
    overview:
      "Disney Experiences brings Disney stories to life through theme parks, resorts, cruise ships, vacation experiences, and consumer products worldwide. The public platform at disneyexperiences.com presents that portfolio to guests, press, and partners.",
    problem:
      "A flagship experiences brand has to present parks, cruise, products, and news in one coherent public site without fragmenting the story across teams and properties.",
    solution:
      "Contributed to enterprise web delivery on a high-visibility Disney program through Myridius. Collaborated with design, QA, and delivery on the public Disney Experiences experience, with attention to reusable front-end patterns and production-quality publishing workflows.",
    architecture: [
      "Public web experience at disneyexperiences.com",
      "Parks, cruise, consumer products, and signature experience surfaces",
      "Reusable front-end patterns shared across brand pages",
      "Structured delivery with design, QA, and multi-team coordination",
    ],
    techStack: ["React", "Node.js", "JavaScript"],
    features: [
      "Homepage and portfolio surfaces for a global guest audience",
      "Parks, cruise, products, and news in one brand hierarchy",
      "Reusable UI patterns for enterprise publishing teams",
      "Cross-functional delivery with design and QA",
    ],
    challenges: [
      "Shipping on a high-visibility brand without breaking guest trust",
      "Keeping component patterns consistent across a large brand surface",
      "Working inside structured client frameworks without blocking progress",
    ],
    performance: [
      "Supported a flagship Disney Experiences public site used worldwide",
      "Improved maintainability of shared front-end patterns on a large brand site",
    ],
    lessons: [
      "Experience brands succeed when engineering respects story hierarchy",
      "Reusable UI only sticks when teams agree on naming and contracts",
      "High-visibility clients reward clarity in documentation and demos",
    ],
    screenshots: [
      {
        src: "/covers/disney-experiences.jpg",
        alt: "Disney Experiences homepage at disneyexperiences.com — parks, cruise, and consumer products platform",
      },
    ],
    demo: "https://disneyexperiences.com/",
    relatedArticles: ["aem-reusable-components"],
    relatedExperience: ["myridius"],
  },
  {
    slug: "disney-crew-apis",
    name: "Disney Crew Management APIs",
    shortName: "Disney Crew APIs",
    tagline:
      "Optimized v2 APIs for internal crew management with better throughput and maintainability.",
    role: "Technical Lead · API modernization (Myridius / Disney)",
    year: "2024–2025",
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
    relatedExperience: ["myridius"],
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
      "Android APK available to download from this site",
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
    apk: "/apps/gloves-up/gloves-up.apk",
    privacyPolicy: "https://albeltran.com/apps/gloves-up/privacy/",
  },
  {
    slug: "rentarah",
    name: "RentaraH",
    shortName: "RentaraH",
    tagline:
      "Philippines car and motorcycle rental marketplace — search, book, and host in PHP.",
    role: "Solo founder · product & engineering (Momentra Labs)",
    year: "2026",
    featured: false,
    kind: "lab",
    labTags: ["Web", "Products"],
    overview:
      "RentaraH is a peer-to-peer vehicle rental marketplace Al Andrew Paul Beltran (Al Beltran) designed and developed as founder of Momentra Labs. Renters search cars and two-wheelers by area and dates, compare PHP daily rates, and book verified hosts. Hosts can list a vehicle and earn. The public customer app is at rentahub2026.github.io.",
    problem:
      "Trip rental in the Philippines often means opaque rates, mixed listing tools, and no single place to compare cars, motorcycles, scooters, and big bikes with a clear host flow.",
    solution:
      "Shipped a React + TypeScript customer marketplace with browse, map, host listing, and booking flows. Backend and admin live in sibling repos; the public web app is the Momentra Labs customer surface.",
    architecture: [
      "Customer web SPA (React, Vite, TypeScript) at rentahub2026.github.io",
      "Express + Prisma API in a sibling rentarah-api service",
      "Operations console in a sibling rentarah-admin app",
      "End-to-end founder ownership of product and engineering",
    ],
    techStack: ["React", "TypeScript", "Vite", "Node.js"],
    features: [
      "Search cars, motorcycles, scooters, and big bikes by city and dates",
      "Clear PHP daily rates and host booking flow",
      "Map explore and become-a-host listing path",
      "Public demo at rentahub2026.github.io",
    ],
    challenges: [
      "Keeping a Pages-hosted customer app separate from API and admin",
      "Designing a Philippines-first rental flow without a generic listing clone",
    ],
    performance: [
      "Public customer marketplace live at https://rentahub2026.github.io/",
      "Shipped as a founder-owned Momentra Labs product, not a client case study",
    ],
    lessons: [
      "Marketplace products need a public URL so people can try the actual flow",
      "Splitting web, API, and admin keeps a GitHub Pages demo honest about what it hosts",
    ],
    screenshots: [
      {
        src: "/covers/rentarah.jpg",
        alt: "RentaraH car rental marketplace homepage at rentahub2026.github.io",
      },
    ],
    demo: "https://rentahub2026.github.io/",
    repository: "https://github.com/rentahub2026/rentahub2026.github.io",
  },
  {
    slug: "lumina",
    name: "Lumina",
    shortName: "Lumina",
    tagline:
      "Daily motivation dashboard with a Gemini coach and optional spoken voice.",
    role: "Solo founder · product & engineering (Momentra Labs)",
    year: "2026",
    featured: false,
    kind: "lab",
    labTags: ["Web", "Products"],
    overview:
      "Lumina is a personal daily motivation dashboard Al Andrew Paul Beltran (Al Beltran) designed and developed as founder of Momentra Labs. It opens with a quiet check-in — warm, not clinical — then a Gemini-backed coach and optional spoken voice. API keys stay on the server. The public app is at lumina-momentra-labs.vercel.app.",
    problem:
      "Most AI chat UIs dump you into a blank prompt. Lumina needed a calmer first moment, on-device intro memory, and a coach API that never ships secrets in the browser bundle.",
    solution:
      "Shipped a React + Vite + Tailwind dashboard with Framer Motion, a Vercel serverless POST /api/coach (Gemini generateContent), and optional POST /api/lumina-tts (ElevenLabs) with Web Speech fallback. Preferred name lives in localStorage; copy is grounding, not therapy.",
    architecture: [
      "React + Vite SPA with Tailwind CSS and Framer Motion",
      "Vercel serverless /api/coach (Gemini) and /api/lumina-tts (ElevenLabs)",
      "API keys stay in server env — never VITE_-prefixed into the client bundle",
      "Optional Open-Meteo weather widgets; intro handshake in localStorage",
    ],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    features: [
      "Soft first-visit handshake, then a daily motivation dashboard",
      "Gemini coach via POST /api/coach with keys server-side only",
      "Optional Lumina Voice (ElevenLabs) with Web Speech fallback",
      "Public demo at lumina-momentra-labs.vercel.app",
    ],
    challenges: [
      "Keeping Gemini and ElevenLabs keys off the client while deploying a Vite SPA on Vercel",
      "Writing check-in copy that stays warm without sounding like therapy",
    ],
    performance: [
      "Public app live at https://lumina-momentra-labs.vercel.app/",
      "Shipped as a founder-owned Momentra Labs product, not a client case study",
    ],
    lessons: [
      "SPA + serverless /api routes only work if rewrites keep /api/* off the index.html fallback",
      "Voice and coach features need a privacy-honest story: keys server-side, intro data local",
    ],
    screenshots: [
      {
        src: "/covers/lumina.jpg",
        alt: "Lumina daily message cover — glass card with today's note from Lumina",
      },
    ],
    demo: "https://lumina-momentra-labs.vercel.app/",
    repository: "https://github.com/codemoon2019/lumina",
    relatedArticles: ["ai-augmented-engineering"],
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
      "PocketPOS is a personal point-of-sale product Al Andrew Paul Beltran (Al Beltran) developed as founder of Momentra Labs. It is one of the independent products he publishes on this portfolio: RentaraH, Lumina, Gloves Up, PocketPOS, and QuickCart.",
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
      "QuickCart is a personal commerce cart product Al Andrew Paul Beltran (Al Beltran) developed as founder of Momentra Labs. Together with RentaraH, Lumina, Gloves Up, and PocketPOS, it is part of his independent product work.",
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

const FEATURED_ORDER = [
  "national-geographic",
  "disney-experiences",
  "disney-institute",
  "docindy",
];

const LAB_ORDER = ["rentarah", "lumina", "gloves-up", "pocketpos", "quickcart"];

function sortBySlugOrder<T extends { slug: string }>(items: T[], order: string[]) {
  return [...items].sort((a, b) => {
    const ai = order.indexOf(a.slug);
    const bi = order.indexOf(b.slug);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

export function getFeaturedProjects() {
  return sortBySlugOrder(
    projects.filter((p) => p.featured && p.kind !== "lab"),
    FEATURED_ORDER,
  );
}

export function getSelectedProjects() {
  const selected = projects.filter((p) => p.kind === "selected");
  const featured = FEATURED_ORDER
    .map((slug) => selected.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));
  const rest = selected.filter((p) => !FEATURED_ORDER.includes(p.slug));
  return [...featured, ...rest];
}

export function getLabProjects() {
  return sortBySlugOrder(
    projects.filter((p) => p.kind === "lab"),
    LAB_ORDER,
  );
}
