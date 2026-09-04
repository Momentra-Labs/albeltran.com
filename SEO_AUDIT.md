# SEO audit — albeltran.com

Audit date: 2026-09-05  
Site: https://albeltran.com/  
Stack: Next.js 16 static export (`output: "export"`), trailing slashes, App Router.

This report is for the live architecture after the entity-SEO pass. Scores are 0–10.

---

## Current SEO score

**Overall: 8.2 / 10**

The site already had strong static HTML, canonicals, a stable `Person` `@id`, llms.txt, and a journal with Article schema. The remaining work was entity accuracy, About as a ProfilePage, internal links to the person, a crawlable descriptive portrait, and a few technical gaps (manifest, apple icon, title suffix duplication).

---

## Technical SEO findings — 8.5 / 10

| Check | Status |
| --- | --- |
| Framework / rendering | Static HTML at build. Good for crawlers. |
| HTTPS / clean URLs / trailing slash | Consistent. |
| Canonicals | Absolute `https://albeltran.com{path}` on all indexable pages. |
| sitemap.xml | Home, about, author, journal, interviews, topics, projects, experience, contact, now, uses, resume. Published articles only. |
| robots.txt | Allow `/`. Sitemap declared. Important pages are **not** noindexed. |
| 404 | `app/not-found.tsx` is `noindex, follow`. |
| RSS | `/feed.xml` |
| Favicon | `/favicon.svg` |
| Manifest | `/manifest.webmanifest` |
| Apple touch icon | `/apple-touch-icon.png` (180×180) |
| Open Graph / Twitter | Present. Default 1200×630. Articles use post images when set. |

**Not created:** `/blog/react` and similar category farms. Topic clusters already exist at `/topics/{pillar}/`. Duplicating them under `/blog/` would split equity and create thin pages.

---

## Entity SEO findings — 8.5 / 10

Canonical identity:

- Name: **Al Andrew Paul Beltran**
- Professional name: **Al Beltran**
- Occupation: Software Engineer / Software Engineering Lead
- Location: Manila, Philippines
- Current role: Software Engineering Lead at Anglian Dental (United Kingdom)
- Site: https://albeltran.com/
- Stable id: `https://albeltran.com/#person`

Prose and llms.txt already qualify Google as **via High Spring (contractor)** and Disney / National Geographic as **via Myridius**. Structured `knowsAbout` no longer lists bare `"Google"` / `"Disney"` as skills.

---

## Structured data findings — 8.5 / 10

Implemented / tightened:

| Type | Where | Notes |
| --- | --- | --- |
| `Person` | Sitewide graph | `@id` `#person`, alternateName, sameAs (GitHub, LinkedIn, Instagram, Codewars only), knowsAbout = real skills, worksFor = Anglian Dental only |
| `ProfilePage` | `/`, `/about/`, `/author/al-beltran/` | About is now a profile page, not only WebPage |
| `WebSite` | Home + key hubs | about = `#person` |
| `Article` / `BlogPosting` | Journal + interviews | Author `#person`, dates, breadcrumbs |
| `BreadcrumbList` | Inner pages | Matches visible crumbs |
| `CollectionPage` | Blog, topics, interviews | |
| `FAQPage` | About / home where FAQs exist | |

sameAs is **external profiles only**. Site pages are linked in HTML, not stuffed into sameAs.

Removed unverified `legalName: "Anglian Dental Engineering Ltd"` from schema.

Article pages no longer set `WebPage.mainEntity` to the person (the Article is the main entity).

---

## Indexability findings — 9 / 10

- Draft MDX is excluded from lists and 404s.
- Planned journal titles are text-only on topic pages. No empty URLs.
- Interview slugs are canonical under `/interviews/`.
- Homepage identity copy exists in HTML (including an `sr-only` statement for the cover).

---

## Performance findings — 7 / 10

