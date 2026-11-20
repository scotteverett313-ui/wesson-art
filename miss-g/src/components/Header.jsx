import { useRef } from 'react';
import { Wordmark } from './Brand.jsx';
import { ScrollTrigger, useGSAP } from '../lib/gsap.js';

export default function Header() {
  const ref = useRef(null);

  // Once the page scrolls, the bar tightens up and gains a soft shadow.
  // This is a state change, not motion, so it runs for everyone.
  useGSAP(() => {
    ScrollTrigger.create({
      start: 80,
      end: 'max',
      onToggle: (self) => ref.current?.classList.toggle('is-scrolled', self.isActive),
    });
  });

  return (
    <header className="header" ref={ref}>
      <div className="container header__inner">
        <a href="#top" className="header__logo" aria-label="Miss G Curls & Braids, back to top">
          <Wordmark className="header__wordmark" label="" aria-hidden="true" role={undefined} />
        </a>
        <a href="#book" className="btn btn--primary btn--sm">
          Book Now
        </a>
      </div>
    </header>
  );
}
