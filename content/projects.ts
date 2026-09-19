export type ProjectKind = "selected" | "lab";

export type ScreenshotViewport = "desktop" | "tablet" | "phone";

export type ProjectScreenshot = {
  src: string;
  alt: string;
  viewport?: ScreenshotViewport;
  fit?: "cover" | "contain" | "fill";
};

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
  screenshots: ProjectScreenshot[];
  repository?: string;
  demo?: string;
  /** Direct Android APK download path or URL. */
  apk?: string;
  /** Public privacy policy URL (e.g. for store-listed apps). */
  privacyPolicy?: string;
  relatedArticles?: string[];
  relatedExperience?: string[];
  /** Defaults to live when `demo` is set. */
  status?: "live" | "in-progress";
  story?: {
    constraints?: string;
    hardPart?: string;
    tradeoff?: string;
    whatBroke?: string;
    whatChanged?: string;
    differently?: string;
  };
  diagram?: {
    id: string;
    label: string;
    purpose: string;
    tradeoff: string;
    scale: string;
  }[];
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
        src: "/projects/doc-indy-desktop.jpg",
        alt: "DocIndy Mental Health care journey on desktop — provider talk path and cookie consent",
        viewport: "desktop",
      },
      {
        src: "/projects/doc-indy-tablet.jpg",
        alt: "DocIndy Skin Care journey on tablet — shop path and cookie consent",
        viewport: "tablet",
      },
      {
        src: "/projects/doc-indy-mobile.jpg",
        alt: "DocIndy Hair Regrowth journey on phone — talk with a provider and cookie consent",
        viewport: "phone",
      },
    ],
    demo: "https://docindy.ivisitdoc.com/",
    story: {
      constraints:
        "A multi-specialty care brand still needs one obvious next step. Clinical claims stay on the product — not in this case study.",
      hardPart:
        "Keeping weight-loss, adjacent specialties, and intake on one public start path without fragmenting the journey.",
      tradeoff:
        "A single Vite SPA is faster to ship than a suite of microsites. It also concentrates every specialty's copy in one release.",
      whatBroke:
        "Nothing I can publish as a client incident. The hard part was editorial, not a named outage.",
      whatChanged:
        "The live site is the record: care journeys, shop, BMI start, partner apps.",
      differently:
        "I would keep the same hard line between UI delivery and clinical proof, and I would instrument the get-started path before adding another specialty.",
    },
    diagram: [
      { id: "client", label: "Patient", purpose: "Arrives from search or a partner app.", tradeoff: "One entry, many specialties.", scale: "CDN and static assets do the easy work." },
      { id: "web", label: "Vite SPA", purpose: "Care discovery, shop, BMI, login.", tradeoff: "Coupled releases.", scale: "Split routes if a specialty needs its own cadence." },
      { id: "intake", label: "Intake", purpose: "Get-started and checkout leave the brochure.", tradeoff: "Handoff has to be obvious.", scale: "This is the product, not the marketing page." },
    ],
  },
  {
    slug: "enz-consultancy",
    name: "ENZ Education Consultancy",
    shortName: "ENZ",
    tagline:
      "Study-abroad consultancy site at enzconsultancy.ca — destinations, services, and a book-a-call path.",
    role: "Software Engineer · professional product delivery",
    year: "2024–2026",
    featured: true,
    kind: "selected",
    overview:
      "ENZ Education Consultancy Services is a public study-abroad site at enzconsultancy.ca. The homepage presents destination countries, Study / Work / Visit services, and conversion paths to book a call or take a free assessment. I contributed professional product delivery on this client-facing web product.",
    problem:
      "A Manila-based education consultancy has to explain study, work, and visit options across several countries without losing the next step: get assessed or talk to a consultant.",
    solution:
      "Shipped the public consultancy site: destination and service information architecture, country surfaces, and book-a-call / free-assessment conversion. Marketing claims on the site are the client's — not personal performance metrics.",
    architecture: [
      "Public marketing site at enzconsultancy.ca",
      "Study, Work, and Visit service paths by destination country",
      "Book-a-call and free-assessment conversion on the homepage",
      "LeadConnector-hosted experience for the live funnel",
    ],
    techStack: ["LeadConnector"],
    features: [
      "Homepage gateway copy and Book a Call path",
      "Country surfaces for Spain, Canada, Australia, Germany, New Zealand, the United States, Ireland, and the United Kingdom",
      "Study, Work, and Visit service navigation",
      "About, team, FAQs, credentials, promos, and referral program",
      "Free eligibility assessment call to action",
    ],
    challenges: [
      "Keeping a multi-country service menu coherent on one start path",
      "Shipping a client marketing site without treating awards copy as personal proof",
    ],
    performance: [
      "Live production site at https://enzconsultancy.ca/",
      "Shipped as professional product delivery, separate from Momentra Labs personal products",
    ],
    lessons: [
      "Consultancy sites succeed when destination choice and the next conversation are obvious",
      "Client marketing claims stay on the client site — the case study should describe the product, not the awards",
    ],
    screenshots: [
      {
        src: "/projects/enz-desktop.jpg",
        alt: "ENZ Education Consultancy homepage on desktop — Expanding One's Horizon hero and Book a Call",
        viewport: "desktop",
      },
      {
        src: "/projects/enz-tablet.jpg",
        alt: "ENZ Education Consultancy homepage on tablet — gateway hero and Why Choose ENZ",
        viewport: "tablet",
      },
      {
        src: "/projects/enz-mobile.jpg",
        alt: "ENZ Education Consultancy on phone — Why Choose ENZ memberships, awards, and expertise",
        viewport: "phone",
      },
    ],
    demo: "https://enzconsultancy.ca/",
    story: {
      constraints:
        "A consultancy site has to name destinations and still leave one obvious next conversation. Awards copy stays on the client site.",
      hardPart:
        "Study, work, and visit across several countries without turning the homepage into a directory.",
      tradeoff:
        "A LeadConnector-hosted funnel ships the conversion path faster than a custom React rebuild. It also means the live stack is the host's, not a hand-rolled SPA.",
      whatBroke:
        "Nothing I can publish as a client incident. The risk is treating platform chrome as original engineering.",
      whatChanged:
        "The live site is the record: destinations, services, book-a-call, free assessment.",
      differently:
        "I would keep the hosted funnel while the conversion path is the product, and I would not rewrite it into a custom stack to make a case study prettier.",
    },
    diagram: [
      { id: "visitor", label: "Visitor", purpose: "Arrives from search or a referral.", tradeoff: "One start path, many countries.", scale: "Marketing traffic, not an API farm." },
      { id: "site", label: "Public site", purpose: "Destinations, services, FAQs, team.", tradeoff: "Hosted on LeadConnector.", scale: "The host owns runtime and forms." },
      { id: "call", label: "Book / assess", purpose: "The next conversation.", tradeoff: "Conversion lives in the funnel, not a custom checkout.", scale: "Consultants, not servers, are the capacity." },
    ],
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
        src: "/projects/disney-institute-desktop.jpg",
        alt: "Disney Institute About page on desktop — team hero and institute introduction",
        viewport: "desktop",
      },
      {
        src: "/projects/disney-institute-tablet.jpg",
        alt: "Disney Institute About page on tablet — team hero and classroom photo",
        viewport: "tablet",
      },
      {
        src: "/projects/disney-institute-mobile.jpg",
        alt: "Disney Institute About page on phone — We Walk the Talk and classroom photo",
        viewport: "phone",
      },
    ],
    demo: "https://www.disneyinstitute.com/",
    relatedArticles: ["aem-reusable-components"],
    relatedExperience: ["myridius"],
    story: {
      constraints:
        "Enterprise authoring, multiple delivery teams, and a brand that cannot look experimental. Diagrams here are generalized — not an internal Disney topology.",
      hardPart:
        "Reusable components only help if authors recognize them and teams share names.",
      tradeoff:
        "A shared AEM library slows the first ticket and speeds the twentieth. Local one-offs feel faster until they fork.",
      whatBroke:
        "Nothing I can publish as a client incident. The recurring cost was duplicate authoring, not a named outage.",
      whatChanged:
        "Shared component patterns and clearer authoring paths on the public Institute site.",
      differently:
        "I would still start with the authoring workflow, then the component API — not the other way around.",
    },
    diagram: [
      { id: "author", label: "Authors", purpose: "Write courses and keynotes in the CMS.", tradeoff: "Governance vs speed.", scale: "Many authors, one library." },
      { id: "aem", label: "AEM", purpose: "Content, templates, and the shared component set.", tradeoff: "Enterprise contracts.", scale: "Publish tiers — not shown in detail." },
      { id: "edge", label: "Public site", purpose: "disneyinstitute.com for a global audience.", tradeoff: "What authors can do is what the web can show.", scale: "CDN and dispatcher patterns, generalized." },
    ],
  },
  {
    slug: "personal-collection",
    name: "Personal Collection",
    shortName: "Personal Collection",
    tagline:
      "Public site for a Philippine direct-selling brand at personalcollection.com.ph — products, dealership, and Life Made Great.",
    role: "Software Engineer · professional product delivery",
    year: "Professional work",
    featured: true,
    kind: "selected",
    overview:
      "Personal Collection Direct Selling Inc. is a public brand site at personalcollection.com.ph. The homepage presents Life Made Great, product and story paths, and a become-a-dealer start: sign up or try the products first. I contributed professional product delivery on this client-facing web product.",
    problem:
      "A direct-selling brand has to show products and livelihood in one start path without losing the next step: become a dealer or try the catalog.",
    solution:
      "Shipped the public brand site: navigation for products, magalogue, demos, and Earn with PC, plus the dealer banner on the homepage. Marketing claims on the site are the client's — not personal performance metrics.",
    architecture: [
      "Public marketing site at personalcollection.com.ph",
      "About, Great Products, Magalogue, Wow Product Demos, and Earn with PC paths",
      "Become-a-dealer conversion on the homepage: sign up or try products",
      "Contact, find-a-branch, and cookie-consent surfaces on the live site",
    ],
    techStack: [],
    features: [
      "Life Made Great homepage with Our Story, Great Products, Earn with PC, and On Environment",
      "Become a PC Dealer banner — sign up now or try products first",
      "Great Products, Magalogue, and Wow Product Demos",
      "Earn with PC and contact / find-a-branch paths",
    ],
    challenges: [
      "Keeping product, story, and dealership on one start path",
      "Shipping a client marketing site without treating brand copy as personal proof",
    ],
    performance: [
      "Live production site at https://www.personalcollection.com.ph/",
      "Shipped as professional product delivery, separate from Momentra Labs personal products",
    ],
    lessons: [
      "Direct-selling sites succeed when the catalog and the dealer start are both obvious",
      "Client marketing claims stay on the client site — the case study should describe the product, not the slogan",
    ],
    screenshots: [
      {
        src: "/projects/personalcollection-desktop.jpg",
        alt: "Personal Collection homepage on desktop — Life Made Great hero and become-a-dealer banner",
        viewport: "desktop",
        fit: "fill",
      },
      {
        src: "/projects/personalcollection-tablet.jpg",
        alt: "Personal Collection homepage on tablet — Life Made Great, Our Story, and Great Products",
        viewport: "tablet",
      },
      {
        src: "/projects/personalcollection-mobile.jpg",
        alt: "Personal Collection homepage on phone — Life Made Great hero and dealer banner",
        viewport: "phone",
      },
    ],
    demo: "https://www.personalcollection.com.ph/",
    story: {
      constraints:
        "A brand site has to hold products, livelihood, and one obvious dealer start. Slogan copy stays on the client site.",
      hardPart:
        "Catalog, story, and dealership on one homepage without turning it into a directory.",
      tradeoff:
        "The live site is the record. I do not invent a private stack beside what the public pages show.",
      whatBroke:
        "Nothing I can publish as a client incident. The risk is treating marketing chrome as original engineering.",
      whatChanged:
        "The live site is the record: Life Made Great, products, magalogue, demos, Earn with PC.",
      differently:
        "I would still start with the dealer path and the product menu — not a custom stack to make a case study prettier.",
    },
    diagram: [
      { id: "visitor", label: "Visitor", purpose: "Arrives from search or a referral.", tradeoff: "One start path, catalog plus livelihood.", scale: "Marketing traffic, not an API farm." },
      { id: "site", label: "Public site", purpose: "Products, story, magalogue, demos.", tradeoff: "What the brand can say is what the web can show.", scale: "The live host owns runtime and forms." },
      { id: "dealer", label: "Dealer start", purpose: "Sign up or try products first.", tradeoff: "Conversion lives on the homepage banner.", scale: "Dealers, not servers, are the capacity." },
    ],
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
        src: "/projects/nat-geo-desktop.jpg",
        alt: "National Geographic latest stories on desktop — new cat species feature and story rail",
        viewport: "desktop",
      },
      {
        src: "/projects/nat-geo-tablet.jpg",
        alt: "National Geographic latest stories on tablet — new cat species feature and story grid",
        viewport: "tablet",
      },
      {
        src: "/projects/nat-geo-mobile.jpg",
        alt: "National Geographic latest stories on phone — new cat species feature and photographer story",
        viewport: "phone",
      },
    ],
    demo: "https://www.nationalgeographic.com/",
    relatedArticles: ["ai-augmented-engineering"],
    relatedExperience: ["myridius"],
    story: {
      constraints:
        "A flagship publishing brand. Story hierarchy and photography come first. This diagram is generalized — not an internal National Geographic topology.",
      hardPart:
        "Reusable front-end patterns on a site that must still feel like a magazine, not a component catalog.",
      tradeoff:
        "Shared UI keeps teams aligned. Over-abstracting a story page makes editors fight the template.",
      whatBroke:
        "Nothing I can publish as a client incident. The hard part was editorial consistency, not a named outage.",
      whatChanged:
        "The public nationalgeographic.com experience is the record.",
      differently:
        "I would keep contracts and names boring, and I would not invent a parallel design system beside the one authors already use.",
    },
    diagram: [
      { id: "desk", label: "Editorial", purpose: "Stories, photography, video.", tradeoff: "Hierarchy over chrome.", scale: "Global readership." },
      { id: "web", label: "Publishing web", purpose: "Reusable page patterns.", tradeoff: "Shared UI vs story-specific layouts.", scale: "Many templates, one reader path." },
      { id: "reader", label: "Reader", purpose: "Arrives for the story, not the stack.", tradeoff: "Performance is part of trust.", scale: "CDN and caching, generalized." },
    ],
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
        src: "/projects/disney-experience-desktop.jpg",
        alt: "Disney Experiences homepage on desktop — Bringing Disney Stories to Life with Mickey and latest news",
        viewport: "desktop",
      },
      {
        src: "/projects/disney-experience-tablet.jpg",
        alt: "Disney Experiences homepage on tablet — castle hero and latest news cards",
        viewport: "tablet",
      },
      {
        src: "/projects/disney-experience-mobile.jpg",
        alt: "Disney Experiences homepage on phone — stories hero and latest news",
        viewport: "phone",
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
        src: "/projects/glovesup/glovesup-1.jpg",
        alt: "Gloves Up splash screen — boxing glove mark and Lacing up",
        viewport: "phone",
      },
      {
        src: "/projects/glovesup/glovesup-2.jpg",
        alt: "Gloves Up welcome screen — Show up. Put in the rounds.",
        viewport: "phone",
      },
      {
        src: "/projects/glovesup/glovesup-3.jpg",
        alt: "Gloves Up home — Good morning and today's training focus",
        viewport: "phone",
      },
      {
        src: "/projects/glovesup/glovesup-4.jpg",
        alt: "Gloves Up train tools — boxing timer and drills",
        viewport: "phone",
      },
      {
        src: "/projects/glovesup/glovesup-5.jpg",
        alt: "Gloves Up stats — training volume on device",
        viewport: "phone",
      },
      {
        src: "/projects/glovesup/glovesup-6.jpg",
        alt: "Gloves Up round timer in a live session",
        viewport: "phone",
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
        src: "/covers/rentarah-desktop.png",
        alt: "RentaraH car rental marketplace on a desktop viewport at rentahub2026.github.io",
        viewport: "desktop",
      },
      {
        src: "/covers/rentarah-tablet.png",
        alt: "RentaraH marketplace on a tablet viewport — search, stats, and host actions",
        viewport: "tablet",
      },
      {
        src: "/covers/rentarah-phone.png",
        alt: "RentaraH marketplace on a phone viewport — compact search and bottom navigation",
        viewport: "phone",
      },
    ],
    demo: "https://rentahub2026.github.io/",
    repository: "https://github.com/rentahub2026/rentahub2026.github.io",
    story: {
      constraints:
        "Philippines-first rental flow. Public customer app on GitHub Pages. API and admin live elsewhere.",
      hardPart:
        "A marketplace is a shared ledger. Availability cannot be a private notebook — that lesson is also in the postmortems.",
      tradeoff:
        "Splitting web, API, and admin keeps the Pages demo honest about what it hosts. It also means three repos to keep in step.",
      whatBroke:
        "Not a published outage. The constraint that hurt was treating listing search as if it were a brochure.",
      whatChanged:
        "The public customer surface is live. Hosts and renters share one booking story.",
      differently:
        "I would keep the split. I would not sell offline-first as a default for vehicle inventory.",
    },
    diagram: [
      { id: "renter", label: "Renter / host", purpose: "Search, book, or list in PHP.", tradeoff: "One SPA for both roles.", scale: "Pages can only host the customer UI." },
      { id: "web", label: "Customer SPA", purpose: "Vite app at rentahub2026.github.io.", tradeoff: "No server secrets in this repo.", scale: "API stays in a sibling service." },
      { id: "api", label: "API", purpose: "Express + Prisma in rentarah-api.", tradeoff: "Availability is shared state.", scale: "Admin is a third app." },
    ],
  },
  {
    slug: "hiraya",
    name: "Hiraya",
    shortName: "Hiraya",
    tagline:
      "Unofficial Philippine exam trainer — Civil Service and university entrance practice. In progress.",
    role: "Solo founder · product & engineering (Momentra Labs)",
    year: "2026",
    featured: false,
    kind: "lab",
    labTags: ["Web", "Products"],
    status: "in-progress",
    overview:
      "Hiraya is an unofficial Philippine exam training platform Al Andrew Paul Beltran (Al Beltran) is building as founder of Momentra Labs. The public preview at hiraya-phi.vercel.app is practice for Civil Service and university entrance prep: lock an answer, see why a miss happened, and come back tomorrow. It is not affiliated with the Civil Service Commission or any school. The product is in progress.",
    problem:
      "Most exam apps either dump a PDF bank on the table or pretend they can predict a pass. Hiraya needed a daily lock-and-learn loop — tracks, explanations, and progress that stay honest about being unofficial practice.",
    solution:
      "Shipping a Next.js trainer on Vercel with on-device save, original practice items, CSC Professional / Subprofessional and university tracks, mock exams, ranks, and a public marketing surface. Sign-in is optional and stays on the device. Billing is not completed in the browser.",
    architecture: [
      "Next.js App Router preview at hiraya-phi.vercel.app",
      "On-device trainer save — optional local sign-in, not a cloud account",
      "Unofficial tracks mapped to published CSC announcement headings",
      "Practice, mock exams, progress, and ranks in one product",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand",
    ],
    features: [
      "Public preview at hiraya-phi.vercel.app",
      "Unofficial CSC Professional, CSC Subprofessional, and university tracks",
      "Lock-an-answer practice with a short explanation on a miss",
      "Mock exams, progress, ranks, and on-device save",
      "No official affiliation and no pass promise",
    ],
    challenges: [
      "Keeping unofficial practice clearly unofficial while still being useful",
      "Shipping a public preview before the bank, billing, and analysis are finished",
    ],
    performance: [
      "Public preview at https://hiraya-phi.vercel.app/",
      "In-progress Momentra Labs product, not a finished exam product and not a client case study",
    ],
    lessons: [
      "A trainer belongs in a portfolio when someone can open the URL and lock an answer",
      "In-progress is a status, not a reason to hide the work",
    ],
    screenshots: [
      {
        src: "/projects/hiraya-desktop.jpg",
        alt: "Hiraya trainer dashboard on a desktop viewport at hiraya-phi.vercel.app",
        viewport: "desktop",
      },
      {
        src: "/projects/hiraya-tablet.jpg",
        alt: "Hiraya trainer on a tablet viewport — journey, quests, and study companions",
        viewport: "tablet",
      },
      {
        src: "/projects/hiraya-mobile.jpg",
        alt: "Hiraya trainer on a phone viewport — compact dashboard and practice actions",
        viewport: "phone",
      },
    ],
    demo: "https://hiraya-phi.vercel.app/",
    story: {
      constraints:
        "Unofficial practice only. No CSC or university affiliation. Sign-in and progress stay on the device.",
      hardPart:
        "A public preview has to be playable without pretending the bank, billing, or analysis are finished.",
      tradeoff:
        "Shipping the lock loop first is honest. It also means the card has to say in progress.",
      whatBroke:
        "Not a published outage. The failure mode to avoid is selling unofficial practice as an official paper.",
      whatChanged:
        "The preview is live. The product is still being built.",
      differently:
        "I would still ship the loop first. I would not wait for a full bank to put a URL on the lab.",
    },
    diagram: [
      { id: "learner", label: "Learner", purpose: "Picks a track and locks an answer.", tradeoff: "One device owns the save.", scale: "No cloud account required." },
      { id: "app", label: "Hiraya", purpose: "Next.js preview on Vercel.", tradeoff: "Public URL before the bank is finished.", scale: "In progress." },
      { id: "tracks", label: "Tracks", purpose: "Unofficial CSC and university practice.", tradeoff: "Mapped to published headings, not official specs.", scale: "Original items only." },
    ],
  },
  {
    slug: "skyrealm",
    name: "Skyrealm",
    shortName: "Skyrealm",
    tagline:
      "Browser action-RPG — fly with a Guardian, bond Aetherlings, and play in the Aether.",
    role: "Solo founder · product & engineering (Momentra Labs)",
    year: "2026",
    featured: false,
    kind: "lab",
    labTags: ["Web", "Game"],
    overview:
      "Skyrealm is a browser action-RPG Al Andrew Paul Beltran (Al Beltran) designed and developed as founder of Momentra Labs. The public game at skyrealm-ruby.vercel.app is Guardians of the Aether: fly with a Guardian, bond Aetherlings, and come home with coins, eggs, and glory.",
    problem:
      "Most personal game demos never become a public URL someone can open in a browser. Skyrealm needed a playable fantasy loop — Guardians, Aetherlings, quests, and aerial combat — without an install.",
    solution:
      "Shipped a React + Vite web game on Vercel with a magazine-like marketing cover, Play Now into the session, and in-browser controls (drag / WASD, auto-fire, E special). The live demo is the product.",
    architecture: [
      "Public Vite SPA on Vercel at skyrealm-ruby.vercel.app",
      "React game and marketing surfaces in one browser bundle",
      "Play Now session with Guardian loadout, Aetherlings, and HUD",
      "End-to-end founder ownership of product and engineering",
    ],
    techStack: ["React", "Vite"],
    features: [
      "Play in the browser — no install",
      "Guardians of the Aether cover, including Aurelia, guardian of dawn",
      "Bond two Aetherlings; coins, eggs, and glory as the run rewards",
      "Drag / WASD movement, auto-fire, and E special",
      "Guardians, Treasures, World, and How to Play surfaces",
      "Public demo at skyrealm-ruby.vercel.app",
    ],
    challenges: [
      "Keeping a fantasy web game readable as a cover and immediately playable",
      "Shipping a Vercel demo that is the real product, not a trailer page",
    ],
    performance: [
      "Public web game live at https://skyrealm-ruby.vercel.app/",
      "Shipped as a founder-owned Momentra Labs product, not a client case study",
    ],
    lessons: [
      "A game belongs in a portfolio when someone can play it from a URL",
      "Cover, controls, and a first Guardian have to land in one screen",
    ],
    screenshots: [
      {
        src: "/covers/skyrealm-desktop.png",
        alt: "Skyrealm — Guardians of the Aether on a desktop viewport at skyrealm-ruby.vercel.app",
        viewport: "desktop",
      },
      {
        src: "/covers/skyrealm-tablet.png",
        alt: "Skyrealm on a tablet viewport — stacked hero and play actions",
        viewport: "tablet",
      },
      {
        src: "/covers/skyrealm-phone.png",
        alt: "Skyrealm on a phone viewport — compact menu and play actions",
        viewport: "phone",
      },
    ],
    demo: "https://skyrealm-ruby.vercel.app/",
    story: {
      constraints:
        "A personal game has to be playable from a URL. No store listing. No install.",
      hardPart:
        "Cover, first Guardian, and controls have to land in one browser session.",
      tradeoff:
        "One Vite bundle is honest and shippable. It also means the marketing cover and the game loop share a release.",
      whatBroke:
        "Not a published outage. The failure mode to avoid is a trailer page that never plays.",
      whatChanged:
        "The live demo is the product.",
      differently:
        "I would still ship the loop first. I would split the cover route only if the bundle started to hurt first paint.",
    },
    diagram: [
      { id: "player", label: "Player", purpose: "Opens a URL. No install.", tradeoff: "Browser constraints are the console.", scale: "One session, one machine." },
      { id: "spa", label: "Vite SPA", purpose: "Cover plus Play Now.", tradeoff: "Shared release.", scale: "Vercel static host." },
      { id: "loop", label: "Game loop", purpose: "Guardian, Aetherlings, HUD.", tradeoff: "Feel over a backend.", scale: "Client-side. No live telemetry here." },
    ],
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
        src: "/covers/lumina-desktop.png",
        alt: "Lumina daily message on a desktop viewport — glass card with today's note",
        viewport: "desktop",
      },
      {
        src: "/covers/lumina-tablet.png",
        alt: "Lumina daily message on a tablet viewport — centered glass card",
        viewport: "tablet",
      },
      {
        src: "/covers/lumina-phone.png",
        alt: "Lumina daily message on a phone viewport — full-width glass card",
        viewport: "phone",
      },
    ],
    demo: "https://lumina-momentra-labs.vercel.app/",
    repository: "https://github.com/codemoon2019/lumina",
    relatedArticles: ["ai-augmented-engineering"],
    story: {
      constraints:
        "Gemini and ElevenLabs keys must never ship in the Vite bundle. Copy stays grounding, not therapy.",
      hardPart:
        "SPA + serverless /api only works if rewrites keep /api/* off the index.html fallback.",
      tradeoff:
        "A quiet first visit costs an extra handshake. A blank prompt would have shipped faster and felt worse.",
      whatBroke:
        "The failure mode to avoid was leaking keys via VITE_ prefixes. That is a design constraint, not a war story.",
      whatChanged:
        "Coach and optional voice are live. Preferred name stays in localStorage.",
      differently:
        "Same split: keys on the server, intro data local. I would add an explicit privacy line on the first screen sooner.",
    },
    diagram: [
      { id: "person", label: "Visitor", purpose: "Check-in, then the daily board.", tradeoff: "Name lives on-device.", scale: "No account." },
      { id: "spa", label: "Lumina SPA", purpose: "React + Vite + motion.", tradeoff: "Static host plus functions.", scale: "Vercel rewrite for /api." },
      { id: "coach", label: "/api/coach", purpose: "Gemini stays server-side.", tradeoff: "You pay for a function on every ask.", scale: "Do not put the key in the client." },
    ],
  },
  {
    slug: "pocketpos",
    name: "PocketPOS",
    shortName: "PocketPOS",
    tagline:
      "Offline point of sale on the phone — open the register and start selling.",
    role: "Solo founder · product & engineering (Momentra Labs)",
    year: "Personal product",
    featured: false,
    kind: "lab",
    labTags: ["Mobile", "Products"],
    overview:
      "PocketPOS is a personal point-of-sale product Al Andrew Paul Beltran (Al Beltran) developed as founder of Momentra Labs. It keeps the register, catalog, and sale history on the phone — open a float and start selling offline. Together with RentaraH, Hiraya, Skyrealm, Lumina, Gloves Up, and Cartify, it is part of his independent product work.",
    problem:
      "Small operators often need a focused POS surface rather than a heavyweight retail suite.",
    solution:
      "Developed PocketPOS as an independent Momentra Labs product, with Al owning product definition and engineering from concept through implementation. Open the register, add a product, and keep the shift on the device.",
    architecture: [
      "Independent personal product under Momentra Labs",
      "End-to-end founder ownership of product and engineering",
    ],
    techStack: [],
    features: [
      "Today-at-a-glance home with register and weekly totals",
      "Open the register with a cash float — works offline",
      "Product catalog with name, SKU, price, and stock",
      "Sale history with receipts on the device",
      "Business, language, and currency settings",
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
        src: "/projects/pocketpos/pocketpos-1.jpg",
        alt: "PocketPOS home — today at a glance, register, and start selling",
        viewport: "phone",
      },
      {
        src: "/projects/pocketpos/pocketpos-2.jpg",
        alt: "PocketPOS add product — photo, name, SKU, category, price, and stock",
        viewport: "phone",
      },
      {
        src: "/projects/pocketpos/pocketpos-3.jpg",
        alt: "PocketPOS open register — opening cash float and open & sell",
        viewport: "phone",
      },
      {
        src: "/projects/pocketpos/pocketpos-4.jpg",
        alt: "PocketPOS settings — business, language, and currency",
        viewport: "phone",
      },
      {
        src: "/projects/pocketpos/pocketpos-5.jpg",
        alt: "PocketPOS history — no sales yet",
        viewport: "phone",
      },
      {
        src: "/projects/pocketpos/pocketpos-6.jpg",
        alt: "PocketPOS products — empty catalog and add product",
        viewport: "phone",
      },
    ],
  },
  {
    slug: "cartify",
    name: "Cartify",
    shortName: "Cartify",
    tagline:
      "Offline grocery cart — know your total before checkout.",
    role: "Solo founder · product & engineering (Momentra Labs)",
    year: "Personal product",
    featured: false,
    kind: "lab",
    labTags: ["Mobile", "Products"],
    overview:
      "Cartify is a personal grocery cart product Al Andrew Paul Beltran (Al Beltran) developed as founder of Momentra Labs. It keeps a running total, a shopping list, and a budget on the phone — fast, simple, and offline. Together with RentaraH, Hiraya, Skyrealm, Lumina, Gloves Up, and PocketPOS, it is part of his independent product work.",
    problem:
      "Grocery totals usually stay hidden until the register. Cart tools are often bolted onto a storefront instead of living on the phone you take to the aisle.",
    solution:
      "Developed Cartify as an independent Momentra Labs product, with Al owning product definition and engineering from concept through implementation. Scan a price, add a line, and keep the trip under budget without a cloud account.",
    architecture: [
      "Independent personal product under Momentra Labs",
      "End-to-end founder ownership of product and engineering",
    ],
    techStack: [],
    features: [
      "Running grocery total and budget on the phone",
      "Scan a price tag or type an item in",
      "Shopping list before you shop",
      "History of past trips",
      "Currency, language, and appearance settings",
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
        src: "/projects/cartify/cartify-1.jpg",
        alt: "Cartify splash — Getting your cart ready",
        viewport: "phone",
      },
      {
        src: "/projects/cartify/cartify-2.jpg",
        alt: "Cartify welcome — Meet Cartify, know your grocery total before checkout",
        viewport: "phone",
      },
      {
        src: "/projects/cartify/cartify-3.jpg",
        alt: "Cartify home — budget, scan price, and add item",
        viewport: "phone",
      },
      {
        src: "/projects/cartify/cartify-4.jpg",
        alt: "Cartify shopping list with priced items",
        viewport: "phone",
      },
      {
        src: "/projects/cartify/cartify-5.jpg",
        alt: "Cartify scan price camera",
        viewport: "phone",
      },
      {
        src: "/projects/cartify/cartify-6.jpg",
        alt: "Cartify settings — budget, currency, language, and appearance",
        viewport: "phone",
      },
    ],
  },
];

