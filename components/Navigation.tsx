"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-[family-name:var(--font-anton)] text-xl tracking-widest text-white hover:opacity-70 transition-opacity uppercase"
          >
            WessonArt
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors ${
                    pathname === href
                      ? "text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 text-white/70 hover:text-white transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-10">
              {navLinks.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={href}
                    className={`font-[family-name:var(--font-anton)] text-5xl tracking-widest uppercase transition-colors ${
                      pathname === href ? "text-white" : "text-white/40 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
