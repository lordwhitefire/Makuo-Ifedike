# TASK-004 verification log

## Task 1 — engagement off, contact launcher, privacy, honest 503

Date: 2026-11-03

Files changed:
- `src/components/EngagementLayer.tsx` — `ENGAGEMENT_ENABLED = false`; inner component unchanged.
- `src/components/ContactLauncher.tsx` — new round trigger + accessible dialog form.
- `src/app/privacy/page.tsx` — new privacy page.
- `src/app/api/inquiries/route.ts` — validates the payload, honeypot, returns `503` until adapters exist.
- `src/app/page.tsx` — renders `ContactLauncher`; removes the two work-card `title` tooltips.

### Static checks

```
npx tsc --noEmit          -> pass
npm run validate:content  -> all 10 checks pass
npx next build            -> pass
```

Build routes: `/` static, `/privacy` static, `/api/inquiries` dynamic, `/_not-found` default
(Task 4 replaces it).

### Dev-server checks (port 3000)

- `/` -> 200; `/privacy` -> 200.
- No `#engagement-bubble` in the rendered HTML; no work-card `title`; no
  `ifedikemakuo` anywhere.
- `POST /api/inquiries` invalid -> 400 with per-field errors.
- `POST /api/inquiries` valid -> 503
  `{"error":"not_configured","fallbackEmail":"mifedike@gmail.com"}`.
- Honeypot filled -> 200 silent, nothing sent.

### Browser check (visible Chrome on CDP :9222, not headless)

- Before: no bubble/banner/panel, no prompt text, 0 work-card tooltips, trigger present,
  contact dialog absent.
- Click trigger: dialog visible, title "Tell me what you need", 7 inputs/selects + 1
  checkbox, focus on `name`, body scroll locked.
- Escape: dialog removed, focus back on the "Contact Makuo" trigger, body scroll restored.
  Trigger carries `aria-disabled="true"` during the 20s cooldown (focusable on purpose so
  focus can return).
- Submit a complete form: 503 fallback message shown in the dialog —
  "The form isn't connected yet. Email mifedike@gmail.com directly." Form stays available.

### Not verified

- Google Sheets append, Resend owner email, Resend auto-reply, Twilio WhatsApp alert.
  No credentials exist and `google-auth-library` is not installed yet (Task 2).
- Live form success path. Task 2 adds adapters; without env keys it must keep returning the
  honest 503.

### Note

- The trigger sits above the back-to-top button (`bottom-[70px] right-[20px]` mobile,
  `bottom-[115px] right-[50px]` desktop) so the two fixed controls do not overlap.

## Task 2 — inquiry model, validation, adapters, env example

Date: 2026-11-03

Files changed:
- `src/content/inquiries.ts` — typed fields, option lists (slug + label), label helpers;
  status flow and analytics definitions unchanged.
- `src/lib/inquiries/validation.ts` — new; allowlisted shape, lengths, enum values, email,
  http(s) link, consent.
- `src/lib/inquiries/adapters.ts` — new; Google Sheets, Resend owner email, Resend auto-reply,
  Twilio WhatsApp; all env-gated.
- `src/app/api/inquiries/route.ts` — validation, honeypot, 5-per-10-minute in-memory rate
  limit, 16KB declared-size cap, delivery result.
- `src/components/ContactLauncher.tsx` — options imported from the model; visible labels
  unchanged; posts slugs.
- `.env.example` — key names only, no values.
- `.gitignore` — `!.env.example` so the example can be committed.
- `package.json` / `package-lock.json` — `google-auth-library`.

Behaviour:
- Google Sheets appends one row to `Portfolio Inquiries` with `valueInputOption=RAW`
  (blocks formula injection).
- Owner subject: `[PORTFOLIO] New inquiry — {name}` (newlines collapsed).
- Visitor auto-reply runs only after at least one owner adapter succeeds; first line is
  `Thanks — I'll reply within one business day.`
- WhatsApp alert starts `[PORTFOLIO] New inquiry`; `whatsapp:` prefix normalized.
- No owner adapter keys: `503` fallback, no auto-reply.
- Owner keys present but every owner send fails: `502` `delivery_failed` plus fallback,
  no auto-reply.

### Verification

- `npx tsc --noEmit` pass; `npm run validate:content` pass; `npx next build` pass.
- Curl: invalid body `400` with field errors; honeypot `200`; valid body `503`;
  `ftp://` link `400`; missing consent `400`.
- Rate limit: five `503` responses, sixth `429` with `retryAfter: 600`.
- Dev log: all four adapters skipped with missing-key reasons; auto-reply skipped because no
  owner adapter is configured.
- Browser: option labels unchanged (`marketing site`, `Under ₦500k`, `ASAP`, …), values are
  slugs; a complete form submit shows the honest `503` fallback message.

### Not verified

- Any real Google Sheets append, Resend owner email, Resend auto-reply, or Twilio WhatsApp
  send. No credentials exist. All four are **NOT RUN**.

### Known issues

- `npm audit --omit=dev` reports one critical: `swiper` prototype pollution,
  GHSA-hmx5-qpq5-p643, range `>=6.5.1 <12.1.2`. The fix is a semver-major upgrade
  (14.4.0). Pre-existing, not introduced by this task; deferred and reported.
- The rate limit is in-memory and per instance. On multiple or serverless instances it is
  weaker than five per window; the plan explicitly asks for best-effort in-memory.

