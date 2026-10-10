import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { person } from "@/content/person";

export const PRIMARY_TITLE =
  "Al Beltran — Software Engineering Lead at Anglian Dental";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article" | "profile";
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  keywords?: string[];
  noIndex?: boolean;
  /** When true, title is used as-is (homepage primary title). */
  absoluteTitle?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/** Google shows roughly 155–160 characters of a meta description. */
const DESCRIPTION_MAX = 158;
/** Titles longer than this get cut off in results, so the name suffix is dropped. */
const TITLE_MAX = 60;

/**
 * Keep descriptions inside the snippet length: end on a full sentence when one fits,
 * otherwise on a word boundary with an ellipsis.
 */
export function fitDescription(text: string, max = DESCRIPTION_MAX) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const window = clean.slice(0, max + 1);
  const sentenceEnd = Math.max(
    window.lastIndexOf(". "),
    window.lastIndexOf("! "),
    window.lastIndexOf("? "),
  );
  if (sentenceEnd >= 80) return clean.slice(0, sentenceEnd + 1);
  const wordEnd = clean.slice(0, max).lastIndexOf(" ");
  return `${clean.slice(0, wordEnd > 0 ? wordEnd : max).replace(/[\s,;:·—-]+$/, "")}…`;
}

export function buildMetadata({
  title,
  description: rawDescription,
  path = "/",
  type = "website",
  image = "/og/default.jpg",
  imageWidth = 1200,
  imageHeight = 630,
  imageAlt,
  keywords,
  noIndex = false,
  absoluteTitle = false,
  publishedTime,
  modifiedTime,
  tags,
}: BuildMetadataInput): Metadata {
  const description = fitDescription(rawDescription);
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const imageType = image.endsWith(".png")
    ? "image/png"
    : image.endsWith(".webp")
      ? "image/webp"
      : "image/jpeg";
  const alreadyNamed =
    title.includes(person.shortName) || title.includes(person.name);
  const fullTitle = absoluteTitle
    ? title
    : title === SITE_NAME || title === PRIMARY_TITLE || alreadyNamed
      ? title
      : `${title} · ${person.shortName}`.length > TITLE_MAX
        ? title
        : `${title} · ${person.shortName}`;

  const ogImage = {
    url: imageUrl,
    secureUrl: imageUrl,
    width: imageWidth,
    height: imageHeight,
    alt: imageAlt ?? fullTitle,
    type: imageType,
  };

  const openGraph =
    type === "article"
      ? {
          title: fullTitle,
          description,
          url,
          siteName: SITE_NAME,
          locale: "en_PH" as const,
          alternateLocale: ["en_US"],
          type: "article" as const,
          publishedTime,
          modifiedTime: modifiedTime ?? publishedTime,
          authors: [person.name],
          tags,
          images: [ogImage],
        }
      : type === "profile"
        ? {
            title: fullTitle,
            description,
            url,
            siteName: SITE_NAME,
            locale: "en_PH" as const,
            alternateLocale: ["en_US"],
            type: "profile" as const,
            firstName: person.givenName,
            lastName: person.familyName,
            username: "altbeltran",
            images: [ogImage],
          }
        : {
            title: fullTitle,
            description,
            url,
            siteName: SITE_NAME,
            locale: "en_PH" as const,
            alternateLocale: ["en_US"],
            type: "website" as const,
            images: [ogImage],
          };

  return {
    // absolute bypasses root title.template — prevents "Title · Al Beltran · Al Beltran"
    title: {
      absolute: fullTitle,
    },
    description,
    metadataBase: new URL(SITE_URL),
    keywords,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    authors: [{ name: person.name, url: `${SITE_URL}/author/al-beltran/` }],
    creator: person.name,
    publisher: person.name,
    category: type === "article" ? "Technology" : undefined,
  };
}

export const defaultMetadata = buildMetadata({
  title: PRIMARY_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
  image: "/og/default.jpg",
});
