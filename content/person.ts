import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

export const person = {
  name: "Al Andrew Paul Beltran",
  shortName: "Al Beltran",
  brand: "Code by Pawpu",
  jobTitle: "Senior Software Engineer",
  headline:
    "Senior Software Engineer specializing in React, Node.js, Java, AWS, event-driven systems, and enterprise AEM platforms.",
  location: "Manila, Metro Manila, Philippines",
  email: "al.andrew.p.beltran@gmail.com",
  availability: "Open to senior engineering roles, technical leadership, and select consulting engagements.",
  yearsExperience: 6,
  summary:
    "Al Andrew Paul Beltran is a Senior Software Engineer based in Manila, Philippines. He currently works as a Software Engineer at Google via High Spring. He designs and builds full-stack and event-driven systems using React, Node.js, Java, AWS (Lambda, SQS, SNS, Step Functions), and Adobe Experience Manager (AEM). Prior experience includes Maya (fintech), enterprise delivery for Disney (Accenture), Asurion, technical leadership at Myridius, and full-stack consulting.",
  currentCompany: "Google",
  currentEmployerNote: "via High Spring",
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Java",
    "Spring Boot",
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
  "React",
  "Next.js",
  "Node.js",
  "Java",
  "Spring Boot",
  "AWS Lambda",
  "SQS / SNS",
  "Step Functions",
  "AEM",
  "Laravel",
  "PostgreSQL",
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
    title: "Data & Analytics",
    items: ["SQL", "Elasticsearch", "SSRS", "Excel / BI"],
  },
  {
    title: "AI Tools",
    items: ["Claude", "Cursor", "Prompt Engineering", "AI Debugging"],
  },
] as const;
