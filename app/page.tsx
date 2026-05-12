import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import artworksData from "@/content/artworks.json";
import type { Artwork } from "@/types/artwork";

export default function HomePage() {
  const artworks = artworksData as Artwork[];

  return (
    <>
      <Hero />
      <Gallery artworks={artworks} />
    </>
  );
}
