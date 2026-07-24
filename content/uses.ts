export const uses = {
  intro:
    "The hardware and software I use day to day as a senior software engineer. Setup changes over time; this page reflects what I currently rely on for product work, system design, and writing.",
  categories: [
    {
      title: "Laptop",
      items: [
        {
          name: "Primary laptop",
          detail:
            "Windows development machine suited for full-stack work across Node.js, Java, and browser tooling. Used for daily coding, reviews, and local AWS-oriented workflows.",
        },
      ],
    },
    {
      title: "Monitor",
      items: [
        {
          name: "External display",
          detail:
            "Single ultrawide or dual-monitor layout for code + docs/API references side by side. Prioritizes readable density over decorative setups.",
        },
      ],
    },
    {
      title: "Keyboard & Mouse",
      items: [
        {
          name: "Mechanical keyboard",
          detail: "Tactile switches for long coding sessions with low fatigue.",
        },
        {
          name: "Ergonomic mouse",
          detail: "Reliable pointing device for design reviews and long debugging sessions.",
        },
      ],
    },
    {
      title: "Editor",
      items: [
        {
          name: "Cursor",
          detail:
            "Primary IDE for context-aware editing, refactoring, and AI-assisted debugging inside real codebases.",
        },
        {
          name: "VS Code",
          detail: "Fallback editor for lightweight edits and environments where Cursor is unavailable.",
        },
      ],
    },
    {
      title: "Extensions",
      items: [
        {
          name: "ESLint + Prettier",
          detail: "Consistent formatting and linting across TypeScript and JavaScript projects.",
        },
        {
          name: "GitLens / Git tooling",
          detail: "History and blame context during reviews and incident investigation.",
        },
        {
          name: "Error Lens",
          detail: "Inline diagnostics to catch issues before commit.",
        },
      ],
    },
    {
      title: "Terminal",
      items: [
        {
          name: "Windows Terminal + PowerShell",
          detail: "Primary shell for git, Node tooling, and local services.",
        },
        {
          name: "Git CLI",
          detail: "Branching, rebases when needed, and PR preparation from the terminal.",
        },
      ],
    },
    {
      title: "Theme",
      items: [
        {
          name: "Dark theme",
          detail:
            "Low-glare dark UI for long sessions. Prefer high-contrast text over heavy glow aesthetics.",
        },
      ],
    },
    {
      title: "Desk setup",
      items: [
        {
          name: "Focused desk",
          detail:
            "Clean desk with laptop, external display, keyboard, and notebook for system design sketches. Minimal clutter keeps context switching low.",
        },
      ],
    },
    {
      title: "Software",
      items: [
        {
          name: "Claude",
          detail: "Architecture exploration, tradeoff analysis, and long-form technical writing support.",
        },
        {
          name: "GitHub",
          detail: "Source control, code review, and project tracking.",
        },
        {
          name: "Figma (as needed)",
          detail: "Reading design specs and collaborating with design partners.",
        },
        {
          name: "Postman / HTTP clients",
          detail: "API exploration and contract verification.",
        },
        {
          name: "AWS Console + CLI",
          detail: "Serverless debugging, queue inspection, and deployment verification.",
        },
      ],
    },
  ],
} as const;
