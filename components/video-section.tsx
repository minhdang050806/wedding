'use client';

import { PlayCircle } from 'lucide-react';

export function VideoSection() {
  return (
    <section className="w-full py-12 md:py-14 lg:py-16 px-4 bg-gradient-to-b from-secondary/10 to-background lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-6 md:mb-8">
          <div className="font-luxe text-gold-foil text-[11px] md:text-xs mb-2">
            Video yêu thích
          </div>
          <h2 className="font-script text-shimmer text-5xl md:text-6xl mb-2">
            Wedding Video
          </h2>
          <p className="font-display italic text-base md:text-lg text-muted-foreground">
            Nhìn lại những khoảnh khắc pre-wedding đặc biệt
          </p>
        </div>

        {/* Video container */}
        <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-black aspect-video hover:shadow-3xl transition-shadow duration-300">
          {/* Placeholder for video */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-transparent to-secondary/20">
            <div className="text-center">
              <PlayCircle className="w-20 h-20 text-white/50 mx-auto mb-4" />
              <p className="text-white/70 text-center text-lg">
                [Dán link video cưới tại đây]
              </p>
              <p className="text-white/50 text-sm mt-2">
                Hỗ trợ YouTube hoặc Vimeo
              </p>
            </div>
          </div>

          {/* Embedded video (if you have a YouTube/Vimeo link, replace the placeholder above) */}
          {/* 
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/your-video-id"
            title="Pre-wedding Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          */}
        </div>

        {/* Video description */}
        <div className="mt-6 md:mt-8">
          <div className="bg-white rounded-xl p-5 md:p-6 card-glow">
            <h3 className="font-display text-foreground text-xl md:text-2xl mb-2">
              Về video này
            </h3>
            <p className="font-body-elegant text-foreground/80 leading-snug text-sm md:text-base italic">
              Video pre-wedding ghi lại những khoảnh khắc thân mật, tiếng cười và
              những điều nhỏ bé có ý nghĩa trong hành trình hai con tim tìm đến nhau.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
