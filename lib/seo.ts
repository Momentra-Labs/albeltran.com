import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { person } from "@/content/person";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
  noIndex?: boolean;
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
  image = "/og/default.svg",
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const fullTitle = title === SITE_NAME ? title : `${title} · ${person.shortName}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_PH",
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    authors: [{ name: person.name, url: SITE_URL }],
    creator: person.name,
    publisher: person.name,
  };
}

export const defaultMetadata = buildMetadata({
  title: `${person.name} | Senior Software Engineer (React, Node.js, AWS)`,
  description: SITE_DESCRIPTION,
  path: "/",
});
