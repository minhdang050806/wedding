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

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
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
