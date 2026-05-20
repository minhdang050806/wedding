'use client';

import { Heart } from 'lucide-react';

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const WEDDING_DAY = 7;
const WEEKS: (number | null)[][] = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, null, null, null, null, null],
];

export function CalendarSection() {
  return (
    <section className="relative w-full py-4 md:py-6 px-4 bg-romantic-gradient overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="font-luxe text-gold-foil text-[13px] md:text-sm mb-3">
            Ngày trọng đại
          </div>
          <h2 className="font-script text-shimmer text-5xl md:text-6xl mb-3">
            Save the Date
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-accent/40" />
            <span className="text-accent">❦</span>
            <span className="h-px w-12 bg-accent/40" />
          </div>
        </div>

        <div className="bg-white rounded-3xl card-glow border border-secondary/40 p-6 md:p-8">
          <div className="text-center mb-5">
            <p className="font-luxe text-[13px] md:text-sm text-muted-foreground mb-1">
              Tháng
            </p>
            <p className="font-display text-4xl md:text-5xl text-shimmer">
              06 · 2026
            </p>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center font-luxe text-[12px] md:text-[13px] text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="space-y-1">
            {WEEKS.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-1">
                {week.map((day, di) => {
                  if (day === null) {
                    return <div key={di} className="aspect-square" />;
                  }
                  const highlighted = day === WEDDING_DAY;
                  return (
                    <div
                      key={di}
                      className={`aspect-square flex items-center justify-center text-sm md:text-base font-body-elegant relative
                        ${
                          highlighted
                            ? 'text-white font-semibold'
                            : 'text-foreground/75'
                        }`}
                    >
                      {highlighted && (
                        <span
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent shadow-md"
                          aria-hidden="true"
                        />
                      )}
                      {highlighted && (
                        <Heart
                          className="absolute -top-1 -right-1 w-3 h-3 text-accent fill-accent animate-pulse-heart"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative">{day}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-secondary/30 text-center">
            <p className="font-luxe text-gold-foil text-[13px] md:text-sm mb-2">
              Chủ nhật
            </p>
            <p className="font-display text-2xl md:text-3xl text-foreground/85">
              07 . 06 . 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
