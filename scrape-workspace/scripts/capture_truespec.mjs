// capture_truespec.mjs — one-shot above-the-fold screenshot of the live site
// https://truespec-k4y6.vercel.app/ for the owner's portfolio hero.
//
// Discipline (from the parent scraper + browser-attach skill):
//  - Attach ONLY to the owner's visible Chrome on CDP 127.0.0.1:9222. Never launch.
//  - Never headless (refuse if UA says Headless).
//  - Confirm the automation profile owns the CDP port.
//  - One temporary tab owned by this job; the owner's tabs are never touched.
//  - Viewport 1280x800, viewport-only capture (no full-page scroll).
//  - Challenge shells are detected by DOM, never by title text.
//  - Detach in a finally; the window and its tabs stay open.

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const CDP_PORT = 9222;
const CDP_URL = `http://127.0.0.1:${CDP_PORT}`;
const AUTOMATION_PROFILE = "google-chrome-automation";
const SKILL_NODE_MODULES = "/home/lordwhitefire/.agents/skills/browser-attach/node_modules";

const URL = "https://truespec-k4y6.vercel.app/";
const OUT = "/home/lordwhitefire/current-project/ifedike_makuo/public/projects/truespec.png";
const WIDTH = 1280;
const HEIGHT = 800;

function log(msg) {
  console.log(`[capture] ${msg}`);
}

