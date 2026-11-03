"use client";

import { useEffect } from "react";
import { inject } from "@vercel/analytics";
import { trackEvent } from "@/lib/analytics";

// Once per document load. Module state is fresh on every hard load, and the
// guard also absorbs React StrictMode's dev-only double effect invocation.
let pageViewFired = false;

/**
 * Single analytics instrumentation point for every route.
 *
 * inject() defines window.va and loads the Vercel Web Analytics script without
 * auto-tracking page views (disableAutoTrack), so page_view is reported once by
 * our own track() call below rather than double-counted. Web Analytics is
 * cookieless, so no cookie banner is needed.
 */
export default function Analytics() {
  useEffect(() => {
    inject({ mode: "auto", disableAutoTrack: true });
    if (pageViewFired) return;
    pageViewFired = true;
    trackEvent("page_view");
  }, []);

  return null;
}
