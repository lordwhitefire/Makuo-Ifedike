import { JWT } from "google-auth-library";
import {
  inquiryBudgetLabel,
  inquiryNeedTypeLabel,
  inquiryTimelineLabel,
  type Inquiry,
} from "@/content/inquiries";

export const FALLBACK_EMAIL = "mifedike@gmail.com";

export type AdapterName =
  | "google-sheets"
  | "owner-email"
  | "auto-reply"
  | "whatsapp";

export type AdapterStatus = "sent" | "skipped" | "failed";

export interface AdapterResult {
  adapter: AdapterName;
  status: AdapterStatus;
  detail?: string;
}

export interface DeliveryResult {
  configured: boolean;
  sent: boolean;
  results: AdapterResult[];
}

const SHEET_TAB = "Portfolio Inquiries";

const GOOGLE_REQUIRED = [
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "GOOGLE_SHEET_ID",
];
const OWNER_EMAIL_REQUIRED = [
  "RESEND_API_KEY",
  "INQUIRY_FROM_EMAIL",
  "INQUIRY_OWNER_EMAIL",
];
const AUTO_REPLY_REQUIRED = ["RESEND_API_KEY", "INQUIRY_FROM_EMAIL"];
const WHATSAPP_REQUIRED = [
  "TWILIO_ACCOUNT_SID",
  "TWILIO_AUTH_TOKEN",
  "TWILIO_WHATSAPP_FROM",
  "TWILIO_WHATSAPP_TO",
];

function env(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : undefined;
}

function missing(names: string[]): string[] {
  return names.filter((name) => !env(name));
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function ownerText(inquiry: Inquiry): string {
  return [
    `New inquiry — ${inquiry.name}`,
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Need: ${inquiryNeedTypeLabel(inquiry.needType)}`,
    `Budget: ${inquiryBudgetLabel(inquiry.budget)}`,
    `Timeline: ${inquiryTimelineLabel(inquiry.timeline)}`,
    `Project link: ${inquiry.projectLink ?? "—"}`,
    `Received: ${inquiry.createdAt}`,
    `Reference: ${inquiry.id}`,
    "",
    "Message:",
    inquiry.message,
  ].join("\n");
}

function autoReplyText(inquiry: Inquiry): string {
  return [
    "Thanks — I'll reply within one business day.",
    "",
    "Your message:",
    inquiry.message,
    "",
    "— Makuo Ifedike",
  ].join("\n");
}

function whatsappText(inquiry: Inquiry): string {
  const snippet =
    inquiry.message.length > 400
      ? `${inquiry.message.slice(0, 400)}…`
      : inquiry.message;

  return [
    "[PORTFOLIO] New inquiry",
    `${inquiry.name} <${inquiry.email}>`,
    `Need: ${inquiryNeedTypeLabel(inquiry.needType)}`,
    `Budget: ${inquiryBudgetLabel(inquiry.budget)}`,
    `Timeline: ${inquiryTimelineLabel(inquiry.timeline)}`,
    ...(inquiry.projectLink ? [`Link: ${inquiry.projectLink}`] : []),
    "",
    snippet,
  ].join("\n");
}

async function appendToSheet(inquiry: Inquiry): Promise<void> {
  const clientEmail = env("GOOGLE_SERVICE_ACCOUNT_EMAIL")!;
  const privateKey = env("GOOGLE_PRIVATE_KEY")!.replace(/\\n/g, "\n");
  const sheetId = env("GOOGLE_SHEET_ID")!;

  const auth = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const credentials = await auth.authorize();
  const accessToken = credentials.access_token;
  if (!accessToken) {
    throw new Error("Google service account returned no access token");
  }

  const range = encodeURIComponent(`'${SHEET_TAB}'!A1`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
    sheetId,
  )}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      values: [
        [
          inquiry.id,
          inquiry.createdAt,
          inquiry.name,
          inquiry.email,
          inquiryNeedTypeLabel(inquiry.needType),
          inquiryBudgetLabel(inquiry.budget),
          inquiryTimelineLabel(inquiry.timeline),
          inquiry.message,
          inquiry.projectLink ?? "",
          "yes",
          inquiry.status,
        ],
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Google Sheets append failed (${response.status})${
        detail ? `: ${detail.slice(0, 200)}` : ""
      }`,
    );
  }
}

