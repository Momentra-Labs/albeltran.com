// Tell IndexNow search engines (Bing, Yandex, Seznam, Naver…) which URLs exist or changed.
// Bing's index also feeds ChatGPT search and Microsoft Copilot, so this speeds up AI visibility too.
//
// Usage (after deploying, so the key file is live):
//   npm run indexnow                 → submit every URL in out/sitemap.xml
//   npm run indexnow -- /blog/foo/   → submit specific paths
import fs from "fs";
import path from "path";

const SITE = "https://albeltran.com";
const HOST = new URL(SITE).host;
// Public by design: IndexNow verifies ownership by fetching ${SITE}/${KEY}.txt
const KEY = "d0d83df0b7f73a6b7aae9c2f751d5137";

const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map((p) => (p.startsWith("http") ? p : `${SITE}${p.startsWith("/") ? p : `/${p}`}`));
} else {
  const sitemap = path.join(process.cwd(), "out", "sitemap.xml");
  if (!fs.existsSync(sitemap)) {
    console.error("out/sitemap.xml not found — run `npm run build` first.");
    process.exit(1);
  }
  urls = [...fs.readFileSync(sitemap, "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  }),
});

console.log(`IndexNow: submitted ${urls.length} URL(s) → HTTP ${response.status}`);
if (!response.ok && response.status !== 202) {
  console.error(await response.text());
  process.exit(1);
}
