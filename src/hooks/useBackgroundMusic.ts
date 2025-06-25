import { useBackgroundMusicContext } from '@/contexts/BackgroundMusicContext';

export const useBackgroundMusic = () => {
  return useBackgroundMusicContext();
};
