import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const ROLES = ['Junior Developer', 'Web Designer', 'React Developer', 'Full Stack Dev'];

export default function Hero() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [displayedText, setDisplayedText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let timeout;

    if (isTyping) {
      if (displayedText.length < current.length) {
        timeout = setTimeout(() => setDisplayedText(current.slice(0, displayedText.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 1800);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => setDisplayedText(displayedText.slice(0, -1)), 40);
      } else {
        timeout = setTimeout(() => {
          setRoleIdx(i => (i + 1) % ROLES.length);
          setIsTyping(true);
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, roleIdx, isTyping]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
    camera.position.z = 8;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x00d9ff, 5, 20);
    blueLight.position.set(-4, 3, 3);
    scene.add(blueLight);

    const magentaLight = new THREE.PointLight(0xff00ff, 3.5, 20);
    magentaLight.position.set(4, -2, 2);
    scene.add(magentaLight);

    const cyanLight = new THREE.PointLight(0x00ffff, 1.5, 15);
    cyanLight.position.set(0, 4, -2);
    scene.add(cyanLight);

    const objects = [];

    const createWireframeObject = (geometry, color, position, scale = 1) => {
      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.position.set(...position);
      mesh.scale.setScalar(scale);
      scene.add(mesh);
      return mesh;
    };

    const createSolidObject = (geometry, color, position, scale = 1) => {
      const mat = new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.15,
        wireframe: false,
      });
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.position.set(...position);
      mesh.scale.setScalar(scale);
      scene.add(mesh);
      return mesh;
    };

    const ico1 = createWireframeObject(new THREE.IcosahedronGeometry(1.4, 2), 0x00d9ff, [-3.5, 1.5, -2], 1);
    const ico2 = createWireframeObject(new THREE.IcosahedronGeometry(0.8, 2), 0xff00ff, [3.5, -1, -1], 1);
    const torus1 = createWireframeObject(new THREE.TorusGeometry(1.2, 0.08, 8, 40), 0x00ffff, [2.5, 2, -3], 1);
    const octa1 = createWireframeObject(new THREE.OctahedronGeometry(1, 0), 0xff00ff, [-2.5, -2, -2], 1);
    const box1 = createWireframeObject(new THREE.BoxGeometry(1, 1, 1), 0x00d9ff, [0, -3, -1], 0.8);
    const ico3 = createWireframeObject(new THREE.IcosahedronGeometry(0.5, 0), 0x00ffff, [1, 0, 1], 1);

    const solidIco = createSolidObject(new THREE.IcosahedronGeometry(1.4, 1), 0x00d9ff, [-3.5, 1.5, -2], 1);
    const solidOcta = createSolidObject(new THREE.OctahedronGeometry(1, 0), 0xff00ff, [-2.5, -2, -2], 1);

    objects.push(
      { mesh: ico1, speed: { x: 0.003, y: 0.005 }, float: { amp: 0.3, phase: 0, speed: 0.4 } },
      { mesh: ico2, speed: { x: -0.004, y: 0.003 }, float: { amp: 0.2, phase: 1.5, speed: 0.5 } },
      { mesh: torus1, speed: { x: 0.005, y: -0.002 }, float: { amp: 0.4, phase: 0.8, speed: 0.3 } },
      { mesh: octa1, speed: { x: -0.003, y: -0.004 }, float: { amp: 0.25, phase: 2, speed: 0.45 } },
      { mesh: box1, speed: { x: 0.006, y: 0.004 }, float: { amp: 0.35, phase: 3, speed: 0.35 } },
      { mesh: ico3, speed: { x: -0.005, y: 0.006 }, float: { amp: 0.15, phase: 0.3, speed: 0.6 } },
      { mesh: solidIco, speed: { x: 0.003, y: 0.005 }, float: { amp: 0.3, phase: 0, speed: 0.4 } },
      { mesh: solidOcta, speed: { x: -0.003, y: -0.004 }, float: { amp: 0.25, phase: 2, speed: 0.45 } },
    );

    const makeParticles = (count, color, size, spread = 20) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * spread;
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        size,
        color,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      return pts;
    };

    const particlesBlue = makeParticles(800, 0x00d9ff, 0.04);
    const particlesMagenta = makeParticles(400, 0xff00ff, 0.035);
    const particlesCyan = makeParticles(200, 0x00ffff, 0.06, 10);

    let time = 0;
    let animId;
    const targetCamX = { x: 0, y: 0 };
    const currentCam = { x: 0, y: 0 };

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.008;

      currentCam.x += (targetCamX.x - currentCam.x) * 0.04;
      currentCam.y += (targetCamX.y - currentCam.y) * 0.04;
      camera.position.x = currentCam.x * 0.6;
      camera.position.y = currentCam.y * 0.4;
      camera.lookAt(scene.position);

      objects.forEach(({ mesh, speed, float }) => {
        mesh.rotation.x += speed.x;
        mesh.rotation.y += speed.y;
        mesh.position.y += Math.sin(time * float.speed + float.phase) * float.amp * 0.015;
      });

      particlesBlue.rotation.y += 0.0008;
      particlesBlue.rotation.x += 0.0003;
      particlesMagenta.rotation.y -= 0.0006;
      particlesMagenta.rotation.z += 0.0004;
      particlesCyan.rotation.x += 0.001;
      particlesCyan.rotation.y -= 0.0005;

      blueLight.position.x = Math.sin(time * 0.5) * 4;
      blueLight.position.y = Math.cos(time * 0.3) * 3;
      magentaLight.position.x = Math.cos(time * 0.4) * 4;
      magentaLight.position.y = Math.sin(time * 0.6) * 3;

      renderer.render(scene, camera);
    };
    animate();

    const onMouseMove = (e) => {
      targetCamX.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetCamX.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />
      <div className="hero__gradient" />

      <div className="hero__content container">
        <motion.div className="hero__text" variants={stagger} initial="hidden" animate="show">
          <motion.p variants={item} className="section-label hero__label">
            ✦ <span className="hero__typing">{displayedText}</span><span className="hero__cursor">|</span> — Bari, Italia
          </motion.p>

          <motion.div variants={item} className="hero__available">
            <span className="hero__available-dot" />
            Disponibile per progetti freelance
          </motion.div>

          <motion.h1 variants={item} className="hero__title">
            Ciao, sono{' '}
            <span className="hero__name">
              <em>Nicolò Persia</em>
            </span>
          </motion.h1>

          <motion.p variants={item} className="hero__subtitle">
            Creo esperienze web{' '}
            <span className="neon-text">3D moderne</span>{' '}
            che lasciano il segno.
          </motion.p>

          <motion.div variants={item} className="hero__cta">
            <a href="#projects" className="btn-primary">
              <span>Guarda i miei progetti</span>
              <span>→</span>
            </a>
            <a href="#contact" className="btn-ghost">
              <span>Contattami</span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="hero__scroll-line" />
          <span>scroll</span>
        </motion.div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero__canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .hero__gradient {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 60%, rgba(0,217,255,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 80% 40%, rgba(255,0,255,0.05) 0%, transparent 70%),
            linear-gradient(to bottom, transparent 60%, var(--bg) 100%);
          z-index: 1;
          pointer-events: none;
        }
        .hero__content {
          position: relative;
          z-index: 2;
          padding-top: 120px;
          padding-bottom: 80px;
          width: 100%;
        }
        .hero__text {
          max-width: 680px;
        }
        .hero__label {
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .hero__typing { color: var(--neon-blue); }
        .hero__cursor {
          color: var(--neon-blue);
          margin-left: 1px;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .hero__available {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border: 1px solid rgba(0, 220, 100, 0.3);
          border-radius: 100px;
          background: rgba(0, 220, 100, 0.06);
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #00dc64;
          font-weight: 500;
          margin-bottom: 20px;
          width: fit-content;
        }
        .hero__available-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #00dc64;
          box-shadow: 0 0 8px #00dc64;
          animation: pulse-avail 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulse-avail {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #00dc64; }
          50% { opacity: 0.4; box-shadow: 0 0 3px #00dc64; }
        }
        .hero__title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--text);
          margin-bottom: 24px;
        }
        .hero__name {
          display: block;
          background: linear-gradient(135deg, var(--neon-blue) 0%, var(--magenta) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-style: italic;
        }
        .hero__subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: var(--text-secondary);
          margin-bottom: 48px;
          font-weight: 300;
          line-height: 1.7;
        }
        .hero__cta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .hero__scroll-hint {
          position: absolute;
          bottom: 40px;
          left: clamp(20px, 5vw, 60px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .hero__scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, transparent, var(--neon-blue));
          animation: scrollLine 2s ease-in-out infinite;
        }
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @media (max-width: 768px) {
          .hero__title { font-size: clamp(2.5rem, 10vw, 3.5rem); }
          .hero__scroll-hint { display: none; }
        }
      `}</style>
    </section>
  );
}
