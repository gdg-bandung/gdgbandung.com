import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";
import type { Route } from "./+types/root";
import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "~/utils/query-client";
import { Toaster } from "sonner";

export const links: Route.LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Google Developer Group Bandung</title>
        <meta name="robots" content="index, follow"></meta>
        <link rel="canonical" href="https://gdgbandung.com/" />
        <meta
          name="keywords"
          content="Bandung, GDG, GDG Bandung, Google Developer Groups, Google Developer Group Bandung, Google Developer Group, Google Developer Group Bandung, Google Developers Bandung, Google Developers, Google Developer Bandung, Google Developer, developer community, developer communities, developer, developers, programmer, programmers, programming, software engineering, software engineer, software engineers, coding, Developer meetup, Developer meetups, developer meetup, hackathons, codelabs, study jam, study jams, DevFest, DevFests, Android, Google Cloud Platform, GCP, Firebase, machine learning, TensorFlow, Flutter, Developer event, Developer events, Virtual developer event, Virtual developer events, Online developer event, Online developer events, Developer networking, Developer training, Developer learning, Developer education, Google developer tools, Google developer console, Google developers console, Google developer account, Google developer accounts, Google play developer account, Google play developers account, Google play developer accounts, Android developer, Android developers, Developer console, Developers console, Developer consoles, Developers consoles, Google console, Google Play Console, Google Play Consoles, Google App, Google Apps, Google api, Google apis, Chrome developer tools, Chrome developers tools, Chrome developers tool, Chrome developer tool, Google Cloud Platform console, Google Cloud Platform consoles, Google dev, Google devs, Google developer forums, Google developers forums, Google developer forum,"
        ></meta>
        <meta
          name="description"
          content="Check out Google Developer Group GDG Bandung events, learn more or contact this organizer."
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="GDG Bandung" />
        <link rel="manifest" href="/site.webmanifest" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster />
      <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
