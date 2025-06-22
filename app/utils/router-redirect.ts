import { redirect } from "react-router";
import { findOriginalUrl } from "~/services/url";

export async function redirectRouteToURL(request: Request) {
  const url = new URL(request.url);
  const foundItem = await findOriginalUrl(url.pathname.slice(1));
  if (!foundItem.data) return null;
  return redirect(foundItem.data);
}
