import type { Metadata } from "next";
import { Inter, Poppins, Zilla_Slab } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";

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

export const metadata: Metadata = {
  title: "Makuo Ifedike — I build and fix software for small businesses",
  description:
    "Makuo Ifedike is a self-taught frontend engineer in Onitsha, Nigeria, building for the web since 2022. I build marketing sites, web apps, and fix slow or half-built systems for small businesses.",
  keywords: [
    "Makuo Ifedike",
    "portfolio",
    "web developer",
    "Next.js",
    "marketing sites",
    "web apps",
  ],
  authors: [{ name: "Makuo Ifedike" }],
  openGraph: {
    title: "Makuo Ifedike — I build and fix software for small businesses",
    description:
      "Makuo Ifedike is a self-taught frontend engineer in Onitsha, Nigeria, building for the web since 2022. I build marketing sites, web apps, and fix slow or half-built systems for small businesses.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Makuo Ifedike — Portfolio",
    description:
      "Makuo Ifedike is a self-taught frontend engineer in Onitsha, Nigeria, building for the web since 2022.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} ${zillaSlab.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}