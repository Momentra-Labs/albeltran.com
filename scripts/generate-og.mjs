import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const PHOTO = path.join(ROOT, "public/assets/professional-photo.png");
const OUT_DIR = path.join(ROOT, "public/og");
const OUT_JPG = path.join(OUT_DIR, "default.jpg");
const OUT_PNG = path.join(OUT_DIR, "default.png");

const WIDTH = 1200;
const HEIGHT = 630;

fs.mkdirSync(OUT_DIR, { recursive: true });

const photoSize = 420;
const photoBuffer = await sharp(PHOTO)
  .rotate()
  .resize(photoSize, Math.round(photoSize * 1.25), {
    fit: "cover",
    position: "centre",
  })
  .jpeg({ quality: 90 })
  .toBuffer();

const overlaySvg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#050507"/>
      <stop offset="55%" stop-color="#0a0f1a"/>
      <stop offset="100%" stop-color="#0b1528"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="35%" r="45%">
      <stop offset="0%" stop-color="#4f8eff" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#4f8eff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#050507" stop-opacity="0"/>
      <stop offset="100%" stop-color="#050507" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <rect x="0" y="0" width="720" height="${HEIGHT}" fill="url(#fade)"/>

  <text x="72" y="168" fill="#8b8b9c" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="3">FULL-STACK SOFTWARE ENGINEER</text>
  <text x="72" y="260" fill="#f0f0f5" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700">Al Beltran</text>
  <text x="72" y="318" fill="#c8c8d4" font-family="Arial, Helvetica, sans-serif" font-size="28">Al Andrew Paul Beltran</text>
          <text x="72" y="380" fill="#9aa3b5" font-family="Arial, Helvetica, sans-serif" font-size="22">Founder, Momentra Labs · Philippines</text>
  <text x="72" y="450" fill="#4f8eff" font-family="Arial, Helvetica, sans-serif" font-size="22">React · Next.js · Node.js · Java · AWS · AEM</text>
  <text x="72" y="560" fill="#6b7280" font-family="Arial, Helvetica, sans-serif" font-size="22">albeltran.com</text>
</svg>
`;

const roundedMask = Buffer.from(`
<svg width="${photoSize}" height="${Math.round(photoSize * 1.25)}">
  <rect x="0" y="0" width="${photoSize}" height="${Math.round(photoSize * 1.25)}" rx="28" ry="28" fill="#fff"/>
</svg>
`);

const roundedPhoto = await sharp(photoBuffer)
  .composite([{ input: roundedMask, blend: "dest-in" }])
  .png()
  .toBuffer();

const composed = sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 3,
    background: { r: 5, g: 5, b: 7 },
  },
})
  .composite([
    { input: Buffer.from(overlaySvg), top: 0, left: 0 },
    {
      input: roundedPhoto,
      top: Math.round((HEIGHT - photoSize * 1.25) / 2),
      left: WIDTH - photoSize - 72,
    },
  ]);

await composed.clone().jpeg({ quality: 88, mozjpeg: true }).toFile(OUT_JPG);
await composed.clone().png({ quality: 90 }).toFile(OUT_PNG);

const jpgStat = fs.statSync(OUT_JPG);
console.log(`Wrote ${OUT_JPG} (${Math.round(jpgStat.size / 1024)} KB)`);
console.log(`Wrote ${OUT_PNG}`);
