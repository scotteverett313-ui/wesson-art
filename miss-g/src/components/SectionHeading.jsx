import Reveal from './Reveal.jsx';

export default function SectionHeading({ accent, title, id }) {
  return (
    <Reveal className="section-heading">
      {accent && (
        <span className="section-heading__accent" aria-hidden="true">
          {accent}
        </span>
      )}
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
    </Reveal>
  );
}
