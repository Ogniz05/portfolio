import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const categories = [
  {
    name: 'Frontend',
    color: '#00d9ff',
    skills: [
      { name: 'React', level: 85 },
      { name: 'Angular', level: 75 },
      { name: 'TypeScript', level: 80 },
      { name: 'HTML/CSS', level: 90 },
    ],
  },
  {
    name: 'Backend',
    color: '#ff00ff',
    skills: [
      { name: 'Node.js', level: 70 },
      { name: 'Java', level: 75 },
      { name: 'Python', level: 65 },
      { name: 'SQL', level: 80 },
    ],
  },
  {
    name: 'Tools',
    color: '#00ffff',
    skills: [
      { name: 'Git', level: 85 },
      { name: 'Figma', level: 70 },
      { name: 'Vite', level: 80 },
      { name: 'Linux', level: 65 },
    ],
  },
];

function SkillBar({ skill, color, delay, inView }) {
  return (
    <div className="skill-item">
      <div className="skill-item__header">
        <span className="skill-item__name">{skill.name}</span>
        <motion.span
          className="skill-item__pct"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.3 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="skill-item__track">
        <motion.div
          className="skill-item__fill"
          style={{ '--skill-color': color }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
          custom={skill.level}
        >
          <div
            className="skill-item__bar"
            style={{ width: `${skill.level}%` }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">
        <div className="skills__header">
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
          >
            ✦ Tech Stack
          </motion.p>
          <motion.h2
            className="skills__title"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Le mie <em>armi</em>
          </motion.h2>
        </div>

        <div className="skills__grid">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              className="skill-cat"
              style={{ '--cat-color': cat.color }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: ci * 0.12 }}
            >
              <div className="skill-cat__header">
                <div className="skill-cat__dot" />
                <h3 className="skill-cat__name">{cat.name}</h3>
              </div>

              <div className="skill-cat__list">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    color={cat.color}
                    delay={ci * 0.12 + si * 0.08 + 0.2}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="skills__badges"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <p className="skills__badges-label">Sto imparando</p>
          <div className="skills__badges-row">
            {['Three.js', 'Framer Motion', 'Next.js', 'Docker', 'GraphQL'].map(s => (
              <span key={s} className="skill-new-badge">{s}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .skills {
          padding: var(--section-padding) 0;
          position: relative;
        }
        .skills::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border), transparent);
        }
        .skills__header {
          margin-bottom: 64px;
        }
        .skills__header .section-label { margin-bottom: 20px; display: block; }
        .skills__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: var(--text);
          letter-spacing: -0.02em;
        }
        .skills__title em {
          color: var(--magenta);
          font-style: italic;
        }
        .skills__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-bottom: 60px;
        }
        .skill-cat {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 36px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .skill-cat:hover {
          border-color: var(--cat-color);
          box-shadow: 0 0 40px rgba(0,0,0,0.3);
        }
        .skill-cat::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--cat-color);
          box-shadow: 0 0 10px var(--cat-color);
          opacity: 0.7;
        }
        .skill-cat__header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
        }
        .skill-cat__dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--cat-color);
          box-shadow: 0 0 8px var(--cat-color);
        }
        .skill-cat__name {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--cat-color);
        }
        .skill-cat__list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .skill-item {}
        .skill-item__header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .skill-item__name {
          font-size: 0.85rem;
          color: var(--text);
          font-weight: 500;
        }
        .skill-item__pct {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 400;
        }
        .skill-item__track {
          height: 3px;
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
          overflow: hidden;
        }
        .skill-item__fill {
          height: 100%;
          transform-origin: left;
        }
        .skill-item__bar {
          height: 100%;
          background: var(--skill-color);
          box-shadow: 0 0 8px var(--skill-color);
          border-radius: 2px;
        }
        .skills__badges {
          border-top: 1px solid var(--border);
          padding-top: 40px;
        }
        .skills__badges-label {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .skills__badges-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .skill-new-badge {
          font-size: 0.75rem;
          padding: 6px 16px;
          border: 1px dashed rgba(0,217,255,0.3);
          border-radius: 100px;
          color: var(--text-secondary);
          font-weight: 400;
          transition: all 0.3s;
        }
        .skill-new-badge:hover {
          border-color: var(--neon-blue);
          color: var(--neon-blue);
          background: var(--neon-blue-dim);
        }
        @media (max-width: 900px) {
          .skills__grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .skills__grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
