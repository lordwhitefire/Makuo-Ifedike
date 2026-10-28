import type { Metadata } from "next";
import { Inter, Poppins, Zilla_Slab } from "next/font/google";
import "./globals.css";

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
  title: "Whitefire — Web apps & marketing sites, built for clients",
  description:
    "Portfolio of Whitefire — full-stack work for clients: marketing sites, inventory platforms, and in-progress product builds.",
  keywords: [
    "Whitefire",
    "portfolio",
    "web developer",
    "Next.js",
    "marketing sites",
    "inventory app",
  ],
  authors: [{ name: "Whitefire" }],
  openGraph: {
    title: "Whitefire — Web apps & marketing sites, built for clients",
    description:
      "Selected work: Interior-deco marketing site, Truespec inventory app, plus in-progress builds.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whitefire — Portfolio",
    description:
      "Selected work: marketing sites, inventory apps, and in-progress product builds.",
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