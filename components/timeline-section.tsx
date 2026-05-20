'use client';

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  icon: string;
}

const timelineEvents: TimelineItem[] = [
  {
    time: '14:00',
    title: 'Đón Khách',
    description: 'Đón tiếp quý khách, thưởng thức Welcome Drink trong không gian tràn ngập hương thơm và âm nhạc',
    icon: '❦',
  },
  {
    time: '14:30',
    title: 'Welcome Drink',
    description: 'Đồ uống và hors d\'oeuvres trong không gian ấm cúng, gặp gỡ và trò chuyện cùng nhau',
    icon: '✦',
  },
  {
    time: '15:00',
    title: 'Lễ Cưới',
    description: 'Lễ trao nhẫn, lời thề nguyện và những khoảnh khắc đặc biệt nhất trong ngày trọng đại',
    icon: '♡',
  },
  {
    time: '16:30',
    title: 'Tiệc Thân Mật',
    description: 'Cùng chia sẻ bữa tiệc, lời chúc mừng và những kỷ niệm đẹp bên người thân',
    icon: '✧',
  },
];

export function TimelineSection() {
  return (
    <section className="w-full py-4 md:py-6 px-4 bg-gradient-to-b from-secondary/10 to-background">
      <div className="max-w-3xl mx-auto w-full">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="font-luxe text-gold-foil text-[13px] md:text-sm mb-2">Chương trình</p>
          <h2
            className="font-script text-shimmer animate-glow tracking-wide"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}
          >
            Timeline Sự Kiện
          </h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="h-px w-6 bg-accent/40" />
            <span className="text-accent">❦</span>
            <span className="h-px w-6 bg-accent/40" />
          </div>
        </div>

        {/* Timeline track */}
        <div className="relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden md:block" />
          {/* Mobile: left line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:hidden" />

          <div className="space-y-0">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={index} className="relative">
                  {/* ── Desktop layout (alternating) ── */}
                  <div className="hidden md:flex items-center gap-0 min-h-[120px]">
                    {/* Left slot */}
                    <div className="flex-1 flex justify-end pr-8">
                      {isLeft ? (
                        <TimelineCard event={event} align="right" />
                      ) : (
                        <TimeLabel time={event.time} align="right" />
                      )}
                    </div>

                    {/* Center node */}
                    <TimelineNode icon={event.icon} />

                    {/* Right slot */}
                    <div className="flex-1 flex justify-start pl-8">
                      {isLeft ? (
                        <TimeLabel time={event.time} align="left" />
                      ) : (
                        <TimelineCard event={event} align="left" />
                      )}
                    </div>
                  </div>

                  {/* ── Mobile layout (all right of line) ── */}
                  <div className="md:hidden flex items-start gap-4 py-3">
                    <div className="flex flex-col items-center pt-3 flex-shrink-0">
                      <div
                        className="w-9 h-9 rounded-full border-2 border-primary/50 bg-white
                                   flex items-center justify-center shadow-md z-10 relative"
                        style={{ color: 'var(--primary)' }}
                      >
                        <span className="text-base leading-none">{event.icon}</span>
                      </div>
                      {index < timelineEvents.length - 1 && (
                        <div className="w-px flex-1 min-h-[2rem] bg-primary/20 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-script text-shimmer text-2xl leading-none mb-1">{event.time}</p>
                      <h3 className="font-display text-foreground text-xl mb-1">{event.title}</h3>
                      <p className="font-body-elegant text-muted-foreground text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer ornament */}
        <div className="text-center mt-8 md:mt-10">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/40" />
            <span className="text-accent/60 text-xl">✦</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineNode({ icon }: { icon: string }) {
  return (
    <div className="flex-shrink-0 z-10 relative flex flex-col items-center">
      <div
        className="w-12 h-12 rounded-full bg-card border-2 border-primary/40
                   shadow-[0_0_0_6px_rgba(139,94,60,0.10)]
                   flex items-center justify-center
                   transition-transform duration-300 hover:scale-110"
      >
        <span className="text-primary text-xl leading-none">{icon}</span>
      </div>
    </div>
  );
}

function TimeLabel({ time, align }: { time: string; align: 'left' | 'right' }) {
  return (
    <div className={`${align === 'right' ? 'text-right' : 'text-left'}`}>
      <p
        className="font-script text-shimmer"
        style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
      >
        {time}
      </p>
    </div>
  );
}

function TimelineCard({
  event,
  align,
}: {
  event: TimelineItem;
  align: 'left' | 'right';
}) {
  return (
    <div
      className={`relative max-w-[260px] bg-white rounded-2xl p-5 card-glow border border-secondary/30
                  hover:border-primary/30 transition-all duration-500 group
                  ${align === 'right' ? 'text-right' : 'text-left'}`}
    >
      {/* Corner ornaments — all 4 corners */}
      <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-primary/30 pointer-events-none" />
      <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-primary/30 pointer-events-none" />
      <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-primary/30 pointer-events-none" />
      <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-primary/30 pointer-events-none" />

      <h3 className="font-display text-foreground text-xl md:text-2xl mb-1 group-hover:text-primary transition-colors duration-300">
        {event.title}
      </h3>
      <p className="font-body-elegant text-muted-foreground text-sm leading-relaxed">
        {event.description}
      </p>
    </div>
  );
}
