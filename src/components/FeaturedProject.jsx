import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FeaturedProject() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <section className="featured" ref={ref} id="featured">
      <div className="container">
        <motion.p className="section-label" {...fadeUp(0)}>
          ✦ Featured Project
        </motion.p>

        <div className="featured__grid">
          <div className="featured__info">
            <motion.div className="featured__number" {...fadeUp(0.05)}>
              01
            </motion.div>

            <motion.h2 className="featured__title" {...fadeUp(0.1)}>
              Pablo<br />
              <em>Racing</em>
            </motion.h2>

            <motion.p className="featured__role" {...fadeUp(0.15)}>
              Officina Automotive — Web Design & Dev
            </motion.p>

            <motion.p className="featured__desc" {...fadeUp(0.2)}>
              L'officina necessitava di un sito moderno che rispecchiasse la
              qualità dei suoi servizi. Ho progettato e sviluppato una piattaforma
              web responsive che mostra il catalogo dei servizi, gestisce le
              prenotazioni e racconta il brand con un'estetica premium.
            </motion.p>

            <motion.div className="featured__challenge" {...fadeUp(0.25)}>
              <span className="featured__challenge-label">Soluzione</span>
              <p>Sito responsive con PHP e MySQL per la gestione dinamica dei contenuti,
              interfaccia curata per mobile-first, e ottimizzazione SEO per la ricerca locale.</p>
            </motion.div>

            <motion.div className="featured__tech" {...fadeUp(0.3)}>
              {['PHP', 'MySQL', 'HTML/CSS', 'JavaScript'].map(tech => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </motion.div>

            <motion.div className="featured__links" {...fadeUp(0.35)}>
              <a href="https://racing.netboom.it" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <span>Visita il sito</span>
                <span>↗</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            className="featured__visual"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="featured__mockup">
              <div className="featured__mockup-bar">
                <div className="dot" style={{ background: '#ff5f57' }} />
                <div className="dot" style={{ background: '#ffbd2e' }} />
                <div className="dot" style={{ background: '#28c840' }} />
                <div className="featured__mockup-url">racing.netboom.it</div>
              </div>
              <div className="featured__mockup-content">
                <a
                  href="https://racing.netboom.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="featured__screenshot-link"
                >
                  <img
                    src="/pablo-racing.png"
                    alt="Pablo Racing website screenshot"
                    className="featured__screenshot"
                    loading="lazy"
                  />
                  <div className="featured__screenshot-overlay">
                    <span className="featured__screenshot-cta">↗ Visita il sito live</span>
                  </div>
                </a>
              </div>
              <div className="featured__mockup-glow" />
            </div>

            <div className="featured__stats">
              {[
                { value: '100%', label: 'Responsive' },
                { value: '2024', label: 'Consegnato' },
                { value: 'Live', label: 'Status' },
              ].map(stat => (
                <div key={stat.label} className="featured__stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .featured {
          padding: var(--section-padding) 0;
          position: relative;
          overflow: hidden;
        }
        .featured::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border-neon), transparent);
        }
        .featured .section-label { margin-bottom: 60px; display: block; }
        .featured__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .featured__number {
          font-family: var(--font-display);
          font-size: 5rem;
          font-weight: 900;
          color: rgba(0,217,255,0.08);
          line-height: 1;
          margin-bottom: -20px;
          letter-spacing: -0.05em;
        }
        .featured__title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 5vw, 4.5rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--text);
          margin-bottom: 16px;
        }
        .featured__title em {
          color: var(--neon-blue);
          text-shadow: 0 0 40px rgba(0,217,255,0.3);
        }
        .featured__role {
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--magenta);
          margin-bottom: 28px;
          font-weight: 500;
        }
        .featured__desc {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 28px;
          font-size: 0.95rem;
        }
        .featured__challenge {
          border-left: 1px solid var(--border-neon);
          padding-left: 20px;
          margin-bottom: 32px;
        }
        .featured__challenge-label {
          display: block;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--neon-blue);
          margin-bottom: 8px;
          font-weight: 500;
        }
        .featured__challenge p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.7;
        }
        .featured__tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 36px;
        }
        .tech-badge {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
          padding: 5px 12px;
          border: 1px solid var(--border-neon);
          color: var(--neon-blue);
          border-radius: 100px;
          background: var(--neon-blue-dim);
        }
        .featured__mockup {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          position: relative;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .featured__mockup:hover {
          border-color: var(--border-neon);
          box-shadow: 0 0 60px rgba(0,217,255,0.1), 0 40px 80px rgba(0,0,0,0.5);
        }
        .featured__mockup-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
        }
        .dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          opacity: 0.8;
        }
        .featured__mockup-url {
          flex: 1;
          font-size: 0.7rem;
          color: var(--text-muted);
          text-align: center;
          background: rgba(255,255,255,0.04);
          border-radius: 4px;
          padding: 3px 10px;
          margin: 0 8px;
        }
        .featured__mockup-content {
          padding: 0;
          height: 380px;
          overflow: hidden;
          position: relative;
        }
        .featured__screenshot-link {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .featured__screenshot {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
          transition: transform 0.6s ease;
        }
        .featured__screenshot-link:hover .featured__screenshot {
          transform: scale(1.03);
        }
        .featured__screenshot-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 24px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .featured__screenshot-link:hover .featured__screenshot-overlay {
          opacity: 1;
        }
        .featured__screenshot-cta {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--neon-blue);
          border: 1px solid var(--border-neon);
          padding: 8px 20px;
          border-radius: var(--radius-sm);
          font-weight: 500;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          box-shadow: 0 0 20px rgba(0,217,255,0.2);
        }
        .featured__mockup-glow {
          position: absolute;
          bottom: -20px; left: 50%;
          transform: translateX(-50%);
          width: 60%; height: 40px;
          background: rgba(0,217,255,0.15);
          filter: blur(20px);
          pointer-events: none;
        }
        .featured__stats {
          display: flex;
          gap: 24px;
          margin-top: 24px;
        }
        .featured__stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .featured__stat strong {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--neon-blue);
        }
        .featured__stat span {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        @media (max-width: 900px) {
          .featured__grid { grid-template-columns: 1fr; gap: 48px; }
        }
      `}</style>
    </section>
  );
}
