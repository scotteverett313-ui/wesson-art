"use client";

import { useEffect, useCallback, useState } from "react";
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
  const [slideIndex, setSlideIndex] = useState(0);

  const currentIndex = artwork ? artworks.findIndex((a) => a.id === artwork.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < artworks.length - 1;

  const slides = artwork?.images?.length ? artwork.images : artwork ? [artwork.image] : [];
  const hasMultipleSlides = slides.length > 1;

  useEffect(() => {
    setSlideIndex(0);
  }, [artwork?.id]);

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

          {/* Artwork prev */}
          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10"
              aria-label="Previous artwork"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Artwork next */}
          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10"
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
            {/* Image + slideshow controls */}
            <div className="w-full md:flex-1 flex flex-col gap-3">
              <div className="relative w-full aspect-[4/5] max-h-[70vh] group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slides[slideIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slides[slideIndex]}
                      alt={`${artwork.title} – ${slideIndex + 1} of ${slides.length}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-contain"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OFDPQAIgQM/8l5TSAAAAABJRU5ErkJggg=="
                    />
                  </motion.div>
                </AnimatePresence>

                {hasMultipleSlides && (
                  <>
                    <button
                      onClick={() => setSlideIndex((i) => (i > 0 ? i - 1 : slides.length - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => setSlideIndex((i) => (i < slides.length - 1 ? i + 1 : 0))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}
              </div>

              {/* Dot indicators */}
              {hasMultipleSlides && (
                <div className="flex justify-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i === slideIndex ? "bg-white scale-125" : "bg-white/30 hover:bg-white/60"
                      }`}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
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

          {/* Artwork counter */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/30 tracking-widest">
            {currentIndex + 1} / {artworks.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
