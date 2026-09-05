import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION } from "@/lib/constants";
import { person } from "@/content/person";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${person.shortName} — ${person.jobTitle}`,
    short_name: person.shortName,
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050507",
    theme_color: "#050507",
    lang: "en-PH",
    icons: [
      {
        src: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
        purpose: "any",
      },
      {
        src: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "any",
      },
    ],
  };
}
