import { NextResponse } from "next/server";

export const runtime = "nodejs";

const NEED_TYPES = ["marketing site", "web app", "fix"];
const BUDGETS = ["Under ₦500k", "₦500k–₦1.5m", "₦1.5m–₦3m", "Over ₦3m", "Not sure"];
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Not sure"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FALLBACK_EMAIL = "mifedike@gmail.com";

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const body = raw as Record<string, unknown>;

  // Honeypot: bots fill the hidden field. Accept silently and send nothing.
  if (text(body.company)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = text(body.name);
  const email = text(body.email);
  const needType = text(body.needType);
  const budget = text(body.budget);
  const timeline = text(body.timeline);
  const message = text(body.message);
  const projectLink = text(body.projectLink);
  const consent = body.consent === true;

  const errors: Record<string, string> = {};

  if (!name) errors.name = "Name is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email.";
  }
  if (!NEED_TYPES.includes(needType)) {
    errors.needType = "Choose a need type.";
  }
  if (!BUDGETS.includes(budget)) {
    errors.budget = "Choose a budget range.";
  }
  if (!TIMELINES.includes(timeline)) {
    errors.timeline = "Choose a timeline.";
  }
  if (!message) {
    errors.message = "Tell me a little about the project.";
  }
  if (projectLink) {
    try {
      new URL(projectLink);
    } catch {
      errors.projectLink = "Enter a full URL, or leave it blank.";
    }
  }
  if (!consent) {
    errors.consent = "Please agree to the privacy notice.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "validation_failed", errors },
      { status: 400 },
    );
  }

  // TASK-004 Task 2 adds the env-gated Google Sheets / Resend / Twilio
  // adapters here. Until at least one destination is configured, say so
  // honestly instead of pretending the inquiry was sent.
  return NextResponse.json(
    { error: "not_configured", fallbackEmail: FALLBACK_EMAIL },
    { status: 503 },
  );
}
