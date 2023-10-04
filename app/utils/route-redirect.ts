import { json, redirect } from "@remix-run/node";

import { configRedirects } from "~/configs";

export function redirectRouteToURL(request: Request) {
  const url = new URL(request.url);
  const foundItem = configRedirects.find(
    (item) => item.path === url.pathname
  );

  if (!foundItem) return json(null);
  return redirect(foundItem?.url);
}
