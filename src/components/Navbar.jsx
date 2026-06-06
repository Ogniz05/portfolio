import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Progetti', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Contatti', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar__inner">
          <a href="#" className="navbar__logo">
            <span className="navbar__logo-bracket">[</span>
            <span className="navbar__logo-text">NP</span>
            <span className="navbar__logo-bracket">]</span>
          </a>

          <ul className="navbar__links">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              >
                <a href={link.href} className="navbar__link">{link.label}</a>
              </motion.li>
            ))}
          </ul>

          <div className="navbar__available">
            <span className="navbar__avail-dot" />
            <span className="navbar__avail-text">Disponibile</span>
          </div>

          <a href="#contact" className="navbar__cta">
            <span>Contattami</span>
          </a>

          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="mobile-menu__links">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <a href={link.href} onClick={closeMenu}>{link.label}</a>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <a href="#contact" className="mobile-menu__cta" onClick={closeMenu}>Contattami</a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 24px clamp(20px, 5vw, 60px);
          transition: padding 0.4s ease, background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease;
          border-bottom: 1px solid transparent;
        }
        .navbar--scrolled {
          padding: 16px clamp(20px, 5vw, 60px);
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: var(--border);
        }
        .navbar__inner {
          max-width: var(--container);
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .navbar__logo {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          margin-right: auto;
        }
        .navbar__logo-bracket {
          color: var(--neon-blue);
          font-style: italic;
        }
        .navbar__logo-text { color: var(--text); }
        .navbar__links {
          display: flex;
          list-style: none;
          gap: 36px;
        }
        .navbar__link {
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 500;
          position: relative;
          padding-bottom: 2px;
          transition: color 0.3s;
        }
        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: var(--neon-blue);
          transition: width 0.3s ease;
        }
        .navbar__link:hover { color: var(--neon-blue); }
        .navbar__link:hover::after { width: 100%; }
        .navbar__cta {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--neon-blue);
          border: 1px solid var(--border-neon);
          padding: 8px 20px;
          border-radius: var(--radius-sm);
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .navbar__cta:hover {
          background: var(--neon-blue-dim);
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.2);
        }
        .navbar__available {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #00dc64;
          font-weight: 500;
        }
        .navbar__avail-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #00dc64;
          box-shadow: 0 0 6px #00dc64;
          animation: pulse-avail 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulse-avail {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #00dc64; }
          50% { opacity: 0.4; box-shadow: 0 0 2px #00dc64; }
        }
        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 4px;
          margin-left: auto;
        }
        .navbar__hamburger span {
          display: block;
          width: 24px; height: 1.5px;
          background: var(--text);
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .navbar__hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .navbar__hamburger.open span:nth-child(2) { opacity: 0; }
        .navbar__hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: rgba(10, 10, 10, 0.97);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-menu__links {
          list-style: none;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .mobile-menu__links a {
          font-family: var(--font-display);
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 700;
          color: var(--text);
          transition: color 0.3s;
        }
        .mobile-menu__links a:hover { color: var(--neon-blue); }
        .mobile-menu__cta {
          color: var(--neon-blue) !important;
        }
        @media (max-width: 768px) {
          .navbar__links, .navbar__cta, .navbar__available { display: none; }
          .navbar__hamburger { display: flex; }
        }
      `}</style>
    </>
  );
}
