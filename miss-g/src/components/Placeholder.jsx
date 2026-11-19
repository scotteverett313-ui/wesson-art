import { WaveIcon } from './Brand.jsx';

/**
 * Branded placeholder tile. Renders the real <img> when `src` is set,
 * otherwise a copper or cream tile with the wave icon and a small label.
 * The aspect ratio is fixed so real photos drop in with no layout change.
 *
 * aspect: '4/5' | '16/9' | '1/1' etc.  tone: 'copper' | 'cream'
 */
export default function Placeholder({ src, alt = '', label, aspect = '4/5', tone = 'copper', className = '' }) {
  const style = { aspectRatio: aspect };

  if (src) {
    return (
      <div className={`media ${className}`} style={style}>
        <img src={src} alt={alt} loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`media placeholder placeholder--${tone} ${className}`} style={style} role="img" aria-label={alt || label || 'Photo coming soon'}>
      <WaveIcon className="placeholder__icon" />
      {label && <span className="placeholder__label">{label}</span>}
    </div>
  );
}
