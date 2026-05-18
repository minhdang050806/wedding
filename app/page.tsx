import { HeroSection } from '@/components/hero-section';
import { InvitationCard } from '@/components/invitation-card';
import { RsvpForm } from '@/components/rsvp-form';
import { TimelineSection } from '@/components/timeline-section';
import { LoveStorySection } from '@/components/love-story-section';
import { GallerySection } from '@/components/gallery-section';
import { VideoSection } from '@/components/video-section';
import { WishesSection } from '@/components/wishes-section';
import { GiftRegistry } from '@/components/gift-registry';
import { MapSection } from '@/components/map-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Invitation Card */}
      <InvitationCard />

      {/* RSVP Form */}
      <RsvpForm />

      {/* Timeline */}
      <TimelineSection />

      {/* Love Story */}
      <LoveStorySection />

      {/* Gallery */}
      <GallerySection />

      {/* Video */}
      <VideoSection />

      {/* Wishes */}
      <WishesSection />

      {/* Gift Registry */}
      <GiftRegistry />

      {/* Map */}
      <MapSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
