import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const education = [
  {
    period: 'Gen 2025 — presente',
    title: 'ITS Apulia Digital Maker',
    subtitle: 'Diploma di specializzazione — Sviluppatore Software Web Developer',
    location: 'Bari, Italia',
    tag: 'EQF Livello 5',
    color: '#00d9ff',
    points: [
      'Sviluppo web full-stack: React, Angular, TypeScript',
      'Backend: Java, Node.js, SQL, Python',
      'UI/UX design e metodologie agili',
      'Progetto reale: Pablo Racing (PHP, MySQL)',
    ],
  },
  {
    period: 'Set 2018 — Lug 2023',
    title: 'ITC Gorjux, Tridente e Vivante',
    subtitle: 'Diploma in Amministrazione, Finanza & Marketing',
    location: 'Bari, Italia',
    tag: 'Voto 70/100',
    color: 'rgba(0,217,255,0.5)',
    points: [
      'Economia, tecnica aziendale e diritto',
      'Gestione finanziaria e amministrativa',
      'Fondamenti di marketing e comunicazione',
    ],
  },
];

const experience = [
  {
    period: '2024',
    title: 'Pablo Racing',
    subtitle: 'Web Developer — Freelance',
    location: 'racing.netboom.it',
    color: '#ff00ff',
    link: 'https://racing.netboom.it',
    points: [
      'Progettazione e sviluppo sito completo per officina automotive',
      'Stack: PHP, MySQL, HTML/CSS, JavaScript',
      'Mobile-first responsive con ottimizzazione SEO locale',
      'Live in produzione',
    ],
  },
  {
    period: 'Mar — Giu 2024',
    title: 'F.L.Y. Security',
    subtitle: 'Addetto al Controllo e Sicurezza',
    location: 'Bari, Italia',
    color: '#00ffff',
    points: [
      'Vigilanza e controllo degli accessi',
      'Risoluzione di situazioni critiche',
      'Monitoraggio sistemi di sicurezza',
      'Verifica procedure interne',
    ],
  },
  {
    period: 'Set — Dic 2023',
    title: 'Pizzeria "King"',
    subtitle: 'Cameriere',
    location: 'Bari, Italia',
    color: 'rgba(255,0,255,0.5)',
    points: [
      'Accoglienza e gestione del cliente',
      'Gestione ordini e servizio sala',
      'Customer service e problem solving',
      'Lavoro in team sotto pressione',
    ],
  },
];

const languages = [
  { name: 'Italiano', level: 'Madrelingua', pct: 100, color: '#00d9ff' },
  { name: 'Inglese', level: 'B2', pct: 70, color: '#ff00ff' },
  { name: 'Francese', level: 'A1', pct: 20, color: '#00ffff' },
];

const softSkills = [
  'Problem Solving', 'Resilienza', 'Customer Focus',
  'Autonomia', 'Teamwork', 'Adattabilità', 'Affidabilità',
];

