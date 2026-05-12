"use client";

import { useState } from "react";
import ArtworkCard from "./ArtworkCard";
import Lightbox from "./Lightbox";
import type { Artwork } from "@/types/artwork";

interface GalleryProps {
  artworks: Artwork[];
}

export default function Gallery({ artworks }: GalleryProps) {
  const [selected, setSelected] = useState<Artwork | null>(null);

  return (
    <>
      <section className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 pt-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-0">
          {artworks.map((artwork, index) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onClick={setSelected}
              priority={index === 0}
            />
          ))}
        </div>
      </section>

      <Lightbox
        artwork={selected}
        onClose={() => setSelected(null)}
        artworks={artworks}
        onNavigate={setSelected}
      />
    </>
  );
}
