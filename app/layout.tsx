import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SiteNav } from "@/components/layout/site-nav";
import { Footer } from "@/components/layout/footer";
import { PlausibleAnalytics } from "@/components/layout/plausible";
import { RecruiterProvider } from "@/components/layout/recruiter-provider";
import { CustomCursor } from "@/components/layout/custom-cursor";
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

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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
    "Al Andrew Paul Teodosio Beltran",
    "Software Engineer",
    "Software Engineering Lead",
    "Full-Stack Software Engineer",
    "Software Engineer Philippines",
    "React",
    "TypeScript",
    "JavaScript",
    "Java",
    "Spring Boot",
    "Node.js",
    "Next.js",
    "PHP",
    "Laravel",
    "AEM",
    "Adobe Experience Manager",
    "AWS",
    "Anglian Dental",
    "Google via High Spring",
    "Myridius",
    "Momentra Labs",
  ],
  authors: [{ name: person.name, url: `${SITE_URL}/author/al-beltran/` }],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-PH"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} dark h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(new URLSearchParams(location.search).get("view")==="recruiter"||localStorage.getItem("albeltran-recruiter")==="1")document.documentElement.classList.add("recruiter")}catch(e){}`,
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="me" href="https://www.linkedin.com/in/al-beltran/" />
        <link rel="me" href="https://github.com/codemoon2019" />
        <link rel="me" href="https://www.instagram.com/codebypawpu/" />
        <link
          rel="alternate"
          type="text/plain"
          title={`${person.shortName} identity for language models`}
          href="/llms.txt"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${person.shortName} Blog RSS`}
          href="/feed.xml"
        />
      </head>
      <body className="bg-background flex min-h-full flex-col font-sans text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <RecruiterProvider>
          <CustomCursor />
          <SiteNav />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </RecruiterProvider>
        <PlausibleAnalytics />
      </body>
    </html>
  );
}
