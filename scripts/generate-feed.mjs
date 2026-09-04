import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://albeltran.com"
).replace(/\/$/, "");
const BLOG_DIR = path.join(process.cwd(), "content/blog");
const OUT = path.join(process.cwd(), "public/feed.xml");

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

const files = fs
  .readdirSync(BLOG_DIR)
  .filter((file) => file.endsWith(".mdx"));

const posts = files
  .map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data } = matter(raw);
    const slug = file.replace(/\.mdx$/, "");
    const href =
      data.kind === "interview" ? `/interviews/${slug}/` : `/blog/${slug}/`;
    return {
      slug,
      href,
      title: data.title,
      description: data.description,
      date: data.date,
      draft: data.draft ?? false,
    };
  })
  .filter((post) => !post.draft)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const items = posts
  .map(
    (post) => `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${SITE_URL}${post.href}</link>
    <guid>${SITE_URL}${post.href}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description>${escapeXml(post.description)}</description>
  </item>`,
  )
  .join("\n");

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Al Beltran — Engineering Journal</title>
    <link>${SITE_URL}/blog/</link>
    <description>Engineering notes and interview prep by Al Andrew Paul Beltran. Published articles only.</description>
    <language>en-ph</language>
${items}
  </channel>
</rss>
`;

fs.writeFileSync(OUT, feed);
console.log(`Wrote ${OUT} (${posts.length} posts)`);
