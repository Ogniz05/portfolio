# Portfolio — Nicolò Persia

## Stack

- **React 19** + **Vite 8**
- **Three.js 0.184** — sfondo 3D interattivo
- **Framer Motion 12** — animazioni
- **@formspree/react** — contact form (form ID: xpqepyko) — funzionante
- **@vercel/analytics** — analytics visitatori — funzionante
- Deploy: **Vercel** — https://nicolopersia.vercel.app
- Repo: github.com/Ogniz05/portfolio

---

## Componenti

| Componente | Descrizione |
|------------|-------------|
| `LoadingScreen` | Loader 3s, preload immagini reali, progress RAF, CTA Instagram |
| `CustomCursor` | Cursore dot+ring, GPU compositing, non monta su touch/mobile |
| `Navbar` | Sticky, hamburger mobile, badge "Disponibile" verde |
| `Hero` | Three.js 3D background, typing animation 4 ruoli, ErrorBoundary |
| `FeaturedProject` | Pablo Racing — screenshot con hover overlay |
| `Projects` | 4 card "In sviluppo" con tilt 3D hover (placeholder) |
| `About` | Foto profilo, bio, facts (ITS, Bari, Junior Dev, Freelance) |
| `Skills` | Barre animate Frontend/Backend/Tools + badge "Sto imparando" |
| `Curriculum` | 2 colonne: Formazione + Esperienze, barre lingue, soft skills |
| `Contact` | Formspree form + validazione + reset + social links |
| `Footer` | Logo, nav, social icons, copyright |

---

## Three.js (Hero)

- Renderer: WebGL con try/catch fallback, ACESFilmic tone mapping, DPR max 2
- Geometrie: 6 wireframe + 2 solid (Icosahedron, Torus, Octahedron, Box)
- Particelle: 800 blu + 400 magenta + 200 cyan — ridotte al 25% su mobile/low-end
- Luci: AmbientLight + 3 PointLight (blu/magenta/cyan) dinamiche
- Mouse parallax: lerp 0.04 su camera X/Y

---

## Design Tokens (CSS Variables)

```css
--neon-blue: #00d9ff
--magenta:   #ff00ff
--cyan:      #00ffff
--bg:        #0a0a0a
--bg-card:   #111111
--text:      #f0ede8
--text-secondary: #aaa   /* WCAG migliorato da #888 */
--text-muted:     #777   /* WCAG migliorato da #555 */
--font-display: 'Playfair Display'
--font-body:    'Outfit'
```

---

## Link e contatti nel sito

| Piattaforma | URL |
|-------------|-----|
| GitHub | github.com/Ogniz05 |
| Instagram | instagram.com/nico.persia05 |
| Email | nicopersiaprivata@gmail.com |
| LinkedIn | linkedin.com/in/nicolo-persia |
| Pablo Racing | racing.netboom.it |

---

## Build output (gzip)

| Chunk | Dimensione |
|-------|-----------|
| `three.js` | 129 KB |
| `framer-motion` | 43 KB |
| App code | ~87 KB |

---

## Sicurezza

- `public/CV_europass_NicoPersia.pdf` **eliminato** — conteneva telefono, indirizzo, numero documento
- Email `nicopersiaprivata@gmail.com` visibile intenzionalmente (portfolio)
- Nessuna API key, nessun .env, nessun dato privato nel codice

---

## Completato

### Deploy & infrastruttura
- [x] Deploy su Vercel — https://nicolopersia.vercel.app
- [x] Alias `nicolopersia.vercel.app` impostato
- [x] Deploy automatico ad ogni `git push` su main
- [x] Vercel Analytics attivo e funzionante (`@vercel/analytics`) — confermato
- [x] `autocomplete` attributes aggiunti ai campi form (nome → `name`, email → `email`, messaggio → `off`)

### SEO
- [x] Open Graph + Twitter Card meta tags (`index.html`)
- [x] `og:url` → https://nicolopersia.vercel.app
- [x] `robots.txt` con riferimento a sitemap
- [x] `sitemap.xml` con URL canonico
- [x] Meta description ottimizzata

### Form contatti
- [x] Formspree integrato (`@formspree/react`, form ID: xpqepyko) — **funzionante**
- [x] Validazione client-side per campo (nome, email regex, messaggio min 10 char)
- [x] Stato loading durante invio (`state.submitting`)
- [x] Reset form dopo invio ("Invia un altro messaggio")
- [x] Errori server Formspree mostrati

### Accessibilità & UX
- [x] Contrasto WCAG: `--text-muted #555→#777`, `--text-secondary #888→#aaa`
- [x] `cursor: none` rimosso su mobile/touch (`@media (pointer: coarse)`)
- [x] `CustomCursor` non monta su touch device
- [x] Cleanup event listener link hover su unmount CustomCursor

### Performance
- [x] Three.js WebGL try/catch — crash silenzioso se WebGL non supportato
- [x] `ErrorBoundary` intorno a Hero — app non crasha se Three.js fallisce
- [x] Particelle Three.js ridotte al 25% su mobile (`window.innerWidth < 768`) e low-end (`hardwareConcurrency < 4`)
- [x] `LoadingScreen`: timer 5s → 3s + preload reale immagini critiche
- [x] `Math.random` spostato fuori componente (lint fix)
- [x] Vite `manualChunks` — three.js + framer-motion in chunk separati

### Social & branding
- [x] LinkedIn URL: `linkedin.com/in/nicolo-persia`
- [x] Favicon `[NP]` — monogramma neon su sfondo scuro, stile coerente col logo
- [x] README.md aggiornato (rimosso template Vite)

### Qualità codice
- [x] 0 errori ESLint
- [x] `import motion` rimosso da Footer (unused)
- [x] `mouseRef` unused rimosso da Hero
- [x] Projects: `href: '#'` → badge "In sviluppo" (no link rotti)

---

## Da fare

- [ ] Aggiungere progetti reali in `Projects.jsx` (attuale: 4 placeholder)
- [ ] Verificare URL LinkedIn (`linkedin.com/in/nicolo-persia` — potrebbe differire)
- [ ] (Opzionale) Convertire PNG → WebP (~30% risparmio peso)
