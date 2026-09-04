# Al Beltran — Portfolio

Software Engineering Lead portfolio for **Al Andrew Paul Beltran** (Code by Pawpu).

**Canonical site:** [https://albeltran.com](https://albeltran.com)

## Stack

- Next.js App Router (static export)
- TypeScript
- Tailwind CSS
- shadcn/ui-style components
- Framer Motion
- MDX blog
- Deployable to **Vercel** (recommended) or GitHub Pages

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
- Site URL: `NEXT_PUBLIC_SITE_URL` (default `https://albeltran.com`)

## Deploy on Vercel + GoDaddy (`albeltran.com`)

1. Push this repo and import it in [Vercel](https://vercel.com).
2. Set env vars (optional if defaults match):
   - `NEXT_PUBLIC_SITE_URL=https://albeltran.com`
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=albeltran.com`
   - EmailJS keys as in `.env.example`
3. In Vercel → Project → **Settings → Domains**, add:
   - `albeltran.com`
   - `www.albeltran.com`
4. In **GoDaddy → DNS** for `albeltran.com`, set records Vercel shows (typically):
   - **A** `@` → `76.76.21.21`
   - **CNAME** `www` → `cname.vercel-dns.com`
5. Wait for DNS/SSL (often a few minutes to a few hours).
6. Prefer apex `albeltran.com` as primary; redirect `www` → apex (or the reverse) in Vercel Domains.

## GitHub Pages (optional)

Push to `main` with the Actions workflow, and set **Pages → Source** to **GitHub Actions**. Keep `NEXT_PUBLIC_SITE_URL=https://albeltran.com` so canonicals stay on the custom domain.
