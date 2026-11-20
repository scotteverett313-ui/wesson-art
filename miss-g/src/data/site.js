/**
 * MISS G CURLS & BRAIDS — SITE CONTENT
 * ------------------------------------------------------------------
 * Everything editable lives in this one file. Change prices, swap
 * photos, update the bio or contact info here and nothing else.
 *
 * PHOTOS: drop image files into /public/images/ and set `src` to
 * "/images/your-file.jpg". Leave `src` as null to show a branded
 * placeholder tile. Keep the aspect ratios noted on each item.
 */

export const site = {
  name: 'Miss G Curls & Braids',
  shortName: 'Miss G',

  // ---- SPLASH SCREEN ----------------------------------------------
  // Wave symbol shown once per visit before the page. Set enabled: false to remove.
  splash: { enabled: true, durationMs: 1800 },

  // ---- HERO -------------------------------------------------------
  hero: {
    // One line. Keep it short so it fits on a phone screen.
    tagline: 'Braids and curls that look good and feel good.',
    ctaLabel: 'Request an Appointment',
    // Wide image (16:9). Set src to a photo path to replace the placeholder.
    image: { src: '/images/hero.jpg', alt: 'Braided high bun with feed-in cornrows', label: 'Hero photo (16:9)' },
  },

  // ---- SERVICES ---------------------------------------------------
  // `name` is also used in the booking form dropdown and the scrolling band in the hero.
  services: [
    // SAMPLE PRICES AND TIMES — replace with Miss G's real numbers.
    // `priceFrom` as a plain number (e.g. 180) gets the count-up animation.
    {
      name: 'Knotless Braids',
      description: 'Lightweight, tension-free braids that lay flat and last.',
      priceFrom: 180,
      duration: '4–6 hrs',
    },
    {
      name: 'Cornrows',
      description: 'Clean, even rows in straight-back or custom patterns.',
      priceFrom: 75,
      duration: '1.5–3 hrs',
    },
    {
      name: 'Silk Press',
      description: 'Smooth, bouncy, heat-protected press with movement.',
      priceFrom: 85,
      duration: '2 hrs',
    },
    {
      name: 'Curl Wash & Style',
      description: 'Cleanse, deep condition and define your natural curl.',
      priceFrom: 65,
      duration: '1.5 hrs',
    },
  ],

  // ---- GALLERY ----------------------------------------------------
  // All gallery images are 4:5 (portrait), 1080 x 1350. Add or remove items freely.
  // An uneven last row is centered automatically.
  gallery: [
    { src: '/images/gallery-1.jpg', alt: 'Cornrows with a criss-cross design, top view', label: 'Gallery 1' },
    { src: '/images/gallery-2.jpg', alt: 'Short curled style with soft, defined curls', label: 'Gallery 2' },
    { src: '/images/gallery-3.jpg', alt: 'Side-swept stitch braids, top view', label: 'Gallery 3' },
    { src: '/images/gallery-4.jpg', alt: 'Honey blonde silk press with layered ends', label: 'Gallery 4' },
    { src: '/images/gallery-5.jpg', alt: 'Pinned-up curls with highlights, back view', label: 'Gallery 5' },
    { src: '/images/gallery-6.jpg', alt: 'Straight-back cornrows with a braided tail', label: 'Gallery 6' },
    { src: '/images/gallery-7.jpg', alt: 'Voluminous curled updo, back view', label: 'Gallery 7' },
    { src: '/images/gallery-8.jpg', alt: 'Curled bob, back view', label: 'Gallery 8' },
  ],

  // ---- ABOUT ------------------------------------------------------
  about: {
    heading: 'Miss G',
    paragraphs: [
      'Placeholder bio. A few sentences about who Miss G is, how long she has been styling, and what clients can expect when they sit in her chair.',
      'Second paragraph placeholder: her approach to healthy hair, what she specializes in, and why clients keep coming back.',
    ],
    // Portrait photo (4:5).
    photo: {
      src: '/images/about.jpg',
      alt: 'Illustrated portrait of Miss G holding a spray bottle and blow dryer',
      label: 'About photo (4:5)',
    },
  },

  // ---- BOOKING FORM -----------------------------------------------
  booking: {
    intro:
      'Send a request with a few days and times that work for you. Miss G will text you to confirm and share the address. No payment is needed to request.',
    successMessage: 'Thanks! Miss G will text you to confirm your time and share the address.',
  },

  // ---- CONTACT / FOOTER -------------------------------------------
  contact: {
    location: 'Detroit area, address shared after booking',
    instagramHandle: 'MissGcurlsandbraids',
    instagramUrl: 'https://instagram.com/MissGcurlsandbraids',
    // Phone placeholder. Use digits only in `phoneRaw` so the tap-to-call link works.
    phoneDisplay: '(313) 000-0000',
    phoneRaw: '3130000000',
  },

  // Small credit line in the footer. Set to '' to hide it.
  credit: { label: 'Site by SE|Design Studio', url: '' },

  // ---- SECTION HEADINGS -------------------------------------------
  // `accent` is set in Caflisch Script (short words only). `title` is Myriad.
  sections: {
    services: { accent: 'the menu', title: 'Services' },
    gallery: { accent: 'recent work', title: 'Gallery' },
    about: { accent: 'meet', title: 'Miss G' },
    booking: { accent: "let's book", title: 'Request an Appointment' },
  },
};

export default site;
