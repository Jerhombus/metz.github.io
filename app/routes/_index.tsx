/******** app/routes/_index.tsx ********/
import {json, type LoaderFunctionArgs} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import GlowButton from "../components/GlowButton";
import ProductCard from "../components/ProductCard";
import {getStorefront, QUERIES} from "../lib/shopify.server";

export async function loader({request}: LoaderFunctionArgs) {
  const {storefront} = getStorefront(request);
  const {data} = await storefront.query(QUERIES.PRODUCTS, {
    variables: {first: 8},
  });
  const products = data?.products?.nodes ?? [];
  return json({products});
}

export default function Index() {
  const {products} = useLoaderData<typeof loader>();
  return (
    <section>
      <div className="mx-auto mb-10 text-center">
        <h1 className="font-display text-3xl md:text-5xl">
          Hand‑crafted corked glass for <span className="accent">everyday magic</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-mist">
          Small‑batch vessels with lunar etchings, made for tea, tinctures, and moonlit kitchens.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <GlowButton asChild>
            <Link to="/collections">Shop Now</Link>
          </GlowButton>
          <Link
            to="#custom"
            className="rounded-lg border border-surface px-4 py-2 hover:border-moon"
          >
            Custom Orders
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
