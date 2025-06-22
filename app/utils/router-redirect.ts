import { redirect } from "react-router";
import { findOriginalUrl } from "~/services/url";
import { getFlagManagementSystem } from "./flag";
import { configRedirects } from "~/configs/redirect";

export async function redirectRouteToURL(request: Request) {
  const url = new URL(request.url);
  const flag = getFlagManagementSystem();
  if (flag) {
    const foundItem = await findOriginalUrl(url.pathname.slice(1));
    if (!foundItem.data) return null;
    return redirect(foundItem.data);
  } else {
    const foundItem = configRedirects.find((item) => {
      return item.path.trim() === url.pathname;
    });

    if (!foundItem) return null;
    return redirect(foundItem?.url);
  }
}
