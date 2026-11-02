export type InquiryStatus = "new" | "qualified" | "replied" | "won" | "lost";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
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

export const CORE_ANALYTICS_EVENTS = [
  "page_view",
  "project_card_click",
  "project_modal_open",
  "external_link_click",
  "contact_email_click",
  "nav_scroll",
] as const;

export const ENGAGEMENT_ANALYTICS_EVENTS = [
  "scroll_milestone",
  "time_spent",
  "filter_applied",
  "tab_switched",
  "project_image_load",
  "return_visit",
] as const;

export type AnalyticsEvent =
  | (typeof CORE_ANALYTICS_EVENTS)[number]
  | (typeof ENGAGEMENT_ANALYTICS_EVENTS)[number];

export interface AnalyticsEventRecord {
  name: AnalyticsEvent;
  timestamp: string;
  properties?: Record<string, string | number | boolean>;
}
