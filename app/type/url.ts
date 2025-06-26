import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type { url, urlAnalytics } from "~/schemas/url";

export type Url = InferSelectModel<typeof url>;
export type UrlAnalytics = InferSelectModel<typeof urlAnalytics>;
export type InsertUrlAnalytics = InferInsertModel<typeof urlAnalytics>;

export type UrlWithoutCreatedAtUpdatedAt = Omit<Url, "createdAt" | "updatedAt">;

// URL with analytics data
export type UrlWithAnalytics = Url & {
  analytics: UrlAnalytics[];
};

// Analytics summary for a URL
export type UrlAnalyticsSummary = {
  totalClicks: number;
  uniqueClicks: number;
  clicksToday: number;
  clicksThisWeek: number;
  clicksThisMonth: number;
  topReferrers: { referrer: string; count: number }[];
  deviceBreakdown: { device: string; count: number }[];
  browserBreakdown: { browser: string; count: number }[];
};
