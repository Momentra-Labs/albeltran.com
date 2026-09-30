import { SOCIAL_LINKS } from "@/lib/constants";

export const CODEWARS_PAGE_SIZE = 5;

export const codewarsRecord = {
  username: "pawpu",
  statsUsername: "dev26th",
  rank: "1 dan",
  honor: 13803,
  leaderboardPosition: 486,
  href: SOCIAL_LINKS.codewars,
  statsHref: SOCIAL_LINKS.codewarsStats,
} as const;

export const hardestKatas = [
  {
    name: "Compiler to Lambda Calculus",
    kyu: 1,
    href: "https://www.codewars.com/kata/5f9db4e2622f500033513a6a",
  },
  {
    name: "7×7 Skyscrapers",
    kyu: 1,
    href: "https://www.codewars.com/kata/5917a2205ffc30ec3a0000a8",
  },
  {
    name: "Metaprogramming: Lisp-style Generic Functions",
    kyu: 1,
    href: "https://www.codewars.com/kata/526de57c8f428fc1fd000b8c",
  },
  {
    name: "Make a spiral",
    kyu: 3,
    href: "https://www.codewars.com/kata/534e01fbbb17187c7e0000c6",
  },
  {
    name: "Tic-Tac-Toe Checker",
    kyu: 5,
    href: "https://www.codewars.com/kata/525caa5c1bf619d28c000335",
  },
  {
    name: "Simple Pig Latin",
    kyu: 5,
    href: "https://www.codewars.com/kata/520b9d2ad5c005041100000f",
  },
  {
    name: "Decompose a number",
    kyu: 6,
    href: "https://www.codewars.com/kata/55ec80d40d5de30631000025",
  },
] as const;

export const authoredKatas = [
  {
    name: "Unspeakable Names",
    kyu: 6,
    rankLabel: "6",
    href: "https://www.codewars.com/kata/6abac73344c02a5087bf727b",
  },
] as const;
