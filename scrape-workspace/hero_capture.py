#!/home/lordwhitefire/piper/venv/bin/python3
"""Hero screenshot capture — attach to the owner's REAL Chrome over CDP :9222.

- Never headless, never launches a browser. Attaches to the running window.
- Opens ONE temporary tab in the existing context (existing tabs untouched).
- Viewport-only capture at 1280x800, above the fold, no full-page stitching.
- Waits for settle (network idle, else a couple of seconds) and waits out any
  challenge shell by DOM detection (the owner clicks through it live).
- Closes ONLY the temporary tab, then detaches. Chrome window stays reusable.

Usage: hero_capture.py <url> <output.png>
"""
import struct
import sys
import time

from playwright.sync_api import sync_playwright

CDP_URL = "http://127.0.0.1:9222"
VIEWPORT = {"width": 1280, "height": 800}

# Challenge shells detected by DOM, not by title words.
CHALLENGE_SELECTOR = (
    "iframe[src*='challenges.cloudflare.com'], "
    "iframe[src*='turnstile'], "
    "iframe[src*='recaptcha'], "
    "#challenge-stage, #challenge-running, .cf-turnstile, .g-recaptcha"
)

# Common consent/cookie banners — the owner dismisses these live.
CONSENT_SELECTOR = (
    "#onetrust-consent-sdk, #onetrust-banner-sdk, .cky-consent-container, "
    ".cky-btn-accept, .cookie-banner, [class*='cookie-consent'], "
    "[id*='cookie-banner'], iframe[src*='consent'], "
    "[class*='CybotCookiebot'], #CybotCookiebotDialogBodyEdgeMoreDetailLink"
)


def count(page, selector):
    try:
        return page.locator(selector).count()
    except Exception:
        return 0


def visible(page, selector):
    try:
        return page.locator(selector).first.is_visible()
    except Exception:
        return False


def main():
    if len(sys.argv) != 3:
        print("usage: hero_capture.py <url> <output.png>")
        return 2
    url, out = sys.argv[1], sys.argv[2]

    with sync_playwright() as pw:
        browser = pw.chromium.connect_over_cdp(CDP_URL)
        ctx = browser.contexts[0]
        page = ctx.new_page()  # the one temporary tab I own
        try:
            page.set_viewport_size(VIEWPORT)
            try:
                page.goto(url, wait_until="domcontentloaded", timeout=60000)
            except Exception as e:
                print(f"[goto-warning] {e}")

            # Settle: network idle, else fall through after a short wait.
            try:
                page.wait_for_load_state("networkidle", timeout=20000)
            except Exception:
                pass

            # Let the owner dismiss any consent banner live.
            consent_deadline = time.time() + 90
            while time.time() < consent_deadline:
                if not (count(page, CONSENT_SELECTOR) and visible(page, CONSENT_SELECTOR)):
                    break
                print("[waiting] consent banner visible — owner to dismiss...")
                page.wait_for_timeout(2000)

            # Wait out any challenge shell (owner clicks through, live).
            challenge_deadline = time.time() + 300
            while time.time() < challenge_deadline:
                if count(page, CHALLENGE_SELECTOR):
                    print("[waiting] challenge shell present — owner to clear...")
                    page.wait_for_timeout(2000)
                    continue
                break

            if count(page, CHALLENGE_SELECTOR):
                print("[fail] challenge still present after wait")
                return 3

            # Final settle for hero paint/animations/fonts.
            page.wait_for_timeout(2500)

            title = page.title()
            body_len = page.evaluate("document.body ? document.body.innerText.length : 0")
            ready = page.evaluate("document.readyState")

            page.screenshot(path=out, full_page=False, timeout=120000,
                            animations="disabled", caret="hide")

            with open(out, "rb") as f:
                head = f.read(33)
            w, h = struct.unpack(">II", head[16:24])
            print(f"[saved] {out} {w}x{h}")
            print(f"[title] {title}")
            print(f"[ready] {ready} bodyTextChars={body_len}")
            return 0
        finally:
            try:
                page.close()  # close ONLY my temporary tab
            except Exception:
                pass
            # Detach by exiting — never close the owner's browser window.


if __name__ == "__main__":
    sys.exit(main())
