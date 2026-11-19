import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site.js';
import { LogoLockup } from './Brand.jsx';
import Placeholder from './Placeholder.jsx';

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut', delay },
  });

  return (
    <section id="top" className="hero section section--dark" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <motion.div {...fade(0)}>
          <LogoLockup className="hero__logo" />
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
