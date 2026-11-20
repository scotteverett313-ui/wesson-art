import { useRef } from 'react';
import Reveal from './Reveal.jsx';
import { gsap, useGSAP, motionOK } from '../lib/gsap.js';

export default function SectionHeading({ accent, title, id }) {
  const ref = useRef(null);

  // Script accent word rises in letter by letter, like it's being written.
  useGSAP(
    () => {
      motionOK(() => {
        gsap.from(ref.current.querySelectorAll('.section-heading__char'), {
          yPercent: 60,
          rotation: 6,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(2)',
          stagger: 0.035,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <Reveal className="section-heading">
      <div ref={ref}>
        {accent && (
          <span className="section-heading__accent" aria-hidden="true">
            {[...accent].map((ch, i) => (
              <span className="section-heading__char" key={i}>
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </span>
        )}
        <h2 id={id} className="section-heading__title">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}
