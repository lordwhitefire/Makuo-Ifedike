import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import type { Inquiry } from "@/content/inquiries";
import { deliverInquiry, FALLBACK_EMAIL } from "@/lib/inquiries/adapters";
import { validateInquiry } from "@/lib/inquiries/validation";

export const runtime = "nodejs";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const rateBuckets = new Map<string, number[]>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(
  key: string,
): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const recent = (rateBuckets.get(key) ?? []).filter((time) => time > cutoff);

  if (recent.length >= RATE_LIMIT_MAX) {
    const retryAfter = Math.max(
      1,
      Math.ceil((recent[0]! + RATE_LIMIT_WINDOW_MS - now) / 1000),
    );
    rateBuckets.set(key, recent);
    return { ok: false, retryAfter };
  }

  recent.push(now);
  rateBuckets.set(key, recent);

  if (rateBuckets.size > 500) {
    for (const [bucketKey, times] of rateBuckets) {
      if (times.every((time) => time <= cutoff)) rateBuckets.delete(bucketKey);
    }
  }

  return { ok: true };
}

export async function POST(request: Request) {
  const limited = checkRateLimit(clientKey(request));
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfter: limited.retryAfter },
      {
        status: 429,
        headers: { "retry-after": String(limited.retryAfter) },
      },
    );
  }

  let raw: unknown;
  try {
    const declaredLength = Number(request.headers.get("content-length") ?? "0");
    if (Number.isFinite(declaredLength) && declaredLength > 16_384) {
      return NextResponse.json(
        { error: "payload_too_large" },
        { status: 413 },
      );
    }
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const body = raw as Record<string, unknown>;

  // Honeypot: bots fill the hidden field. Accept silently and send nothing.
  if (body.company !== undefined && body.company !== null && String(body.company).trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const validated = validateInquiry(body);
  if (!validated.ok) {
    return NextResponse.json(
      { error: "validation_failed", errors: validated.errors },
      { status: 400 },
    );
  }

  const now = new Date().toISOString();
  const inquiry: Inquiry = {
    id: randomUUID(),
    ...validated.value,
    status: "new",
    createdAt: now,
    updatedAt: now,
  };

  const delivery = await deliverInquiry(inquiry);

  if (!delivery.configured) {
    return NextResponse.json(
      { error: "not_configured", fallbackEmail: FALLBACK_EMAIL },
      { status: 503 },
    );
  }

  if (!delivery.sent) {
    return NextResponse.json(
      {
        error: "delivery_failed",
        id: inquiry.id,
        fallbackEmail: FALLBACK_EMAIL,
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      id: inquiry.id,
      delivered: delivery.results
        .filter((result) => result.status === "sent")
        .map((result) => result.adapter),
    },
    { status: 200 },
  );
}
