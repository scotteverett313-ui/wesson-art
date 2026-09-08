"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import siteData from "@/content/site.json";

const navLinks = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { nav } = siteData;

  // Prevent content from hiding behind bottom nav on mobile
  useEffect(() => {
    document.body.style.paddingBottom = "";
  }, []);

  return (
    <>
      {/* Top header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-anton)] text-xl tracking-widest text-white hover:opacity-70 transition-opacity uppercase"
          >
            {nav.wordmark}
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors ${
                    pathname === href ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-t border-white/10">
        <ul className="flex items-center justify-around h-16">
          {navLinks.map(({ href, label }) => (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center justify-center h-16 gap-0.5 text-[10px] tracking-[0.2em] uppercase transition-colors ${
                  pathname === href ? "text-white" : "text-white/40 hover:text-white"
                }`}
              >
                <span
                  className={`w-1 h-1 rounded-full mb-0.5 ${
                    pathname === href ? "bg-white" : "bg-transparent"
                  }`}
                />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
