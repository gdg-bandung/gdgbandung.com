import { db } from "~/lib/database";
import { urlAnalytics } from "~/schemas/url";
import { eq, and, gte, count, desc, sql } from "drizzle-orm";
import type { InsertUrlAnalytics, UrlAnalyticsSummary } from "~/type/url";

/**
 * Records a visit to a shortened URL
 */
export async function recordUrlVisit(data: Omit<InsertUrlAnalytics, "id" | "visitedAt">) {
  try {
    const result = await db.insert(urlAnalytics).values(data).returning();
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error recording URL visit:", error);
    return { success: false, error: "Failed to record visit" };
  }
}

/**
 * Gets analytics summary for a specific URL
 */
export async function getUrlAnalyticsSummary(urlId: string): Promise<UrlAnalyticsSummary> {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Total clicks
  const totalClicksResult = await db
    .select({ count: count() })
    .from(urlAnalytics)
    .where(eq(urlAnalytics.urlId, urlId));

  // Unique clicks (by IP address)
  const uniqueClicksResult = await db
    .select({ count: count(sql`DISTINCT ${urlAnalytics.ipAddress}`) })
    .from(urlAnalytics)
    .where(eq(urlAnalytics.urlId, urlId));

  // Clicks today
  const clicksTodayResult = await db
    .select({ count: count() })
    .from(urlAnalytics)
    .where(and(eq(urlAnalytics.urlId, urlId), gte(urlAnalytics.visitedAt, today)));

  // Clicks this week
  const clicksThisWeekResult = await db
    .select({ count: count() })
    .from(urlAnalytics)
    .where(and(eq(urlAnalytics.urlId, urlId), gte(urlAnalytics.visitedAt, thisWeek)));

  // Clicks this month
  const clicksThisMonthResult = await db
    .select({ count: count() })
    .from(urlAnalytics)
    .where(and(eq(urlAnalytics.urlId, urlId), gte(urlAnalytics.visitedAt, thisMonth)));

  // Top referrers
  const topReferrersResult = await db
    .select({
      referrer: urlAnalytics.referrer,
      count: count(),
    })
    .from(urlAnalytics)
    .where(eq(urlAnalytics.urlId, urlId))
    .groupBy(urlAnalytics.referrer)
    .orderBy(desc(count()))
    .limit(10);


  // Device breakdown
  const deviceBreakdownResult = await db
    .select({
      device: urlAnalytics.device,
      count: count(),
    })
    .from(urlAnalytics)
    .where(eq(urlAnalytics.urlId, urlId))
    .groupBy(urlAnalytics.device)
    .orderBy(desc(count()));

  // Browser breakdown
  const browserBreakdownResult = await db
    .select({
      browser: urlAnalytics.browser,
      count: count(),
    })
    .from(urlAnalytics)
    .where(eq(urlAnalytics.urlId, urlId))
    .groupBy(urlAnalytics.browser)
    .orderBy(desc(count()));

  return {
    totalClicks: totalClicksResult[0]?.count || 0,
    uniqueClicks: uniqueClicksResult[0]?.count || 0,
    clicksToday: clicksTodayResult[0]?.count || 0,
    clicksThisWeek: clicksThisWeekResult[0]?.count || 0,
    clicksThisMonth: clicksThisMonthResult[0]?.count || 0,
    topReferrers: topReferrersResult.map(r => ({
      referrer: r.referrer || "Direct",
      count: r.count,
    })),
    deviceBreakdown: deviceBreakdownResult
      .filter(d => d.device)
      .map(d => ({
        device: d.device!,
        count: d.count,
      })),
    browserBreakdown: browserBreakdownResult
      .filter(b => b.browser)
      .map(b => ({
        browser: b.browser!,
        count: b.count,
      })),
  };
}

/**
 * Gets recent visits for a URL
 */
export async function getRecentVisits(urlId: string, limit = 50) {
  try {
    const visits = await db
      .select()
      .from(urlAnalytics)
      .where(eq(urlAnalytics.urlId, urlId))
      .orderBy(desc(urlAnalytics.visitedAt))
      .limit(limit);

    return { success: true, data: visits };
  } catch (error) {
    console.error("Error fetching recent visits:", error);
    return { success: false, error: "Failed to fetch visits" };
  }
}

/**
 * Helper function to parse user agent and extract device/browser/OS info
 */
export function parseUserAgent(userAgent: string) {
  const ua = userAgent.toLowerCase();
  
  // Device detection
  let device = "desktop";
  if (ua.includes("mobile") || ua.includes("android")) {
    device = "mobile";
  } else if (ua.includes("tablet") || ua.includes("ipad")) {
    device = "tablet";
  }

  // Browser detection
  let browser = "unknown";
  if (ua.includes("chrome") && !ua.includes("edg")) {
    browser = "chrome";
  } else if (ua.includes("firefox")) {
    browser = "firefox";
  } else if (ua.includes("safari") && !ua.includes("chrome")) {
    browser = "safari";
  } else if (ua.includes("edg")) {
    browser = "edge";
  } else if (ua.includes("opera")) {
    browser = "opera";
  }

  // OS detection
  let os = "unknown";
  if (ua.includes("windows")) {
    os = "windows";
  } else if (ua.includes("mac")) {
    os = "macos";
  } else if (ua.includes("linux")) {
    os = "linux";
  } else if (ua.includes("android")) {
    os = "android";
  } else if (ua.includes("ios") || ua.includes("iphone") || ua.includes("ipad")) {
    os = "ios";
  }

  return { device, browser, os };
}
