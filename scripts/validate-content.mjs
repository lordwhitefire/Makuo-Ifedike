import { readFileSync } from "fs";

const ROOT = new URL(".", import.meta.url).pathname;
const projectsPath = new URL("../src/content/projects.ts", import.meta.url);

let failures = 0;
function fail(msg) {
  failures += 1;
  console.error(`FAIL: ${msg}`);
}
function pass(msg) {
  console.log(`ok: ${msg}`);
}

/* Minimal TS stripping: strip import/export and type annotations are not
   needed here — we only need the runtime object literal. projects.ts is a
   plain object literal after stripping `import type ...` and the
   `export const ... = ` wrapper. */
function stripTS(source) {
  return source
    .replace(/^import type \{.*?\} from ".*?";/gm, "")
    .replace(/^export const (projects|displayOrder): .*? = /gm, "exports.$1 = ")
    .replace(/;export \{.*?\}$/m, "");
}

let projects;
try {
  const source = readFileSync(projectsPath, "utf8");
  const stripped = stripTS(source);
  /* eslint-disable no-eval */
  const mod = { exports: {} };
  new Function("module", "exports", stripped)(mod, mod.exports);
  projects = mod.exports.projects;
} catch (err) {
  fail(`could not load projects.ts: ${err.message}`);
  process.exit(1);
}

// 1. Exactly four records
const slugs = Object.keys(projects);
if (slugs.length !== 4) {
  fail(`expected 4 project records, got ${slugs.length}`);
} else {
  pass(`exactly 4 project records: ${slugs.join(", ")}`);
}

// 2. Truespec listed first (flagship)
if (slugs[0] === "truespec") {
  pass("Truespec listed first (flagship)");
} else {
  fail(`Truespec must be listed first, but first is ${slugs[0]}`);
}

// 3. Required fields present on every record
const required = [
  "name",
  "slug",
  "summary",
  "category",
  "filter",
  "status",
  "featured",
  "dates",
  "stack",
  "repoUrl",
  "liveUrl",
  "images",
  "testimonial",
  "caseStudy",
];
for (const slug of slugs) {
  const p = projects[slug];
  for (const field of required) {
    if (!(field in p)) {
      fail(`${slug}: missing required field "${field}"`);
    }
  }
  if (p.images && !("card" in p.images)) {
    fail(`${slug}: images.card missing`);
  }
  if (p.images && !("hero" in p.images)) {
    fail(`${slug}: images.hero missing`);
  }
  if (p.caseStudy) {
    for (const f of ["problem", "constraints", "approach", "outcome", "liveLink"]) {
      if (!(f in p.caseStudy)) {
        fail(`${slug}: caseStudy.${f} missing`);
      }
    }
  }
}
if (failures === 0) {
  // only report this field check if no prior field failures
  pass("all required fields present on all four records");
}

// 4. Status enum
const validStatus = new Set(["live", "in-progress"]);
for (const slug of slugs) {
  if (!validStatus.has(projects[slug].status)) {
    fail(`${slug}: invalid status "${projects[slug].status}"`);
  }
}
if ([...slugs].every((s) => validStatus.has(projects[s].status))) {
  pass("all status values are live or in-progress");
}

// 5. Filter enum
const validFilter = new Set(["marketing-site", "web-app"]);
for (const slug of slugs) {
  if (!validFilter.has(projects[slug].filter)) {
    fail(`${slug}: invalid filter "${projects[slug].filter}"`);
  }
}
if ([...slugs].every((s) => validFilter.has(projects[s].filter))) {
  pass("all filter values are marketing-site or web-app");
}

// 6. Featured: exactly Truespec
const featured = slugs.filter((s) => projects[s].featured === true);
if (featured.length === 1 && featured[0] === "truespec") {
  pass("Truespec is the only featured project");
} else {
  fail(`featured projects should be exactly [truespec], got ${JSON.stringify(featured)}`);
}

// 7. Testimonial null for all four
for (const slug of slugs) {
  if (projects[slug].testimonial !== null) {
    fail(`${slug}: testimonial must be null, got ${JSON.stringify(projects[slug].testimonial)}`);
  }
}
if (slugs.every((s) => projects[s].testimonial === null)) {
  pass("testimonial is null for all four records");
}

// 8. No localhost URLs anywhere
let localhostFound = false;
for (const slug of slugs) {
  const p = projects[slug];
  const strings = [p.liveUrl, p.repoUrl, p.images.card, p.images.hero, p.caseStudy.liveLink];
  for (const s of strings) {
    if (s && s.startsWith("http://localhost")) {
      fail(`${slug}: localhost URL found: ${s}`);
      localhostFound = true;
    }
  }
}
if (!localhostFound) {
  pass("no localhost URLs in project records");
}

// 9. Canonical domain: all live URLs use makuo-ifedike.vercel.app (projects' own
//    live URLs point at their own Vercel subdomains, which is correct — this
//    check guards against the stray ifedikemakuo domain appearing).
const stray = "ifedikemakuo.vercel.app";
for (const slug of slugs) {
  const p = projects[slug];
  for (const key of ["liveUrl", "repoUrl"]) {
    if (p[key] && p[key].includes(stray)) {
      fail(`${slug}: stray domain ${stray} in ${key}: ${p[key]}`);
    }
  }
}
pass(`stray domain ${stray} absent from project records`);

// 10. dates.created present, no "launched" label
for (const slug of slugs) {
  const d = projects[slug].dates;
  if (!d || typeof d.created !== "string") {
    fail(`${slug}: dates.created missing or not a string`);
  }
  if (d && d.launched !== undefined) {
    fail(`${slug}: dates must not contain a "launched" field`);
  }
}
pass("dates.created present on all records; no launched field");

console.log(
  failures === 0
    ? `\nvalidate-content: ALL CHECKS PASSED`
    : `\nvalidate-content: ${failures} CHECK(S) FAILED`,
);
process.exit(failures === 0 ? 0 : 1);
