# Portfolio — Nicolò Persia

## Stack
- **React 19** + **Vite 8**
- **Three.js 0.184** — sfondo 3D interattivo
- **Framer Motion 12** — animazioni
- Deploy: **Vercel** (repo GitHub: github.com/Ogniz05/portfolio)

---

## Componenti

| Componente | Descrizione |
|------------|-------------|
| `LoadingScreen` | Loader fittizio 5 secondi, progress RAF, CTA Instagram |
| `CustomCursor` | Cursore doppio dot+ring, GPU compositing, nascosto su mobile |
| `Navbar` | Sticky, hamburger mobile, badge "Disponibile" verde |
| `Hero` | Three.js 3D background, typing animation 4 ruoli, badge Disponibile |
| `FeaturedProject` | Pablo Racing — screenshot statico con hover overlay |
| `Projects` | 4 card placeholder con tilt 3D hover |
| `About` | Foto profilo, bio reale, facts (ITS, Bari, Junior Dev, Freelance) |
| `Skills` | Barre animate Frontend/Backend/Tools + badge "Sto imparando" |
| `Curriculum` | 2 colonne: Formazione + Esperienze, barre lingue, soft skills |
| `Contact` | Social links + form con success state |
| `Footer` | Logo, nav, social icons, copyright |

---

## Three.js (Hero)

- Renderer: WebGL, ACESFilmic tone mapping, exposure 1.2, DPR max 2
- Geometrie: 6 wireframe + 2 solid (IcosahedronGeometry, TorusGeometry, OctahedronGeometry, BoxGeometry)
- Particelle: 800 blu + 400 magenta + 200 cyan (additive blending)
- Luci: AmbientLight + 3 PointLight (blu/magenta/cyan) con posizione dinamica
- Mouse parallax: lerp 0.04 su camera X/Y

---

## Design Tokens (CSS Variables)

```css
--neon-blue: #00d9ff
--magenta: #ff00ff
--cyan: #00ffff
--bg: #0a0a0a
--text: #f0f0f0
--text-secondary: rgba(240,240,240,0.6)
--font-display: 'Playfair Display'
--font-body: 'Outfit'
```

---

## Ottimizzazioni applicate

| Fix | File | Impatto |
|-----|------|---------|
| Three.js dispose geometry/material | `Hero.jsx` | Elimina memory leak VRAM |
| Vite manualChunks (funzione) | `vite.config.js` | three.js + framer-motion chunk separati |
| Font Google non-blocking (preload) | `index.html` | −200ms First Paint |
| `loading="lazy"` immagini | `FeaturedProject.jsx`, `About.jsx` | −2.3MB caricamento iniziale |
| useMemo particelle LoadingScreen | `LoadingScreen.jsx` | Render stabili, no diff inutili |

### Build output (gzip)
- `three.js` → 129 KB
- `framer-motion` → 43 KB
- App code → 74 KB

---

## Sicurezza

- `public/CV_europass_NicoPersia.pdf` **eliminato** — conteneva telefono, indirizzo, numero documento
- Email `nicopersiaprivata@gmail.com` visibile intenzionalmente (portfolio)
- Nessuna API key, nessun .env, nessun dato privato nel codice

---

## Link e contatti nel sito

| Piattaforma | URL |
|-------------|-----|
| GitHub | github.com/Ogniz05 |
| Instagram | instagram.com/nico.persia05 |
| Email | nicopersiaprivata@gmail.com |
| LinkedIn | da aggiungere |
| Pablo Racing | racing.netboom.it |

---

## Da fare

- [ ] Aggiungere profilo LinkedIn in `Contact.jsx` (riga 72) e `Footer.jsx` (riga 42)
- [ ] Sostituire 4 project card placeholder con progetti reali
- [ ] (Opzionale) Convertire PNG → WebP per risparmio ~30% peso immagini
- [ ] Collegare form contatti a backend reale (Formspree, Netlify Forms, o simili)
