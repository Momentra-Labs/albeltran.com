import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PlausibleAnalytics } from "@/components/layout/plausible";
import { defaultMetadata, PRIMARY_TITLE } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import { person } from "@/content/person";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...defaultMetadata,
  metadataBase: new URL(SITE_URL),
  title: {
    default: PRIMARY_TITLE,
    template: `%s · ${person.shortName}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_URL.replace("https://", ""),
  keywords: [
    "Al Beltran",
    "Al Andrew Paul Beltran",
    "Al Beltran Software Engineer",
    "Al Beltran Developer",
    "Al Beltran Philippines",
    "Senior Software Engineer",
    "Full Stack Developer",
    "Software Engineer Philippines",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
  ],
  authors: [{ name: person.name, url: SITE_URL }],
  creator: person.name,
  publisher: person.name,
  openGraph: {
    ...defaultMetadata.openGraph,
    title: PRIMARY_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    siteName: "Al Beltran — Portfolio",
    images: [
      {
        url: `${SITE_URL}/og/default.jpg`,
        secureUrl: `${SITE_URL}/og/default.jpg`,
        width: 1200,
        height: 630,
        alt: PRIMARY_TITLE,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    ...defaultMetadata.twitter,
    title: PRIMARY_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og/default.jpg`],
  },
  other: {
    "geo.region": "PH",
    "geo.placename": "Manila",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <head>
        <link rel="me" href="https://www.linkedin.com/in/al-beltran/" />
        <link rel="me" href="https://github.com/codemoon2019" />
        <link rel="me" href="https://www.instagram.com/codebypawpu/" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${person.shortName} Blog RSS`}
          href="/feed.xml"
        />
      </head>
      <body className="bg-atmosphere flex min-h-full flex-col font-sans text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <PlausibleAnalytics />
      </body>
    </html>
  );
}
