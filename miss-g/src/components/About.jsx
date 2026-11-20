import { site } from '../data/site.js';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';
import Placeholder from './Placeholder.jsx';
import { EdgeWave, WaveLines } from './Decor.jsx';

export default function About() {
  const { accent, title } = site.sections.about;
  return (
    <section id="about" className="section section--cream section--edged" aria-labelledby="about-title">
      <EdgeWave color="var(--plum)" />
      <WaveLines className="about__lines" />
      <div className="container about">
        <Reveal className="about__photo">
          <Placeholder
            src={site.about.photo.src}
            alt={site.about.photo.alt}
            label={site.about.photo.label}
            aspect="4/5"
            tone="copper"
          />
        </Reveal>
        <div className="about__text">
          <SectionHeading accent={accent} title={title} id="about-title" />
          {site.about.paragraphs.map((p, i) => (
            <Reveal as="p" key={i} delay={0.05 * (i + 1)}>
              {p}
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <a href="#book" className="btn btn--dark">
              Request an Appointment
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
