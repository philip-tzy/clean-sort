import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';

const MusicToggle: React.FC<{ defaultMusicSrc?: string }> = ({ defaultMusicSrc }) => {
  const { musicEnabled, setMusicEnabled, playBackgroundMusic } = useBackgroundMusic();

  const getLastSrc = () => localStorage.getItem('music-last-src') || defaultMusicSrc || '/boba-date.mp3';

  const handleToggle = () => {
    if (musicEnabled) {
      setMusicEnabled(false);
    } else {
      setMusicEnabled(true);
      playBackgroundMusic(getLastSrc(), true);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={musicEnabled ? 'Matikan Musik' : 'Hidupkan Musik'}
      onClick={handleToggle}
      className="ml-auto bg-white/80 border border-gray-300 shadow hover:bg-gray-200 hover:ring-2 hover:ring-primary/30 transition-colors !text-gray-700"
    >
      {musicEnabled ? <Volume2 /> : <VolumeX />}
    </Button>
  );
};

export default MusicToggle; 