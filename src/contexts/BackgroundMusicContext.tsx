import React, { createContext, useContext, useRef, useCallback } from 'react';

interface BackgroundMusicContextType {
  playBackgroundMusic: (src?: string, force?: boolean) => void;
  stopBackgroundMusic: () => void;
  isPlaying: boolean;
  currentSrc: string | null;
  musicEnabled: boolean;
  setMusicEnabled: (enabled: boolean) => void;
}

const BackgroundMusicContext = createContext<BackgroundMusicContextType | undefined>(undefined);

export const BackgroundMusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const currentSrcRef = useRef<string | null>(null);
  const [, forceUpdate] = React.useReducer(x => x + 1, 0); // for isPlaying state

  // musicEnabled state with localStorage
  const [musicEnabled, setMusicEnabledState] = React.useState(() => {
    const stored = localStorage.getItem('music-enabled');
    return stored === null ? true : stored === 'true';
  });

  // Ambil lastSrc dari localStorage jika ada
  const getLastSrc = () => localStorage.getItem('music-last-src') || '/boba-date.mp3';

  const setMusicEnabled = (enabled: boolean) => {
    setMusicEnabledState(enabled);
    localStorage.setItem('music-enabled', String(enabled));
    if (!enabled) {
      stopBackgroundMusic();
    } else {
      // Mainkan musik terakhir yang diputar, atau default, paksa play
      playBackgroundMusic(getLastSrc(), true);
    }
  };

  const playBackgroundMusic = useCallback((src: string = '/Quiz-Background-Music.mp3', force = false) => {
    if (!musicEnabled && !force) return;
    if (audioRef.current && currentSrcRef.current === src) {
      if (!isPlayingRef.current) {
        audioRef.current.play();
        isPlayingRef.current = true;
        forceUpdate();
      }
      return;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;
    audioRef.current.play();
    isPlayingRef.current = true;
    currentSrcRef.current = src;
    localStorage.setItem('music-last-src', src); // simpan src terakhir
    forceUpdate();
  }, [musicEnabled]);

  const stopBackgroundMusic = useCallback(() => {
    if (audioRef.current && isPlayingRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      isPlayingRef.current = false;
      forceUpdate();
    }
  }, []);

  React.useEffect(() => {
    if (!musicEnabled) {
      stopBackgroundMusic();
    }
    // eslint-disable-next-line
  }, [musicEnabled]);

  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <BackgroundMusicContext.Provider value={{
      playBackgroundMusic,
      stopBackgroundMusic,
      isPlaying: isPlayingRef.current,
      currentSrc: currentSrcRef.current,
      musicEnabled,
      setMusicEnabled
    }}>
      {children}
    </BackgroundMusicContext.Provider>
  );
};

export const useBackgroundMusicContext = () => {
  const ctx = useContext(BackgroundMusicContext);
  if (!ctx) throw new Error('useBackgroundMusicContext must be used within BackgroundMusicProvider');
  return ctx;
}; 