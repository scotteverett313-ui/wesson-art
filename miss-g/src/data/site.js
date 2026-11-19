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

  // ---- HERO -------------------------------------------------------
  hero: {
    // One line. Keep it short so it fits on a phone screen.
    tagline: 'Braids and curls that look good and feel good.',
    ctaLabel: 'Request an Appointment',
    // Wide image (16:9). Set src to a photo path to replace the placeholder.
    image: { src: null, alt: 'Miss G styling a client', label: 'Hero photo (16:9)' },
  },

  // ---- SERVICES ---------------------------------------------------
  // `name` is also used in the booking form dropdown.
  services: [
    {
      name: 'Knotless Braids',
      description: 'Lightweight, tension-free braids that lay flat and last.',
      priceFrom: '[X]',
      duration: '[X] hrs',
    },
    {
      name: 'Cornrows',
      description: 'Clean, even rows in straight-back or custom patterns.',
      priceFrom: '[X]',
      duration: '[X] hrs',
    },
    {
      name: 'Silk Press',
      description: 'Smooth, bouncy, heat-protected press with movement.',
      priceFrom: '[X]',
      duration: '[X] hrs',
    },
    {
      name: 'Curl Wash & Style',
      description: 'Cleanse, deep condition and define your natural curl.',
      priceFrom: '[X]',
      duration: '[X] hrs',
    },
  ],

  // ---- GALLERY ----------------------------------------------------
  // All gallery images are 4:5 (portrait). Add or remove items freely.
  gallery: [
    { src: null, alt: 'Knotless braids, side view', label: 'Gallery 1' },
    { src: null, alt: 'Cornrows, back view', label: 'Gallery 2' },
    { src: null, alt: 'Silk press, finished look', label: 'Gallery 3' },
    { src: null, alt: 'Defined curls after wash and style', label: 'Gallery 4' },
    { src: null, alt: 'Braided updo', label: 'Gallery 5' },
    { src: null, alt: 'Client in the chair', label: 'Gallery 6' },
  ],

  // ---- ABOUT ------------------------------------------------------
  about: {
    heading: 'Miss G',
    paragraphs: [
      'Placeholder bio. A few sentences about who Miss G is, how long she has been styling, and what clients can expect when they sit in her chair.',
      'Second paragraph placeholder: her approach to healthy hair, what she specializes in, and why clients keep coming back.',
    ],
    // Portrait photo (4:5).
    photo: { src: null, alt: 'Portrait of Miss G', label: 'About photo (4:5)' },
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
