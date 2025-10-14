/******** app/lib/shopify.server.ts ********/
import {createStorefrontClient} from "@shopify/hydrogen";

const REQUIRED_ENV_VARS = [
  "PUBLIC_STOREFRONT_API_TOKEN",
  "PUBLIC_STORE_DOMAIN",
] as const;

export class StorefrontConfigError extends Error {
  readonly missingEnv: string[];

  constructor(missingEnv: string[]) {
    const list = missingEnv.join(", ");
    super(
      `Shopify Storefront API environment variables are missing: ${list}. ` +
        "Add them to your .env file using the template in .env.example.",
    );
    this.name = "StorefrontConfigError";
    this.missingEnv = missingEnv;
  }
}

function getStorefrontConfig() {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new StorefrontConfigError(missing);
  }

  return {
    publicStorefrontToken: process.env.PUBLIC_STOREFRONT_API_TOKEN!,
    storeDomain: process.env.PUBLIC_STORE_DOMAIN!,
    storefrontApiVersion: process.env.PUBLIC_STOREFRONT_API_VERSION || "2024-10",
  } as const;
}

export function getStorefront() {
  const config = getStorefrontConfig();

  return createStorefrontClient({
    privateStorefrontToken: undefined,
    publicStorefrontToken: config.publicStorefrontToken,
    storeDomain: config.storeDomain,
    storefrontApiVersion: config.storefrontApiVersion,
  });
}

export const QUERIES = {
  PRODUCTS: `#graphql
    query Products($first: Int = 12) {
      products(first: $first) {
        nodes {
          id
          handle
          title
          description
          featuredImage { url altText width height }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }
  `,
  PRODUCT_BY_HANDLE: `#graphql
    query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        media(first: 6) { nodes { ... on MediaImage { image { url altText width height } } } }
        options { name values }
        variants(first: 50) {
          nodes { id title availableForSale selectedOptions { name value } price { amount currencyCode } }
        }
      }
    }
  `,
};
