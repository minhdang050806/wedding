'use client';

import { useMemo, useId } from 'react';

interface FloatingPetalsProps {
  count?: number;
  className?: string;
  fixed?: boolean;
}

type PetalVariant = 0 | 1 | 2;

const VARIANT_COLORS: Record<PetalVariant, { from: string; mid: string; to: string }> = {
  0: { from: '#FFE3EC', mid: '#F4B6CD', to: '#B83A5E' }, // blush rose
  1: { from: '#FFFFFF', mid: '#FBD7E3', to: '#E89BB5' }, // white petal
  2: { from: '#FCE4EC', mid: '#E89BB5', to: '#8B2447' }, // deep rose
};

function PetalSVG({ variant, gradId }: { variant: PetalVariant; gradId: string }) {
  const c = VARIANT_COLORS[variant];

  // Three subtly different organic petal shapes — teardrop with a curl
  const paths = [
    'M16 2 C 23 8, 27 18, 16 30 C 5 18, 9 8, 16 2 Z',
    'M16 1 C 26 9, 24 22, 16 31 C 7 22, 6 9, 16 1 Z',
    'M16 3 C 22 7, 28 20, 16 30 C 5 21, 10 8, 16 3 Z',
  ];
  const path = paths[variant];

  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full block"
      style={{ filter: 'drop-shadow(0 2px 3px rgba(139, 36, 71, 0.18))' }}
    >
      <defs>
        <radialGradient id={`${gradId}-fill`} cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor={c.from} stopOpacity="1" />
          <stop offset="55%" stopColor={c.mid} stopOpacity="0.95" />
          <stop offset="100%" stopColor={c.to} stopOpacity="0.85" />
        </radialGradient>
        <linearGradient id={`${gradId}-vein`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8B2447" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path d={path} fill={`url(#${gradId}-fill)`} />
      {/* Subtle central vein for realism */}
      <path
        d="M16 4 Q 16 16, 16 28"
        stroke={`url(#${gradId}-vein)`}
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Soft highlight */}
      <path
        d="M13 7 Q 11 14, 13 22"
        stroke="#FFFFFF"
        strokeOpacity="0.35"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FloatingPetals({
  count = 22,
  className = '',
  fixed = false,
}: FloatingPetalsProps) {
  const uid = useId().replace(/:/g, '');

  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const fallDelay = -Math.random() * 24; // negative so they don't all wait
        const fallDuration = 16 + Math.random() * 18; // 16–34s
        const swayDuration = 3 + Math.random() * 4; // 3–7s
        const spinDuration = 4 + Math.random() * 6; // 4–10s
        const size = 14 + Math.random() * 22; // 14–36px
        const opacity = 0.5 + Math.random() * 0.45;
        const variant = (i % 3) as PetalVariant;
        const startRotate = Math.random() * 360;
        const swayAmplitude = 30 + Math.random() * 70; // px
        const blur = Math.random() < 0.25 ? 'blur(0.5px)' : 'none';

        return {
          id: i,
          left,
          fallDelay,
          fallDuration,
          swayDuration,
          spinDuration,
          size,
          opacity,
          variant,
          startRotate,
          swayAmplitude,
          blur,
        };
      }),
    [count]
  );

  return (
    <div
      className={`pointer-events-none ${fixed ? 'fixed inset-0' : 'absolute inset-0'} overflow-hidden ${className}`}
      style={{ zIndex: fixed ? 40 : 1 }}
      aria-hidden="true"
    >
      {petals.map((p) => (
        // Outer wrapper drives the FALL (top → bottom)
        <div
          key={p.id}
          className="absolute petal-fall"
          style={{
            left: `${p.left}%`,
            top: '-8vh',
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.fallDuration}s`,
            animationDelay: `${p.fallDelay}s`,
            filter: p.blur,
            ['--sway' as never]: `${p.swayAmplitude}px`,
          }}
        >
          {/* Middle wrapper drives the SWAY (left ↔ right) */}
          <div
            className="petal-sway w-full h-full"
            style={{ animationDuration: `${p.swayDuration}s` }}
          >
            {/* Inner wrapper drives the SPIN (3D rotation) */}
            <div
              className="petal-spin w-full h-full"
              style={{
                animationDuration: `${p.spinDuration}s`,
                ['--start-rot' as never]: `${p.startRotate}deg`,
              }}
            >
              <PetalSVG variant={p.variant} gradId={`petal-${uid}-${p.id}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
