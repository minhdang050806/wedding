'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop', alt: 'Pre-wedding 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1537633552985-caf2b129b95f?w=400&h=500&fit=crop', alt: 'Pre-wedding 2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop', alt: 'Pre-wedding 3' },
  { id: 4, src: 'https://images.unsplash.com/photo-1515492387697-3021e87525da?w=400&h=400&fit=crop', alt: 'Pre-wedding 4' },
  { id: 5, src: 'https://images.unsplash.com/photo-1537633552985-caf2b129b95f?w=400&h=400&fit=crop', alt: 'Pre-wedding 5' },
  { id: 6, src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop', alt: 'Pre-wedding 6' },
  { id: 7, src: 'https://images.unsplash.com/photo-1537633552985-caf2b129b95f?w=400&h=500&fit=crop', alt: 'Pre-wedding 7' },
  { id: 8, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop', alt: 'Pre-wedding 8' },
  { id: 9, src: 'https://images.unsplash.com/photo-1515492387697-3021e87525da?w=400&h=300&fit=crop', alt: 'Pre-wedding 9' },
];

export function GallerySection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleNext = () => {
    const currentIndex = galleryImages.findIndex(img => img.id === selectedId);
    if (currentIndex < galleryImages.length - 1) {
      setSelectedId(galleryImages[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    const currentIndex = galleryImages.findIndex(img => img.id === selectedId);
    if (currentIndex > 0) {
      setSelectedId(galleryImages[currentIndex - 1].id);
    }
  };

  const selectedImage = galleryImages.find(img => img.id === selectedId);

  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-sm text-primary/60 uppercase tracking-widest mb-3 font-light">
            Kỷ niệm đẹp
          </div>
          <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
            Album ảnh cưới
          </h2>
          <p className="text-muted-foreground">
            Những khoảnh khắc quý báu được ghi lại
          </p>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-max">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group ${
                index % 5 === 0 || index % 5 === 4 ? 'md:col-span-1 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedId(image.id)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm3.6 10.3l-3.6 2.1v-4.2l3.6 2.1z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery lightbox */}
        <Dialog open={!!selectedId} onOpenChange={(open) => !open && setSelectedId(null)}>
          <DialogContent className="max-w-4xl bg-black border-0 p-0">
            <div className="relative w-full">
              {selectedImage && (
                <>
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                  
                  {/* Navigation */}
                  <button
                    onClick={handlePrev}
                    disabled={selectedImage.id === 1}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white disabled:opacity-50 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={selectedImage.id === galleryImages.length}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white disabled:opacity-50 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Close button */}
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Image counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm">
                    {selectedImage.id} / {galleryImages.length}
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
