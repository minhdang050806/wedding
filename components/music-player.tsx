'use client';

import { useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { getWeddingAudio } from '@/lib/wedding-audio';

interface MusicPlayerProps {
  src?: string;
  trackName?: string;
}

export function MusicPlayer({
  src = '/audio/mot-doi.mp3',
  trackName = 'Một Đời — 14 Casper & Bon Nghiêm',
}: MusicPlayerProps) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = getWeddingAudio(src);
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    setPlaying(!audio.paused);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, [src]);

  const toggle = async () => {
    const audio = getWeddingAudio(src);
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch {
        // blocked by browser
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? `Tạm dừng ${trackName}` : `Phát ${trackName}`}
      title={trackName}
      className="fixed bottom-5 left-5 md:bottom-8 md:left-8 z-50
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

      <span
        className="absolute left-full ml-3 top-1/2 -translate-y-1/2
                   whitespace-nowrap px-3 py-1.5 rounded-full
                   bg-white/90 border border-secondary/40
                   font-luxe text-[9px] text-foreground/70
                   opacity-0 group-hover:opacity-100 pointer-events-none
                   transition-opacity duration-300 hidden md:block"
      >
        {playing ? 'Đang phát · Một Đời' : 'Phát nhạc · Một Đời'}
      </span>
    </button>
  );
}
