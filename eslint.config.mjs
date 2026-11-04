/**
 * Flat config for `npm run lint`.
 *
 * eslint-config-next exports a plain array of Linter.Config entries; its
 * `core-web-vitals` entry is the baseline config plus the Web Vitals rules,
 * so spreading it is the whole configuration. Before this file existed the
 * repo had no ESLint config at all, and `eslint .` failed before checking a
 * single file.
 *
 * `ignores` keeps the run on this repo's own code: the `twitter-` data
 * exports are someone else's scraped JavaScript, deliberately untracked,
 * and not ours to lint. `.next` is build output.
 */
import coreWebVitals from "eslint-config-next/core-web-vitals";

export default [
  { ignores: ["twitter-*/**", ".next/**", "*.bak"] },
  ...coreWebVitals,
];
