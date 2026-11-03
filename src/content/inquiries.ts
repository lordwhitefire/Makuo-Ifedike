export type InquiryStatus = "new" | "qualified" | "replied" | "won" | "lost";

export const INQUIRY_NEED_TYPES = [
  { value: "marketing-site", label: "marketing site" },
  { value: "web-app", label: "web app" },
  { value: "fix", label: "fix" },
] as const;

export type InquiryNeedType = (typeof INQUIRY_NEED_TYPES)[number]["value"];

export const INQUIRY_BUDGETS = [
  { value: "under-500k", label: "Under ₦500k" },
  { value: "500k-1.5m", label: "₦500k–₦1.5m" },
  { value: "1.5m-3m", label: "₦1.5m–₦3m" },
  { value: "over-3m", label: "Over ₦3m" },
  { value: "not-sure", label: "Not sure" },
] as const;

export type InquiryBudget = (typeof INQUIRY_BUDGETS)[number]["value"];

export const INQUIRY_TIMELINES = [
  { value: "asap", label: "ASAP" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "not-sure", label: "Not sure" },
] as const;

export type InquiryTimeline = (typeof INQUIRY_TIMELINES)[number]["value"];

export interface InquiryInput {
  name: string;
  email: string;
  needType: InquiryNeedType;
  budget: InquiryBudget;
  timeline: InquiryTimeline;
  message: string;
  projectLink?: string;
  consent: true;
}

export interface Inquiry extends InquiryInput {
  id: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export function inquiryNeedTypeLabel(value: InquiryNeedType): string {
  return (
    INQUIRY_NEED_TYPES.find((option) => option.value === value)?.label ?? value
  );
}

export function inquiryBudgetLabel(value: InquiryBudget): string {
  return (
    INQUIRY_BUDGETS.find((option) => option.value === value)?.label ?? value
  );
}

export function inquiryTimelineLabel(value: InquiryTimeline): string {
  return (
    INQUIRY_TIMELINES.find((option) => option.value === value)?.label ?? value
  );
}

/**
 * Inquiry status flow: new -> qualified -> replied -> won/lost.
 * No database, form, or runtime is created here — definitions only.
 */
export const INQUIRY_STATUS_FLOW: Record<InquiryStatus, InquiryStatus[]> = {
  new: ["qualified"],
  qualified: ["replied"],
  replied: ["won", "lost"],
  won: [],
  lost: [],
};

export const ANALYTICS_EVENTS = [
  "page_view",
  "project_view",
  "cta_click",
  "inquiry_start",
  "inquiry_submit",
  "outbound_project_click",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export interface AnalyticsEventRecord {
  name: AnalyticsEvent;
  timestamp: string;
  properties?: Record<string, string | number | boolean>;
}
