'use client';

export function VideoSection() {
  return (
    <section className="w-full py-4 md:py-6 px-4 bg-gradient-to-b from-secondary/10 to-background">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-4 md:mb-6">
          <div className="font-luxe text-gold-foil text-[13px] md:text-sm mb-2">
            Video yêu thích
          </div>
          <h2 className="font-script text-shimmer text-5xl md:text-6xl mb-2">
            Wedding Video
          </h2>
          <p className="font-display italic text-base md:text-lg text-muted-foreground">
            Nhìn lại những khoảnh khắc pre-wedding đặc biệt
          </p>
        </div>

        {/* Google Drive video embed */}
        <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-black aspect-video">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://drive.google.com/file/d/1LjsTBTYdN586cp3bgmRCUiAgexJIL1si/preview"
            title="Pre-wedding Video"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            loading="lazy"
          />
        </div>

        <div className="mt-4">
          <div className="bg-white rounded-xl p-4 md:p-5 card-glow">
            <p className="font-body-elegant text-foreground/80 leading-snug text-sm md:text-base italic text-center">
              Video pre-wedding ghi lại những khoảnh khắc thân mật, tiếng cười và
              những điều nhỏ bé có ý nghĩa trong hành trình hai con tim tìm đến nhau.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
