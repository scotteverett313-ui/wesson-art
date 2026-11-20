import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { site } from '../data/site.js';
import { WaveIcon } from './Brand.jsx';

const KEY = 'missg-splash-seen';

/** True if the splash should play on this page load (once per browser session). */
export function shouldShowSplash() {
  if (!site.splash?.enabled) return false;
  try {
    return !sessionStorage.getItem(KEY);
  } catch {
    return true;
  }
}

/**
 * Full-screen intro: just the wave symbol on deep brown, then it fades
 * away to reveal the page. Tap anywhere to skip.
 */
export default function Splash({ onDone }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const hold = reduce ? 900 : site.splash?.durationMs ?? 1800;

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), hold);
    document.body.classList.add('splash-open');
    return () => {
      clearTimeout(t);
      document.body.classList.remove('splash-open');
    };
  }, [hold]);

  function finish() {
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* private mode */
    }
    document.body.classList.remove('splash-open');
    onDone?.();
  }

  return (
    <AnimatePresence onExitComplete={finish}>
      {visible && (
        <motion.div
          className="splash"
          role="presentation"
          onClick={() => setVisible(false)}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: 'easeInOut' }}
        >
          <motion.div
            className="splash__mark"
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <WaveIcon className="splash__icon" label="Miss G Curls & Braids" />
          </motion.div>
          <span className="visually-hidden">Loading Miss G Curls &amp; Braids</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