| Item | Finding |
| --- | --- |
| Portrait | Was a generic 2.1MB PNG LCP. Now a 96KB WebP (+ 121KB JPEG fallback) at 1200×1200. Original `professional-photo.png` kept for old URLs. |
| Next Image | `unoptimized: true` (required by static export). Prebuild sharp handles OG + portrait. |
| Homepage | Client hero + Framer Motion still present. Design preserved. Cover remains crawlable HTML. |
| Fonts | Geist, Geist Mono, Instrument Serif — acceptable, not changed. |
| JS | Recruiter view, cursor, command palette remain. Not removed (would change UX). |

---

## Content findings — 8 / 10

About (`/about/`) now uses H1 **Al Beltran — Software Engineer** and adds Engineering interests + Technical writing sections, with links to journal, interviews, topics, and the author page.

Homepage title stays the accurate role string:

`Al Beltran — Software Engineering Lead at Anglian Dental`

Meta description is shorter and factual (name, role, Manila, stack, Google via High Spring).

No new mass articles. No fake awards or employers.

---

## Internal linking findings — 8 / 10

| Surface | Change |
| --- | --- |
| Cover | “About Al Beltran” |
| Footer | About, Experience, Projects, Contact |
| Command palette | About → `/about/`, Experience → `/experience/` |
| Experience page | Links to about, projects, journal |
| Articles | Already bylined to `/author/al-beltran/` and `/about/` |

Primary cover nav is still Work / Lab / Experience / Writing / Contact so the magazine chrome is unchanged.

---

## Image SEO findings — 8.5 / 10

| Asset | URL | Alt |
| --- | --- | --- |
| Primary portrait | `/assets/al-beltran-software-engineer.webp` | `Al Beltran, Software Engineer` |
| JPEG fallback | `/assets/al-beltran-software-engineer.jpg` | same |
| Legacy file | `/assets/professional-photo.png` | still live |
| Person schema | both webp + jpeg ImageObjects | caption = alt |

---

## What was changed

- Person schema: skills-only `knowsAbout`, external `sameAs`, image objects, `mainEntityOfPage` → `/about/`, occupation from source data
- ProfilePage on About
- Homepage / layout meta description and keywords (qualified affiliations, real stack)
- Title helper no longer emits `About Al Beltran · Al Beltran`
- About H1 + writing / interests sections
- Footer, palette, cover, experience cross-links
- Descriptive optimized portrait + apple icon + web manifest
- Article WebPage no longer claims the person as `mainEntity`

---

## What still needs improvement

1. Homepage is still JS-heavy (motion, recruiter, custom cursor). Fine for design; not a Core Web Vitals win.
2. Static export cannot use Next image optimization at request time.
3. Project pages share the default OG image.
4. Cover nav still has no About item (footer + cover CTA cover this).
5. `/resume.pdf` can drift from HTML `/resume/`.
6. Google Search Console / Bing verification and a Knowledge Panel are **not** guaranteed by schema.
7. External mentions (LinkedIn, GitHub README, guest posts) still do most of the off-site entity work.

---

## Recommended future articles

Publish from the existing 200-title queue. Do not invent a second taxonomy.

1. React `useEffect` dependencies  
2. TypeScript `unknown` vs `any`  
3. Node.js errors and unhandled rejections  
4. Spring Boot transactional boundaries  
5. Laravel N+1  
6. Indexes that match the query  
7. IAM least privilege  
8. AEM dispatcher caching  
9. Designing for idempotency  
10. Senior software engineer interview questions  

---

## Recommended external authority-building

1. Align LinkedIn headline with **Software Engineering Lead** and link albeltran.com.
2. GitHub profile: same name, same photo, same site URL.
3. Add `rel=me` is already on the site; confirm GitHub/LinkedIn link back.
4. Submit sitemap in Search Console.
5. Keep contractor language (“Google via High Spring”) on every third-party bio.
6. One high-quality byline on an external engineering publication, linking here.
7. Do not buy links or generate fake profiles.

---

## Scores

| Category | Score |
| --- | --- |
| Technical SEO | 8.5 |
| Entity SEO | 8.5 |
| Structured data | 8.5 |
| Indexability | 9.0 |
| Performance | 7.0 |
| Content | 8.0 |
| Internal linking | 8.0 |
| Image SEO | 8.5 |
| **Overall** | **8.2** |
