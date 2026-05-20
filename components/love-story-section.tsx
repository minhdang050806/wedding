'use client';

export function LoveStorySection() {
  return (
    <section className="relative w-full py-4 md:py-6 px-4 bg-background">
      {/* Blur orb in its own overflow-hidden wrapper so it doesn't clip text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-secondary/15 blur-3xl -z-0"></div>
      </div>

      <div className="relative max-w-5xl mx-auto w-full">
        <div className="relative text-center mb-8 md:mb-10">
          <div className="font-luxe text-gold-foil text-[11px] md:text-xs mb-3">
            Lời tâm tình
          </div>
          {/* Calligraphic two-line title — use text-align offset, no transforms */}
          <div className="relative w-full max-w-sm mx-auto py-1">
            <h2
              className="font-script text-shimmer text-center"
              style={{ fontSize: 'clamp(3rem, 9vw, 6rem)' }}
            >
              Beautiful
            </h2>
            <h2
              className="font-script text-shimmer text-right -mt-3 md:-mt-5"
              style={{ fontSize: 'clamp(2.5rem, 7.5vw, 5rem)' }}
            >
              chapter
            </h2>
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="h-px w-12 bg-accent/40" />
            <span className="text-accent">❦</span>
            <span className="h-px w-12 bg-accent/40" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="absolute -top-3 -left-3 w-full h-full rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 -z-10" />
            <div className="img-hover rounded-3xl overflow-hidden card-glow">
              <img
                src="/images/wedding-3.jpg"
                alt="Câu chuyện tình yêu"
                className="w-full h-72 md:h-80 lg:h-[380px] object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white px-5 py-3 rounded-2xl shadow-xl border border-secondary/30">
              <p className="font-script text-xl md:text-2xl text-shimmer">
                forever &amp; always
              </p>
            </div>
          </div>

          {/* Story side */}
          <div className="bg-white rounded-3xl card-glow p-6 md:p-8 border border-secondary/30">
            <div className="flex justify-center mb-3">
              <span className="font-script text-5xl text-accent/60 leading-none">"</span>
            </div>

            <p className="text-center text-sm md:text-base text-foreground/75 leading-relaxed mb-3 font-body-elegant">
              Giữa những điều bình dị của cuộc sống, chúng tôi đã tìm thấy nhau, cùng
              nhau trưởng thành, sẻ chia và yêu thương.
            </p>
            <p className="text-center text-sm md:text-base text-foreground/75 leading-relaxed mb-3 font-body-elegant">
              Hành trình tìm người nửa kia không luôn dễ dàng — nhưng khi gặp đúng
              người, tất cả đều trở nên có ý nghĩa.
            </p>
            <p className="text-center text-sm md:text-base text-foreground/75 leading-relaxed mb-4 font-body-elegant italic">
              Hãy cùng chúng tôi chia sẻ niềm vui và viết tiếp câu chuyện yêu thương ấy.
            </p>

            <div className="flex justify-center mb-3">
              <span className="font-script text-5xl text-accent/60 leading-none rotate-180 inline-block">
                "
              </span>
            </div>

            <div className="pt-3 border-t border-secondary/30 text-center">
              <div className="grid grid-cols-2 gap-3">
                <p className="font-script text-shimmer text-2xl md:text-3xl">
                  Phúc Tường
                </p>
                <p className="font-script text-shimmer text-2xl md:text-3xl">
                  Ngọc Anh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
