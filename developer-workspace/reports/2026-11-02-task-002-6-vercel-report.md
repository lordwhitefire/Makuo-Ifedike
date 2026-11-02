# TASK-002 #6 — Vercel project + domain: report (2026-11-02)

## What was asked
Create the Vercel project, link it to the git repo, configure the domain
`makuo-ifedike.vercel.app`, enable HTTPS and preview deploys.
Benchmark: reachable at `https://makuo-ifedike.vercel.app` over HTTPS.

## What was done
- Vercel CLI 65.9.0 confirmed present and authenticated as `lordwhitefire`
  (owner installed it).
- Existing linked project `ifedike_makuo`
  (`prj_Dd0IiZJ5A0zQqS8xlMWmfcUrJ4sS`) renamed to `makuo-ifedike`.
- First production deploy failed on Vercel: clean install lacked `@types/node`,
  so `next build` type-check exited 1. Fixed by adding `@types/node`
  (`^26.6.6`) as a devDependency and syncing `package-lock.json` (which also
  dropped the unused packages removed in `4f38e2d`). Commit `5d208dd`.
- Second production deploy succeeded.
- Domains on project (verified): `makuo-ifedike.vercel.app`,
  `ifedikemakuo.vercel.app`.
- Git connection: `vercel git connect` →
  `github.com/lordwhitefire/Makuo-Ifedike`, production branch `main`.

## Verified
- `https://makuo-ifedike.vercel.app/` → HTTP 200, size 41187,
  title `Makuo Ifedike — I build and fix software for small businesses`,
  body contains `Milestones` and `why choose`.
- `http://makuo-ifedike.vercel.app/` → 308 redirect to HTTPS.
- `next build` passes locally.

## Not done / caveats
- The GitHub repo `Makuo-Ifedike` is empty (size 0); no code has been pushed.
  Production was deployed from the local CLI, not from git. Automatic git
  deploys will have no code until the repo is pushed (not done — no push
  instruction).
- The four Work images (`public/projects/work/*.png`) remain modified but
  uncommitted; a future git-based deploy would not include them until committed
  and pushed.
- Preview deploys use Vercel's default deployment protection
  (`vercel_authentication`), which is normal for team projects.
