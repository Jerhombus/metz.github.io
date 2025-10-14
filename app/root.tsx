/******** app/root.tsx ********/
import type {LinksFunction, MetaFunction} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
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
