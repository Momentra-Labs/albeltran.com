import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

export const person = {
  name: "Al Andrew Paul Beltran",
  shortName: "Al Beltran",
  additionalName: "Teodosio",
  legalName: "Al Andrew Paul Teodosio Beltran",
  brand: "Code by Pawpu",
  occupation: "Full-Stack Software Engineer",
  jobTitle: "Senior Software Engineer",
  secondaryTitle: "Full-Stack Developer",
  labs: "Momentra Labs",
  founderTitle: "Founder, Momentra Labs",
  personalProducts: ["RentaraH", "Gloves Up", "PocketPOS", "QuickCart"],
  aliases: [
    "Al Beltran",
    "Al Andrew Paul Beltran",
    "Al Andrew Paul Teodosio Beltran",
    "Code by Pawpu",
    "pawpu",
  ],
  headline:
    "Full-stack software engineer in Manila — Senior Software Engineer, founder of Momentra Labs, and solo developer of RentaraH, Gloves Up, PocketPOS, and QuickCart.",
  location: "Manila, Metro Manila, Philippines",
  email: "al.andrew.p.beltran@gmail.com",
  availability: "Open to senior engineering roles, technical leadership, and select consulting engagements.",
  yearsExperience: 6,
  summary:
    "Al Andrew Paul Beltran (Al Beltran; also Al Andrew Paul Teodosio Beltran) is a full-stack software engineer based in Manila, Philippines. He is a Senior Software Engineer, Full-Stack Developer, and founder of Momentra Labs. He currently works as a Software Engineer at Google via High Spring. He independently developed personal products RentaraH, Gloves Up, PocketPOS, and QuickCart under Momentra Labs. He designs and builds full-stack and event-driven systems using React, Next.js, TypeScript, JavaScript, Node.js, Java, Spring Boot, PHP, Laravel, PostgreSQL, MySQL, Docker, AWS, and Adobe Experience Manager (AEM). Prior experience includes Maya (fintech), enterprise delivery for Disney (Accenture), Asurion, technical leadership at Myridius, and full-stack consulting. Official portfolio: https://albeltran.com",
  currentCompany: "Google",
  currentEmployerNote: "via High Spring",
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "PHP",
    "Laravel",
    "Java",
    "Spring Boot",
    "PostgreSQL",
    "MySQL",
    "Docker",
    "AWS",
    "Serverless computing",
    "Event-driven architecture",
    "Adobe Experience Manager",
    "System design",
    "REST APIs",
    "Full-stack development",
    "Technical leadership",
    "RentaraH",
    "Gloves Up",
    "PocketPOS",
    "QuickCart",
    "Momentra Labs",
  ],
  sameAs: [
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.github,
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.codewars,
  ],
  url: SITE_URL,
  image: `${SITE_URL}/assets/professional-photo.png`,
  photo: "/assets/professional-photo.png",
} as const;

export const stats = [
  { label: "Years Experience", value: "6+" },
  { label: "Enterprise Projects", value: "5+" },
  { label: "Tech Debts Resolved", value: "50+" },
  { label: "Perf. Improvement", value: "15s→2s" },
] as const;

export const technologies = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "PHP",
  "Laravel",
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "AWS Lambda",
  "AEM",
] as const;

export const techGroups = [
  {
    title: "Programming",
    items: ["TypeScript", "Node.js", "Java", "PHP", "JavaScript"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "AEM", "HTML/CSS", "SCSS"],
  },
  {
    title: "Backend",
    items: ["Express", "Spring Boot", "Laravel", "REST APIs"],
  },
  {
    title: "Cloud (AWS)",
    items: ["Lambda", "S3", "SQS / SNS", "API Gateway", "EC2", "Step Functions"],
  },
  {
    title: "Data & Platforms",
    items: ["PostgreSQL", "MySQL", "SQL", "Docker", "Elasticsearch"],
  },
  {
    title: "AI Tools",
    items: ["Claude", "Cursor", "Prompt Engineering", "AI Debugging"],
  },
] as const;
