'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  span?: string;
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: '/images/wedding-1.jpg', alt: 'Khoảnh khắc 1', span: 'md:col-span-2 md:row-span-2' },
  { id: 2, src: '/images/wedding-2.jpg', alt: 'Khoảnh khắc 2' },
  { id: 3, src: '/images/wedding-3.jpg', alt: 'Khoảnh khắc 3' },
  { id: 4, src: '/images/wedding-4.jpg', alt: 'Khoảnh khắc 4', span: 'md:col-span-2' },
  { id: 5, src: '/images/wedding-2.jpg', alt: 'Khoảnh khắc 5' },
  { id: 6, src: '/images/wedding-3.jpg', alt: 'Khoảnh khắc 6' },
  { id: 7, src: '/images/wedding-1.jpg', alt: 'Khoảnh khắc 7' },
  { id: 8, src: '/images/wedding-4.jpg', alt: 'Khoảnh khắc 8' },
];

export function GallerySection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleNext = () => {
    const currentIndex = galleryImages.findIndex((img) => img.id === selectedId);
    if (currentIndex < galleryImages.length - 1) {
      setSelectedId(galleryImages[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    const currentIndex = galleryImages.findIndex((img) => img.id === selectedId);
    if (currentIndex > 0) {
      setSelectedId(galleryImages[currentIndex - 1].id);
    }
  };

  const selectedImage = galleryImages.find((img) => img.id === selectedId);

  return (
    <section className="relative w-full py-12 md:py-14 lg:py-16 px-4 bg-majestic-gradient overflow-hidden lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="text-center mb-6 md:mb-8">
          <div className="font-luxe text-gold-foil text-[11px] md:text-xs mb-2">
            Kỷ niệm đẹp
          </div>
          <h2 className="font-script text-shimmer text-5xl md:text-6xl mb-2">
            Album of Love
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-12 bg-accent/40" />
            <span className="text-accent">❦</span>
            <span className="h-px w-12 bg-accent/40" />
          </div>
          <p className="font-display italic text-base md:text-lg text-muted-foreground">
            Những khoảnh khắc quý báu được ghi lại
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[140px] md:auto-rows-[170px] lg:auto-rows-[180px]">
          {galleryImages.map((image) => (
            <div key={image.id} className={`wing-hover ${image.span ?? ''}`}>
              <button
                className="relative img-hover cursor-pointer rounded-2xl card-glow group w-full h-full"
                onClick={() => setSelectedId(image.id)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <Dialog open={!!selectedId} onOpenChange={(open) => !open && setSelectedId(null)}>
          <DialogContent className="max-w-4xl bg-black/95 border-0 p-0">
            <div className="relative w-full">
              {selectedImage && (
                <>
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />

                  <button
                    onClick={handlePrev}
                    disabled={selectedImage.id === galleryImages[0].id}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white disabled:opacity-30 transition-all backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={selectedImage.id === galleryImages[galleryImages.length - 1].id}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white disabled:opacity-30 transition-all backdrop-blur-sm"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all backdrop-blur-sm"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 text-white rounded-full text-sm font-luxe backdrop-blur-sm">
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
