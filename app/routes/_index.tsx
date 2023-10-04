import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirectRouteToURL } from "~/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "GDG Bandung" },
    {
      name: "description",
      content: "Welcome to GDG Bandung community website.",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return redirectRouteToURL(request);
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to GDG Bandung</h1>
    </div>
  );
}
