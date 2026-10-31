import { CDP_URL, attach, takeTabs, resize, detach } from "/home/lordwhitefire/.agents/skills/browser-attach/scripts/attach.mjs";

const REF_URL = "http://localhost:3211/andle-portfolio.html";
const BUILD_URL = "http://localhost:3009/";

// Capture full runtime HTML of a page
async function captureRuntime(page, label) {
  await page.goto(page.url(), { waitUntil: "domcontentloaded" });
  // Give React time to hydrate
  await page.waitForTimeout(1500);
  
  const html = await page.content();
  const title = await page.title();
  const url = page.url();
  
  // Get all external resources (CSS, JS) referenced in the head
  const resources = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    return {
      css: links.map(l => l.href),
      js: scripts.map(s => s.src),
    };
  });
  
  return { url, title, html, resources, htmlLength: html.length };
}

async function main() {
  const browser = await attach();
  try {
    const tabs = await takeTabs(browser, ["ref", "build"]);
    const refPage = tabs.ref;
    const buildPage = tabs.build;
    
    // Navigate ref to reference HTML
    await refPage.goto(REF_URL, { waitUntil: "domcontentloaded" });
    await refPage.waitForTimeout(1500);
    
    // Navigate build to Next.js app
    await buildPage.goto(BUILD_URL, { waitUntil: "domcontentloaded" });
    await buildPage.waitForTimeout(1500);
    
    const ref = await captureRuntime(refPage, "ref");
    const build = await captureRuntime(buildPage, "build");
    
    console.log("=== RUNTIME PARITY COMPARISON ===");
    console.log(`Reference URL: ${ref.url}`);
    console.log(`Build URL:     ${build.url}`);
    console.log(`Reference title: ${ref.title}`);
    console.log(`Build title:     ${build.title}`);
    console.log(`Reference HTML length: ${ref.htmlLength}`);
    console.log(`Build HTML length:     ${build.htmlLength}`);
    console.log(`HTML identical: ${ref.html === build.html}`);
    
    // Check key content markers
    const checks = [
      ["Makuo Ifedike title", /Makuo Ifedike — I build and fix/],
      ["Footer credit", /Makuo Ifedike built by whitefire/],
      ["No Ifedike Victor", /Ifedike Victor/],
      ["No noindex", /noindex/],
      ["Twitter x.com", /x\.com\/lwhitefire/],
      ["No wa.me", /wa\.me/],
      ["Next.js logo", /nextdotjs/],
      ["Counter complete", /complete & shipped/],
      ["Counter development", /in active development/],
    ];
    
    console.log("\n=== CONTENT CHECKS ===");
    for (const [name, regex] of checks) {
      const refHas = regex.test(ref.html);
      const buildHas = regex.test(build.html);
      const status = refHas === buildHas ? "MATCH" : "MISMATCH";
      console.log(`${status}: ${name} — ref: ${refHas}, build: ${buildHas}`);
    }
    
    // Check logo count
    const refLogos = (ref.html.match(/logos\//g) || []).length;
    const buildLogos = (build.html.match(/logos\//g) || []).length;
    console.log(`\nLogo references — ref: ${refLogos}, build: ${buildLogos}, match: ${refLogos === buildLogos}`);
    
    // Check CSS resource count
    console.log(`\nCSS resources — ref: ${ref.resources.css.length}, build: ${build.resources.css.length}`);
    console.log(`JS resources — ref: ${ref.resources.js.length}, build: ${build.resources.js.length}`);
    
    const structureMatch = ref.html === build.html;
    console.log(`\n=== RUNTIME PARITY VERDICT: ${structureMatch ? "IDENTICAL" : "DIFFERENT"} ===`);
    console.log(`Note: Static HTML vs Next.js React app will differ in structure by design.`);
    console.log(`Key content markers all match: ${checks.every(([_, regex]) => regex.test(ref.html) === regex.test(build.html))}`);
    
  } finally {
    await detach(browser);
  }
}

main().catch((err) => {
  console.error("STOP:", err.message);
  process.exit(1);
});