function cdpAlive(timeout = 1500) {
  return new Promise((resolve) => {
    const req = http.get(`${CDP_URL}/json/version`, (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(timeout, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function chromiumCount() {
  let out = "";
  try {
    out = execFileSync("ps", ["-eo", "args"], { encoding: "utf8" });
  } catch {
    return 0;
  }
  return out
    .split("\n")
    .filter(
      (line) =>
        /(google-chrome|chromium)/.test(line) &&
        !/--type=/.test(line) &&
        new RegExp(`--remote-debugging-port=${CDP_PORT}(\\s|$)`).test(line),
    ).length;
}

function assertAutomationProfile() {
  let out = "";
  try {
    out = execFileSync("ps", ["-eo", "args"], { encoding: "utf8" });
  } catch {
    throw new Error("cannot read the process list to confirm the browser is ours");
  }
  const line = out
    .split("\n")
    .find(
      (l) =>
        /(google-chrome|chromium)/.test(l) &&
        !/--type=/.test(l) &&
        new RegExp(`--remote-debugging-port=${CDP_PORT}(\\s|$)`).test(l),
    );
  if (!line) throw new Error(`no automation browser on CDP ${CDP_PORT}`);
  if (!line.includes(AUTOMATION_PROFILE)) {
    throw new Error(
      `the browser on CDP ${CDP_PORT} is not the automation profile (${AUTOMATION_PROFILE}) — that is not ours`,
    );
  }
}

async function loadChromium() {
  const candidates = [
    pathToFileURL(path.join(SKILL_NODE_MODULES, "playwright-core", "index.mjs")).href,
    "playwright-core",
  ];
  for (const spec of candidates) {
    try {
      const mod = await import(spec);
      if (mod.chromium) return mod.chromium;
    } catch {
      /* try next */
    }
  }
  throw new Error("playwright-core not found");
}

async function main() {
  if (!(await cdpAlive())) {
    throw new Error(`no Chrome on CDP ${CDP_URL} — cannot capture without the visible Chrome`);
  }
  assertAutomationProfile();
  const before = chromiumCount();
  log(`automation browser processes before: ${before}`);

  const chromium = await loadChromium();
  let browser;
  let page = null;
  let emuSession = null;
  try {
    browser = await chromium.connectOverCDP(CDP_URL, { timeout: 15000 });

    // Ours + not headless.
    const bsession = await browser.newBrowserCDPSession();
    let ua;
    try {
      ({ userAgent: ua } = await bsession.send("Browser.getVersion"));
    } finally {
      await bsession.detach().catch(() => {});
    }
    if (/Headless/i.test(ua)) {
      throw new Error("the Chrome on CDP 9222 is headless — that is not ours");
    }
    log(`attached; UA has no Headless`);

    // Owner's tabs: record count so we can prove we never touch them.
    const ownerTabs = browser.contexts().flatMap((c) => c.pages());
    log(`open tabs before: ${ownerTabs.length} — none of these will be navigated or closed`);

    // One tab owned by this job.
    const context = browser.contexts()[0];
    if (!context) throw new Error("the attached browser has no default context");
    page = await context.newPage();
    try {
      await page.evaluate(() => {
        window.name = "scraper:truespec-capture";
      });
    } catch {
      /* tagging is best-effort */
    }

    // Viewport 1280x800, deviceScaleFactor 1 — viewport-only capture, no full-page.
    emuSession = await page.context().newCDPSession(page);
    await emuSession.send("Emulation.setDeviceMetricsOverride", {
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // Navigate.
    try {
      await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
    } catch (e) {
      throw new Error(`navigation failed: ${e.message}`);
    }

    // Wait for the page to settle: network idle (bounded), then a couple of seconds.
    try {
      await page.waitForLoadState("networkidle", { timeout: 45000 });
      log("network idle reached");
    } catch {
      log("network idle not reached within 45s — falling back to fixed settle");
      await page.waitForTimeout(3000);
    }
    await page.waitForTimeout(2000);

    // Challenge-shell detection by DOM, never by title.
    const challengeSelector =
      "iframe[src*='challenges.cloudflare.com'], iframe[src*='turnstile'], " +
      "#challenge-stage, .cf-turnstile, #challenge-running, .cf-browser-verification, " +
      "[class*='captcha'], #challenge-form";
    let challenge = await page.locator(challengeSelector).count();
    if (challenge > 0) {
      log(`challenge shell detected (${challenge}) — waiting for the owner to clear it...`);
      const deadline = Date.now() + 120000;
      while (Date.now() < deadline) {
        await page.waitForTimeout(3000);
        challenge = await page.locator(challengeSelector).count();
        if (challenge === 0) break;
      }
      if (challenge > 0) {
        throw new Error("challenge shell still present after 120s — not capturing");
      }
      log("challenge cleared");
      await page.waitForTimeout(2000);
    }

    // Prove real content before capturing: title, URL, some visible text.
    const finalUrl = page.url();
    const title = await page.title();
    const bodyText = (await page.evaluate(() => document.body ? document.body.innerText : "")) || "";
    const h1 = await page.evaluate(() => {
      const el = document.querySelector("h1");
      return el ? el.innerText.trim() : "";
    });
    const errorish = /^(404|error|not found|page not found|site can'?t be reached)/i.test(title.trim());
    if (errorish || (!finalUrl.includes("truespec") && bodyText.trim().length < 200)) {
      throw new Error(
        `page does not look like the real site — url=${finalUrl} title="${title}" bodyLen=${bodyText.trim().length}`,
      );
    }

    log(`final url: ${finalUrl}`);
    log(`title: ${title}`);
    log(`h1: ${h1}`);
    log(`body text length: ${bodyText.trim().length}`);
    log(`body preview: ${bodyText.trim().slice(0, 240).replace(/\s+/g, " ")}`);

    if (bodyText.trim().length < 50) {
      throw new Error("body has almost no text — page may not have rendered");
    }

    // Viewport-only capture (fullPage defaults to false).
    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    await page.screenshot({ path: OUT, fullPage: false });
    log(`screenshot written: ${OUT}`);
  } finally {
    // Close only the tab this job created. Never the owner's tabs.
    if (page) {
      try {
        await page.close();
        log("job tab closed");
      } catch {
        /* already gone */
      }
    }
    if (emuSession) {
      await emuSession.detach().catch(() => {});
    }
    if (browser) {
      try {
        await browser.close(); // detach only
      } catch {
        /* already detached */
      }
    }
    const after = chromiumCount();
    log(`automation browser processes after: ${after} (before: ${before})`);
  }
}

main().catch((err) => {
  console.error(`[capture] STOP: ${err.message}`);
  process.exit(1);
});
