"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Artwork } from "@/types/artwork";

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
  priority?: boolean;
}

export default function ArtworkCard({ artwork, onClick, priority = false }: ArtworkCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="group cursor-pointer"
      onClick={() => onClick(artwork)}
    >
      {/* Full-width image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900">
        <Image
          src={artwork.image}
          alt={`${artwork.title}, ${artwork.year}, ${artwork.medium}`}
          fill
          sizes="100vw"
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          priority={priority}
          onLoad={() => setIsLoaded(true)}
        />
        {/* Subtle hover tint */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
      </div>

      {/* Title block */}
      <div className="px-0 pt-4 pb-10">
        <h2 className="font-[family-name:var(--font-anton)] text-[clamp(1.6rem,5vw,2.8rem)] leading-none tracking-widest uppercase text-white">
          {artwork.title}
        </h2>
        <p className="text-xs text-white/40 tracking-[0.2em] uppercase mt-1.5">
          {artwork.year} &nbsp;·&nbsp; {artwork.medium}
        </p>
      </div>
    </motion.article>
  );
}
