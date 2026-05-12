"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import type { Artwork } from "@/types/artwork";

interface LightboxProps {
  artwork: Artwork | null;
  onClose: () => void;
  artworks: Artwork[];
  onNavigate: (artwork: Artwork) => void;
}

export default function Lightbox({ artwork, onClose, artworks, onNavigate }: LightboxProps) {
  const currentIndex = artwork ? artworks.findIndex((a) => a.id === artwork.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < artworks.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) onNavigate(artworks[currentIndex - 1]);
  }, [hasPrev, currentIndex, artworks, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext) onNavigate(artworks[currentIndex + 1]);
  }, [hasNext, currentIndex, artworks, onNavigate]);

  useEffect(() => {
    if (!artwork) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [artwork, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          {/* Prev */}
          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-10"
              aria-label="Previous artwork"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Next */}
          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-10"
              aria-label="Next artwork"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Content */}
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative w-full md:flex-1 aspect-[4/5] max-h-[70vh]">
              <Image
                src={artwork.image}
                alt={`${artwork.title}, ${artwork.year}, ${artwork.medium}`}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-contain"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OFDPQAIgQM/8l5TSAAAAABJRU5ErkJggg=="
              />
            </div>

            {/* Metadata */}
            <div className="md:w-64 lg:w-72 text-white flex-shrink-0">
              <p className="text-xs tracking-widest uppercase text-white/40 mb-3">
                {artwork.series}
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl leading-tight mb-4">
                {artwork.title}
              </h2>
              <dl className="space-y-1 text-sm text-white/60 mb-6">
                <div className="flex gap-2">
                  <dt className="w-20 text-white/30 flex-shrink-0">Year</dt>
                  <dd>{artwork.year}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-20 text-white/30 flex-shrink-0">Medium</dt>
                  <dd>{artwork.medium}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-20 text-white/30 flex-shrink-0">Size</dt>
                  <dd>{artwork.dimensions}</dd>
                </div>
              </dl>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                {artwork.description}
              </p>
              <Link
                href={`/work/${artwork.slug}`}
                className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors border-b border-white/20 hover:border-white/60 pb-0.5"
              >
                View full page <ArrowUpRight size={12} />
              </Link>
            </div>
          </motion.div>

          {/* Counter */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/30 tracking-widest">
            {currentIndex + 1} / {artworks.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
