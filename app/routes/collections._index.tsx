/******** app/routes/collections._index.tsx ********/
import {json, type LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {getStorefront} from "../lib/shopify.server";

export async function loader({request}: LoaderFunctionArgs) {
  const {storefront} = getStorefront(request);
  const data = await storefront.query(`#graphql
    query {
      collections(first: 12) {
        nodes {
          id
          handle
          title
          image { url altText }
        }
      }
      products(first: 24) {
        nodes {
          id
          handle
          title
          featuredImage { url altText }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }
  `);
  return json({
    collections: data.collections.nodes,
    products: data.products.nodes,
  });
}

export default function Collections() {
  const {products} = useLoaderData<typeof loader>();
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p: any) => (
        <a
          key={p.id}
          href={`/products/${p.handle}`}
          className="group rounded-xl bg-surface p-3 transition hover:shadow-glow"
        >
          <img
            src={p.featuredImage?.url}
            alt={p.featuredImage?.altText ?? p.title}
            className="aspect-square w-full rounded-lg object-cover"
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-moon/90">{p.title}</div>
            <div className="text-sm text-mist">
              {p.priceRange.minVariantPrice.amount} {p.priceRange.minVariantPrice.currencyCode}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
