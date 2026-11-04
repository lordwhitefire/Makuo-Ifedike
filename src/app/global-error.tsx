"use client";

import { useEffect } from "react";
import { reportClientError } from "@/lib/report-client-error";

/**
 * Root fallback. Replaces the root layout when that itself fails, so it
 * carries its own <html>/<body> and inline styles — the stylesheet and fonts
 * may not be available here.
 */
export default function GlobalError({ error }: { error: unknown }) {
  useEffect(() => {
    console.error("[app] global error", error);
    reportClientError({
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#141414",
          color: "#ffffff",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: 0, color: "#f58344", fontSize: "30px" }}>
            Something went wrong
          </h1>
          {/* A plain anchor, not next/link: this file replaces the root
              layout and must render when the router itself is unusable. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- reload must not depend on the router being healthy */}
          <a
            href="/"
            style={{
              background: "#f58344",
              color: "#1a1613",
              padding: "12px 20px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Reload the page
          </a>
        </main>
      </body>
    </html>
  );
}