const PROJECT_SLUG_ALIASES: Record<string, string> = {
  quickcart: "cartify",
};

export function getProject(slug: string) {
  const resolved = PROJECT_SLUG_ALIASES[slug] ?? slug;
  return projects.find((p) => p.slug === resolved);
}

export function screenshotForViewport(
  project: Project,
  viewport: ScreenshotViewport,
): ProjectScreenshot | undefined {
  return (
    project.screenshots.find((shot) => shot.viewport === viewport) ??
    project.screenshots[0]
  );
}

export function implementationShots(project: Project): ProjectScreenshot[] {
  const plates = project.screenshots.filter(
    (shot) => shot.viewport !== "tablet" && shot.viewport !== "phone",
  );
  if (plates.length > 0) return plates;
  return project.screenshots[0]
    ? [project.screenshots[0]]
    : [{ src: "", alt: `${project.name} cover` }];
}

const MOBILE_APP_SLUGS = new Set(["gloves-up", "pocketpos", "cartify"]);

export function isMobileApp(project: Project) {
  return MOBILE_APP_SLUGS.has(project.slug);
}

export function labSurfaceLabel(project: Project) {
  return isMobileApp(project) ? "Mobile app" : "Web app";
}

const FEATURED_ORDER = [
  "national-geographic",
  "disney-experiences",
  "disney-institute",
  "personal-collection",
  "docindy",
  "enz-consultancy",
];

