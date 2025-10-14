/******** app/routes/collections._index.tsx ********/
import {json} from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import StorefrontCredentialNotice from "../components/StorefrontCredentialNotice";
import {
  getStorefront,
  storefrontStatusFromError,
  type StorefrontStatus,
} from "../lib/shopify.server";

type LoaderData = {
  collections: any[];
  products: any[];
  storefrontStatus: StorefrontStatus;
};

export async function loader() {
  try {
    const {storefront} = getStorefront();
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

    return json<LoaderData>({
      collections: data.collections.nodes ?? [],
      products: data.products.nodes ?? [],
      storefrontStatus: {ok: true},
    });
  } catch (error) {
    const storefrontStatus = storefrontStatusFromError(error);
    if (storefrontStatus) {
      return json<LoaderData>({
        collections: [],
        products: [],
        storefrontStatus,
      });
    }

    throw error;
  }
}

export default function Collections() {
  const {products, storefrontStatus} = useLoaderData<typeof loader>();
  return (
    <div className="space-y-6">
      {!storefrontStatus.ok ? (
        <StorefrontCredentialNotice
          message={`${storefrontStatus.message} Update your environment variables to explore the collection grid.`}
          actions={
            <>
              <code className="rounded bg-night px-2 py-1 font-mono text-xs text-mist/70">
                PUBLIC_STORE_DOMAIN
              </code>
              <code className="rounded bg-night px-2 py-1 font-mono text-xs text-mist/70">
                PUBLIC_STOREFRONT_API_TOKEN
              </code>
            </>
          }
        />
      ) : null}
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
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <section className="rounded-lg border border-ember/40 bg-ink/70 p-6 text-mist">
        <h2 className="font-display text-2xl text-ember">{error.status} error</h2>
        <p className="mt-2 text-sm text-mist/80">{error.data || error.statusText}</p>
      </section>
    );
  }

  if (error instanceof Error) {
    return (
      <section className="rounded-lg border border-ember/40 bg-ink/70 p-6 text-mist">
        <h2 className="font-display text-2xl text-ember">Unexpected error</h2>
        <p className="mt-2 text-sm text-mist/80">{error.message}</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-ember/40 bg-ink/70 p-6 text-mist">
      <h2 className="font-display text-2xl text-ember">Unknown error</h2>
      <p className="mt-2 text-sm text-mist/80">Something went wrong while loading the collection grid.</p>
    </section>
  );
}
