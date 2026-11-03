import { track } from "@vercel/analytics";

/**
 * Track a custom analytics event safely.
 *
 * No-ops on the server (typeof window === "undefined") so it can be imported
 * from any module without breaking SSR. Swallows track() errors so an
 * unconfigured or blocked analytics endpoint never crashes the page.
 *
 * Properties must be flat: values are string | number | boolean | null.
 * No nested objects. No personal data (no names, emails, IPs).
 */
export function trackEvent(
  name: string,
  properties?: Record<string, string | number | boolean | null>
) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    track(name, properties);
  } catch {
    // Analytics must never break the page.
  }
}