function Entry({ entry, index, inView }) {
  return (
    <motion.div
      className="cv-entry"
      style={{ '--entry-color': entry.color }}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 + 0.2 }}
    >
      <div className="cv-entry__dot" />
      <div className="cv-entry__card">
        <div className="cv-entry__header">
          <div>
            <p className="cv-entry__period">{entry.period}</p>
            <h3 className="cv-entry__title">{entry.title}</h3>
            <p className="cv-entry__subtitle">{entry.subtitle}</p>
          </div>
          <div className="cv-entry__meta">
            {entry.tag && <span className="cv-entry__tag">{entry.tag}</span>}
            <span className="cv-entry__location">
              {entry.link
                ? <a href={entry.link} target="_blank" rel="noopener noreferrer">{entry.location} ↗</a>
                : entry.location}
            </span>
          </div>
        </div>
        <ul className="cv-entry__points">
          {entry.points.map((pt, i) => <li key={i}>{pt}</li>)}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Curriculum() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="curriculum" id="curriculum" ref={ref}>
      <div className="container">

        <div className="curriculum__header">
          <motion.p className="section-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}>
            ✦ Curriculum
          </motion.p>
          <motion.h2 className="curriculum__title"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>
            Il mio <em>percorso</em>
          </motion.h2>
        </div>

        {/* Two-column grid */}
        <div className="curriculum__grid">

          {/* Formazione */}
          <div className="curriculum__col">
            <motion.p className="curriculum__col-label"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.15 }}>
              Formazione
            </motion.p>
            <div className="cv-timeline">
              <div className="cv-timeline__line" />
              {education.map((e, i) => <Entry key={e.title} entry={e} index={i} inView={inView} />)}
            </div>
          </div>

          {/* Esperienze */}
          <div className="curriculum__col">
            <motion.p className="curriculum__col-label"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.15 }}>
              Esperienze
            </motion.p>
            <div className="cv-timeline">
              <div className="cv-timeline__line" />
              {experience.map((e, i) => <Entry key={e.title} entry={e} index={i} inView={inView} />)}
            </div>
          </div>
        </div>

        {/* Bottom row: lingue + soft skills */}
        <div className="curriculum__bottom">

          <motion.div className="curriculum__langs"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}>
            <p className="curriculum__col-label">Lingue</p>
            <div className="lang-list">
              {languages.map(lang => (
                <div key={lang.name} className="lang-item">
                  <div className="lang-item__header">
                    <span className="lang-item__name">{lang.name}</span>
                    <span className="lang-item__level" style={{ color: lang.color }}>{lang.level}</span>
                  </div>
                  <div className="lang-item__track">
                    <motion.div
                      className="lang-item__fill"
                      style={{ background: lang.color, boxShadow: `0 0 8px ${lang.color}` }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${lang.pct}%` } : { width: 0 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="curriculum__soft"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}>
            <p className="curriculum__col-label">Competenze Trasversali</p>
            <div className="soft-skills">
              {softSkills.map((s, i) => (
                <motion.span
                  key={s}
                  className="soft-skill"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.65 + i * 0.06 }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

      </div>

      <style>{`
        .curriculum {
          padding: var(--section-padding) 0;
          position: relative;
        }
        .curriculum::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border), transparent);
        }
        .curriculum__header { margin-bottom: 64px; }
        .curriculum__header .section-label { margin-bottom: 20px; display: block; }
        .curriculum__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: var(--text);
          letter-spacing: -0.02em;
        }
        .curriculum__title em { color: var(--neon-blue); font-style: italic; }

        .curriculum__col-label {
          font-size: 0.62rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--neon-blue);
          font-weight: 600;
          margin-bottom: 28px;
        }

        .curriculum__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .cv-timeline {
          position: relative;
          padding-left: 28px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .cv-timeline__line {
          position: absolute;
          left: 0; top: 8px; bottom: 8px;
          width: 1px;
          background: linear-gradient(to bottom, var(--neon-blue), var(--magenta), transparent);
          opacity: 0.25;
        }
        .cv-entry { position: relative; }
        .cv-entry__dot {
          position: absolute;
          left: -33px; top: 18px;
          width: 9px; height: 9px;
          border-radius: 50%;
          background: var(--entry-color);
          box-shadow: 0 0 10px var(--entry-color);
          border: 2px solid var(--bg);
        }
        .cv-entry__card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .cv-entry__card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: var(--entry-color);
          box-shadow: 0 0 6px var(--entry-color);
          opacity: 0.6;
        }
        .cv-entry__card:hover {
          border-color: var(--entry-color);
          box-shadow: 0 0 30px rgba(0,0,0,0.3);
        }
        .cv-entry__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .cv-entry__period {
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--entry-color);
          font-weight: 500;
          margin-bottom: 6px;
        }
        .cv-entry__title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 3px;
        }
        .cv-entry__subtitle {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .cv-entry__meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }
        .cv-entry__tag {
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--neon-blue);
          border: 1px solid var(--border-neon);
          padding: 2px 8px;
          border-radius: 100px;
          background: var(--neon-blue-dim);
          white-space: nowrap;
        }
        .cv-entry__location {
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .cv-entry__location a { color: var(--entry-color); transition: opacity 0.2s; }
        .cv-entry__location a:hover { opacity: 0.7; }
        .cv-entry__points { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .cv-entry__points li {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.6;
          padding-left: 14px;
          position: relative;
        }
        .cv-entry__points li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--entry-color);
          opacity: 0.5;
        }

        /* Bottom row */
        .curriculum__bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          padding-top: 48px;
          border-top: 1px solid var(--border);
        }

        /* Languages */
        .lang-list { display: flex; flex-direction: column; gap: 20px; }
        .lang-item__header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .lang-item__name {
          font-size: 0.9rem;
          color: var(--text);
          font-weight: 500;
        }
        .lang-item__level {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
        }
        .lang-item__track {
          height: 2px;
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
          overflow: hidden;
        }
        .lang-item__fill { height: 100%; border-radius: 2px; }

        /* Soft skills */
        .soft-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .soft-skill {
          font-size: 0.75rem;
          padding: 6px 14px;
          border: 1px solid var(--border);
          border-radius: 100px;
          color: var(--text-secondary);
          transition: all 0.3s;
          background: var(--bg-card);
        }
        .soft-skill:hover {
          border-color: var(--magenta);
          color: var(--magenta);
          box-shadow: 0 0 12px rgba(255,0,255,0.15);
        }

        @media (max-width: 900px) {
          .curriculum__grid { grid-template-columns: 1fr; gap: 48px; }
          .curriculum__bottom { grid-template-columns: 1fr; gap: 40px; }
          .cv-timeline { padding-left: 20px; }
          .cv-entry__dot { left: -25px; }
        }
      `}</style>
    </section>
  );
}
