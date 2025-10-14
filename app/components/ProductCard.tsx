/******** app/components/ProductCard.tsx ********/
export default function ProductCard({product}: {product: any}) {
  const img = product.featuredImage;
  const price = product.priceRange?.minVariantPrice;
  return (
    <a
      href={`/products/${product.handle}`}
      className="group block rounded-xl bg-surface p-3 transition hover:shadow-glow"
    >
      {img ? (
        <img
          src={img.url}
          alt={img.altText ?? product.title}
          className="aspect-square w-full rounded-lg object-cover"
        />
      ) : (
        <div className="aspect-square w-full rounded-lg bg-ink" />
      )}
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-moon/90">{product.title}</div>
        {price && (
          <div className="text-sm text-mist">
            {price.amount} {price.currencyCode}
          </div>
        )}
      </div>
    </a>
  );
}
