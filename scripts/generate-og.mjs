import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const SOURCE_PHOTO = path.join(ROOT, "public/assets/professional-photo.png");
const PHOTO_WEBP = path.join(
  ROOT,
  "public/assets/al-beltran-software-engineer.webp",
);
const PHOTO_JPG = path.join(
  ROOT,
  "public/assets/al-beltran-software-engineer.jpg",
);
const APPLE = path.join(ROOT, "public/apple-touch-icon.png");
const OUT_DIR = path.join(ROOT, "public/og");
const OUT_JPG = path.join(OUT_DIR, "default.jpg");
const OUT_PNG = path.join(OUT_DIR, "default.png");

const WIDTH = 1200;
const HEIGHT = 630;

fs.mkdirSync(OUT_DIR, { recursive: true });

const portrait = sharp(SOURCE_PHOTO).rotate().resize(1200, 1200, {
  fit: "cover",
  position: "centre",
});
await portrait.clone().webp({ quality: 82 }).toFile(PHOTO_WEBP);
await portrait.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(PHOTO_JPG);

const photoSize = 420;
const photoBuffer = await sharp(SOURCE_PHOTO)
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

  <text x="72" y="148" fill="#8b8b9c" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="3">SOFTWARE ENGINEERING LEAD · ANGLIAN DENTAL</text>
  <text x="72" y="248" fill="#f0f0f5" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700">Al Beltran</text>
  <text x="72" y="306" fill="#c8c8d4" font-family="Arial, Helvetica, sans-serif" font-size="26">Al Andrew Paul Beltran</text>
  <text x="72" y="368" fill="#9aa3b5" font-family="Arial, Helvetica, sans-serif" font-size="22">Founder, Momentra Labs · Manila, Philippines</text>
  <text x="72" y="430" fill="#4f8eff" font-family="Arial, Helvetica, sans-serif" font-size="20">Google via High Spring · National Geographic · Disney · Maya</text>
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

await sharp(SOURCE_PHOTO)
  .rotate()
  .resize(180, 180, { fit: "cover", position: "centre" })
  .png({ quality: 90 })
  .toFile(APPLE);

const jpgStat = fs.statSync(OUT_JPG);
console.log(`Wrote ${OUT_JPG} (${Math.round(jpgStat.size / 1024)} KB)`);
console.log(`Wrote ${OUT_PNG}`);
console.log(`Wrote ${APPLE}`);
console.log(
  `Wrote ${PHOTO_WEBP} (${Math.round(fs.statSync(PHOTO_WEBP).size / 1024)} KB)`,
);
console.log(
  `Wrote ${PHOTO_JPG} (${Math.round(fs.statSync(PHOTO_JPG).size / 1024)} KB)`,
);
