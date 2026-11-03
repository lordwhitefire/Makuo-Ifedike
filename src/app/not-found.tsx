import type { Metadata } from "next";
import Link from "next/link";

const notFoundTitle = "404 — Page not found — Makuo Ifedike";
const notFoundDescription =
  "The page you're looking for isn't here. Makuo Ifedike builds and fixes software for small businesses. See the work at https://makuo-ifedike.vercel.app/";

export const metadata: Metadata = {
  title: notFoundTitle,
  description: notFoundDescription,
  alternates: {
    canonical: "/404",
  },
  openGraph: {
    title: notFoundTitle,
    description: "The page you're looking for isn't here.",
    url: "/404",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: notFoundTitle,
    description: "The page you're looking for isn't here.",
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-24 text-foreground">
      <div className="w-full max-w-[640px] text-center">
        <p className="font-display text-7xl font-bold leading-none text-primary sm:text-8xl">
          404
        </p>
        <h1 className="mt-6 font-display text-3xl font-bold text-white sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-foreground">
          The page you&apos;re looking for isn&apos;t here. The work is on the
          home page.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-primary hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
