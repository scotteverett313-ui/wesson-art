import { useRef } from 'react';
import { site } from '../data/site.js';
import { WaveIcon } from './Brand.jsx';
import { gsap, useGSAP, motionOK } from '../lib/gsap.js';

/**
 * Slow, endless band of service names separated by the wave icon.
 * Decorative (the services are listed properly below), so hidden from
 * screen readers. Stays still for reduced-motion visitors.
 */
export default function Marquee() {
  const ref = useRef(null);
  const items = [...site.services.map((s) => s.name), 'Detroit area'];

  useGSAP(
    () => {
      motionOK(() => {
        const track = ref.current.querySelector('.marquee__track');
        const loop = gsap.to(track, { xPercent: -50, duration: 32, ease: 'none', repeat: -1 });
        // Ease to a crawl while hovered, then back up to speed.
        const slow = () => gsap.to(loop, { timeScale: 0.2, duration: 0.6 });
        const fast = () => gsap.to(loop, { timeScale: 1, duration: 0.6 });
        ref.current.addEventListener('mouseenter', slow);
        ref.current.addEventListener('mouseleave', fast);
        return () => {
          ref.current?.removeEventListener('mouseenter', slow);
          ref.current?.removeEventListener('mouseleave', fast);
        };
      });
    },
    { scope: ref }
  );

  // Two identical halves so the loop is seamless at xPercent -50.
  const half = (key) => (
    <div className="marquee__half" key={key}>
      {items.map((label) => (
        <span className="marquee__item" key={key + label}>
          {label}
          <WaveIcon className="marquee__icon" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" ref={ref} aria-hidden="true">
      <div className="marquee__track">{[half('a'), half('b')]}</div>
    </div>
  );
}
