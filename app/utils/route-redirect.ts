import { json, redirect } from "@remix-run/node";

import { configRedirects } from "~/configs";

export function redirectRouteToURL(request: Request) {
  const url = new URL(request.url);
  const foundItem = configRedirects.find((item) => {
    return item.path.trim() === url.pathname;
  });

  if (!foundItem) return json(null);
  return redirect(foundItem?.url);
}
