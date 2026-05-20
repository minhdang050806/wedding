let _audio: HTMLAudioElement | null = null;

export function getWeddingAudio(src: string): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!_audio) {
    _audio = new Audio(src);
    _audio.loop = true;
    _audio.volume = 0.55;
    _audio.preload = 'auto';
  }
  return _audio;
}
