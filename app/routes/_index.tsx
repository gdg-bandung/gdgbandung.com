import { useEffect } from "react";
import Header from "~/components/header";
import Hero from "~/components/hero";
import Events from "~/components/events";
import About from "~/components/about";
import Partnership from "~/components/partnership";
import Footer from "~/components/footer";
import EventSeries from "~/components/event-series";
import type { Route } from "./+types/_index";

export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    href: "/hero-banner.webp",
    as: "image",
  },
];

export default function Home() {
  useEffect(() => {
    // Handle URL hash for smooth scrolling to sections
    const { hash } = window.location;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Events />
        <About />
        <EventSeries />
        <Partnership />
      </main>
      <Footer />
    </div>
  );
}
