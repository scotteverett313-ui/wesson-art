import { site } from '../data/site.js';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';

export default function Services() {
  const { accent, title } = site.sections.services;
  return (
    <section id="services" className="section section--cream" aria-labelledby="services-title">
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
                  <dd className="service-card__price">${s.priceFrom}</dd>
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
