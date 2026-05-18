'use client';

import { PlayCircle } from 'lucide-react';

export function VideoSection() {
  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-secondary/10 to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm text-primary/60 uppercase tracking-widest mb-3 font-light">
            Video yêu thích
          </div>
          <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
            Video cưới
          </h2>
          <p className="text-muted-foreground">
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
        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
          <h3 className="font-semibold text-foreground text-lg mb-4">
            Về video này
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Video pre-wedding của chúng tôi ghi lại những khoảnh khắc thân mật, tràn đầy tiếng cười và những điều nhỏ nhặt nhưng có ý nghĩa trong mối quan hệ của chúng tôi.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Từ những cơn gió yêu thương đến những lúc giáng mưa, đó là hành trình của hai con tim tìm đến nhau và quyết định sống chung quãng đời còn lại.
          </p>
        </div>
      </div>
    </section>
  );
}
