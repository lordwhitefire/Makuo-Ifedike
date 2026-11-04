"use client";

import { useEffect } from "react";
import { reportClientError } from "@/lib/report-client-error";

/**
 * One listener for errors the browser raises outside React's render tree:
 * `window.error` and `unhandledrejection`. Mounted once in the root layout.
 * The five-per-page-load cap lives in reportClientError().
 */
export default function ErrorReporter() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      reportClientError({
        message: event.message || "Unknown error",
        stack: event.error instanceof Error ? event.error.stack : undefined,
      });
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason: unknown = event.reason;
      reportClientError({
        message:
          reason instanceof Error
            ? reason.message
            : String(reason || "Unhandled rejection"),
        stack: reason instanceof Error ? reason.stack : undefined,
      });
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
