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
    const updateCountdown = () => {
      // Placeholder date - can be updated
      const weddingDate = new Date('2025-12-28').getTime();
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / 1000 / 60) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-pink-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;opacity:0.05')] opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        {/* Decorative elements */}
        <div className="mb-8 flex justify-center">
          <div className="text-5xl opacity-20">✤</div>
        </div>

        {/* Main heading */}
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-primary mb-4">
          Lê Phúc Tường
        </h1>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-0.5 w-8 bg-primary opacity-40"></div>
          <span className="text-muted-foreground text-lg">&</span>
          <div className="h-0.5 w-8 bg-primary opacity-40"></div>
        </div>
        <h2 className="font-playfair text-5xl md:text-7xl font-bold text-primary mb-8">
          Nguyễn Ngọc Anh
        </h2>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-muted-foreground font-light mb-12 leading-relaxed max-w-2xl mx-auto">
          Cùng chúng tôi viết tiếp câu chuyện yêu thương
        </p>

        {/* Countdown */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-8 mb-12 inline-block shadow-lg hover:shadow-xl transition-shadow duration-300">
          <p className="text-sm text-muted-foreground mb-6 tracking-widest uppercase">Đếm ngược đến ngày cưới</p>
          <div className="grid grid-cols-4 gap-4">
            {[
              { value: countdown.days, label: 'Ngày' },
              { value: countdown.hours, label: 'Giờ' },
              { value: countdown.minutes, label: 'Phút' },
              { value: countdown.seconds, label: 'Giây' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce flex justify-center">
          <svg className="w-6 h-6 text-primary opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
