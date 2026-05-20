'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

interface Firework {
  particles: Particle[];
}

const COLORS = ['#C9A96A', '#F4C2D7', '#8B2447', '#FFE4E8', '#D4A017', '#FFC0CB', '#fff'];

export function FireworksBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const fireworks: Firework[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const burst = () => {
      const x = 0.1 * canvas.width + Math.random() * 0.8 * canvas.width;
      const y = 0.05 * canvas.height + Math.random() * 0.65 * canvas.height;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const count = 14 + Math.floor(Math.random() * 10);
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const speed = 0.8 + Math.random() * 2.2;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: 1.2 + Math.random() * 1.8,
        });
      }
      fireworks.push({ particles });
    };

    let lastBurst = 0;
    let nextDelay = 1200;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (time - lastBurst > nextDelay) {
        burst();
        lastBurst = time;
        nextDelay = 1200 + Math.random() * 1800;
      }

      for (let fi = fireworks.length - 1; fi >= 0; fi--) {
        const fw = fireworks[fi];
        let alive = false;

        for (const p of fw.particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.04;
          p.vx *= 0.98;
          p.alpha -= 0.016;

          if (p.alpha > 0) {
            alive = true;
            const hex = Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color + hex;
            ctx.fill();
          }
        }

        if (!alive) fireworks.splice(fi, 1);
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.55 }}
    />
  );
}
