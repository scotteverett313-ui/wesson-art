import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 mt-4">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-[family-name:var(--font-anton)] text-sm tracking-widest uppercase text-white/30">
          © {year} Wesson Art
        </p>
        <nav className="flex items-center gap-8">
          <Link
            href="/about"
            className="text-xs text-white/30 tracking-[0.2em] uppercase hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-xs text-white/30 tracking-[0.2em] uppercase hover:text-white transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
