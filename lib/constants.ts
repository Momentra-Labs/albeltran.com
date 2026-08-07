export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://albeltran.com";

export const SITE_NAME = "Al Beltran — Portfolio";
export const SITE_DESCRIPTION =
  "Al Beltran (Al Andrew Paul Beltran) is a Senior Software Engineer and Full-Stack Developer based in the Philippines. Portfolio covering React, Next.js, TypeScript, Node.js, Java, Spring Boot, Laravel, AEM, and cloud systems — https://albeltran.com";

export const NAV_LINKS = [
  { href: "/about/", label: "About" },
  { href: "/experience/", label: "Experience" },
  { href: "/projects/", label: "Projects" },
  { href: "/blog/", label: "Blog" },
  { href: "/uses/", label: "Uses" },
  { href: "/now/", label: "Now" },
  { href: "/resume/", label: "Resume" },
  { href: "/contact/", label: "Contact" },
] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/codemoon2019",
  linkedin: "https://www.linkedin.com/in/al-beltran/",
  instagram: "https://www.instagram.com/codebypawpu/",
  codewars: "https://www.codewars.com/users/pawpu",
  email: "mailto:al.andrew.p.beltran@gmail.com",
  messenger: "https://m.me/codebypawpu",
} as const;
