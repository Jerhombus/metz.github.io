/******** app/components/Footer.tsx ********/
export default function Footer() {
  return (
    <footer className="border-t border-surface/60 bg-ink/60">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <div className="font-display text-lg">Luna & Cauldron</div>
          <p className="mt-2 text-sm text-mist">
            Hand‑crafted corked glass for moonlit rituals and everyday magic.
          </p>
        </div>
        <div>
          <div className="font-semibold">Support</div>
          <ul className="mt-2 space-y-1 text-sm text-mist">
            <li>
              <a href="#shipping">Shipping</a>
            </li>
            <li>
              <a href="#returns">Returns</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Follow</div>
          <ul className="mt-2 space-y-1 text-sm text-mist">
            <li>
              <a href="https://instagram.com" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://tiktok.com" rel="noreferrer">
                TikTok
              </a>
            </li>
            <li>
              <a href="https://pinterest.com" rel="noreferrer">
                Pinterest
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
