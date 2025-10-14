/******** app/lib/shopify.server.ts ********/
import {createStorefrontClient} from "@shopify/hydrogen";

export function getStorefront(request?: Request) {
  const publicStorefrontId = process.env.PUBLIC_STOREFRONT_API_TOKEN!;
  const storeDomain = process.env.PUBLIC_STORE_DOMAIN!;
  const apiVersion = process.env.PUBLIC_STOREFRONT_API_VERSION || "2024-10";

  return createStorefrontClient({
    privateStorefrontToken: undefined,
    publicStorefrontToken: publicStorefrontId,
    storeDomain,
    apiVersion,
    request,
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
