/******** app/routes/products.$handle.tsx ********/
import {json, type LoaderFunctionArgs} from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import StorefrontCredentialNotice from "../components/StorefrontCredentialNotice";
import {
  getStorefront,
  QUERIES,
  storefrontStatusFromError,
  type StorefrontStatus,
} from "../lib/shopify.server";

type LoaderData = {
  product: any | null;
  storefrontStatus: StorefrontStatus;
};

export async function loader({params}: LoaderFunctionArgs) {
  const {handle} = params;
  if (!handle) {
    throw new Response("Not found", {status: 404});
  }

  try {
    const {storefront} = getStorefront();
    const {data} = await storefront.query(QUERIES.PRODUCT_BY_HANDLE, {
      variables: {handle},
    });

    if (!data?.product) {
      throw new Response("Not found", {status: 404});
    }

    return json<LoaderData>({product: data.product, storefrontStatus: {ok: true}});
  } catch (error) {
    const storefrontStatus = storefrontStatusFromError(error);
    if (storefrontStatus) {
      return json<LoaderData>({
        product: null,
        storefrontStatus,
      });
    }

    throw error;
  }
}

export default function ProductHandle() {
  const {product, storefrontStatus} = useLoaderData<typeof loader>();

  if (!storefrontStatus.ok) {
    return (
      <StorefrontCredentialNotice
        title="Storefront credentials missing"
        message={`${storefrontStatus.message} Configure the variables, then reload to view product details.`}
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
    );
  }

  if (!product) {
    return (
      <section className="rounded-lg border border-ember/40 bg-ink/70 p-6 text-sm text-mist">
        <h1 className="font-display text-2xl text-ember">Product not found</h1>
        <p className="mt-2 text-mist/80">The requested product is unavailable.</p>
      </section>
    );
  }

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
      <p className="mt-2 text-sm text-mist/80">Something went wrong while loading this product.</p>
    </section>
  );
}
