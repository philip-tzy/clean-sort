
import { useCallback, useRef } from 'react';

interface SoundEffects {
  playButtonClick: () => void;
  playDragStart: () => void;
  playCorrectDrop: () => void;
  playIncorrectDrop: () => void;
  playGameComplete: () => void;
  playLevelUp: () => void;
  playTick: () => void;
}

export const useSound = (): SoundEffects => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) => {
    try {
      const ctx = initAudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.log('Sound disabled or not supported');
    }
  }, [initAudioContext]);

  const playButtonClick = useCallback(() => {
    playTone(800, 0.1, 'square', 0.2);
  }, [playTone]);

  const playDragStart = useCallback(() => {
    playTone(400, 0.15, 'sine', 0.15);
  }, [playTone]);

  const playCorrectDrop = useCallback(() => {
    // Success sound - ascending notes
    playTone(523, 0.1, 'sine', 0.3); // C5
    setTimeout(() => playTone(659, 0.1, 'sine', 0.3), 50); // E5
    setTimeout(() => playTone(784, 0.2, 'sine', 0.3), 100); // G5
  }, [playTone]);

  const playIncorrectDrop = useCallback(() => {
    // Error sound - descending notes
    playTone(400, 0.1, 'sawtooth', 0.25);
    setTimeout(() => playTone(300, 0.2, 'sawtooth', 0.25), 80);
  }, [playTone]);

  const playGameComplete = useCallback(() => {
    // Victory fanfare
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((note, index) => {
      setTimeout(() => playTone(note, 0.3, 'triangle', 0.4), index * 100);
    });
  }, [playTone]);

  const playLevelUp = useCallback(() => {
    // Level up sound
    playTone(659, 0.1, 'square', 0.3);
    setTimeout(() => playTone(784, 0.1, 'square', 0.3), 60);
    setTimeout(() => playTone(1047, 0.2, 'square', 0.3), 120);
  }, [playTone]);

  const playTick = useCallback(() => {
    playTone(1000, 0.05, 'square', 0.1);
  }, [playTone]);

  return {
    playButtonClick,
    playDragStart,
    playCorrectDrop,
    playIncorrectDrop,
    playGameComplete,
    playLevelUp,
    playTick
  };
};
