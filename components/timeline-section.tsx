'use client';

import { Clock } from 'lucide-react';

interface TimelineItem {
  time: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineItem[] = [
  {
    time: '[Giờ]',
    title: 'Đón khách',
    description: 'Đón tiếp quý khách, thưởng thức Welcome Drink',
  },
  {
    time: '[Giờ]',
    title: 'Welcome Drink',
    description: 'Thưởng thức đồ uống và horderves trong không gian ấm cúng',
  },
  {
    time: '[Giờ]',
    title: 'Lễ cưới',
    description: 'Lễ trao vòng, lời thề nguyện và những khoảnh khắc đặc biệt',
  },
  {
    time: '[Giờ]',
    title: 'Tiệc thân mật',
    description: 'Cùng chia sẻ bữa tiệc ngon lành và những khoảnh khắc tuyệt vời',
  },
];

export function TimelineSection() {
  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-secondary/10 to-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-sm text-primary/60 uppercase tracking-widest mb-3 font-light">
            Chương trình
          </div>
          <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
            Timeline Sự Kiện
          </h2>
          <p className="text-muted-foreground">
            Hành trình của ngày đặc biệt
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary to-primary/30 transform md:-translate-x-1/2"></div>

          {/* Timeline items */}
          <div className="space-y-12 relative z-10">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`flex gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} md:gap-0`}
              >
                {/* Left side (on desktop) */}
                <div className="flex-1 hidden md:block">
                  {index % 2 === 0 && (
                    <div className="text-right pr-12">
                      <p className="text-primary font-playfair text-2xl font-bold mb-2">
                        {event.time}
                      </p>
                    </div>
                  )}
                </div>

                {/* Center dot */}
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary shadow-lg"></div>
                </div>

                {/* Right side (on desktop) */}
                <div className="flex-1 md:pl-12">
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start gap-3 mb-3">
                      <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="md:hidden mb-2">
                          <p className="text-primary font-playfair text-lg font-bold">
                            {event.time}
                          </p>
                        </div>
                        <h3 className="font-semibold text-foreground text-lg">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Mobile time */}
                <div className="w-12 md:hidden text-left pl-4">
                  {/* Time is shown in the card above */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="text-center mt-16">
          <div className="text-primary/30 text-3xl">✤</div>
        </div>
      </div>
    </section>
  );
}
