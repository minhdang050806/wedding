import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { HeroSection } from '@/components/hero-section';
import { InvitationCard } from '@/components/invitation-card';
import { RsvpForm } from '@/components/rsvp-form';
import { TimelineSection } from '@/components/timeline-section';
import { DresscodeSection } from '@/components/dresscode-section';
import { LoveStorySection } from '@/components/love-story-section';
import { GallerySection } from '@/components/gallery-section';
import { MapSection } from '@/components/map-section';
import { Footer } from '@/components/footer';
import { MusicPlayer } from '@/components/music-player';
import { ScrollReveal } from '@/components/scroll-reveal';

export default function InvitationPage() {
  return (
    <main className="w-full overflow-hidden">
      <div className="absolute top-4 left-4 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-secondary/40 text-primary font-luxe text-[12px] shadow-md hover:bg-white transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Quay lại
        </Link>
      </div>
      <HeroSection />
      <ScrollReveal><LoveStorySection /></ScrollReveal>
      <ScrollReveal><InvitationCard guestName="Quý khách" /></ScrollReveal>
      <ScrollReveal><TimelineSection /></ScrollReveal>
      <ScrollReveal><DresscodeSection /></ScrollReveal>
      <ScrollReveal><GallerySection /></ScrollReveal>
      <ScrollReveal><RsvpForm guestKey="general" guestSalutation="" guestName="Quý khách" /></ScrollReveal>
      <ScrollReveal><MapSection /></ScrollReveal>
      <ScrollReveal><Footer /></ScrollReveal>
      <MusicPlayer src="/audio/mot-doi.mp3" />
    </main>
  );
}
