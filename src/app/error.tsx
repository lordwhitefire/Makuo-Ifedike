"use client";

import { useEffect } from "react";
import Link from "next/link";
import { reportClientError } from "@/lib/report-client-error";

/**
 * Route-level fallback. Rendered inside the root layout, so the theme applies.
 * The visitor sees a heading and one reload link — never the error text.
 */
export default function RouteError({
  error,
}: {
  error: unknown;
}) {
  useEffect(() => {
    console.error("[app] route error", error);
    reportClientError({
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#141414] px-6 text-center">
      <h1 className="font-display text-3xl font-bold text-[#f58344]">
        Something went wrong
      </h1>
      <Link
        href="/"
        className="mt-8 inline-block bg-[#f58344] px-5 py-3 text-sm font-semibold text-[#1a1613]"
      >
        Reload the page
      </Link>
    </main>
  );
}
