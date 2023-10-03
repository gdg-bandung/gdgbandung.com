import type { MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "GDG Bandung" },
    {
      name: "description",
      content: "Welcome to GDG Bandung community website.",
    },
  ];
};

export const loader = async () => {
  return redirect("https://gdg.community.dev/gdg-bandung");
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to GDG Bandung</h1>
    </div>
  );
}
