import { Mail } from 'lucide-react';
import { ConfirmedGuestsTable } from '@/components/confirmed-guests-table';
import { ScrollReveal } from '@/components/scroll-reveal';

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-romantic-gradient min-h-screen">
      <section className="relative w-full pt-12 pb-4 px-4 text-center">
        <div className="wing-hover inline-block">
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
      </section>

      <ScrollReveal>
        <ConfirmedGuestsTable />
      </ScrollReveal>
    </main>
  );
}
