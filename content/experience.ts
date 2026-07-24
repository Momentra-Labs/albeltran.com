export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location?: string;
  start: string;
  end: string;
  duration: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  businessImpact: string;
  relatedProjects?: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "google",
    company: "Google (via High Spring)",
    role: "Software Engineer",
    location: "Philippines",
    start: "2026",
    end: "Present",
    duration: "2026 — Present",
    summary:
      "Software Engineer at Google through High Spring, contributing to production software delivery in a large-scale engineering environment.",
    responsibilities: [
      "Build and maintain production software as part of Google engineering teams",
      "Collaborate with cross-functional partners on design, implementation, and code review",
      "Follow Google engineering standards for quality, testing, and operational readiness",
      "Ship incremental improvements with clear ownership and measurable outcomes",
    ],
    achievements: [
      "Engaged as a Software Engineer at Google via High Spring",
      "Operating in a high-scale product and platform engineering context",
    ],
    technologies: ["Software engineering", "Distributed systems", "Code review", "Production delivery"],
    businessImpact:
      "Supports Google product and platform delivery through reliable engineering contribution under High Spring engagement.",
  },
  {
    id: "maya",
    company: "Maya",
    role: "Software Engineer",
    location: "Philippines",
    start: "2025",
    end: "2026",
    duration: "2025 — 2026",
    summary:
      "Built event-driven backend services for card activation and loyalty rewards in a regulated fintech environment.",
    responsibilities: [
      "Design event-driven architecture for card activation and loyalty reward flows",
      "Integrate Talon.One for real-time campaign processing and reconciliation",
      "Build scalable Node.js APIs and backend services for financial products",
      "Produce system design docs used by engineering and stakeholders",
    ],
    achievements: [
      "Shipped activation-to-reward pipelines with AWS messaging and serverless processors",
      "Documented integration contracts that reduced ambiguity across teams",
    ],
    technologies: ["Node.js", "AWS", "SQS", "SNS", "Lambda", "Talon.One", "REST APIs"],
    businessImpact:
      "Supported reliable card activation rewards at fintech scale, with clearer campaign operations for product and engineering.",
    relatedProjects: ["maya-card-loyalty"],
  },
  {
    id: "myridius",
    company: "Myridius",
    role: "Technical Lead",
    start: "2024",
    end: "2025",
    duration: "2024 — 2025",
    summary:
      "Led engineering direction for multi-tenant product delivery, mentoring developers and hardening production quality.",
    responsibilities: [
      "Own technical direction and delivery for the engineering team",
      "Design architecture for scalable multi-tenant applications",
      "Establish coding standards, review processes, and mentoring rituals",
      "Prioritize and clear production technical debt with measurable outcomes",
    ],
    achievements: [
      "Drove resolution of 50+ production technical debts",
      "Improved delivery consistency through clearer architecture and review standards",
    ],
    technologies: ["React", "Node.js", "TypeScript", "System Design", "Multi-tenant architecture"],
    businessImpact:
      "Reduced operational drag from accumulated debt and raised team throughput on product features.",
  },
  {
    id: "asurion",
    company: "Asurion",
    role: "Software Engineer II",
    start: "2023",
    end: "2023",
    duration: "2023",
    summary:
      "Maintained high-availability services for a global insurance technology platform with frequent production releases.",
    responsibilities: [
      "Build and maintain high-availability services for global insurance tech",
      "Improve system performance through architecture and query/path optimization",
      "Ship frequent production releases in an agile delivery model",
    ],
    achievements: [
      "Improved system load times from approximately 15 seconds to 2 seconds",
    ],
    technologies: ["JavaScript", "Node.js", "Performance optimization", "Agile delivery"],
    businessImpact:
      "Faster load times improved usability of critical internal and customer-facing workflows.",
  },
  {
    id: "yondu",
    company: "Yondu",
    role: "Full Stack Developer",
    start: "2023",
    end: "2023",
    duration: "2023",
    summary:
      "Delivered full-stack web solutions for enterprise clients with shared React component systems.",
    responsibilities: [
      "Develop full-stack web solutions for enterprise clients",
      "Build reusable React component systems shared across projects",
      "Collaborate with cross-functional teams in agile delivery cycles",
    ],
    achievements: [
      "Reduced duplicate UI work by shipping reusable component patterns",
    ],
    technologies: ["React", "Node.js", "Full-stack web"],
    businessImpact:
      "Accelerated client delivery by reusing UI and API patterns across engagements.",
    relatedProjects: ["fwd-smart-recruitment"],
  },
  {
    id: "accenture",
    company: "Accenture",
    role: "Software Engineer",
    start: "2021",
    end: "2023",
    duration: "2021 — 2023",
    summary:
      "Delivered enterprise AEM and API work on high-visibility Disney-related programs.",
    responsibilities: [
      "Deliver Disney Institute and Disney Crew Management project workstreams",
      "Build enterprise AEM components and improve v2 APIs at global scale",
      "Operate within structured delivery frameworks with high-profile clients",
      "Contribute reusable architecture patterns adopted by multiple teams",
    ],
    achievements: [
      "Shipped reusable AEM components that cut duplicate authoring work",
      "Improved crew management API latency and maintainability on v2 endpoints",
    ],
    technologies: ["AEM", "React", "Node.js", "Java", "Spring Boot"],
    businessImpact:
      "Supported global professional-development and crew platforms with more maintainable content and API surfaces.",
    relatedProjects: ["disney-institute", "disney-crew-apis"],
  },
  {
    id: "upwork",
    company: "Upwork",
    role: "Freelance Software Engineer",
    start: "2020",
    end: "2020",
    duration: "2020",
    summary:
      "Delivered full-stack web projects for international clients with end-to-end ownership.",
    responsibilities: [
      "Scope, build, and deploy full-stack web projects for international clients",
      "Own delivery from requirements clarification through production support",
    ],
    achievements: [
      "Completed client engagements with sole ownership of architecture and delivery",
    ],
    technologies: ["React", "Node.js", "PHP", "REST APIs"],
    businessImpact:
      "Helped early-stage and SMB clients ship working products without a full in-house engineering team.",
  },
  {
    id: "goetu",
    company: "GoETU",
    role: "Junior Software Engineer",
    start: "2019",
    end: "2020",
    duration: "2019 — 2020",
    summary:
      "Started professional engineering career building web application features in a startup environment.",
    responsibilities: [
      "Contribute backend and frontend features for web applications",
      "Learn production practices in a fast-paced startup setting",
    ],
    achievements: [
      "Built foundational full-stack delivery habits used throughout later senior work",
    ],
    technologies: ["JavaScript", "Web applications"],
    businessImpact:
      "Supported early product iteration while developing reliable engineering fundamentals.",
  },
];
