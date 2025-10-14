/******** app/root.tsx ********/
import type {LinksFunction, MetaFunction} from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Starfield from "./components/Starfield";
import {lunarHue} from "./lib/lunar";
import styles from "./styles/tailwind.css?url";

export const links: LinksFunction = () => [{rel: "stylesheet", href: styles}];

export const meta: MetaFunction = () => [
  {title: "Luna & Cauldron Glass"},
  {
    name: "description",
    content: "Hand‑crafted corked glass for moonlit rituals and everyday magic.",
  },
];

export async function loader() {
  const hue = lunarHue();
  return {hue};
}

export default function App() {
  const {hue} = useLoaderData<typeof loader>();
  const accent = `hsl(${hue} 80% 60%)`;
  return (
    <html lang="en" className="bg-night text-moon">
      <head>
        <Meta />
        <Links />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{ --accent:${accent}; } a{color:var(--accent)} .accent{color:var(--accent)} .accent-bg{background:var(--accent)} .accent-ring:focus-visible{outline-color:var(--accent)}`,
          }}
        />
      </head>
      <body className="min-h-screen bg-night selection:bg-glyph/30">
        <Starfield />
        <Header />
        <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-8">
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const message = (() => {
    if (isRouteErrorResponse(error)) {
      return error.data || error.statusText;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return "An unexpected error occurred.";
  })();

  return (
    <html lang="en" className="bg-night text-moon">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col items-center justify-center bg-night p-6 text-mist">
        <Starfield />
        <section className="w-full max-w-2xl rounded-lg border border-ember/40 bg-ink/70 p-6 text-center">
          <h1 className="font-display text-3xl text-ember">Something went wrong</h1>
          <p className="mt-3 text-sm text-mist/80">{message}</p>
        </section>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
