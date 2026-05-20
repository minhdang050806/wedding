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
    <section className="relative w-full flex items-center justify-center">
      {/* Background photo */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/wedding-1.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          style={{ filter: 'blur(3px)', willChange: 'transform', transform: 'translateZ(0) scale(1.05)' }}
        />
        {/* Overlay — đủ tối để chữ trắng rõ ràng */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/55 via-stone-800/30 to-stone-900/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,234,224,0.06)_0%,rgba(20,12,8,0.45)_75%)]" />
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-[15%] left-[12%] text-white/60 text-2xl animate-sparkle" style={{ animationDelay: '0s' }}>✦</span>
        <span className="absolute top-[28%] right-[14%] text-white/50 text-xl animate-sparkle" style={{ animationDelay: '0.8s' }}>✦</span>
        <span className="absolute bottom-[22%] left-[18%] text-white/60 text-lg animate-sparkle" style={{ animationDelay: '1.4s' }}>✧</span>
        <span className="absolute bottom-[30%] right-[10%] text-white/50 text-2xl animate-sparkle" style={{ animationDelay: '2s' }}>✧</span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in py-8 md:py-16">
        {/* Ornament */}
        <div className="mb-3 md:mb-6 flex justify-center items-center gap-3">
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-white/40" />
          <span className="text-white/60 text-xl md:text-2xl">❦</span>
          <span className="h-px w-6 bg-gradient-to-l from-transparent to-white/40" />
        </div>

        <p className="font-luxe text-white/70 text-[10px] md:text-sm mb-3 md:mb-8">
          The Wedding of
        </p>

        {/* Names */}
        <h1
          className="font-script text-pearl animate-glow-white tracking-wide whitespace-nowrap mb-1 md:mb-2"
          style={{ fontSize: 'clamp(2rem, 9vw, 6rem)' }}
        >
          Lê Phúc Tường
        </h1>

        <div className="flex items-center justify-center gap-4 my-2 md:my-6">
          <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent via-white/40 to-white/40" />
          <span
            className="font-script text-white/70 leading-none"
            style={{ fontSize: 'clamp(1.5rem, 6vw, 4rem)' }}
          >
            &amp;
          </span>
          <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent via-white/40 to-white/40" />
        </div>

        <h2
          className="font-script text-pearl animate-glow-white tracking-wide whitespace-nowrap mb-4 md:mb-10"
          style={{ fontSize: 'clamp(1.8rem, 8.5vw, 6rem)' }}
        >
          Nguyễn Ngọc Anh
        </h2>

        {/* Tagline */}
        <p
          className="font-display text-sm md:text-3xl text-white mb-5 md:mb-12 max-w-2xl mx-auto italic font-light tracking-wide"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.55), 0 0 30px rgba(0,0,0,0.3)' }}
        >
          &ldquo;Cùng nhau viết tiếp câu chuyện yêu thương&rdquo;
        </p>

        {/* Countdown */}
        <div className="wing-hover inline-block mb-4 md:mb-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 md:px-8 py-4 md:py-8 border border-white/20">
            <p className="font-luxe text-white/60 text-[9px] md:text-xs mb-3 md:mb-6">
              Đếm ngược đến ngày trọng đại
            </p>
            <div className="flex items-start justify-center">
              {units.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-center group flex flex-col items-center min-w-[2.5rem] md:min-w-[4.5rem]">
                    <div className="bg-white/10 rounded-lg px-2 py-1 md:px-3 md:py-2 mb-1 md:mb-2 w-full">
                      <div
                        className="font-display text-2xl md:text-5xl text-white font-light transition-transform duration-300 group-hover:scale-110 tabular-nums"
                        style={{ textShadow: '0 2px 12px rgba(255,255,255,0.28)' }}
                      >
                        {String(item.value).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="font-luxe text-[8px] md:text-[10px] text-white/50">
                      {item.label}
                    </div>
                  </div>
                  {index < units.length - 1 && (
                    <div
                      className="text-white/60 text-lg md:text-3xl font-light px-1 md:px-2 mt-1 md:mt-1 select-none"
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
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
