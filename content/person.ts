import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

export function oxfordJoin(items: readonly string[]) {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

const PERSONAL_PRODUCTS = [
  "RentaraH",
  "Lumina",
  "Gloves Up",
  "PocketPOS",
  "QuickCart",
] as const;

const PERSONAL_PRODUCTS_LIST = oxfordJoin(PERSONAL_PRODUCTS);

export const person = {
  name: "Al Andrew Paul Beltran",
  shortName: "Al Beltran",
  additionalName: "Teodosio",
  legalName: "Al Andrew Paul Teodosio Beltran",
  brand: "Code by Pawpu",
  occupation: "Full-Stack Software Engineer",
  jobTitle: "Software Engineering Lead",
  secondaryTitle: "Full-Stack Developer",
  labs: "Momentra Labs",
  founderTitle: "Founder, Momentra Labs",
  personalProducts: PERSONAL_PRODUCTS,
  aliases: [
    "Al Beltran",
    "Al Andrew Paul Beltran",
    "Al Andrew Paul Teodosio Beltran",
    "Code by Pawpu",
    "pawpu",
  ],
  headline:
    "Software Engineering Lead at Anglian Dental in the United Kingdom. Founder of Momentra Labs. Previously Software Engineer at Google via High Spring. National Geographic and Disney enterprise programs via Myridius. Based in Manila.",
  location: "Manila, Metro Manila, Philippines",
  email: "al.andrew.p.beltran@gmail.com",
  availability: "Open to professional conversations about software leadership and engineering systems.",
  yearsExperience: 6,
  summary:
    `Al Andrew Paul Beltran (Al Beltran; also Al Andrew Paul Teodosio Beltran) is a full-stack software engineer based in Manila, Philippines. He is a Software Engineering Lead, Full-Stack Developer, and founder of Momentra Labs. He currently works as Software Engineering Lead at Anglian Dental in the United Kingdom. Previously he was a Software Engineer at Google via High Spring. Through Myridius he contributed to National Geographic, Disney Experiences, Disney Institute, and Disney Crew Management platforms. He independently developed personal products ${PERSONAL_PRODUCTS_LIST} under Momentra Labs. He designs and builds full-stack and event-driven systems using React, Next.js, TypeScript, JavaScript, Node.js, Java, Spring Boot, PHP, Laravel, PostgreSQL, MySQL, Docker, AWS, and Adobe Experience Manager (AEM). Prior experience includes Maya (fintech), Asurion, Accenture, and full-stack consulting. Official portfolio: https://albeltran.com`,
  currentCompany: "Anglian Dental",
  currentEmployerNote: "United Kingdom",
  currentRole: "Software Engineering Lead at Anglian Dental",
  givenName: "Al Andrew Paul",
  familyName: "Beltran",
  imageAlt: "Al Beltran, Software Engineer",
  knowsAbout: [
    "Software engineering",
    "Software architecture",
    "Technical leadership",
    "Full-stack development",
    "Web development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Java",
    "Spring Boot",
    "PHP",
    "Laravel",
    "Adobe Experience Manager",
    "PostgreSQL",
    "MySQL",
    "Docker",
    "AWS",
    "Cloud computing",
    "Serverless computing",
    "Event-driven architecture",
    "System design",
    "Technical interviews",
    "REST APIs",
  ],
  sameAs: [
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.github,
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.codewars,
  ],
  url: SITE_URL,
  image: `${SITE_URL}/assets/al-beltran-profile.jpg`,
  photo: "/assets/al-beltran-software-engineer.webp",
  profilePhoto: "/assets/al-beltran-profile.jpg",
  imageWidth: 512,
  imageHeight: 512,
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
