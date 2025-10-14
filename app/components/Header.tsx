/******** app/components/Header.tsx ********/
import {Link} from "@remix-run/react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-night/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src="/img/logo-moon.svg" alt="Luna & Cauldron" className="h-7 w-7" />
          <span className="font-display tracking-wide">Luna & Cauldron</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-mist">
          <Link to="/collections" className="hover:text-moon">
            Shop
          </Link>
          <a href="#heritage" className="hover:text-moon">
            Heritage
          </a>
          <a href="#care" className="hover:text-moon">
            Care
          </a>
          <a href="#contact" className="hover:text-moon">
            Contact
          </a>
          <Link to="/cart" aria-label="Cart" className="rounded-lg border border-surface px-3 py-1 accent-ring">
            🛒
          </Link>
        </nav>
      </div>
    </header>
  );
}
