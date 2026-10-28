#!/home/lordwhitefire/piper/venv/bin/python3
"""Capture the owner's public sites through the shared real Chrome window.

Attaches over CDP to the already-running Chrome on 127.0.0.1:9222, opens one
tab in that window (not a second window), waits for real content, and saves
HTML + screenshot + meta/JSON-LD/links per site. A challenge is never solved
silently: the script says so and waits for the owner to click through.
"""
import json
import os
import re
import sys
import time

from playwright.sync_api import sync_playwright

CDP_URL = "http://127.0.0.1:9222"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "captures", "sites")

SITES = [
    ("interior-deco", "https://interior-deco-kappa.vercel.app/"),
    ("truespec", "https://truespec-k4y6.vercel.app/"),
    ("athletica", "https://athletica-blond.vercel.app/"),
    ("cp3-legacy", "https://cp3-legacy.vercel.app/"),
    ("new-portfolio", "https://new-portfolio-eta-rouge.vercel.app/"),
    ("eliphany-ng", "https://eliphany-ng.vercel.app/"),
    ("eliphany-admin", "https://eliphany-admin.vercel.app/"),
    ("admin-demo", "https://admin-demo-seven.vercel.app/"),
    ("odin-landing-page", "https://odin-landing-page-chi.vercel.app/"),
    ("freecodecamp-project-4", "https://freecodecamp-project-4.vercel.app/"),
    ("freecodecamp2-1", "https://freecodecamp2-1.vercel.app/"),
    ("tailwind-web-portfolio", "https://tailwind-web-portfolio.vercel.app/"),
    ("github-pages-root", "https://lordwhitefire.github.io/"),
    ("domain-ifedike-victor", "https://ifedike-victor.vercel.app/"),
]

CHALLENGE_JS = """
() => {
  const body = document.body ? document.body.innerText.slice(0, 800) : '';
  const t = (document.title || '').toLowerCase();
  const cf = !!document.querySelector(
    '#challenge-form, #cf-challenge-running, .cf-browser-verification, ' +
    'iframe[src*="challenges.cloudflare.com"], #challenge-stage'
  );
  const turnstile = !!document.querySelector('iframe[src*="turnstile"], .cf-turnstile');
  const text = body.toLowerCase();
  const shell = (t.includes('just a moment') || t.includes('attention required') ||
                 text.includes('checking your browser') || text.includes('verify you are human') ||
                 text.includes('enable javascript and cookies'));
  return {cf, turnstile, shell, title: document.title, bodyStart: body.slice(0, 200)};
}
"""

META_JS = """
() => {
  const abs = (u) => { try { return new URL(u, location.href).href } catch (e) { return u } };
  const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map(s => s.textContent.trim());
  const anchors = [...document.querySelectorAll('a[href]')].map(a => ({
    href: abs(a.getAttribute('href')),
    text: (a.innerText || a.getAttribute('aria-label') || '').trim().replace(/\\s+/g, ' ').slice(0, 120)
  }));
  const meta = {};
  document.querySelectorAll('meta[name], meta[property]').forEach(m => {
    const k = m.getAttribute('name') || m.getAttribute('property');
    if (['description','og:title','og:description','og:url','og:site_name','og:image',
         'twitter:card','twitter:site','twitter:creator','author','application-name'].includes(k)) {
      meta[k] = m.getAttribute('content');
    }
  });
  const canonical = document.querySelector('link[rel="canonical"]');
  return {
    title: document.title,
    meta,
    canonical: canonical ? abs(canonical.getAttribute('href')) : null,
    jsonld,
    anchors,
    h1: [...document.querySelectorAll('h1')].map(h => h.innerText.trim()).slice(0, 5),
    h2: [...document.querySelectorAll('h2')].map(h => h.innerText.trim()).slice(0, 12),
    bodyText: document.body ? document.body.innerText.replace(/\\n{3,}/g, '\\n\\n').slice(0, 8000) : ''
  };
}
"""


def main():
    os.makedirs(OUT, exist_ok=True)
    results = []
    with sync_playwright() as pw:
        browser = pw.chromium.connect_over_cdp(CDP_URL)
        ctx = browser.contexts[0] if browser.contexts else browser.new_context()
        page = ctx.new_page()
        page.set_default_timeout(45000)
        for name, url in SITES:
            rec = {"name": name, "url": url, "status": None}
            print(f"\n=== {name} — {url}")
            try:
                resp = page.goto(url, wait_until="domcontentloaded", timeout=45000)
                rec["status"] = resp.status if resp else None
            except Exception as e:
                rec["goto_error"] = str(e)[:300]
            # Wait for real content, letting the owner clear anything in the window.
            deadline = time.time() + 240
            challenge_seen = False
            while time.time() < deadline:
                try:
                    st = page.evaluate(CHALLENGE_JS)
                except Exception:
                    time.sleep(2)
                    continue
                if st.get("cf") or st.get("turnstile") or st.get("shell"):
                    if not challenge_seen:
                        challenge_seen = True
                        print(">>> CHALLENGE / verification page — click through in the Chrome window")
                    time.sleep(3)
                    continue
                break
            rec["challenge_seen"] = challenge_seen
            rec["final_url"] = page.url
            try:
                rec["meta"] = page.evaluate(META_JS)
            except Exception as e:
                rec["meta_error"] = str(e)[:200]
            d = os.path.join(OUT, name)
            os.makedirs(d, exist_ok=True)
            try:
                open(os.path.join(d, "page.html"), "w", errors="replace").write(page.content())
            except Exception as e:
                rec["html_error"] = str(e)[:200]
            try:
                page.screenshot(path=os.path.join(d, "viewport.png"), full_page=False)
                page.screenshot(path=os.path.join(d, "full.png"), full_page=True)
            except Exception as e:
                rec["shot_error"] = str(e)[:200]
            json.dump(rec, open(os.path.join(d, "meta.json"), "w"), indent=2)
            m = rec.get("meta", {})
            print(f"    status={rec['status']} final={rec.get('final_url')}")
            print(f"    title={m.get('title')!r} jsonld={len(m.get('jsonld', []))} anchors={len(m.get('anchors', []))}")
            results.append(rec)
        page.close()
    json.dump(results, open(os.path.join(OUT, "browser-capture.json"), "w"), indent=2)
    print("\nDONE", len(results), "sites")


if __name__ == "__main__":
    sys.exit(main())
