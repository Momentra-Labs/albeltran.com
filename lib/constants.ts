import codewarsStats from "@/content/codewars-stats.json";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://albeltran.com";

export const SITE_NAME = "Al Beltran — Portfolio";
/** Codewars numbers come from content/codewars-stats.json, refreshed on every build. */
export const SITE_DESCRIPTION = `Al Beltran: Software Engineering Lead at Anglian Dental, ex-Google via High Spring. Codewars ${codewarsStats.rank}, #${codewarsStats.leaderboardPosition} worldwide, ${codewarsStats.honor.toLocaleString("en-US")} honor. React, TypeScript, AWS.`;

export const SECTION_NAV = [
  { href: "/#work", hash: "work", label: "Work" },
  { href: "/lab/", hash: "lab", label: "Lab" },
  { href: "/#experience", hash: "experience", label: "Experience" },
  { href: "/blog/", hash: "blog", label: "Writing" },
  { href: "/#contact", hash: "contact", label: "Contact" },
] as const;

export const NAV_LINKS = [
  { href: "/biography/", label: "Biography" },
  { href: "/about/", label: "About" },
  { href: "/experience/", label: "Experience" },
  { href: "/projects/", label: "Projects" },
  { href: "/libraries/", label: "Libraries" },
  { href: "/lab/", label: "Lab" },
  { href: "/blog/", label: "Journal" },
  { href: "/topics/", label: "Topics" },
  { href: "/uses/", label: "Uses" },
  { href: "/now/", label: "Now" },
  { href: "/resume/", label: "Resume" },
  { href: "/contact/", label: "Contact" },
] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/altbeltran",
  linkedin: "https://www.linkedin.com/in/al-beltran/",
  instagram: "https://www.instagram.com/codebypawpu/",
  codewars: "https://www.codewars.com/users/ZozoFouchtra",
  codewarsBadge:
    "https://www.codewars.com/users/ZozoFouchtra/badges/micro",
  codewarsStats: "https://www.codewars.com/users/ZozoFouchtra",
  email: "mailto:al.andrew.p.beltran@gmail.com",
  messenger: "https://m.me/codebypawpu",
} as const;
