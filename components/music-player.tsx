'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  src?: string;
  trackName?: string;
}

export function MusicPlayer({
  src = '/audio/mot-doi.mp3',
  trackName = 'Một Đời — 14 Casper & Bon Nghiêm',
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.55;

    // Synchronous play call — iOS Safari requires audio.play() to be called
    // synchronously on the call stack of a user gesture event handler.
    // Using async/await breaks this requirement and blocks autoplay on mobile.
    const tryPlay = () => {
      if (!audio.paused) return;
      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setPlaying(true);
            window.removeEventListener('click', tryPlay);
            window.removeEventListener('touchstart', tryPlay);
            window.removeEventListener('scroll', tryPlay);
            window.removeEventListener('keydown', tryPlay);
          })
          .catch(() => {
            // Still blocked; next interaction will retry
          });
      }
    };

    // Attempt immediately — succeeds on desktop
    tryPlay();

    // Retry on first user gesture (mobile / strict autoplay browsers)
    window.addEventListener('click', tryPlay, { passive: true });
    window.addEventListener('touchstart', tryPlay, { passive: true });
    window.addEventListener('scroll', tryPlay, { passive: true });
    window.addEventListener('keydown', tryPlay, { passive: true });

    return () => {
      window.removeEventListener('click', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('scroll', tryPlay);
      window.removeEventListener('keydown', tryPlay);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Tạm dừng ${trackName}` : `Phát ${trackName}`}
        title={trackName}
        className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50
                   w-12 h-12 md:w-14 md:h-14 rounded-full
                   bg-white/85 backdrop-blur-md
                   border border-primary/40
                   shadow-lg hover:shadow-2xl
                   flex items-center justify-center
                   text-primary hover:text-white
                   hover:bg-primary
                   transition-all duration-300
                   group"
      >
        {/* Pulse rings when playing */}
        {playing && (
          <>
            <span className="absolute inset-0 rounded-full border border-primary/40 animate-music-ping" />
            <span
              className="absolute inset-0 rounded-full border border-accent/30 animate-music-ping"
              style={{ animationDelay: '0.8s' }}
            />
          </>
        )}

        {playing ? (
          <Pause className="w-5 h-5 md:w-6 md:h-6 relative" fill="currentColor" />
        ) : (
          <Play
            className="w-5 h-5 md:w-6 md:h-6 relative translate-x-[1px]"
            fill="currentColor"
          />
        )}

        {/* Tooltip on hover */}
        <span
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2
                     whitespace-nowrap px-3 py-1.5 rounded-full
                     bg-white/90 border border-secondary/40
                     font-luxe text-[9px] text-foreground/70
                     opacity-0 group-hover:opacity-100 pointer-events-none
                     transition-opacity duration-300 hidden md:block"
        >
          {playing ? 'Đang phát · Một Đời' : 'Phát nhạc · Một Đời'}
        </span>
      </button>
    </>
  );
}
