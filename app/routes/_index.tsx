import { useEffect } from "react";
import Header from "~/components/landing-page/header";
import Hero from "~/components/landing-page/hero";
import Events from "~/components/landing-page/events";
import About from "~/components/landing-page/about";
import Partnership from "~/components/landing-page/partnership";
import Footer from "~/components/landing-page/footer";
import EventSeries from "~/components/landing-page/event-series";
import type { Route } from "./+types/_index";
import Gallery from "~/components/landing-page/gallery";

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
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
