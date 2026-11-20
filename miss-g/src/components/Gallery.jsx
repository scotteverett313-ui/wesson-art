import { site } from '../data/site.js';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';
import Placeholder from './Placeholder.jsx';
import { EdgeWave, Blob } from './Decor.jsx';

export default function Gallery() {
  const { accent, title } = site.sections.gallery;
  return (
    <section id="gallery" className="section section--plum section--edged section--grain" aria-labelledby="gallery-title">
      <EdgeWave color="var(--cream)" flip />
      <Blob variant={2} className="gallery__blob" />
      <div className="container">
        <SectionHeading accent={accent} title={title} id="gallery-title" />
        <ul className="gallery" role="list">
          {site.gallery.map((img, i) => (
            <Reveal as="li" key={img.label || i} delay={(i % 3) * 0.05}>
              <Placeholder
                src={img.src}
                alt={img.alt}
                label={img.label}
                aspect="4/5"
                tone={i % 2 === 0 ? 'copper' : 'cream'}
              />
            </Reveal>
          ))}
        </ul>
        <Reveal className="gallery__more">
          <a
            href={site.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow link-arrow--on-dark"
          >
            See more on Instagram @{site.contact.instagramHandle}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
