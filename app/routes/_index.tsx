/******** app/routes/_index.tsx ********/
import {json} from "@remix-run/node";
import {
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import GlowButton from "../components/GlowButton";
import ProductCard from "../components/ProductCard";
import {getStorefront, QUERIES, StorefrontConfigError} from "../lib/shopify.server";

type LoaderData = {
  products: any[];
  storefrontStatus: {ok: true} | {ok: false; message: string};
};

export async function loader() {
  try {
    const {storefront} = getStorefront();
    const {data} = await storefront.query(QUERIES.PRODUCTS, {
      variables: {first: 8},
    });
    const products = data?.products?.nodes ?? [];

    return json<LoaderData>({products, storefrontStatus: {ok: true}});
  } catch (error) {
    if (error instanceof StorefrontConfigError) {
      return json<LoaderData>({
        products: [],
        storefrontStatus: {ok: false, message: error.message},
      });
    }

    throw error;
  }
}

export default function Index() {
  const {products, storefrontStatus} = useLoaderData<typeof loader>();
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
      {!storefrontStatus.ok ? (
        <div className="mx-auto mb-6 max-w-2xl rounded-lg border border-ember/40 bg-ink/70 p-4 text-left text-sm text-mist">
          <p className="font-semibold text-ember">Storefront credentials missing</p>
          <p className="mt-1 text-mist/80">
            {storefrontStatus.message} Restart the dev server after updating your environment
            variables.
          </p>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <section className="mx-auto max-w-2xl rounded-lg border border-ember/40 bg-ink/70 p-6 text-mist">
        <h2 className="font-display text-2xl text-ember">{error.status} error</h2>
        <p className="mt-2 text-sm text-mist/80">{error.data || error.statusText}</p>
      </section>
    );
  }

  if (error instanceof Error) {
    return (
      <section className="mx-auto max-w-2xl rounded-lg border border-ember/40 bg-ink/70 p-6 text-mist">
        <h2 className="font-display text-2xl text-ember">Unexpected error</h2>
        <p className="mt-2 text-sm text-mist/80">{error.message}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl rounded-lg border border-ember/40 bg-ink/70 p-6 text-mist">
      <h2 className="font-display text-2xl text-ember">Unknown error</h2>
      <p className="mt-2 text-sm text-mist/80">Something went wrong while loading the shop.</p>
    </section>
  );
}
