/**
 * Decorative natural shapes. All are aria-hidden and sit behind content.
 * Source SVGs live in /public/shapes (also copied to /brand/shapes).
 *
 *   <Blob variant={1|2} className="..." />   organic filled shape (currentColor)
 *   <WaveLines className="..." />             three flowing lines, like the icon's curves
 *   <EdgeWave color="var(--plum)" flip />     wavy band at the top of a section, in the PREVIOUS
 *                                             section's color, so the two blend. `flip` mirrors it.
 */
export function Blob({ variant = 1, className = '', style }) {
  return <span aria-hidden="true" className={`shape shape--blob-${variant} ${className}`} style={style} />;
}

export function WaveLines({ className = '', style }) {
  return <span aria-hidden="true" className={`shape shape--wave-lines ${className}`} style={style} />;
}

export function EdgeWave({ color, flip = false, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`edge-wave ${flip ? 'edge-wave--flip' : ''} ${className}`}
      style={{ color }}
    />
  );
}
