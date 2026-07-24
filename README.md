# Al Beltran — Portfolio

Senior Software Engineer portfolio for **Al Andrew Paul Beltran** (Code by Pawpu).

## Stack

- Next.js App Router (static export)
- TypeScript
- Tailwind CSS
- shadcn/ui-style components
- Framer Motion
- MDX blog
- Deployed to GitHub Pages

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Static output is written to `out/`.

## Customize

- Profile and stats: `content/person.ts`
- Experience: `content/experience.ts`
- Projects: `content/projects.ts`
- Blog posts: `content/blog/*.mdx`
- Uses / Now: `content/uses.ts`, `content/now.ts`

## Deploy

Push to `main`. GitHub Actions builds and publishes `out/` to GitHub Pages.

In the repository settings, set **Pages → Source** to **GitHub Actions**.
