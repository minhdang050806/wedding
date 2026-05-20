'use client';

import { useState } from 'react';
import { getWeddingAudio } from '@/lib/wedding-audio';

const SRC = '/audio/mot-doi.mp3';

const SPARKLES = [
  { top: '8%',  left: '7%',   fontSize: '1.1rem', animationDelay: '0s'   },
  { top: '12%', right: '8%',  fontSize: '0.8rem', animationDelay: '0.8s' },
  { top: '65%', left: '5%',   fontSize: '1.3rem', animationDelay: '1.4s' },
  { top: '70%', right: '6%',  fontSize: '0.9rem', animationDelay: '0.3s' },
  { top: '35%', left: '3%',   fontSize: '0.75rem',animationDelay: '1.9s' },
  { top: '40%', right: '4%',  fontSize: '1rem',   animationDelay: '1.1s' },
  { top: '82%', left: '14%',  fontSize: '0.7rem', animationDelay: '0.6s' },
  { top: '85%', right: '16%', fontSize: '0.85rem',animationDelay: '1.5s' },
];

interface EntryOverlayProps {
  salutation?: string;
  name?: string;
}

export function EntryOverlay({ salutation = '', name = 'Quý khách' }: EntryOverlayProps) {
  const [dismissed, setDismissed] = useState(false);
  const [fading, setFading] = useState(false);

  const guestLabel = salutation ? `${salutation} ${name}` : name;

  const enter = () => {
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
        background: 'linear-gradient(160deg, #1E120A 0%, #4A2F1A 38%, #6B3D2E 72%, #150D08 100%)',
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
            'radial-gradient(ellipse 70% 55% at 50% 48%, rgba(201,169,110,0.20) 0%, transparent 65%)',
        }}
      />

      {/* Corner frame */}
      <div className="absolute inset-6 md:inset-10 pointer-events-none">
        <span className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#D4B896]/40" />
        <span className="absolute top-0 right-0 w-10 h-10 border-t border-r border-[#D4B896]/40" />
        <span className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-[#D4B896]/40" />
        <span className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-[#D4B896]/40" />
      </div>

      {/* Sparkles */}
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="absolute text-[#D4B896] animate-sparkle pointer-events-none"
          style={s}
        >
          ✦
        </span>
      ))}

      {/* Main content */}
      <div className="relative text-center px-8 max-w-lg w-full flex flex-col items-center">

        {/* Top ornament */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-10 bg-[#D4B896]/50" />
          <span className="text-[#D4B896] text-xl">❦</span>
          <span className="h-px w-10 bg-[#D4B896]/50" />
        </div>

        {/* "Trân trọng kính mời" label */}
        <p className="font-luxe text-[#D4B896]/80 text-[12px] tracking-[0.35em] mb-4">
          TRÂN TRỌNG KÍNH MỜI
        </p>

        {/* Guest name — the star of this screen */}
        <div className="mb-1">
          {salutation && (
            <p className="font-serif-elegant italic text-white/70 text-lg md:text-xl mb-1">
              {salutation}
            </p>
          )}
          <h2
            className="font-script text-white animate-glow-white leading-none"
            style={{
              fontSize: `clamp(${name.length <= 8 ? 2.6 : name.length <= 14 ? 2.2 : 1.8}rem, ${name.length <= 8 ? 9 : 7}vw, ${name.length <= 8 ? 4.5 : name.length <= 14 ? 3.8 : 3}rem)`,
            }}
          >
            {name}
          </h2>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-5">
          <span className="h-px w-8 bg-white/25" />
          <span className="text-[#D4B896]/60 text-sm">✦</span>
          <span className="h-px w-8 bg-white/25" />
        </div>

        {/* "đến dự lễ thành hôn của" */}
        <p className="font-serif-elegant italic text-white/60 text-sm md:text-base mb-4">
          đến dự lễ thành hôn của
        </p>

        {/* Couple names */}
        <h1
          className="font-script text-white animate-glow-white leading-none mb-1"
          style={{ fontSize: 'clamp(2.6rem, 9vw, 4.5rem)' }}
        >
          Phúc Tường
        </h1>
        <div className="flex items-center justify-center gap-4 my-2">
          <span className="h-px w-6 bg-white/20" />
          <span className="font-script text-[#D4B896] text-2xl">&amp;</span>
          <span className="h-px w-6 bg-white/20" />
        </div>
        <h1
          className="font-script text-white animate-glow-white leading-none"
          style={{ fontSize: 'clamp(2.6rem, 9vw, 4.5rem)' }}
        >
          Ngọc Anh
        </h1>

        {/* Date */}
        <p className="font-luxe text-white/35 text-[12px] tracking-[0.35em] mt-4 mb-7">
          07 · 06 · 2026
        </p>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-10 bg-[#D4B896]/40" />
          <span className="text-[#D4B896]/60">❦</span>
          <span className="h-px w-10 bg-[#D4B896]/40" />
        </div>

        {/* Enter prompt */}
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <p className="font-luxe text-white/45 text-[13px] tracking-[0.4em]">
            NHẤN ĐỂ VÀO XEM THIỆP MỜI
          </p>
          <span className="text-[#D4B896]/55 text-lg mt-0.5">↓</span>
        </div>
      </div>
    </div>
  );
}
