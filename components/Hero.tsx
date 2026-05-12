"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import siteData from "@/content/site.json";

export default function Hero() {
  const { hero } = siteData;

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      <Image
        src="/images/hero-placeholder.jpg"
        alt={`${hero.line1} ${hero.line2} — Hero`}
        fill
        sizes="100vw"
        className="object-cover object-center"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 sm:p-10">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-[family-name:var(--font-anton)] text-[clamp(3.5rem,12vw,8rem)] leading-none tracking-widest uppercase text-white"
        >
          {hero.line1}
          <br />
          {hero.line2}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-white/50 text-xs tracking-[0.25em] uppercase mt-3"
        >
          {hero.tagline}
        </motion.p>
      </div>
    </section>
  );
}
