import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    id: '02',
    title: 'Dashboard Analytics',
    category: 'Web App',
    desc: 'Dashboard interattiva con grafici real-time, filtri dinamici e esportazione dati per un team di analisi.',
    tech: ['React', 'TypeScript', 'Chart.js'],
    color: '#00d9ff',
    href: null,
  },
  {
    id: '03',
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    desc: 'Piattaforma e-commerce completa con carrello, pagamenti Stripe e gestione inventory con pannello admin.',
    tech: ['Angular', 'Node.js', 'MySQL'],
    color: '#ff00ff',
    href: null,
  },
  {
    id: '04',
    title: 'Task Manager App',
    category: 'Mobile-First Web',
    desc: 'Applicazione per la gestione dei task con drag-and-drop, collaborazione in tempo reale e notifiche push.',
    tech: ['React', 'Python', 'WebSocket'],
    color: '#00ffff',
    href: null,
  },
  {
    id: '05',
    title: 'API REST Service',
    category: 'Backend',
    desc: 'Microservizio REST ad alta scalabilità con autenticazione JWT, rate limiting e documentazione Swagger.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL'],
    color: '#00d9ff',
    href: null,
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setTilt({ x, y });
  };

  return (
    <motion.article
      ref={ref}
      className={`proj-card ${hovered ? 'proj-card--hovered' : ''}`}
      style={{ '--accent': project.color }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
    >
      <motion.div
        className="proj-card__inner"
        animate={{ rotateX: tilt.y, rotateY: tilt.x }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="proj-card__top">
          <span className="proj-card__number">{project.id}</span>
          <span className="proj-card__category">{project.category}</span>
        </div>

        <h3 className="proj-card__title">{project.title}</h3>
        <p className="proj-card__desc">{project.desc}</p>

        <div className="proj-card__tech">
          {project.tech.map(t => (
            <span key={t} className="proj-card__badge">{t}</span>
          ))}
        </div>

        <div className="proj-card__footer">
          {project.href ? (
            <a href={project.href} className="proj-card__link" target="_blank" rel="noopener noreferrer">
              <span>Esplora</span>
              <motion.span
                animate={{ x: hovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >→</motion.span>
            </a>
          ) : (
            <span className="proj-card__wip">In sviluppo</span>
          )}
        </div>

        <div className="proj-card__glow" />
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="container">
        <div className="projects__header">
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            ✦ Altri Lavori
          </motion.p>
          <motion.h2
            className="projects__title"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Cosa ho <em>costruito</em>
          </motion.h2>
        </div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .projects {
          padding: var(--section-padding) 0;
          position: relative;
        }
        .projects::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border), transparent);
        }
        .projects__header {
          margin-bottom: 64px;
        }
        .projects__header .section-label { margin-bottom: 20px; display: block; }
        .projects__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: var(--text);
          letter-spacing: -0.02em;
        }
        .projects__title em {
          color: var(--neon-blue);
          font-style: italic;
        }
        .projects__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .proj-card {
          perspective: 1000px;
        }
        .proj-card__inner {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 36px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease, background 0.3s ease;
          height: 100%;
        }
        .proj-card--hovered .proj-card__inner {
          border-color: var(--accent);
          background: var(--bg-card-hover);
        }
        .proj-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .proj-card__number {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 900;
          color: rgba(255,255,255,0.05);
          letter-spacing: -0.05em;
        }
        .proj-card__category {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 500;
          padding: 4px 10px;
          border: 1px solid rgba(var(--accent-rgb, 0,217,255), 0.2);
          border-radius: 100px;
          border-color: var(--accent);
          opacity: 0.7;
        }
        .proj-card__title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }
        .proj-card__desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .proj-card__tech {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 32px;
        }
        .proj-card__badge {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
          padding: 3px 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 100px;
          color: var(--text-secondary);
        }
        .proj-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .proj-card__link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
          color: var(--accent);
          transition: gap 0.2s;
        }
        .proj-card__link:hover { gap: 12px; }
        .proj-card__wip {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 500;
          color: var(--text-muted);
          padding: 3px 10px;
          border: 1px solid var(--border);
          border-radius: 100px;
        }
        .proj-card__glow {
          position: absolute;
          top: -60px; right: -60px;
          width: 160px; height: 160px;
          background: var(--accent);
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .proj-card--hovered .proj-card__glow { opacity: 0.06; }
        @media (max-width: 768px) {
          .projects__grid { grid-template-columns: 1fr; }
          .proj-card__inner { padding: 24px; }
        }
      `}</style>
    </section>
  );
}
