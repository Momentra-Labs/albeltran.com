import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://codemoon2019.github.io";
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
    return {
      slug: file.replace(/\.mdx$/, ""),
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
    <link>${SITE_URL}/blog/${post.slug}/</link>
    <guid>${SITE_URL}/blog/${post.slug}/</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description>${escapeXml(post.description)}</description>
  </item>`,
  )
  .join("\n");

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Al Beltran — Engineering Blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>Articles on architecture, performance, cloud, and engineering workflows by Al Andrew Paul Beltran.</description>
    <language>en-ph</language>
${items}
  </channel>
</rss>
`;

fs.writeFileSync(OUT, feed);
console.log(`Wrote ${OUT} (${posts.length} posts)`);
