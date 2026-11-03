import type { Metadata } from "next";
import { Inter, Poppins, Zilla_Slab } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import { identity } from "@/content/identity";
import { buildStructuredData } from "@/content/structured-data";
import Analytics from "@/components/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const zillaSlab = Zilla_Slab({
  variable: "--font-zilla",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteName = "Makuo Ifedike — Portfolio";
const homeTitle =
  "Makuo Ifedike — I build and fix software for small businesses";
const homeDescription =
  "Makuo Ifedike is a self-taught frontend engineer in Onitsha, Nigeria, building for the web since 2022. I build marketing sites, web apps, and fix slow or half-built systems for small businesses. Two live projects: Interior-deco and Truespec; two in progress: Athletica and CP3-legacy.";
const openGraphDescription =
  "Self-taught frontend engineer in Onitsha, Nigeria, building for the web since 2022. I build and fix software for small businesses — marketing sites, web apps, and systems that are slow or half-built.";
const twitterDescription =
  "Self-taught frontend engineer in Onitsha, Nigeria, building for the web since 2022.";

export const metadata: Metadata = {
  metadataBase: new URL(identity.url),
  title: homeTitle,
  description: homeDescription,
  applicationName: siteName,
  authors: [{ name: identity.name, url: identity.url }],
  keywords: [
    "Makuo Ifedike",
    "portfolio",
    "web developer",
    "Next.js",
    "marketing sites",
    "web apps",
  ],
  alternates: {
    canonical: identity.url,
  },
  openGraph: {
    title: homeTitle,
    description: openGraphDescription,
    url: identity.url,
    siteName,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: identity.image,
        width: 1122,
        height: 1402,
        alt: identity.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: twitterDescription,
    creator: "@lwhitefire",
    images: [identity.image],
  },
};

const structuredDataJson = JSON.stringify(buildStructuredData()).replace(
  /</g,
  "\\u003c",
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${zillaSlab.variable} antialiased bg-background text-foreground`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}