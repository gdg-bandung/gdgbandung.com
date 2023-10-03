import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "GDG Bandung" },
    {
      name: "description",
      content: "Welcome to GDG Bandung community website.",
    },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to GDG Bandung</h1>
    </div>
  );
}
