import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

export const person = {
  name: "Al Andrew Paul Beltran",
  shortName: "Al Beltran",
  brand: "Code by Pawpu",
  jobTitle: "Senior Software Engineer",
  secondaryTitle: "Full-Stack Developer",
  headline:
    "Senior Software Engineer and Full-Stack Developer specializing in React, Next.js, TypeScript, Node.js, Java, Spring Boot, Laravel, AEM, and cloud architecture.",
  location: "Manila, Metro Manila, Philippines",
  email: "al.andrew.p.beltran@gmail.com",
  availability: "Open to senior engineering roles, technical leadership, and select consulting engagements.",
  yearsExperience: 6,
  summary:
    "Al Andrew Paul Beltran (Al Beltran) is a Senior Software Engineer and Full-Stack Developer based in the Philippines. He currently works as a Software Engineer at Google via High Spring. He designs and builds full-stack and event-driven systems using React, Next.js, TypeScript, JavaScript, Node.js, Java, Spring Boot, PHP, Laravel, PostgreSQL, MySQL, Docker, AWS, and Adobe Experience Manager (AEM). Prior experience includes Maya (fintech), enterprise delivery for Disney (Accenture), Asurion, technical leadership at Myridius, and full-stack consulting. Official portfolio: https://albeltran.com",
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
  ],
  sameAs: [
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.github,
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.codewars,
  ],
  url: SITE_URL,
  image: `${SITE_URL}/assets/professional-photo.jpg`,
  photo: "/assets/professional-photo.jpg",
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
