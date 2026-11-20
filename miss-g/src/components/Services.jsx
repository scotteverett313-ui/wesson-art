import { useRef } from 'react';
import { site } from '../data/site.js';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';
import { EdgeWave } from './Decor.jsx';
import { gsap, useGSAP, motionOK } from '../lib/gsap.js';

const isNumber = (v) => typeof v === 'number' || /^\d+(\.\d+)?$/.test(String(v));

export default function Services() {
  const { accent, title } = site.sections.services;
  const ref = useRef(null);

  // Prices count up from zero when the cards scroll into view.
  useGSAP(
    () => {
      motionOK(() => {
        const els = [...ref.current.querySelectorAll('[data-count]')];
        els.forEach((el) => {
          const target = Number(el.dataset.count);
          const counter = { v: 0 };
          el.textContent = '0'; // start at zero so there's no flash of the final price
          gsap.to(counter, {
            v: target,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate: () => (el.textContent = Math.round(counter.v)),
          });
        });
        // If motion gets turned off mid-visit, put the real prices back.
        return () => els.forEach((el) => (el.textContent = el.dataset.count));
      });
    },
    { scope: ref }
  );

  return (
    <section id="services" ref={ref} className="section section--cream section--edged" aria-labelledby="services-title">
      <EdgeWave color="var(--plum)" />
      <div className="container">
        <SectionHeading accent={accent} title={title} id="services-title" />
        <ul className="services" role="list">
          {site.services.map((s, i) => (
            <Reveal as="li" key={s.name} className="service-card" delay={i * 0.05}>
              <h3 className="service-card__name">{s.name}</h3>
              <p className="service-card__desc">{s.description}</p>
              <dl className="service-card__meta">
                <div>
                  <dt>Starting at</dt>
                  <dd className="service-card__price">
                    {/* Screen readers get the final price; the animated number is visual only. */}
                    <span aria-hidden="true">
                      $
                      {isNumber(s.priceFrom) ? (
                        <span data-count={s.priceFrom}>{s.priceFrom}</span>
                      ) : (
                        s.priceFrom
                      )}
                    </span>
                    <span className="visually-hidden">${s.priceFrom}</span>
                  </dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{s.duration}</dd>
                </div>
              </dl>
              <a href="#book" className="service-card__link">
                Request this service
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
