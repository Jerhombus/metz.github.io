/******** app/routes/products.$handle.tsx ********/
import {json, type LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {getStorefront, QUERIES} from "../lib/shopify.server";

export async function loader({params, request}: LoaderFunctionArgs) {
  const {storefront} = getStorefront(request);
  const {handle} = params;
  const {data} = await storefront.query(QUERIES.PRODUCT_BY_HANDLE, {
    variables: {handle},
  });
  if (!data?.product) {
    throw new Response("Not found", {status: 404});
  }
  return json({product: data.product});
}

export default function ProductHandle() {
  const {product} = useLoaderData<typeof loader>();
  const media = product.media?.nodes ?? [];
  return (
    <article className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-3">
        {media.length > 0 ? (
          media.map((m: any, i: number) => (
            <img
              key={i}
              src={m?.image?.url}
              alt={m?.image?.altText ?? product.title}
              className="w-full rounded-xl bg-surface object-cover"
            />
          ))
        ) : (
          <div className="aspect-square w-full rounded-xl bg-surface" />
        )}
      </div>
      <div>
        <h1 className="font-display text-3xl">{product.title}</h1>
        <p className="mt-2 text-mist">{product.description}</p>
        <form method="post" className="mt-6 space-y-3">
          {/* Variant dropdowns could be added here using product.options */}
          <button
            type="button"
            className="accent-bg rounded-lg px-5 py-3 font-medium text-night shadow-glow"
          >
            Add to Cart (stub)
          </button>
          <div className="text-xs text-mist">
            Checkout is handled via Shopify; this starter wires product display first.
          </div>
        </form>
      </div>
    </article>
  );
}
