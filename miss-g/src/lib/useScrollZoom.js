import { gsap, useGSAP, motionOK } from './gsap.js';

/**
 * Photos inside `scopeRef` start slightly zoomed in and settle to normal
 * size as they scroll into view. The frame stays put (no layout shift);
 * only the image inside it moves.
 */
export function useScrollZoom(scopeRef, selector = '.media img') {
  useGSAP(
    () => {
      motionOK(() => {
        scopeRef.current.querySelectorAll(selector).forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.18 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'center 55%', scrub: 0.6 },
            }
          );
        });
      });
    },
    { scope: scopeRef }
  );
}
