import { SOCIAL_LINKS } from "@/lib/constants";

export const CODEWARS_PAGE_SIZE = 5;

export const codewarsRecord = {
  username: "pawpu",
  rank: "2 kyu",
  leaderboardPosition: 17150,
  href: SOCIAL_LINKS.codewars,
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
