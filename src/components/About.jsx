import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const facts = [
  { label: 'Formazione', value: 'ITS Apulia Digital Maker' },
  { label: 'Città', value: 'Bari, Italia' },
  { label: 'Ruolo', value: 'Junior Dev' },
  { label: 'Disponibile', value: 'Freelance' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <div className="about__grid">
          <div className="about__left">
            <motion.p className="section-label" {...fade(0)}>
              ✦ Chi Sono
            </motion.p>

            <motion.h2 className="about__title" {...fade(0.1)}>
              Studente,<br />
              <em>Builder</em>,<br />
              Nicolò Persia
            </motion.h2>

            <motion.div className="about__facts" {...fade(0.2)}>
              {facts.map(f => (
                <div key={f.label} className="about__fact">
                  <span className="about__fact-label">{f.label}</span>
                  <strong className="about__fact-value">{f.value}</strong>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="about__right">
            <motion.div className="about__avatar-wrap" {...fade(0.15)}>
              <div className="about__avatar">
                <img
                  src="/foto-profilo.png"
                  alt="Nicolò Persia"
                  className="about__avatar-img"
                  loading="lazy"
                />
                <div className="about__avatar-ring" />
              </div>
            </motion.div>

            <motion.div className="about__bio" {...fade(0.2)}>
              <p>
                Sono un giovane sviluppatore web diplomato in Amministrazione, Finanza e Marketing
                presso l'ITC Vivante di Bari. Attualmente mi specializzo in Sviluppo Software
                presso ITS Apulia Digital Maker, dove lavoro con React, Angular, TypeScript,
                Java e SQL.
              </p>
              <p>
                Ho già esperienza nel mondo del lavoro — dalla ristorazione alla sicurezza —
                che mi ha dato affidabilità, gestione dello stress e orientamento al cliente.
                Queste soft skill si traducono direttamente in un approccio più solido
                allo sviluppo professionale.
              </p>
              <p>
                Parlo italiano come madrelingua e inglese a livello B2. Sono automunito,
                flessibile e sempre pronto a nuove sfide in ambienti stimolanti.
              </p>
            </motion.div>

            <motion.div className="about__highlight" {...fade(0.3)}>
              <blockquote>
                "Il miglior codice è quello che <em>non devi mai spiegare</em>."
              </blockquote>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .about {
          padding: var(--section-padding) 0;
          position: relative;
          overflow: hidden;
        }
        .about::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border), transparent);
        }
        .about::after {
          content: '';
          position: absolute;
          top: 50%; left: -10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255,0,255,0.04) 0%, transparent 70%);
          transform: translateY(-50%);
          pointer-events: none;
        }
        .about__grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 80px;
          align-items: start;
          position: relative;
          z-index: 1;
        }
        .about__left .section-label { margin-bottom: 28px; display: block; }
        .about__title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--text);
          margin-bottom: 48px;
        }
        .about__title em {
          color: var(--magenta);
          text-shadow: 0 0 30px rgba(255,0,255,0.3);
        }
        .about__facts {
          display: flex;
          flex-direction: column;
          gap: 20px;
          border-top: 1px solid var(--border);
          padding-top: 32px;
        }
        .about__fact {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }
        .about__fact-label {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .about__fact-value {
          color: var(--text);
          font-weight: 500;
          font-size: 0.9rem;
        }
        .about__avatar-wrap {
          margin-bottom: 40px;
        }
        .about__avatar {
          width: 200px; height: 200px;
          position: relative;
          display: inline-block;
        }
        .about__avatar-img {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
          border: 1px solid var(--border-neon);
          display: block;
        }
        .about__avatar-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid transparent;
          border-top-color: var(--neon-blue);
          border-right-color: var(--magenta);
          animation: spin 6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .about__bio {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 36px;
        }
        .about__bio p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.8;
        }
        .about__highlight {
          border-left: 2px solid var(--neon-blue);
          padding-left: 20px;
        }
        .about__highlight blockquote {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-style: italic;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .about__highlight blockquote em {
          color: var(--neon-blue);
          font-style: normal;
        }
        @media (max-width: 900px) {
          .about__grid { grid-template-columns: 1fr; gap: 48px; }
        }
      `}</style>
    </section>
  );
}
