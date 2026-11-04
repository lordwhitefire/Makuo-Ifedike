import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024;

/** Only strings, only for the four accepted fields, each clipped. */
function field(value: unknown, max: number): string | null {
  return typeof value === "string" && value.length > 0
    ? value.slice(0, max)
    : null;
}

/**
 * Visitor error reports. Accepts exactly four fields — message, stack, url,
 * userAgent — and logs one JSON line for the server log. Anything else in the
 * body is ignored, so form values can never enter the log through this route.
 */
export async function POST(request: Request) {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > MAX_BYTES) {
    return new NextResponse(null, { status: 413 });
  }

  let text: string;
  try {
    text = await request.text();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (new TextEncoder().encode(text).length > MAX_BYTES) {
    return new NextResponse(null, { status: 413 });
  }

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const body = raw as Record<string, unknown>;
  const message = field(body.message, 500);
  if (!message) {
    return NextResponse.json(
      { error: "missing_message" },
      { status: 400 },
    );
  }

  console.error(
    JSON.stringify({
      event: "client_error",
      message,
      stack: field(body.stack, 2_000),
      url: field(body.url, 500),
      userAgent: field(body.userAgent, 300),
      at: new Date().toISOString(),
    }),
  );

  return new NextResponse(null, { status: 204 });
}
