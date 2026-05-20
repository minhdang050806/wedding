import { Mail } from 'lucide-react';
import { ConfirmedGuestsTable } from '@/components/confirmed-guests-table';
import { ScrollReveal } from '@/components/scroll-reveal';

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-romantic-gradient min-h-screen">
      <section className="relative w-full pt-16 md:pt-20 pb-6 md:pb-8 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-accent/40" />
            <span className="text-accent text-xl">❦</span>
            <span className="h-px w-10 bg-accent/40" />
          </div>
          <p className="font-luxe text-gold-foil text-[13px] md:text-sm mb-3">
            Thư mời tiệc cưới
          </p>
          <h1
            className="font-script text-shimmer mb-4"
            style={{ fontSize: 'clamp(1.4rem, 4.5vw, 2.75rem)', whiteSpace: 'nowrap' }}
          >
            Lê Phúc Tường &amp; Nguyễn Ngọc Anh
          </h1>
          <p className="font-serif-elegant italic text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-8">
            Phúc Tường và Ngọc Anh trân trọng kính mời quý khách ghé thăm thư mời chính thức
            và cùng chia sẻ niềm vui trong ngày trọng đại.
          </p>

          <div className="wing-hover inline-block mb-2">
            <a
              href="/invitation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full
                         bg-gradient-to-r from-primary via-[#6B3D2E] to-primary
                         bg-[length:200%_auto] hover:bg-right
                         text-primary-foreground font-luxe text-[13px] md:text-sm
                         shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <Mail className="w-4 h-4" />
              Xem thư mời chính thức
            </a>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <ConfirmedGuestsTable />
      </ScrollReveal>
    </main>
  );
}
