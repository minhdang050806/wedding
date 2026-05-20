'use client';

export function DresscodeSection() {
  const colors = [
    {
      label: 'Trắng',
      hexLabel: '#FFFFFF',
      gradient: 'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #F8F8F6 18%, #EFEFED 48%, #DCDCD8 78%, #C4C4C0 100%)',
      highlightColor: 'rgba(235, 235, 232, 0.8)',
    },
    {
      label: 'Xanh Blue',
      hexLabel: '#A8C4E8',
      gradient: 'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #DDE8F8 18%, #A8C4E8 48%, #6898D0 78%, #3868A8 100%)',
      highlightColor: 'rgba(168, 196, 232, 0.6)',
    },
    {
      label: 'Hồng Nude',
      hexLabel: '#F0B8C8',
      gradient: 'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #FAE8EE 18%, #F0B8C8 48%, #D07898 78%, #A85070 100%)',
      highlightColor: 'rgba(240, 184, 200, 0.6)',
    },
  ];

  return (
    <section className="relative w-full py-4 md:py-6 px-4 overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background">
      {/* Soft background ornaments */}
      <div className="absolute -top-16 -left-20 w-80 h-80 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -bottom-16 -right-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <p className="font-luxe text-gold-foil text-[13px] md:text-sm mb-2">
            Trang phục đề xuất
          </p>
          <h2
            className="font-script text-shimmer animate-glow tracking-wide"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
          >
            Dress Code
          </h2>
          <div className="flex items-center justify-center gap-3 mt-2 mb-3">
            <span className="h-px w-6 bg-primary/40" />
            <span className="text-primary">❦</span>
            <span className="h-px w-6 bg-primary/40" />
          </div>
          <p className="font-serif-elegant italic text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Để khoảnh khắc trở nên thật trọn vẹn, kính mời quý khách diện trang phục
            tông màu sau:
          </p>
        </div>

        {/* Single row of 3 color spheres */}
        <div className="flex items-center justify-center gap-8 sm:gap-16 md:gap-24 mb-8 md:mb-10">
          {colors.map((c) => (
            <ColorSphere key={c.label} {...c} />
          ))}
        </div>

        {/* Footer note */}
        <div className="relative max-w-xl mx-auto text-center bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-4 md:py-5 border border-secondary/30 card-glow">
          <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-primary/25 pointer-events-none" />
          <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-primary/25 pointer-events-none" />
          <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-primary/25 pointer-events-none" />
          <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-primary/25 pointer-events-none" />
          <p className="font-serif-elegant text-foreground text-sm md:text-base leading-relaxed">
            Sự đồng điệu trong sắc màu sẽ khiến những bức hình của chúng ta thêm phần
            lung linh ✦
          </p>
        </div>
      </div>
    </section>
  );
}

function ColorSphere({
  label,
  hexLabel,
  gradient,
  highlightColor,
}: {
  label: string;
  hexLabel: string;
  gradient: string;
  highlightColor: string;
}) {
  return (
    <div className="flex flex-col items-center group">
      {/* Sphere */}
      <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-3 animate-float">
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: highlightColor }}
        />

        {/* The sphere */}
        <div
          className="relative w-full h-full rounded-full
                     shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),inset_-8px_-12px_24px_rgba(0,0,0,0.12),inset_4px_6px_12px_rgba(255,255,255,0.4)]
                     transition-transform duration-500 group-hover:scale-105"
          style={{ background: gradient }}
        >
          {/* Top-left specular highlight */}
          <div
            className="absolute top-[14%] left-[18%] w-1/3 h-1/4 rounded-full opacity-70 blur-sm"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, transparent 70%)',
            }}
          />
          {/* Small secondary highlight */}
          <div
            className="absolute top-[24%] left-[26%] w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/70 blur-[2px]"
          />
        </div>

        {/* Reflection on ground */}
        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-3 rounded-[50%] blur-md"
          style={{ background: 'rgba(58, 31, 43, 0.18)' }}
        />
      </div>

      {/* Label */}
      <p
        className="font-script text-shimmer text-center"
        style={{ fontSize: 'clamp(0.9rem, 2.5vw, 2rem)' }}
      >
        {label}
      </p>
      <p className="font-luxe text-gold-foil text-[7px] sm:text-[12px] mt-1 tracking-[0.15em]">
        {hexLabel}
      </p>
    </div>
  );
}
