import { SOCIAL_LINKS } from "@/lib/constants";

export const githubProfile = {
  href: SOCIAL_LINKS.github,
  username: "altbeltran",
} as const;

export const githubAchievements = [
  {
    name: "Pull Shark",
    tier: "x2",
    href: "https://github.com/altbeltran?achievement=pull-shark&tab=achievements",
    image: "/assets/github-pull-shark.png",
  },
  {
    name: "Pair Extraordinaire",
    href: "https://github.com/altbeltran?achievement=pair-extraordinaire&tab=achievements",
    image: "/assets/github-pair-extraordinaire.png",
  },
] as const;

export const githubOrganizations = [
  {
    name: "Vaco Center of Excellence",
    href: "https://github.com/VacoSF",
    image: "/assets/github-org-vacosf.jpg",
  },
  {
    name: "Momentra Labs",
    href: "https://github.com/Momentra-Labs",
    image: "/assets/github-org-momentra-labs.jpg",
  },
  {
    name: "The Labs Tech",
    href: "https://github.com/The-Labs-Tech",
    image: "/assets/github-org-the-labs-tech.png",
  },
] as const;