const LAB_ORDER = [
  "rentarah",
  "hiraya",
  "skyrealm",
  "lumina",
  "gloves-up",
  "pocketpos",
  "cartify",
];

export function projectStatusLabel(
  project: Project,
): "In progress" | "Live" | null {
  if (project.status === "in-progress") return "In progress";
  if (project.demo) return "Live";
  return null;
}

export function projectDemoLabel(project: Project) {
  if (project.status === "in-progress") return "Open preview";
  return project.kind === "lab" ? "Open live site" : "Live demo";
}

function sortBySlugOrder<T extends { slug: string }>(items: T[], order: string[]) {
  return [...items].sort((a, b) => {
    const ai = order.indexOf(a.slug);
    const bi = order.indexOf(b.slug);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

let featuredProjects: Project[] | undefined;
let selectedProjects: Project[] | undefined;
let labProjects: Project[] | undefined;
const folioBySlug = new Map<string, string>();

export function getFeaturedProjects() {
  featuredProjects ??= sortBySlugOrder(
    projects.filter((p) => p.featured && p.kind !== "lab"),
    FEATURED_ORDER,
  );
  return featuredProjects;
}

export function getSelectedProjects() {
  if (!selectedProjects) {
    const selected = projects.filter((p) => p.kind === "selected");
    const featured = FEATURED_ORDER
      .map((slug) => selected.find((p) => p.slug === slug))
      .filter((p): p is Project => Boolean(p));
    const rest = selected.filter((p) => !FEATURED_ORDER.includes(p.slug));
    selectedProjects = [...featured, ...rest];
  }
  return selectedProjects;
}

export function getLabProjects() {
  labProjects ??= sortBySlugOrder(
    projects.filter((p) => p.kind === "lab"),
    LAB_ORDER,
  );
  return labProjects;
}

export function projectFolio(project: Project) {
  const cached = folioBySlug.get(project.slug);
  if (cached) return cached;
  const list =
    project.kind === "lab" ? getLabProjects() : getSelectedProjects();
  const index = list.findIndex((item) => item.slug === project.slug);
  const folio = String((index < 0 ? 0 : index) + 1).padStart(2, "0");
  folioBySlug.set(project.slug, folio);
  return folio;
}
