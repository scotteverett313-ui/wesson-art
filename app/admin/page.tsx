"use client";

import { useState } from "react";
import artworksData from "@/content/artworks.json";
import siteData from "@/content/site.json";
import type { Artwork } from "@/types/artwork";

type SiteData = typeof siteData;

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <div className="mb-4">
      <p className="text-xs text-white/40 tracking-[0.15em] uppercase mb-1">{label}</p>
      <p className="text-sm text-white/60 bg-white/5 rounded px-3 py-2 mb-2 border border-white/10">
        {value || <span className="italic text-white/20">empty</span>}
      </p>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white/60 resize-none transition-colors"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white/60 transition-colors"
        />
      )}
    </div>
  );
}

function SaveButton({ onClick, status }: { onClick: () => void; status: "idle" | "saving" | "saved" | "error" }) {
  return (
    <button
      onClick={onClick}
      disabled={status === "saving"}
      className={`text-xs tracking-[0.2em] uppercase px-6 py-2.5 border transition-colors ${
        status === "saved"
          ? "border-green-500 text-green-500"
          : status === "error"
          ? "border-red-500 text-red-500"
          : "border-white text-white hover:bg-white hover:text-black"
      } disabled:opacity-40`}
    >
      {status === "saving" ? "Saving…" : status === "saved" ? "✓ Saved" : status === "error" ? "Error" : "Save Changes"}
    </button>
  );
}

export default function AdminPage() {
  const [artworks, setArtworks] = useState<Artwork[]>(artworksData as Artwork[]);
  const [site, setSite] = useState<SiteData>(siteData);
  const [artworkStatus, setArtworkStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [siteStatus, setSiteStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const updateArtwork = (id: string, field: keyof Artwork, value: string) => {
    setArtworks((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const saveArtworks = async () => {
    setArtworkStatus("saving");
    const res = await fetch("/api/update-artworks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artworks),
    });
    setArtworkStatus(res.ok ? "saved" : "error");
    setTimeout(() => setArtworkStatus("idle"), 3000);
  };

  const saveSite = async () => {
    setSiteStatus("saving");
    const res = await fetch("/api/update-site", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(site),
    });
    setSiteStatus(res.ok ? "saved" : "error");
    setTimeout(() => setSiteStatus("idle"), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      <div className="mb-12">
        <h1 className="font-[family-name:var(--font-anton)] text-4xl tracking-widest uppercase text-white mb-2">
          Content Editor
        </h1>
        <p className="text-sm text-white/40">
          Edit your copy below and click Save. Then push to GitHub to go live.
        </p>
        <div className="mt-3 inline-block bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs px-3 py-1.5 rounded tracking-wide">
          ⚠ Local only — runs on your dev server
        </div>
      </div>

      {/* ── SITE COPY ── */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
          <h2 className="text-xs tracking-[0.2em] uppercase text-white">Site Copy</h2>
          <SaveButton onClick={saveSite} status={siteStatus} />
        </div>

        <div className="mb-8">
          <h3 className="text-xs tracking-[0.15em] uppercase text-white/50 mb-4">Navigation</h3>
          <Field label="Wordmark" value={site.nav.wordmark} onChange={(v) => setSite((s) => ({ ...s, nav: { ...s.nav, wordmark: v } }))} />
        </div>

        <div className="mb-8">
          <h3 className="text-xs tracking-[0.15em] uppercase text-white/50 mb-4">Hero</h3>
          <Field label="Name Line 1" value={site.hero.line1} onChange={(v) => setSite((s) => ({ ...s, hero: { ...s.hero, line1: v } }))} />
          <Field label="Name Line 2" value={site.hero.line2} onChange={(v) => setSite((s) => ({ ...s, hero: { ...s.hero, line2: v } }))} />
          <Field label="Tagline" value={site.hero.tagline} onChange={(v) => setSite((s) => ({ ...s, hero: { ...s.hero, tagline: v } }))} />
        </div>

        <div className="mb-8">
          <h3 className="text-xs tracking-[0.15em] uppercase text-white/50 mb-4">About</h3>
          <Field label="Artist Name" value={site.about.name} onChange={(v) => setSite((s) => ({ ...s, about: { ...s.about, name: v } }))} />
          <Field label="Bio Paragraph 1" value={site.about.bio1} onChange={(v) => setSite((s) => ({ ...s, about: { ...s.about, bio1: v } }))} multiline />
          <Field label="Bio Paragraph 2" value={site.about.bio2} onChange={(v) => setSite((s) => ({ ...s, about: { ...s.about, bio2: v } }))} multiline />
          <Field label="Bio Paragraph 3" value={site.about.bio3} onChange={(v) => setSite((s) => ({ ...s, about: { ...s.about, bio3: v } }))} multiline />
        </div>

        <div>
          <h3 className="text-xs tracking-[0.15em] uppercase text-white/50 mb-4">Contact</h3>
          <Field label="Intro Text" value={site.contact.intro} onChange={(v) => setSite((s) => ({ ...s, contact: { ...s.contact, intro: v } }))} multiline />
        </div>
      </section>

      {/* ── ARTWORKS ── */}
      <section>
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
          <h2 className="text-xs tracking-[0.2em] uppercase text-white">Artworks</h2>
          <SaveButton onClick={saveArtworks} status={artworkStatus} />
        </div>

        <div className="space-y-12">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="border border-white/10 rounded p-6">
              <p className="font-[family-name:var(--font-anton)] text-xl tracking-widest uppercase text-white mb-6">
                {artwork.title}
              </p>
              <Field label="Title" value={artwork.title} onChange={(v) => updateArtwork(artwork.id, "title", v)} />
              <Field label="Year" value={artwork.year} onChange={(v) => updateArtwork(artwork.id, "year", v)} />
              <Field label="Medium" value={artwork.medium} onChange={(v) => updateArtwork(artwork.id, "medium", v)} />
              <Field label="Dimensions" value={artwork.dimensions} onChange={(v) => updateArtwork(artwork.id, "dimensions", v)} />
              <Field label="Series" value={artwork.series} onChange={(v) => updateArtwork(artwork.id, "series", v)} />
              <Field label="Description" value={artwork.description} onChange={(v) => updateArtwork(artwork.id, "description", v)} multiline />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <SaveButton onClick={saveArtworks} status={artworkStatus} />
        </div>
      </section>
    </div>
  );
}
