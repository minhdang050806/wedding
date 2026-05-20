'use client';

export function DresscodeSection() {
  const femaleColors = [
    {
      label: 'Be',
      hexLabel: '#E8D5C4',
      gradient: 'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #F8EDE4 18%, #E8D5C4 48%, #C8A890 78%, #A07858 100%)',
      highlightColor: 'rgba(232, 213, 196, 0.6)',
    },
    {
      label: 'Trắng',
      hexLabel: '#FFFFFF',
      gradient: 'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #FFF5F8 18%, #FFE8F0 48%, #FACCD8 78%, #F0A0C0 100%)',
      highlightColor: 'rgba(255, 240, 248, 0.7)',
    },
    {
      label: 'Hồng',
      hexLabel: '#F4C2D7',
      gradient: 'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #FDE5EE 18%, #F4C2D7 48%, #D88AAB 78%, #A8527B 100%)',
      highlightColor: 'rgba(244, 194, 215, 0.6)',
    },
  ];

  const maleColors = [
    {
      label: 'Trắng',
      hexLabel: '#F8F8FF',
      gradient: 'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #F0F4FF 18%, #E0E8F8 48%, #B8C8E8 78%, #8098C8 100%)',
      highlightColor: 'rgba(220, 232, 252, 0.65)',
    },
    {
      label: 'Xanh',
      hexLabel: '#A8D8C8',
      gradient: 'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #D8F4EC 18%, #A8D8C8 48%, #70B8A0 78%, #389878 100%)',
      highlightColor: 'rgba(168, 216, 200, 0.6)',
    },
    {
      label: 'Blue Nhạt',
      hexLabel: '#B8D8F0',
      gradient: 'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #DDF0FF 18%, #B8D8F0 48%, #7EB4D8 78%, #4888B0 100%)',
      highlightColor: 'rgba(184, 216, 240, 0.6)',
    },
    {
      label: 'Be',
      hexLabel: '#E8D5C4',
      gradient: 'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #F8EDE4 18%, #E8D5C4 48%, #C8A890 78%, #A07858 100%)',
      highlightColor: 'rgba(232, 213, 196, 0.6)',
    },
  ];

  return (
    <section className="relative w-full py-12 md:py-14 lg:py-16 px-4 overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      {/* Soft background ornaments */}
      <div className="absolute -top-16 -left-20 w-80 h-80 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -bottom-16 -right-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <p className="font-luxe text-gold-foil text-[11px] md:text-xs mb-2">
            Trang phục đề xuất
          </p>
          <h2
            className="font-script text-shimmer animate-glow tracking-wide"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
          >
            Dress Code
          </h2>
          <div className="flex items-center justify-center gap-3 mt-2 mb-3">
            <span className="h-px w-12 bg-primary/40" />
            <span className="text-primary">❦</span>
            <span className="h-px w-12 bg-primary/40" />
          </div>
          <p className="font-serif-elegant italic text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Để khoảnh khắc trở nên thật trọn vẹn, kính mời quý khách diện trang phục
            tông màu sau:
          </p>
        </div>

        {/* Female */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary/30" />
            <p className="font-luxe text-primary text-[11px] md:text-xs tracking-widest">♀ Nữ</p>
            <span className="h-px w-10 bg-primary/30" />
          </div>
          <div className="flex flex-nowrap items-center justify-center gap-4 sm:gap-8 md:gap-12">
            {femaleColors.map((c) => (
              <ColorSphere key={c.label} {...c} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8 md:mb-10" />

        {/* Male */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary/30" />
            <p className="font-luxe text-primary text-[11px] md:text-xs tracking-widest">♂ Nam</p>
            <span className="h-px w-10 bg-primary/30" />
          </div>
          <div className="flex flex-nowrap items-center justify-center gap-3 sm:gap-6 md:gap-10">
            {maleColors.map((c) => (
              <ColorSphere key={c.label + '-m'} {...c} />
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="relative max-w-xl mx-auto text-center bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-4 md:py-5 border border-secondary/30 card-glow">
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
      <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 animate-float">
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
      <p className="font-luxe text-gold-foil text-[7px] sm:text-[9px] mt-1 tracking-[0.15em]">
        {hexLabel}
      </p>
    </div>
  );
}
