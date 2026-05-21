'use client';

import { useEffect, useState } from 'react';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function HeroSection() {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date('2026-06-07T15:00:00+07:00').getTime();

    const updateCountdown = () => {
      const distance = weddingDate - Date.now();
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / 1000 / 60) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: countdown.days, label: 'Ngày' },
    { value: countdown.hours, label: 'Giờ' },
    { value: countdown.minutes, label: 'Phút' },
    { value: countdown.seconds, label: 'Giây' },
  ];

  return (
    <section className="relative w-full min-h-[80vh] md:min-h-screen flex items-center justify-center bg-romantic-gradient">
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in py-16 md:py-24">
        {/* Ornament */}
        <div className="mb-3 md:mb-6 flex justify-center items-center gap-3">
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-accent/50" />
          <span className="text-accent/70 text-xl md:text-2xl">❦</span>
          <span className="h-px w-6 bg-gradient-to-l from-transparent to-accent/50" />
        </div>

        <p className="font-luxe text-foreground/80 text-[13px] md:text-sm mb-3 md:mb-8">
          Thư mời tham dự lễ cưới
        </p>

        {/* Names */}
        <h1
          className="font-script text-shimmer animate-glow tracking-wide mb-1 md:mb-2 uppercase whitespace-nowrap"
          style={{ fontSize: 'clamp(1.5rem, 6.5vw, 4.5rem)' }}
        >
          Lê Phúc Tường
        </h1>

        <div className="flex items-center justify-center gap-4 my-2 md:my-6">
          <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent via-accent/40 to-accent/40" />
          <span
            className="font-script text-primary/90"
            style={{ fontSize: 'clamp(1.5rem, 6vw, 4rem)', lineHeight: 1 }}
          >
            &amp;
          </span>
          <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent via-accent/40 to-accent/40" />
        </div>

        <h2
          className="font-script text-shimmer animate-glow tracking-wide mb-4 md:mb-10 uppercase whitespace-nowrap"
          style={{ fontSize: 'clamp(1.35rem, 6vw, 4.5rem)' }}
        >
          Nguyễn Ngọc Anh
        </h2>

        {/* Tagline */}
        <p
          className="font-display text-sm md:text-3xl text-foreground/90 mb-4 md:mb-8 max-w-2xl mx-auto font-light tracking-wide"
        >
          &ldquo;Cùng nhau viết tiếp câu chuyện yêu thương&rdquo;
        </p>

        {/* Wedding date card */}
        <div className="mx-auto w-fit mb-5 md:mb-10">
          <div className="bg-card rounded-2xl px-5 md:px-10 py-3 md:py-5 border border-border shadow-md">
            <p className="font-luxe text-foreground/70 text-[11px] md:text-xs tracking-[0.28em] uppercase mb-1">
              Chủ nhật
            </p>
            <div className="flex items-baseline justify-center gap-2 md:gap-3">
              <span className="font-display text-foreground text-2xl md:text-4xl font-medium tabular-nums">07</span>
              <span className="text-accent/60 text-lg md:text-2xl">·</span>
              <span className="font-display text-foreground text-2xl md:text-4xl font-medium tabular-nums">06</span>
              <span className="text-accent/60 text-lg md:text-2xl">·</span>
              <span className="font-display text-foreground text-2xl md:text-4xl font-medium tabular-nums">2026</span>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="wing-hover mx-auto w-fit mb-4 md:mb-10">
          <div className="bg-card rounded-2xl px-4 md:px-8 py-4 md:py-8 border border-border shadow-md">
            <p className="font-luxe text-foreground/75 text-[12px] md:text-xs mb-3 md:mb-6">
              Đếm ngược đến 07 · 06 · 2026
            </p>
            <div className="flex items-start justify-center">
              {units.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-center group flex flex-col items-center min-w-[2.5rem] md:min-w-[4.5rem]">
                    <div className="bg-secondary/60 rounded-lg px-2 py-1 md:px-3 md:py-2 mb-1 md:mb-2 w-full">
                      <div
                        className="font-display text-2xl md:text-5xl text-foreground font-medium transition-transform duration-300 group-hover:scale-110 tabular-nums"
                      >
                        {String(item.value).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="font-luxe text-[13px] md:text-[13px] text-foreground/75">
                      {item.label}
                    </div>
                  </div>
                  {index < units.length - 1 && (
                    <div
                      className="text-foreground/70 text-lg md:text-3xl font-light px-1 md:px-2 mt-1 md:mt-1 select-none"
                      aria-hidden="true"
                    >
                      :
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce flex justify-center mt-2 md:mt-4">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
