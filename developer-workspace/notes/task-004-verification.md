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
