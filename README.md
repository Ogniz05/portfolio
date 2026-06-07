# Nicolò Persia — Portfolio

Portfolio personale di Nicolò Persia, Junior Developer da Bari.

**Live:** https://nicolopersia.vercel.app

## Stack

- React 19 + Vite 8
- Three.js — scena 3D interattiva nella Hero
- Framer Motion — animazioni e transizioni
- @formspree/react — contact form

## Avvio locale

```bash
npm install
npm run dev
```

Apri http://localhost:5173

## Build

```bash
npm run build
```

Output in `dist/`. Deploy automatico su Vercel ad ogni push su `main`.

## Struttura

```
src/
  components/
    Hero.jsx          # Three.js 3D background + typewriter
    Navbar.jsx
    FeaturedProject.jsx
    Projects.jsx
    About.jsx
    Skills.jsx
    Curriculum.jsx
    Contact.jsx       # Form via Formspree
    Footer.jsx
    LoadingScreen.jsx
    CustomCursor.jsx
  App.jsx
  index.css           # Design system (CSS variables)
public/
  foto-profilo.png
  pablo-racing.png
  favicon.svg
```

## Contatti

- Email: nicopersiaprivata@gmail.com
- GitHub: github.com/Ogniz05
- Instagram: @nico.persia05
