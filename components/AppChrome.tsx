"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isVaultmark = pathname?.startsWith("/vaultmark");

  if (isVaultmark) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <div className="hidden md:block">
        <Footer />
      </div>
    </>
  );
}
