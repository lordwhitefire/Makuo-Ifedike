import {
  INQUIRY_BUDGETS,
  INQUIRY_NEED_TYPES,
  INQUIRY_TIMELINES,
  type InquiryBudget,
  type InquiryInput,
  type InquiryNeedType,
  type InquiryTimeline,
} from "@/content/inquiries";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const MAX_LINK = 2048;

const NEED_VALUES = INQUIRY_NEED_TYPES.map((option) => option.value);
const BUDGET_VALUES = INQUIRY_BUDGETS.map((option) => option.value);
const TIMELINE_VALUES = INQUIRY_TIMELINES.map((option) => option.value);

export type InquiryValidation =
  | { ok: true; value: InquiryInput }
  | { ok: false; errors: Record<string, string> };

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isOneOf<T extends string>(
  values: readonly T[],
  value: string,
): value is T {
  return (values as readonly string[]).includes(value);
}

export function validateInquiry(
  raw: Record<string, unknown>,
): InquiryValidation {
  const errors: Record<string, string> = {};

  const name = text(raw.name);
  const email = text(raw.email).toLowerCase();
  const needType = text(raw.needType);
  const budget = text(raw.budget);
  const timeline = text(raw.timeline);
  const message = text(raw.message);
  const projectLink = text(raw.projectLink);
  const consent = raw.consent === true;

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length > MAX_NAME) {
    errors.name = `Keep the name under ${MAX_NAME} characters.`;
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (email.length > MAX_EMAIL || !EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email.";
  }

  if (!isOneOf(NEED_VALUES, needType)) {
    errors.needType = "Choose a need type.";
  }
  if (!isOneOf(BUDGET_VALUES, budget)) {
    errors.budget = "Choose a budget range.";
  }
  if (!isOneOf(TIMELINE_VALUES, timeline)) {
    errors.timeline = "Choose a timeline.";
  }

  if (!message) {
    errors.message = "Tell me a little about the project.";
  } else if (message.length > MAX_MESSAGE) {
    errors.message = `Keep the message under ${MAX_MESSAGE} characters.`;
  }

  let normalizedLink: string | undefined;
  if (projectLink) {
    if (projectLink.length > MAX_LINK) {
      errors.projectLink = "That link is too long.";
    } else {
      try {
        const url = new URL(projectLink);
        if (url.protocol !== "http:" && url.protocol !== "https:") {
          errors.projectLink = "Use an http or https link.";
        } else {
          normalizedLink = url.toString();
        }
      } catch {
        errors.projectLink = "Enter a full URL, or leave it blank.";
      }
    }
  }

  if (!consent) {
    errors.consent = "Please agree to the privacy notice.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      needType: needType as InquiryNeedType,
      budget: budget as InquiryBudget,
      timeline: timeline as InquiryTimeline,
      message,
      ...(normalizedLink ? { projectLink: normalizedLink } : {}),
      consent: true,
    },
  };
}
