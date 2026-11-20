import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site.js';
import { Wordmark } from './Brand.jsx';
import Placeholder from './Placeholder.jsx';
import { Blob, WaveLines } from './Decor.jsx';

/** `ready` is false while the splash screen is up, so the hero waits to animate in. */
export default function Hero({ ready = true }) {
  const reduce = useReducedMotion();
  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  });

  return (
    <section id="top" className="hero section section--dark section--grain" aria-labelledby="hero-title">
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
          />
        </motion.div>
      </div>
    </section>
  );
}
