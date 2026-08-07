import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { person } from "@/content/person";

export const PRIMARY_TITLE =
  "Al Beltran — Senior Software Engineer | Full-Stack Developer";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
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

export function buildMetadata({
  title,
  description,
  path = "/",
  type = "website",
  image = "/og/default.jpg",
  noIndex = false,
  absoluteTitle = false,
  publishedTime,
  modifiedTime,
  tags,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const imageType = image.endsWith(".png")
    ? "image/png"
    : image.endsWith(".webp")
      ? "image/webp"
      : "image/jpeg";
  const fullTitle = absoluteTitle
    ? title
    : title === SITE_NAME || title === PRIMARY_TITLE
      ? title
      : `${title} · ${person.shortName}`;

  const ogImage = {
    url: imageUrl,
    secureUrl: imageUrl,
    width: 1200,
    height: 630,
    alt: fullTitle,
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
          type: "article" as const,
          publishedTime,
          modifiedTime: modifiedTime ?? publishedTime,
          authors: [person.name],
          tags,
          images: [ogImage],
        }
      : {
          title: fullTitle,
          description,
          url,
          siteName: SITE_NAME,
          locale: "en_PH" as const,
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
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    authors: [{ name: person.name, url: SITE_URL }],
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
