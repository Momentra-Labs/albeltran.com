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
    image: "/assets/github-pull-shark.webp",
  },
  {
    name: "Pair Extraordinaire",
    href: "https://github.com/altbeltran?achievement=pair-extraordinaire&tab=achievements",
    image: "/assets/github-pair-extraordinaire.webp",
  },
  {
    name: "Galaxy Brain",
    href: "https://github.com/altbeltran?achievement=galaxy-brain&tab=achievements",
    image: "/assets/github-galaxy-brain.webp",
  },
  {
    name: "YOLO",
    href: "https://github.com/altbeltran?achievement=yolo&tab=achievements",
    image: "/assets/github-yolo.webp",
  },
] as const;

export const githubOrganizations = [
  {
    name: "Anglian Dental",
    href: "https://github.com/anglian-dental",
    image: "/assets/github-org-anglian-dental.webp",
  },
  {
    name: "Vaco Center of Excellence",
    href: "https://github.com/VacoSF",
    image: "/assets/github-org-vacosf.webp",
  },
  {
    name: "Momentra Labs",
    href: "https://github.com/Momentra-Labs",
    image: "/assets/github-org-momentra-labs.webp",
  },
  {
    name: "The Labs Tech",
    href: "https://github.com/The-Labs-Tech",
    image: "/assets/github-org-the-labs-tech.webp",
  },
] as const;
