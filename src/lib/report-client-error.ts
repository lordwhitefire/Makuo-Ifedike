/**
 * Sends one visitor-facing error to /api/client-errors so it lands in the
 * server log (Vercel). Only ever four fields — never anything the visitor
 * typed into a form.
 *
 * Capped per page load: five reports, then silence. The cap is module state,
 * so a new page load starts a fresh count and a crash loop cannot flood the
 * log.
 */
export type ClientErrorPayload = {
  message: string;
  stack?: string;
  url?: string;
  userAgent?: string;
};

const ENDPOINT = "/api/client-errors";
const MAX_REPORTS = 5;

let sent = 0;

function clip(value: string | undefined, max: number): string | undefined {
  return value ? value.slice(0, max) : undefined;
}

export function reportClientError(payload: ClientErrorPayload): void {
  if (typeof window === "undefined") return;
  if (sent >= MAX_REPORTS) return;
  sent += 1;

  const body = JSON.stringify({
    message: clip(payload.message, 500) ?? "Unknown error",
    stack: clip(payload.stack, 2_000),
    url: clip(payload.url ?? window.location.pathname, 500),
    userAgent: clip(payload.userAgent ?? navigator.userAgent, 300),
  });

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(ENDPOINT, blob);
      return;
    }
  } catch {
    // Fall through to fetch.
  }

  void fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // Reporting must never throw into the page.
  });
}
