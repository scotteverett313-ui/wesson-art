# Miss G Curls & Braids — website

One-page booking site for a Detroit-area braids & curls stylist. An SE|Design Studio pilot.

**Stack:** Vite + React 18, GSAP + ScrollTrigger (scroll and ambient motion), Framer Motion (section fade-ins and splash), plain CSS. Deploys as a static site on Vercel.

## Run it

```bash
cd miss-g
npm install
cp .env.example .env      # then paste your Formspree endpoint
npm run dev               # http://localhost:5173
npm run build             # production build in dist/
```

## Edit content: one file

Everything a client sees lives in **`src/data/site.js`**: tagline, services (names, descriptions, prices, times), gallery images, about text, contact info, section headings. Nothing else needs to change for a content update.

**Swapping in real photos**

1. Drop the image into `public/images/` (e.g. `public/images/gallery-1.jpg`).
2. In `site.js`, set that item's `src` to `"/images/gallery-1.jpg"` and write a real `alt`.
3. Keep the aspect ratios: gallery and about photos are **4:5** (portrait, e.g. 1080×1350). The hero image is **16:9** (e.g. 1600×900). Images are cropped to fit with `object-fit: cover`, so slightly-off ratios are fine.

While `src` is `null`, the `Placeholder` component shows a branded tile (wave icon + label) at the final size, so the layout does not shift when real photos land.

## Animations

All GSAP animations live next to the component they belong to and run through `motionOK()` in `src/lib/gsap.js`. Visitors whose device is set to reduce motion get a still, fully visible page.

| Where | What it does |
| --- | --- |
| Splash | Wave symbol fades in, then out (Framer Motion). Once per visit. |
| Hero wordmark | Wipes on left to right after the splash. |
| Hero shapes | Blobs slowly drift and rotate; flowing lines sway; both parallax on scroll. |
| Hero photo | Drifts gently inside its frame as the page scrolls. |
| Service band | Endless scroll of service names under the hero. Slows on hover. Built from `site.services`. |
| Header | Frosts and gains a shadow after scrolling 80px. |
| Section accents | Script words ("the menu", "recent work"…) rise in letter by letter. |
| Prices | Count up from 0 when the cards scroll into view. Screen readers get the final price. |
| Gallery and about photos | Start slightly zoomed in and settle as they scroll into view. |

## Booking form (Formspree)

The form POSTs `multipart/form-data` to the URL in `VITE_FORM_ENDPOINT`.

1. Create a form at formspree.io and copy its endpoint (`https://formspree.io/f/xxxxxxx`).
2. Locally: put it in `.env` (see `.env.example`). On Vercel: Project → Settings → Environment Variables → `VITE_FORM_ENDPOINT`, then redeploy.
3. Add Miss G's email as the form recipient in Formspree. Each request arrives with the subject "New booking request from {name}".

Fields sent: `name`, `phone`, `service`, `preferred_time_1`, `preferred_time_2`, `preferred_time_3` (optional), `notes` (optional), `photo` (optional file), plus `_subject` and a `_gotcha` honeypot for spam.

**File uploads need a paid Formspree plan.** The free tier accepts the text fields but rejects file attachments. The Gold plan (or higher) enables uploads; check formspree.io/plans for the current limit per file. The photo is compressed in the browser to under 2MB before sending, so it stays within Formspree's per-file limit. If you'd rather stay on the free tier, leave the photo field as-is (it's optional) and ask clients to DM photos on Instagram, or remove the field in `BookingForm.jsx`.

If the env variable is missing, the form shows a friendly "not connected yet" message instead of failing silently.

## Fonts (Adobe Fonts)

In `index.html`, replace `PASTE_KIT_ID` in the Typekit stylesheet URL with the kit ID from fonts.adobe.com. The kit must include **Caflisch Script Pro** (`caflisch-script-pro`) and **Myriad Pro** (`myriad-pro`). Until the kit is set, the site falls back to system fonts.

Caflisch Script is used only for the short accent words above section titles (set in `site.js` → `sections`). Everything else is Myriad Pro.

## Brand assets

- `public/brand/wordmark.svg` and `public/brand/wave-icon.svg` — vector logos, painted through CSS masks so they take any brand color.
- `public/favicon.svg`, `public/apple-touch-icon.png`, `public/og-image.png` — favicon and share image.
- `brand/` — source PNGs (guidelines, lockups) plus copies of the SVGs.

### Contrast rules (WCAG AA, measured)

| Pair | Ratio | Use |
| --- | --- | --- |
| Cream `#DDC5A3` on deep `#291E26` | 9.6 | Body text on dark sections |
| Cream on plum `#34271F` | 8.7 | Body text on dark sections |
| Deep on cream | 9.6 | Body text on cream sections |
| Deep on copper `#B47446` | 4.2 | Buttons only, bold ≥ 19px (large-text AA) |
| Copper on deep/plum | 4.2 | Script accent words only, ≥ 24px |
| Copper on cream / cream on copper | 2.3 | **Never for text** |

Error text uses `#8B1A1A` on cream (5.6:1). Placeholder labels are always a deep chip with cream text so they pass on both copper and cream tiles.

## Deploy on Vercel

This folder lives inside a larger repo, so in the Vercel project set **Root Directory** to `miss-g`. Framework preset: Vite. Build command `npm run build`, output `dist`. Add `VITE_FORM_ENDPOINT` under Environment Variables.
