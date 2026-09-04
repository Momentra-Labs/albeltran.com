export const worldMarks = [
  {
    name: "Anglian Dental",
    note: "Software Engineering Lead · United Kingdom",
    href: "/experience/#anglian-dental",
  },
  {
    name: "Google",
    note: "Software Engineer via High Spring",
    href: "/experience/#google",
  },
  {
    name: "Disney",
    note: "Experiences and Institute · Myridius",
    href: "/projects/disney-experiences/",
  },
  {
    name: "National Geographic",
    note: "Enterprise web delivery · Myridius",
    href: "/projects/national-geographic/",
  },
  {
    name: "Accenture",
    note: "Software Engineer · 2021–2023",
    href: "/experience/#accenture",
  },
  {
    name: "Maya",
    note: "Fintech · event-driven services",
    href: "/experience/#maya",
  },
  {
    name: "Momentra Labs",
    note: "Founder · independent products",
    href: "/#lab",
  },
] as const;

export const worldMarksLine = worldMarks.map((mark) => mark.name).join(" · ");

export const coverMarksLine =
  "Anglian Dental · Google via High Spring · Disney · National Geographic · Maya";
