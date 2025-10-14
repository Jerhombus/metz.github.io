# Luna & Cauldron Hydrogen Starter

This repository contains a Shopify Hydrogen (Remix) storefront starter themed for the Luna & Cauldron concept. It includes Tailwind configuration, a lunar-accented layout, product listing and PDP routes, and base assets.

## Prerequisites

- Node.js 18 or newer
- npm 9+
- A Shopify store with Storefront API access and tokens (create a private custom app in **Apps and sales channels → Develop apps**).

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file and fill in your Shopify credentials:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description |
   | --- | --- |
   | `PUBLIC_STORE_DOMAIN` | Your `your-shop.myshopify.com` domain |
   | `PUBLIC_STOREFRONT_API_TOKEN` | Storefront API access token |
   | `PUBLIC_STOREFRONT_API_VERSION` | API version, e.g. `2024-10` |

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open the app in your browser at [http://localhost:3000](http://localhost:3000) to view and test the site.

## Production Build

To create an optimized production build (for deployment to Oxygen, Vercel, etc.), run:

```bash
npm run build
```

Then follow your hosting platform's instructions to deploy the generated output.

## Project Structure

The relevant directories are:

- `app/` – Hydrogen Remix application code (routes, components, lib, styles)
- `public/` – Static assets (images, fonts)
- `tailwind.config.cjs` – Tailwind CSS configuration for the witchy theme
- `postcss.config.cjs` – PostCSS configuration

## Troubleshooting

- Ensure the Storefront API token has access to read products, collections, inventory, and media.
- If your Shopify store has no products yet, the home and collection pages will render placeholders until you add products.
- When environment variables change, restart the dev server to pick up the new values.

---

Questions or issues? Refer to the [Hydrogen documentation](https://shopify.dev/docs/custom-storefronts/hydrogen) for deeper guidance on extending the starter.
