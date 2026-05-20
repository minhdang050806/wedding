'use client';

import { useState } from 'react';
import { getWeddingAudio } from '@/lib/wedding-audio';

const SRC = '/audio/mot-doi.mp3';

const SPARKLES = [
  { top: '10%', left: '7%',   fontSize: '1.2rem', animationDelay: '0s'   },
  { top: '14%', right: '9%',  fontSize: '0.9rem', animationDelay: '0.8s' },
  { top: '68%', left: '5%',   fontSize: '1.4rem', animationDelay: '1.4s' },
  { top: '72%', right: '7%',  fontSize: '1rem',   animationDelay: '0.3s' },
  { top: '38%', left: '3%',   fontSize: '0.8rem', animationDelay: '1.9s' },
  { top: '42%', right: '4%',  fontSize: '1.1rem', animationDelay: '1.1s' },
  { top: '85%', left: '15%',  fontSize: '0.8rem', animationDelay: '0.6s' },
  { top: '88%', right: '18%', fontSize: '0.9rem', animationDelay: '1.5s' },
];

export function EntryOverlay() {
  const [dismissed, setDismissed] = useState(false);
  const [fading, setFading] = useState(false);

  const enter = () => {
    // Must be synchronous inside click handler for iOS Safari autoplay policy
    const audio = getWeddingAudio(SRC);
    audio?.play().catch(() => {});
    setFading(true);
    setTimeout(() => setDismissed(true), 900);
  };

  if (dismissed) return null;

  return (
    <div
      onClick={enter}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #2A0912 0%, #8B2447 40%, #6B1B36 72%, #1E0610 100%)',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.9s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 48%, rgba(192,104,136,0.22) 0%, transparent 65%)',
        }}
      />

      {/* Corner ornament frames */}
      <div className="absolute inset-6 md:inset-10 pointer-events-none">
        <span className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#C4A87A]/40" />
        <span className="absolute top-0 right-0 w-10 h-10 border-t border-r border-[#C4A87A]/40" />
        <span className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-[#C4A87A]/40" />
        <span className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-[#C4A87A]/40" />
      </div>

      {/* Floating sparkles */}
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="absolute text-[#C4A87A] animate-sparkle pointer-events-none"
          style={s}
        >
          ✦
        </span>
      ))}

      {/* Main content */}
      <div className="relative text-center px-8 max-w-sm w-full">
        {/* Top ornament */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-10 bg-[#C4A87A]/50" />
          <span className="text-[#C4A87A] text-xl">❦</span>
          <span className="h-px w-10 bg-[#C4A87A]/50" />
        </div>

        <p className="font-luxe text-[#C4A87A]/70 text-[9px] tracking-[0.35em] mb-6">
          TRÂN TRỌNG KÍNH MỜI
        </p>

        <h1
          className="font-script text-white animate-glow-white leading-none"
          style={{ fontSize: 'clamp(3.2rem, 11vw, 5.5rem)' }}
        >
          Phúc Tường
        </h1>

        <div className="flex items-center justify-center gap-4 my-4">
          <span className="h-px w-8 bg-white/25" />
          <span className="font-script text-[#C4A87A] text-3xl">&amp;</span>
          <span className="h-px w-8 bg-white/25" />
        </div>

        <h1
          className="font-script text-white animate-glow-white leading-none"
          style={{ fontSize: 'clamp(3.2rem, 11vw, 5.5rem)' }}
        >
          Ngọc Anh
        </h1>

        <p className="font-luxe text-white/40 text-[9px] tracking-[0.35em] mt-5 mb-8">
          07 · 06 · 2026
        </p>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-10 bg-[#C4A87A]/40" />
          <span className="text-[#C4A87A]/60">✦</span>
          <span className="h-px w-10 bg-[#C4A87A]/40" />
        </div>

        {/* Enter prompt */}
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <p className="font-luxe text-white/50 text-[9px] tracking-[0.38em]">
            NHẤN ĐỂ VÀO XEM THIỆP MỜI
          </p>
          <span className="text-[#C4A87A]/60 text-xl mt-1">↓</span>
        </div>
      </div>
    </div>
  );
}
