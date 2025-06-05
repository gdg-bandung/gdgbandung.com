import { redirect } from "react-router";
import { configRedirects } from "~/configs/redirect";

export function redirectRouteToURL(request: Request) {
  const url = new URL(request.url);
  const foundItem = configRedirects.find((item) => {
    return item.path.trim() === url.pathname;
  });

  if (!foundItem) return null;
  return redirect(foundItem?.url);
}
