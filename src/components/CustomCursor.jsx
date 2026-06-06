import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - 20}px, ${ring.current.y - 20}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (ringRef.current) ringRef.current.classList.add('cursor-hover');
      if (dotRef.current) dotRef.current.classList.add('cursor-hover');
    };
    const onLeaveLink = () => {
      if (ringRef.current) ringRef.current.classList.remove('cursor-hover');
      if (dotRef.current) dotRef.current.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);

    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach(l => {
      l.addEventListener('mouseenter', onEnterLink);
      l.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 8px; height: 8px;
          background: var(--neon-blue);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          box-shadow: 0 0 10px var(--neon-blue);
          will-change: transform;
          contain: strict;
          backface-visibility: hidden;
          transition: opacity 0.3s;
        }
        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 40px; height: 40px;
          border: 1px solid rgba(0, 217, 255, 0.4);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          contain: strict;
          backface-visibility: hidden;
          transition: width 0.3s, height 0.3s, border-color 0.3s;
        }
        .cursor-dot.cursor-hover {
          background: var(--magenta);
          box-shadow: 0 0 10px var(--magenta);
          transform: scale(0) !important;
        }
        .cursor-ring.cursor-hover {
          width: 60px; height: 60px;
          border-color: rgba(255, 0, 255, 0.6);
          transform: translate(calc(var(--rx, 0px) - 30px), calc(var(--ry, 0px) - 30px)) !important;
        }
        @media (max-width: 768px) {
          .cursor-dot, .cursor-ring { display: none; }
        }
      `}</style>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
