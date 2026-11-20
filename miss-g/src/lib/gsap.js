/**
 * GSAP setup. Import gsap, ScrollTrigger and useGSAP from here so the
 * plugins are registered once.
 *
 * Every animation in the site is wrapped in `motionOK(...)`, so visitors
 * who ask their device to reduce motion get a still, fully visible page.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const NO_REDUCED_MOTION = '(prefers-reduced-motion: no-preference)';

/** Run `setup` only when motion is OK. Call inside useGSAP so it's cleaned up. */
export function motionOK(setup) {
  const mm = gsap.matchMedia();
  mm.add(NO_REDUCED_MOTION, setup);
  return mm;
}

export { gsap, ScrollTrigger, useGSAP };
