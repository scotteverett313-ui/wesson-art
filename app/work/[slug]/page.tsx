import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import artworksData from "@/content/artworks.json";
import type { Artwork } from "@/types/artwork";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (artworksData as Artwork[]).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artwork = (artworksData as Artwork[]).find((a) => a.slug === slug);
  if (!artwork) return {};
  return {
    title: artwork.title,
    description: artwork.description,
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const artwork = (artworksData as Artwork[]).find((a) => a.slug === slug);
  if (!artwork) notFound();

  return (
    <article className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors mb-10"
      >
        <ArrowLeft size={13} /> Back
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden w-full">
          <Image
            src={artwork.image}
            alt={`${artwork.title}, ${artwork.year}, ${artwork.medium}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            priority
          />
        </div>

        {/* Metadata */}
        <div className="lg:sticky lg:top-24">
          <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4">
            {artwork.series}
          </p>
          <h1 className="font-[family-name:var(--font-anton)] text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-widest uppercase text-white mb-8">
            {artwork.title}
          </h1>

          <dl className="space-y-2 mb-8">
            {[
              { label: "Year", value: artwork.year },
              { label: "Medium", value: artwork.medium },
              { label: "Dimensions", value: artwork.dimensions },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-6 text-sm">
                <dt className="w-24 text-white/30 flex-shrink-0 tracking-wide">{label}</dt>
                <dd className="text-white/80">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="border-t border-white/10 pt-8 mb-10">
            <p className="text-sm text-white/50 leading-relaxed">
              {artwork.description}
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase border border-white px-8 py-3 text-white hover:bg-white hover:text-black transition-colors"
          >
            Inquire
          </Link>
        </div>
      </div>
    </article>
  );
}
