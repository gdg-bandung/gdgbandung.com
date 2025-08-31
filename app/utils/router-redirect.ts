import { redirect } from "react-router";
import { findOriginalUrl } from "~/services/url";
import { getFlagManagementSystem } from "./flag";
import { configRedirects } from "~/configs/redirect";
// Temporary hide
// import { recordUrlVisit, parseUserAgent } from "~/services/analytics";

export async function redirectRouteToURL(request: Request) {
  const url = new URL(request.url);
  const flag = getFlagManagementSystem();

  // Temporary hide
  // Extract analytics data from request
  // const userAgent = request.headers.get("user-agent") || "";
  // const referrer = request.headers.get("referer") || request.headers.get("referrer") || null;
  // const ipAddress = getClientIP(request);
  // const { device, browser, os } = parseUserAgent(userAgent);

  if (flag) {
    const foundItem = await findOriginalUrl(url.pathname.slice(1));
    if (!foundItem.data) return null;

    // Temporary hide
    // Record analytics for the URL visit
    // if (foundItem.urlData) {
    //   await recordUrlVisit({
    //     urlId: foundItem.urlData.id,
    //     userAgent,
    //     referrer,
    //     ipAddress,
    //     device,
    //     browser,
    //     os,
    //   });
    // }

    return redirect(foundItem.data);
  } else {
    const foundItem = configRedirects.find((item) => {
      return item.path.trim() === url.pathname;
    });

    if (!foundItem) return null;
    return redirect(foundItem?.url);
  }
}

/**
 * Extract client IP address from request headers
 */
function getClientIP(request: Request): string | null {
  // Check various headers that might contain the real IP
  const headers = [
    "x-forwarded-for",
    "x-real-ip",
    "x-client-ip",
    "cf-connecting-ip", // Cloudflare
    "x-forwarded",
    "forwarded-for",
    "forwarded",
  ];

  for (const header of headers) {
    const value = request.headers.get(header);
    if (value) {
      // x-forwarded-for can contain multiple IPs, take the first one
      return value.split(",")[0].trim();
    }
  }

  return null;
}
