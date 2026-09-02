export const worldMarks = [
  {
    name: "Google",
    note: "Software Engineer via High Spring",
    href: "/experience/#google",
  },
  {
    name: "National Geographic",
    note: "Enterprise web delivery · Accenture",
    href: "/projects/national-geographic/",
  },
  {
    name: "Disney",
    note: "Experiences and Institute · Accenture",
    href: "/projects/disney-experiences/",
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
  "Google via High Spring · National Geographic · Disney · Maya · Momentra Labs";