async function sendResend(input: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const apiKey = env("RESEND_API_KEY")!;
  const from = env("INQUIRY_FROM_EMAIL")!;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: input.subject,
      text: input.text,
      ...(input.replyTo ? { reply_to: input.replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Resend failed (${response.status})${
        detail ? `: ${detail.slice(0, 200)}` : ""
      }`,
    );
  }
}

async function sendOwnerEmail(inquiry: Inquiry): Promise<void> {
  await sendResend({
    to: env("INQUIRY_OWNER_EMAIL")!,
    subject: `[PORTFOLIO] New inquiry — ${singleLine(inquiry.name)}`,
    text: ownerText(inquiry),
    replyTo: inquiry.email,
  });
}

async function sendAutoReply(inquiry: Inquiry): Promise<void> {
  await sendResend({
    to: inquiry.email,
    subject: "Your inquiry — Makuo Ifedike",
    text: autoReplyText(inquiry),
    replyTo: env("INQUIRY_OWNER_EMAIL"),
  });
}

function whatsappAddress(value: string): string {
  return value.startsWith("whatsapp:") ? value : `whatsapp:${value}`;
}

async function sendWhatsApp(inquiry: Inquiry): Promise<void> {
  const accountSid = env("TWILIO_ACCOUNT_SID")!;
  const authToken = env("TWILIO_AUTH_TOKEN")!;

  const body = new URLSearchParams({
    From: whatsappAddress(env("TWILIO_WHATSAPP_FROM")!),
    To: whatsappAddress(env("TWILIO_WHATSAPP_TO")!),
    Body: whatsappText(inquiry),
  });

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(
      accountSid,
    )}/Messages.json`,
    {
      method: "POST",
      headers: {
        authorization: `Basic ${Buffer.from(
          `${accountSid}:${authToken}`,
        ).toString("base64")}`,
        "content-type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Twilio failed (${response.status})${
        detail ? `: ${detail.slice(0, 200)}` : ""
      }`,
    );
  }
}

function skipResult(adapter: AdapterName, detail: string): AdapterResult {
  console.info(`[inquiries] ${adapter} skipped — ${detail}`);
  return { adapter, status: "skipped", detail };
}

async function runAdapter(
  adapter: AdapterName,
  required: string[],
  send: () => Promise<void>,
): Promise<AdapterResult> {
  const absent = missing(required);
  if (absent.length > 0) {
    return skipResult(adapter, `missing ${absent.join(", ")}`);
  }

  try {
    await send();
    return { adapter, status: "sent" };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error(`[inquiries] ${adapter} failed — ${detail}`);
    return { adapter, status: "failed", detail: detail.slice(0, 200) };
  }
}

export async function deliverInquiry(
  inquiry: Inquiry,
): Promise<DeliveryResult> {
  const ownerResults = await Promise.all([
    runAdapter("google-sheets", GOOGLE_REQUIRED, () =>
      appendToSheet(inquiry),
    ),
    runAdapter("owner-email", OWNER_EMAIL_REQUIRED, () =>
      sendOwnerEmail(inquiry),
    ),
    runAdapter("whatsapp", WHATSAPP_REQUIRED, () => sendWhatsApp(inquiry)),
  ]);

  const delivered = ownerResults.some((result) => result.status === "sent");
  const autoReply = delivered
    ? await runAdapter("auto-reply", AUTO_REPLY_REQUIRED, () =>
        sendAutoReply(inquiry),
      )
    : skipResult(
        "auto-reply",
        ownerResults.every((result) => result.status === "skipped")
          ? "no owner delivery adapter is configured"
          : "owner delivery failed, so no auto-reply was sent",
      );

  const results = [...ownerResults, autoReply];

  return {
    configured: ownerResults.some((result) => result.status !== "skipped"),
    sent: delivered,
    results,
  };
}
