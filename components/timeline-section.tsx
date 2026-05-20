'use client';

import { Clock } from 'lucide-react';

interface TimelineItem {
  time: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineItem[] = [
  {
    time: '14:00',
    title: 'Đón khách',
    description: 'Đón tiếp quý khách, thưởng thức Welcome Drink',
  },
  {
    time: '14:30',
    title: 'Welcome Drink',
    description: 'Đồ uống và hors d\'oeuvres trong không gian ấm cúng',
  },
  {
    time: '15:00',
    title: 'Lễ cưới',
    description: 'Lễ trao nhẫn, lời thề nguyện và những khoảnh khắc đặc biệt',
  },
  {
    time: '16:30',
    title: 'Tiệc thân mật',
    description: 'Cùng chia sẻ bữa tiệc và lời chúc mừng',
  },
];

export function TimelineSection() {
  return (
    <section className="w-full py-10 md:py-12 lg:py-16 px-4 bg-gradient-to-b from-secondary/10 to-background lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-6 md:mb-8 lg:mb-10">
          <div className="font-luxe text-gold-foil text-[11px] md:text-xs mb-2">
            Chương trình
          </div>
          <h2 className="font-script text-shimmer text-5xl md:text-6xl mb-2">
            Timeline Sự Kiện
          </h2>
          <p className="font-display italic text-base md:text-lg text-muted-foreground">
            Hành trình của ngày đặc biệt
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary to-primary/30 transform md:-translate-x-1/2" />

          <div className="space-y-4 md:space-y-5 lg:space-y-6 relative z-10">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`flex gap-6 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} md:gap-0`}
              >
                {/* Desktop time on opposite side */}
                <div className="flex-1 hidden md:block">
                  {index % 2 === 0 && (
                    <div className="text-right pr-10">
                      <p className="text-shimmer font-display text-2xl md:text-3xl">
                        {event.time}
                      </p>
                    </div>
                  )}
                  {index % 2 === 1 && (
                    <div className="text-left pl-10">
                      <p className="text-shimmer font-display text-2xl md:text-3xl">
                        {event.time}
                      </p>
                    </div>
                  )}
                </div>

                {/* Center dot */}
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-primary shadow-lg ring-4 ring-primary/15" />
                </div>

                {/* Card */}
                <div className="flex-1 md:px-10">
                  <div className="bg-white rounded-xl p-4 md:p-5 card-glow">
                    <div className="flex items-start gap-2.5 mb-2">
                      <Clock className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="md:hidden mb-1">
                          <p className="text-primary font-display text-lg font-semibold">
                            {event.time}
                          </p>
                        </div>
                        <h3 className="font-display text-foreground text-xl md:text-2xl leading-tight">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    <p className="font-body-elegant text-muted-foreground text-sm md:text-base leading-snug">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6 md:mt-8">
          <div className="text-primary/30 text-2xl">✤</div>
        </div>
      </div>
    </section>
  );
}
