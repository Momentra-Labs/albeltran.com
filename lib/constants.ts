export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://albeltran.com";

export const SITE_NAME = "Al Beltran — Portfolio";
export const SITE_DESCRIPTION =
  "Al Beltran (Al Andrew Paul Beltran) is a software engineer in Manila and Software Engineering Lead at Anglian Dental. He works with React, TypeScript, Java, Node.js, AEM, and AWS. Previously Software Engineer at Google via High Spring.";

export const SECTION_NAV = [
  { href: "/#work", hash: "work", label: "Work" },
  { href: "/lab/", hash: "lab", label: "Lab" },
  { href: "/#experience", hash: "experience", label: "Experience" },
  { href: "/blog/", hash: "blog", label: "Writing" },
  { href: "/#contact", hash: "contact", label: "Contact" },
] as const;

export const NAV_LINKS = [
  { href: "/about/", label: "About" },
  { href: "/experience/", label: "Experience" },
  { href: "/projects/", label: "Projects" },
  { href: "/lab/", label: "Lab" },
  { href: "/blog/", label: "Journal" },
  { href: "/topics/", label: "Topics" },
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
