import { WaveIcon, Wordmark } from './Brand.jsx';

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="header__logo" aria-label="Miss G Curls & Braids, back to top">
          <WaveIcon className="header__icon" />
          <Wordmark className="header__wordmark" label="" aria-hidden="true" role={undefined} />
        </a>
        <a href="#book" className="btn btn--primary btn--sm">
          Book Now
        </a>
      </div>
    </header>
  );
}
