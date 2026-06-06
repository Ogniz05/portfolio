import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DURATION = 5000;

const messages = [
  'Inizializzazione portfolio...',
  'Caricamento progetti...',
  'Rendering Three.js scene...',
  'Connessione a Bari, Italia...',
  'Quasi pronto...',
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  const particles = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      delay: `${i * 0.35}s`,
      x: `${(i / 14) * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      color: i % 3 === 0 ? 'var(--magenta)' : i % 3 === 1 ? 'var(--cyan)' : 'var(--neon-blue)',
    }))
  , []);

  useEffect(() => {
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      setMsgIndex(Math.min(Math.floor((pct / 100) * messages.length), messages.length - 1));
      if (elapsed < DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 400);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="loader__bg" />

          {/* Rotating rings */}
          <div className="loader__rings">
            <div className="loader__ring loader__ring--1" />
            <div className="loader__ring loader__ring--2" />
            <div className="loader__ring loader__ring--3" />
          </div>

          {/* Center content */}
          <div className="loader__center">
            <motion.div
              className="loader__logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="loader__logo-bracket">[</span>
              <span className="loader__logo-text">NP</span>
              <span className="loader__logo-bracket">]</span>
            </motion.div>

            <motion.p
              className="loader__name"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Nicolò Persia
            </motion.p>

            <motion.p
              className="loader__role"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Junior Developer — ITS Apulia Digital Maker
            </motion.p>
          </div>

          {/* Progress bar + status */}
          <div className="loader__progress-wrap">
            <AnimatePresence mode="wait">
              <motion.p
                key={msgIndex}
                className="loader__status"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                {messages[msgIndex]}
              </motion.p>
            </AnimatePresence>

            <div className="loader__progress-track">
              <div className="loader__progress-fill" style={{ width: `${progress}%` }} />
            </div>

            <span className="loader__pct">{Math.round(progress)}%</span>
          </div>

          {/* Instagram CTA */}
          <motion.a
            href="https://instagram.com/nico.persia05"
            target="_blank"
            rel="noopener noreferrer"
            className="loader__ig"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span>Seguimi su Instagram</span>
            <span className="loader__ig-handle">@nico.persia05</span>
          </motion.a>

          {/* Corner hint */}
          <motion.p
            className="loader__hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            ✦ Bari, Italia
          </motion.p>

          {/* Floating particles */}
          <div className="loader__particles">
            {particles.map((p, i) => (
              <div
                key={i}
                className="loader__particle"
                style={{
                  '--delay': p.delay,
                  '--x': p.x,
                  '--size': p.size,
                  '--color': p.color,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
