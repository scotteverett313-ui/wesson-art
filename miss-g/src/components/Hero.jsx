import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site.js';
import { Wordmark } from './Brand.jsx';
import Placeholder from './Placeholder.jsx';
import { Blob, WaveLines } from './Decor.jsx';
import Marquee from './Marquee.jsx';
import { gsap, useGSAP, motionOK } from '../lib/gsap.js';

/** `ready` is false while the splash screen is up, so the hero waits to animate in. */
export default function Hero({ ready = true }) {
  const reduce = useReducedMotion();
  const scope = useRef(null);

  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  });

  // Ambient motion: blobs drift and breathe, lines sway, everything parallaxes on scroll.
  useGSAP(
    () => {
      motionOK(() => {
        const q = gsap.utils.selector(scope);

        // Hide the wordmark so it can be "written" on once the splash lifts.
        gsap.set(q('.hero__wordmark'), { clipPath: 'inset(0% 100% 0% 0%)' });

        q('.hero__blob').forEach((blob, i) => {
          gsap.to(blob, {
            rotation: i ? -14 : 12,
            scale: i ? 1.08 : 0.94,
            x: i ? 18 : -24,
            duration: 9 + i * 3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
          gsap.to(blob, {
            y: i ? -60 : 120,
            ease: 'none',
            scrollTrigger: { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: true },
          });
        });

        gsap.to(q('.hero__lines'), { x: 40, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1 });

        // Photo drifts gently inside its frame while the hero scrolls by.
        const img = q('.hero__media img')[0];
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -5, scale: 1.12 },
            {
              yPercent: 5,
              scale: 1.12,
              ease: 'none',
              scrollTrigger: { trigger: q('.hero__media')[0], start: 'top bottom', end: 'bottom top', scrub: true },
            }
          );
        }
      });
    },
    { scope }
  );

  // Wordmark wipes on from left to right once the splash is gone.
  useGSAP(
    () => {
      if (!ready) return;
      motionOK(() => {
        gsap.fromTo(
          scope.current.querySelector('.hero__wordmark'),
          { clipPath: 'inset(0% 100% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut', delay: 0.05 }
        );
      });
    },
    { scope, dependencies: [ready] }
  );

  return (
    <section id="top" ref={scope} className="hero section section--dark section--grain" aria-labelledby="hero-title">
      <Blob variant={1} className="hero__blob hero__blob--1" />
      <Blob variant={2} className="hero__blob hero__blob--2" />
      <WaveLines className="hero__lines" />
      <div className="container hero__inner">
        <motion.div {...fade(0)}>
          <Wordmark className="hero__wordmark" />
        </motion.div>
        <motion.h1 id="hero-title" className="hero__tagline" {...fade(0.1)}>
          {site.hero.tagline}
        </motion.h1>
        <motion.p className="hero__meta" {...fade(0.15)}>
          {site.contact.location}
        </motion.p>
        <motion.div {...fade(0.2)}>
          <a href="#book" className="btn btn--primary btn--lg">
            {site.hero.ctaLabel}
          </a>
        </motion.div>
        <motion.div className="hero__media" {...fade(0.3)}>
          <Placeholder
            src={site.hero.image.src}
            alt={site.hero.image.alt}
            label={site.hero.image.label}
            aspect="16/9"
            tone="copper"
            priority
          />
        </motion.div>
      </div>
      <Marquee />
    </section>
  );
}
