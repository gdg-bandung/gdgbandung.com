import type { MetaFunction } from "@vercel/remix";

export const meta: MetaFunction = () => {
  return [
    { title: "GDG Bandung" },
    { name: "description", content: "Welcome to GDG Bandung" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to GDG Bandung</h1>
    </div>
  );
}
