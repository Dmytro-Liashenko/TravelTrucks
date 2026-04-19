"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function isActive(pathname: string, href: string): boolean {
  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link href="/" className="site-logo">
          TravelTrucks
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          <Link
            href="/"
            className={`site-nav__link${isActive(pathname, "/") ? " is-active" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`site-nav__link${isActive(pathname, "/catalog") ? " is-active" : ""}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
