import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from '@formspree/react';

const LINKEDIN_URL = 'https://www.linkedin.com/in/nicolo-persia';
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [wasReset, setWasReset] = useState(false);

  const [state, handleFormspreeSubmit] = useForm('xpqepyko');

  const showSuccess = state.succeeded && !wasReset;

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Nome richiesto';
    if (!form.email.trim()) errs.email = 'Email richiesta';
    else if (!emailRe.test(form.email)) errs.email = 'Email non valida';
    if (!form.message.trim()) errs.message = 'Messaggio richiesto';
    else if (form.message.trim().length < 10) errs.message = 'Messaggio troppo breve (min 10 caratteri)';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }
    setFieldErrors({});
    handleFormspreeSubmit(e);
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (fieldErrors[e.target.name]) setFieldErrors(errs => ({ ...errs, [e.target.name]: '' }));
  };

  const handleReset = () => {
    setWasReset(true);
    setForm({ name: '', email: '', message: '' });
    setFieldErrors({});
  };

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container">
        <div className="contact__grid">
          <div className="contact__left">
            <motion.p className="section-label" {...fade(0)}>
              ✦ Contatti
            </motion.p>
            <motion.h2 className="contact__title" {...fade(0.1)}>
              Parliamo del<br />
              <em>tuo progetto</em>
            </motion.h2>
            <motion.p className="contact__sub" {...fade(0.2)}>
              Hai un'idea? Un progetto da realizzare? Scrivimi e parliamone.
              Rispondo entro 24 ore.
            </motion.p>

            <motion.div className="contact__socials" {...fade(0.3)}>
              <a
                href="mailto:nicopersiaprivata@gmail.com"
                className="contact__social-link"
              >
                <div className="contact__social-icon">@</div>
                <div>
                  <span className="contact__social-label">Email</span>
                  <span className="contact__social-value">nicopersiaprivata@gmail.com</span>
                </div>
              </a>

              <a
                href="https://github.com/Ogniz05"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
              >
                <div className="contact__social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </div>
                <div>
                  <span className="contact__social-label">GitHub</span>
                  <span className="contact__social-value">github.com/Ogniz05</span>
                </div>
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
              >
                <div className="contact__social-icon">in</div>
                <div>
                  <span className="contact__social-label">LinkedIn</span>
                  <span className="contact__social-value">linkedin.com/in/nicolo-persia</span>
                </div>
              </a>

              <a
                href="https://instagram.com/nico.persia05"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
              >
                <div className="contact__social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <div>
                  <span className="contact__social-label">Instagram</span>
                  <span className="contact__social-value">@nico.persia05</span>
                </div>
              </a>
            </motion.div>
          </div>

          <motion.div
            className="contact__form-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {showSuccess ? (
              <div className="contact__success">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="contact__success-icon">✦</div>
                  <h3>Messaggio inviato!</h3>
                  <p>Ti rispondo entro 24 ore.</p>
                  <button className="contact__reset" onClick={handleReset}>
                    Invia un altro messaggio
                  </button>
                </motion.div>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="contact__field">
                  <label className="contact__label" htmlFor="name">Nome</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`contact__input${fieldErrors.name ? ' contact__input--error' : ''}`}
                    placeholder="Il tuo nome"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {fieldErrors.name && <span className="contact__error">{fieldErrors.name}</span>}
                </div>

                <div className="contact__field">
                  <label className="contact__label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`contact__input${fieldErrors.email ? ' contact__input--error' : ''}`}
                    placeholder="tua@email.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {fieldErrors.email && <span className="contact__error">{fieldErrors.email}</span>}
                </div>

                <div className="contact__field">
                  <label className="contact__label" htmlFor="message">Messaggio</label>
                  <textarea
                    id="message"
                    name="message"
                    className={`contact__input contact__textarea${fieldErrors.message ? ' contact__input--error' : ''}`}
                    placeholder="Descrivi il tuo progetto..."
                    autoComplete="off"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                  />
                  {fieldErrors.message && <span className="contact__error">{fieldErrors.message}</span>}
                </div>

                {state.errors && state.errors.length > 0 && (
                  <p className="contact__server-error">Errore nell&apos;invio. Riprova più tardi.</p>
                )}

                <motion.button
                  type="submit"
                  className="contact__submit"
                  whileHover={state.submitting ? {} : { scale: 1.02 }}
                  whileTap={state.submitting ? {} : { scale: 0.98 }}
                  disabled={state.submitting}
                >
                  <span>{state.submitting ? 'Invio in corso...' : 'Invia messaggio'}</span>
                  {!state.submitting && <span className="contact__submit-arrow">→</span>}
                  <div className="contact__submit-glow" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact {
          padding: var(--section-padding) 0;
          position: relative;
          overflow: hidden;
        }
        .contact::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border-neon), transparent);
        }
        .contact::after {
          content: '';
          position: absolute;
          bottom: 0; right: -10%;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0,217,255,0.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .contact__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: start;
          position: relative;
          z-index: 1;
        }
        .contact__left .section-label { margin-bottom: 28px; display: block; }
        .contact__title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--text);
          margin-bottom: 20px;
        }
        .contact__title em {
          color: var(--neon-blue);
          text-shadow: 0 0 40px rgba(0,217,255,0.3);
        }
        .contact__sub {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.8;
          margin-bottom: 52px;
        }
        .contact__socials {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .contact__social-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          transition: all 0.3s ease;
          background: var(--bg-card);
        }
        .contact__social-link:hover {
          border-color: var(--neon-blue);
          background: var(--neon-blue-dim);
          transform: translateX(4px);
        }
        .contact__social-icon {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(0,217,255,0.1);
          border: 1px solid var(--border-neon);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--neon-blue);
          flex-shrink: 0;
        }
        .contact__social-label {
          display: block;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 2px;
        }
        .contact__social-value {
          display: block;
          font-size: 0.85rem;
          color: var(--text);
          font-weight: 400;
        }
        .contact__form-wrap {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 48px;
          position: relative;
          overflow: hidden;
        }
        .contact__form-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border-neon), transparent);
        }
        .contact__form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .contact__field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .contact__label {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 500;
        }
        .contact__input {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 14px 18px;
          color: var(--text);
          font-size: 0.9rem;
          transition: border-color 0.3s, box-shadow 0.3s;
          outline: none;
          resize: none;
          width: 100%;
        }
        .contact__input::placeholder { color: var(--text-muted); }
        .contact__input:focus {
          border-color: var(--border-neon);
          box-shadow: 0 0 0 3px rgba(0,217,255,0.06);
        }
        .contact__textarea { min-height: 120px; }
        .contact__submit {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 16px 32px;
          background: transparent;
          border: 1px solid var(--neon-blue);
          color: var(--neon-blue);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: var(--radius-sm);
          overflow: hidden;
          transition: color 0.3s, box-shadow 0.3s;
          margin-top: 8px;
        }
        .contact__submit:hover {
          color: #0a0a0a;
          box-shadow: 0 0 40px rgba(0,217,255,0.3);
        }
        .contact__submit-glow {
          position: absolute;
          inset: 0;
          background: var(--neon-blue);
          transform: translateY(101%);
          transition: transform 0.35s ease;
        }
        .contact__submit:hover .contact__submit-glow { transform: translateY(0); }
        .contact__submit span { position: relative; z-index: 1; }
        .contact__submit-arrow { transition: transform 0.2s; }
        .contact__submit:hover .contact__submit-arrow { transform: translateX(4px); }
        .contact__success {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 320px;
          text-align: center;
        }
        .contact__success-icon {
          font-size: 2.5rem;
          color: var(--neon-blue);
          text-shadow: 0 0 30px rgba(0,217,255,0.6);
          margin-bottom: 24px;
          animation: pulse-neon 2s ease-in-out infinite;
        }
        @keyframes pulse-neon {
          0%, 100% { text-shadow: 0 0 20px rgba(0,217,255,0.4); }
          50% { text-shadow: 0 0 40px rgba(0,217,255,0.8), 0 0 80px rgba(0,217,255,0.3); }
        }
        .contact__success h3 {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 12px;
        }
        .contact__success p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 28px;
        }
        .contact__reset {
          display: inline-block;
          padding: 10px 24px;
          border: 1px solid var(--border-neon);
          border-radius: var(--radius-sm);
          color: var(--neon-blue);
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
          transition: background 0.3s, box-shadow 0.3s;
        }
        .contact__reset:hover {
          background: var(--neon-blue-dim);
          box-shadow: 0 0 16px rgba(0,217,255,0.2);
        }
        .contact__input--error {
          border-color: rgba(255, 80, 80, 0.6) !important;
          box-shadow: 0 0 0 3px rgba(255, 80, 80, 0.08) !important;
        }
        .contact__error {
          font-size: 0.75rem;
          color: #ff6b6b;
          margin-top: 2px;
          letter-spacing: 0.02em;
        }
        .contact__server-error {
          font-size: 0.85rem;
          color: #ff6b6b;
          text-align: center;
          padding: 10px;
          border: 1px solid rgba(255, 80, 80, 0.3);
          border-radius: var(--radius-sm);
          background: rgba(255, 80, 80, 0.06);
        }
        .contact__submit:disabled {
          opacity: 0.6;
          pointer-events: none;
        }
        @media (max-width: 900px) {
          .contact__grid { grid-template-columns: 1fr; gap: 60px; }
          .contact__form-wrap { padding: 32px 24px; }
        }
      `}</style>
    </section>
  );
}
