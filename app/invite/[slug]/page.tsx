'use client';

import { Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { HeroSection } from '@/components/hero-section';
import { InvitationCard } from '@/components/invitation-card';
import { RsvpForm } from '@/components/rsvp-form';
import { TimelineSection } from '@/components/timeline-section';
import { DresscodeSection } from '@/components/dresscode-section';
import { LoveStorySection } from '@/components/love-story-section';
import { GallerySection } from '@/components/gallery-section';
import { VideoSection } from '@/components/video-section';
import { WishesSection } from '@/components/wishes-section';
import { MapSection } from '@/components/map-section';
import { Footer } from '@/components/footer';
import { CalendarSection } from '@/components/calendar-section';
import { MusicPlayer } from '@/components/music-player';
import { ScrollReveal } from '@/components/scroll-reveal';

function PersonalGreetingBanner({
  salutation,
  name,
}: {
  salutation: string;
  name: string;
}) {
  const fullLabel = salutation ? `${salutation} ${name}` : name;

  // Pick a font size based on name length so very long names don't get clipped.
  // The clamp keeps it fluid across breakpoints; the chars-based ceiling keeps
  // 1-char names from being absurdly huge and 20-char names from overflowing.
  const len = name.length;
  const maxRem = len <= 6 ? 7 : len <= 10 ? 6 : len <= 14 ? 5 : 4;
  const vw = len <= 6 ? 12 : len <= 10 ? 10 : len <= 14 ? 8.5 : 7;
  const minRem = len <= 10 ? 2.75 : 2.25;

  return (
    <section className="relative py-6 md:py-12 px-4 text-center bg-romantic-gradient">
      {/* Ornament container — separate so its overflow:hidden doesn't clip text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[28rem] h-[28rem] rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[32rem] h-[32rem] rounded-full bg-accent/20 blur-3xl" />

        <span
          className="absolute top-[18%] left-[10%] text-accent text-2xl animate-sparkle"
          style={{ animationDelay: '0s' }}
        >
          ✦
        </span>
        <span
          className="absolute top-[24%] right-[12%] text-primary text-xl animate-sparkle"
          style={{ animationDelay: '0.8s' }}
        >
          ✧
        </span>
        <span
          className="absolute bottom-[22%] left-[16%] text-accent text-lg animate-sparkle"
          style={{ animationDelay: '1.4s' }}
        >
          ✧
        </span>
        <span
          className="absolute bottom-[28%] right-[14%] text-primary text-2xl animate-sparkle"
          style={{ animationDelay: '2s' }}
        >
          ✦
        </span>
      </div>

      <div className="relative max-w-3xl mx-auto animate-fade-in-up">
        {/* Ornament top */}
        <div className="flex justify-center items-center gap-3 mb-3 md:mb-6">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-accent/60" />
          <span className="text-accent text-2xl">❦</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-accent/60" />
        </div>

        <p className="font-luxe text-gold-foil text-xs md:text-sm mb-3 md:mb-6">
          Trân trọng kính mời
        </p>

        {/* Personalized guest name — the star of this banner.
            Allow wrapping for long names; text-wrap:balance keeps it elegant. */}
        <div className="relative">
          {salutation && (
            <p className="font-serif-elegant italic text-2xl md:text-3xl text-foreground/70 mb-3">
              {salutation}
            </p>
          )}
          <h1
            className="font-script text-shimmer animate-glow tracking-wide mx-auto"
            style={{
              fontSize: `clamp(${minRem}rem, ${vw}vw, ${maxRem}rem)`,
              textWrap: 'balance',
              maxWidth: '100%',
              wordBreak: 'keep-all',
              hyphens: 'none',
              paddingTop: '0.5em',
              paddingBottom: '0.6em',
              overflow: 'visible',
            }}
          >
            {name}
          </h1>
        </div>

        <div className="flex items-center justify-center gap-3 mt-4 md:mt-8 mb-3 md:mb-6">
          <span className="h-px w-16 bg-accent/40" />
          <span className="text-accent text-lg">✦</span>
          <span className="h-px w-16 bg-accent/40" />
        </div>

        <p className="font-serif-elegant italic text-base md:text-xl text-foreground/85 max-w-xl mx-auto">
          Đến dự lễ thành hôn của chúng tôi — sự hiện diện của {salutation || 'quý khách'}{' '}
          là niềm vinh hạnh lớn lao.
        </p>

        {/* SR-only full label for accessibility */}
        <span className="sr-only">{fullLabel}</span>
      </div>
    </section>
  );
}

function PersonalizedInvite() {
  const params = useSearchParams();
  const routeParams = useParams<{ slug: string }>();
  const name = params.get('name')?.trim() || 'Quý khách';
  const salutation = params.get('salutation')?.trim() || '';
  const fullLabel = salutation ? `${salutation} ${name}` : name;
  // Prefer guest ID (stable, from DB) over slug (which can collide if names match)
  const guestKey = params.get('key')?.trim() || routeParams?.slug || fullLabel;

  return (
    <main className="w-full overflow-hidden">
      <HeroSection />
      <ScrollReveal><PersonalGreetingBanner salutation={salutation} name={name} /></ScrollReveal>
      <ScrollReveal><LoveStorySection /></ScrollReveal>
      <ScrollReveal><InvitationCard guestName={fullLabel} /></ScrollReveal>
      <ScrollReveal><CalendarSection /></ScrollReveal>
      <ScrollReveal><TimelineSection /></ScrollReveal>
      <ScrollReveal><DresscodeSection /></ScrollReveal>
      <ScrollReveal><GallerySection /></ScrollReveal>
      <ScrollReveal><VideoSection /></ScrollReveal>
      <ScrollReveal><WishesSection /></ScrollReveal>
      <ScrollReveal><RsvpForm guestKey={guestKey} guestSalutation={salutation} guestName={name} /></ScrollReveal>
      <ScrollReveal><MapSection /></ScrollReveal>
      <ScrollReveal><Footer /></ScrollReveal>
      <MusicPlayer src="/audio/mot-doi.mp3" />
    </main>
  );
}

export default function PersonalInvitePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-romantic-gradient">
          <p className="font-luxe text-gold-foil text-[11px]">Đang tải thiệp mời…</p>
        </main>
      }
    >
      <PersonalizedInvite />
    </Suspense>
  );
}
