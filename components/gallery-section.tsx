'use client';

import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: '/images/wedding-1.jpg', alt: 'Khoảnh khắc 1', caption: 'Lần đầu gặp gỡ' },
  { id: 2, src: '/images/wedding-2.jpg', alt: 'Khoảnh khắc 2', caption: 'Mùa thu đầu tiên' },
  { id: 3, src: '/images/wedding-3.jpg', alt: 'Khoảnh khắc 3', caption: 'Chuyến đi của hai đứa' },
  { id: 4, src: '/images/wedding-4.jpg', alt: 'Khoảnh khắc 4', caption: 'Lời hứa hẹn' },
  { id: 5, src: '/images/wedding-2.jpg', alt: 'Khoảnh khắc 5', caption: 'Ngày trao nhẫn' },
  { id: 6, src: '/images/wedding-3.jpg', alt: 'Khoảnh khắc 6', caption: 'Bên gia đình thân yêu' },
  { id: 7, src: '/images/wedding-1.jpg', alt: 'Khoảnh khắc 7', caption: 'Bộ ảnh cưới' },
  { id: 8, src: '/images/wedding-4.jpg', alt: 'Khoảnh khắc 8', caption: 'Chương tiếp theo' },
];

export function GallerySection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Track which slide is centered as the user scrolls/drags
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      const slides = Array.from(el.querySelectorAll<HTMLElement>('[data-slide]'));
      let best = 0;
      let bestDist = Infinity;
      slides.forEach((s, i) => {
        const mid = s.offsetLeft + s.offsetWidth / 2;
        const d = Math.abs(mid - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActiveIdx(best);
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToIdx = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const target = el.querySelectorAll<HTMLElement>('[data-slide]')[i];
    if (!target) return;
    el.scrollTo({
      left: target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2,
      behavior: 'smooth',
    });
  };

  const handleNext = () => scrollToIdx(Math.min(galleryImages.length - 1, activeIdx + 1));
  const handlePrev = () => scrollToIdx(Math.max(0, activeIdx - 1));

  const selectedImage = galleryImages.find((img) => img.id === selectedId);
  const handleLightboxNext = () => {
    if (!selectedImage) return;
    const i = galleryImages.findIndex((img) => img.id === selectedImage.id);
    if (i < galleryImages.length - 1) setSelectedId(galleryImages[i + 1].id);
  };
  const handleLightboxPrev = () => {
    if (!selectedImage) return;
    const i = galleryImages.findIndex((img) => img.id === selectedImage.id);
    if (i > 0) setSelectedId(galleryImages[i - 1].id);
  };

  return (
    <section className="relative w-full py-4 md:py-6 px-4 bg-majestic-gradient overflow-hidden">
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="font-luxe text-gold-foil text-[13px] md:text-sm mb-2">
            Kỷ niệm đẹp
          </div>
          <h2 className="font-script text-shimmer text-5xl md:text-6xl mb-2">
            Album of Love
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-6 bg-accent/40" />
            <span className="text-accent">❦</span>
            <span className="h-px w-6 bg-accent/40" />
          </div>
          <p className="font-display text-base md:text-lg text-muted-foreground">
            Cuộn nhẹ để mở từng trang ký ức
          </p>
        </div>

        {/* ── Parchment scroll ─────────────────────────────────── */}
        <div className="relative">
          {/* Top scroll rod */}
          <ScrollRod position="top" />

          {/* Parchment body */}
          <div className="relative">
            {/* Side curl shadows — give the illusion of a rolled scroll */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-20"
              style={{
                background:
                  'linear-gradient(90deg, rgba(74,47,26,0.28) 0%, rgba(139,94,60,0.10) 35%, transparent 100%)',
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-20"
              style={{
                background:
                  'linear-gradient(-90deg, rgba(74,47,26,0.28) 0%, rgba(139,94,60,0.10) 35%, transparent 100%)',
              }}
            />

            {/* The scrollable strip */}
            <div
              ref={scrollerRef}
              className="parchment relative flex overflow-x-auto snap-x snap-mandatory
                         gap-4 md:gap-6 py-5 md:py-6 px-[20vw] sm:px-[28vw] md:px-[32vw]
                         scroll-smooth no-scrollbar"
              style={{ scrollbarWidth: 'none' }}
              aria-label="Album cuộn ngang · vuốt để xem ảnh"
            >
              {galleryImages.map((image, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <div
                    key={image.id}
                    data-slide
                    className="snap-center shrink-0"
                    style={{ width: 'min(68vw, 300px)' }}
                  >
                    {/* Photo frame */}
                    <button
                      onClick={() => setSelectedId(image.id)}
                      aria-label={`Mở ảnh: ${image.caption ?? image.alt}`}
                      className={`group relative block w-full aspect-[3/4] rounded-sm overflow-hidden
                                  transition-all duration-700 ease-out
                                  ${isActive ? 'scale-100 opacity-100' : 'scale-88 opacity-50'}`}
                      style={{
                        boxShadow: isActive
                          ? '0 24px 50px -20px rgba(74,47,26,0.55), 0 10px 24px -14px rgba(74,47,26,0.40), inset 0 0 0 1px rgba(201,169,110,0.5)'
                          : '0 8px 20px -12px rgba(74,47,26,0.35), inset 0 0 0 1px rgba(201,169,110,0.30)',
                        transform: isActive
                          ? 'rotate(0deg) scale(1)'
                          : `rotate(${idx % 2 === 0 ? '-1.5' : '1.5'}deg) scale(0.88)`,
                      }}
                    >
                      {/* Gold inner frame */}
                      <span className="pointer-events-none absolute inset-2 border border-[#C9A96E]/55 z-10" />
                      <span className="pointer-events-none absolute inset-[10px] border border-[#C9A96E]/22 z-10" />

                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        draggable={false}
                      />

                      {/* Vintage warm vignette */}
                      <span
                        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-25"
                        style={{
                          background:
                            'radial-gradient(ellipse at center, transparent 45%, rgba(74,47,26,0.5) 100%)',
                        }}
                      />

                      {/* Expand hint on hover */}
                      <span
                        className="absolute bottom-3 right-3 z-20 inline-flex items-center justify-center
                                   w-8 h-8 rounded-full bg-[#FFF8EE]/85 backdrop-blur-sm
                                   text-[#4A2F1A] shadow-md
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Expand className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom scroll rod */}
          <ScrollRod position="bottom" />

          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            disabled={activeIdx === 0}
            aria-label="Trang trước"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30
                       w-11 h-11 md:w-12 md:h-12 rounded-full
                       bg-[#FFF8EE] border-2 border-primary/40
                       text-primary shadow-lg
                       hover:bg-primary hover:text-primary-foreground hover:scale-105
                       disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#FFF8EE] disabled:hover:text-primary
                       transition-all duration-300 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={handleNext}
            disabled={activeIdx === galleryImages.length - 1}
            aria-label="Trang sau"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30
                       w-11 h-11 md:w-12 md:h-12 rounded-full
                       bg-[#FFF8EE] border-2 border-primary/40
                       text-primary shadow-lg
                       hover:bg-primary hover:text-primary-foreground hover:scale-105
                       disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#FFF8EE] disabled:hover:text-primary
                       transition-all duration-300 flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Progress dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIdx(i)}
              aria-label={`Đi tới ảnh ${i + 1}`}
              className={`transition-all duration-300 rounded-full
                          ${i === activeIdx
                            ? 'w-8 h-2 bg-primary'
                            : 'w-2 h-2 bg-primary/25 hover:bg-primary/50'}`}
            />
          ))}
        </div>

        {/* ── Lightbox ─────────────────────────────────────────── */}
        <Dialog open={!!selectedId} onOpenChange={(open) => !open && setSelectedId(null)}>
          <DialogContent className="max-w-4xl bg-[#1C1410]/97 border-0 p-0">
            <div className="relative w-full">
              {selectedImage && (
                <>
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                  <button
                    onClick={handleLightboxPrev}
                    disabled={selectedImage.id === galleryImages[0].id}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#FFF8EE]/15 hover:bg-[#FFF8EE]/30 text-[#FFF8EE] disabled:opacity-30 transition-all backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleLightboxNext}
                    disabled={selectedImage.id === galleryImages[galleryImages.length - 1].id}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#FFF8EE]/15 hover:bg-[#FFF8EE]/30 text-[#FFF8EE] disabled:opacity-30 transition-all backdrop-blur-sm"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-[#FFF8EE]/15 hover:bg-[#FFF8EE]/30 text-[#FFF8EE] transition-all backdrop-blur-sm"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#1C1410]/60 text-[#FFF8EE] rounded-full text-sm font-luxe backdrop-blur-sm tracking-[0.2em]">
                    {galleryImages.findIndex((i) => i.id === selectedImage.id) + 1} / {galleryImages.length}
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

/* ── Decorative scroll rod (top/bottom of the parchment) ──
   Wood-brown gradient bar with gold endcaps — gives the illusion
   of a real rolled scroll above and below the photo strip. */
function ScrollRod({ position }: { position: 'top' | 'bottom' }) {
  return (
    <div
      className={`relative h-5 md:h-6 -mx-2 md:-mx-4 z-10
                  ${position === 'top' ? 'mb-[-6px]' : 'mt-[-6px]'}`}
      aria-hidden="true"
    >
      {/* Wooden rod */}
      <div
        className="absolute inset-x-8 md:inset-x-10 inset-y-0 rounded-full"
        style={{
          background:
            'linear-gradient(180deg, #6B3D2E 0%, #8B5E3C 30%, #A8754B 50%, #8B5E3C 70%, #4A2F1A 100%)',
          boxShadow:
            position === 'top'
              ? '0 6px 12px -6px rgba(74,47,26,0.55), inset 0 -2px 4px rgba(0,0,0,0.25), inset 0 2px 2px rgba(255,248,238,0.18)'
              : '0 -6px 12px -6px rgba(74,47,26,0.55), inset 0 2px 4px rgba(0,0,0,0.25), inset 0 -2px 2px rgba(255,248,238,0.18)',
        }}
      />
      {/* Gold endcap — left */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-7 md:w-12 md:h-9 rounded-full z-10"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, #FFF6D6 0%, #E8D5B0 25%, #C9A96E 55%, #8B6A3A 100%)',
          boxShadow:
            '0 4px 10px -3px rgba(74,47,26,0.55), inset 0 -2px 3px rgba(107,74,40,0.45), inset 0 2px 3px rgba(255,255,255,0.45)',
        }}
      />
      {/* Gold endcap — right */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-7 md:w-12 md:h-9 rounded-full z-10"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, #FFF6D6 0%, #E8D5B0 25%, #C9A96E 55%, #8B6A3A 100%)',
          boxShadow:
            '0 4px 10px -3px rgba(74,47,26,0.55), inset 0 -2px 3px rgba(107,74,40,0.45), inset 0 2px 3px rgba(255,255,255,0.45)',
        }}
      />
    </div>
  );
}
