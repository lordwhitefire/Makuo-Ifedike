# Failure record — owner-email send fails intermittently with `fetch failed`

**Recorded:** 2026-11-03
**Status:** open — not fixed, awaiting owner direction
**Component:** `sendResend()` / `sendOwnerEmail()` in `src/lib/inquiries/adapters.ts`
**Severity:** medium — a real inquiry can arrive without its email notification
**Plan:** `developer-workspace/plans/go-live-keys-plan.md` (step 4)

## What fails

The owner notification email is not delivered on some submissions. The adapter throws
`fetch failed` — a network-level error raised before any HTTP response, so **the request
never reached Resend**. It is not a Resend rejection (no 4xx/5xx, no API error body).

The visitor auto-reply is unaffected: it is a second, consecutive Resend call in the
same delivery and it succeeded in both failing runs.

## Evidence

Four live submissions were made against the local dev server with all ten keys present.

| # | time (UTC) | inquiry id | delivered | owner-email |
|---|---|---|---|---|
| 1 | 17:29:46 | `ad8bc70f-1210-40fb-b5ec-af510345385e` | owner-email, whatsapp, auto-reply | **sent** |
| 2 | 18:24:05 | `144f3c5a-1e34-4afd-b47a-ef9dfc6d5d0b` | google-sheets, whatsapp, auto-reply | **`fetch failed`** |
| 3 | 18:24:56 | `591a9817-c7e5-4b7d-968f-6956a440441d` | all four | **sent** |
| 4 | 18:43:02 | `646bc516-134b-447a-ae64-f4eb703497b8` | google-sheets, whatsapp, auto-reply | **`fetch failed`** |

Server log, verbatim:

```
[inquiries] owner-email failed — fetch failed
[inquiries] owner-email failed — fetch failed
```

(Run 1's Google Sheets failure was a separate, already-closed defect: the tab was named
`Sheet1` instead of `Portfolio Inquiries`.)

## Pattern

- Failures occur on the **first Resend call after a long idle gap** — 55 minutes before
  run 2, 18.7 minutes before run 4.
- Successes occur when the connection is **cold-new** (run 1: first outbound call of the
  process) or **recently used** (run 3: 50 seconds after run 2's auto-reply).
- The owner-email call is always the first of the two Resend calls; the auto-reply that
  follows immediately succeeds in the same delivery.

## Root-cause hypothesis

Node's `fetch` (undici) keeps connections alive in a pool. After an idle period the
server may have already closed the socket, but the pool hands it back anyway; the write
then fails and undici surfaces `TypeError: fetch failed` (typically `ECONNRESET`). The
next call opens a fresh connection and succeeds — which matches the observed pattern.

`sendResend()` (`src/lib/inquiries/adapters.ts:168`) performs exactly one `fetch` with no
retry, no timeout, and no dispatcher/keep-alive control. Any single network blip is
therefore fatal for that adapter.

**Not excluded:** a local network interruption (the dev machine is on a mobile hotspot —
the server advertised `192.168.43.27`), a DNS/TLS blip, or a connection reset on the peer
side. No packet capture or DNS tracing was done, so this remains a hypothesis, not a
confirmed diagnosis.

## Impact

- The inquiry is **not lost**: the Sheet row and the WhatsApp alert still deliver, so the
  lead is recorded.
- The owner's inbox silently misses the message for that inquiry.
- The visitor sees success either way: the route returns `200` as long as **at least one**
  owner-channel adapter sent (`deliverInquiry` computes `sent` with `.some(...)`,
  `adapters.ts:297`). A partial failure is invisible to the client.
- The detail exists only in the server log and in the adapter results; the API response
  exposes only the list of channels that succeeded.

## Proposed fix (not applied)

1. Retry `sendResend` up to 2 more times on network-level errors only
   (`fetch failed`, `ECONNRESET`, `ETIMEDOUT`, `UND_ERR_*`), with short backoff
   (e.g. 250 ms, 750 ms). Never retry a 4xx; optionally retry 429.
2. Add an `AbortSignal.timeout(...)` so a hung connection cannot stall delivery.
3. Optional hardening: `keepalive: false`, or a dedicated undici `Agent` with a short
   keep-alive timeout, so stale sockets are not reused.
4. Consider surfacing per-adapter failure detail to the client response (or a server-side
   alert), so a silent partial failure is observable outside the log.

## How the fix would be verified

- Three submissions spaced at least 10 minutes apart (each preceded by an idle gap) and
  `owner-email` present in `delivered` every time.
- A stub-based script exercising `sendResend` with a `fetch` that throws once then
  succeeds, asserting exactly one retry occurs. The project has no test framework, so
  this would be a standalone script rather than a suite test.

## Decision needed

Apply the retry fix? It is a ~10-line change confined to `sendResend`. Until then the
failure stands as recorded here.
