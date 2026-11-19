/**
 * Brand marks. The SVGs live in /public/brand and are painted through a
 * CSS mask so they take the current text color (cream, copper or dark).
 */
export function WaveIcon({ className = '', label, ...rest }) {
  return (
    <span
      className={`brand-mark brand-mark--icon ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    />
  );
}

export function Wordmark({ className = '', label = 'Miss G Curls & Braids', ...rest }) {
  return (
    <span
      className={`brand-mark brand-mark--wordmark ${className}`}
      role="img"
      aria-label={label}
      {...rest}
    />
  );
}

/** Icon stacked above the wordmark, like the primary logo lockup. */
export function LogoLockup({ className = '' }) {
  return (
    <div className={`logo-lockup ${className}`} role="img" aria-label="Miss G Curls & Braids">
      <WaveIcon className="logo-lockup__icon" />
      <Wordmark className="logo-lockup__wordmark" label="" aria-hidden="true" role={undefined} />
    </div>
  );
}
