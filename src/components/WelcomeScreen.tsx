import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { gameLevels } from '@/data/gameData';
import LevelStars from './LevelStars';
import { Star, Leaf, Puzzle, Flame } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useSound } from '@/hooks/useSound';
import { useAuth } from '@/contexts/AuthContext';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import MusicToggle from './MusicToggle';

interface WelcomeScreenProps {
  onStartGame: (levelId: string) => void;
  levelStars?: {
    [levelId: string]: number;
  };
}

const difficultyMap = [{
  key: 'easy',
  label: 'Mudah',
  color: 'text-green-600',
  borderColor: 'hover:border-green-400',
  buttonColor: 'bg-green-500 hover:bg-green-600',
  icon: <Leaf size={28} color="#22c55e" fill="#a7f3d0" className="inline-block align-middle" aria-label="tingkat mudah" />,
  levelIcon: (idx: number) => <Leaf size={22} color="#22c55e" fill="#a7f3d0" strokeWidth={1.2} className="inline-block" aria-label={`level ${idx + 1} mudah`} />
}, {
  key: 'medium',
  label: 'Sedang',
  color: 'text-blue-600',
  borderColor: 'hover:border-blue-400',
  buttonColor: 'bg-blue-500 hover:bg-blue-600',
  icon: <Puzzle size={26} color="#3b82f6" fill="#bfdbfe" className="inline-block align-middle" aria-label="tingkat sedang" />,
  levelIcon: (idx: number) => <Puzzle size={22} color="#3b82f6" fill="#bfdbfe" strokeWidth={1.2} className="inline-block" aria-label={`level ${idx + 1} sedang`} />
}, {
  key: 'hard',
  label: 'Sulit',
  color: 'text-red-600',
  borderColor: 'hover:border-red-400',
  buttonColor: 'bg-red-500 hover:bg-red-600',
  icon: <Flame size={25} color="#ef4444" fill="#fca5a5" className="inline-block align-middle" aria-label="tingkat sulit" />,
  levelIcon: (idx: number) => <Flame size={22} color="#ef4444" fill="#fca5a5" strokeWidth={1.2} className="inline-block" aria-label={`level ${idx + 1} sulit`} />
}];

const getLevelIcon = (difficulty: string, levelIdx: number) => {
  const diffObj = difficultyMap.find(d => d.key === difficulty);
  if (diffObj && diffObj.levelIcon) {
    return <span className="flex justify-center" aria-label={`level ${levelIdx + 1}`}>{diffObj.levelIcon(levelIdx)}</span>;
  }
  return <Star size={22} color="#facc15" fill="#facc15" strokeWidth={1.2} className="inline-block" aria-label="level" />;
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${mins} menit`;
};

const isLevelUnlocked = (levelIdx: number, levelsInDiff: any[], levelStars: Record<string, number>) => {
  if (levelIdx === 0) return true;
  const prevLevelId = levelsInDiff[levelIdx - 1].id;
  return (levelStars[prevLevelId] ?? 0) > 0;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartGame,
  levelStars = {}
}) => {
  const { playButtonClick } = useSound();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { playBackgroundMusic } = useBackgroundMusic();

  const handleStartGame = (levelId: string) => {
    playButtonClick();
    onStartGame(levelId);
  };

  React.useEffect(() => {
    playBackgroundMusic('/boba-date.mp3');
    // eslint-disable-next-line
  }, []);

  return <div className="min-h-screen bg-welcome-gradient flex items-center justify-center p-2 sm:p-4">
      <div className="max-w-6xl w-full text-center">
        <div className="flex w-full justify-between items-center gap-2 mb-2">
          {isAdmin ? (
            <Button variant="destructive" onClick={() => navigate('/admin')} className="font-semibold">👨‍💼 Admin Panel</Button>
          ) : <div />}
          <div className="flex items-center gap-2">
            <MusicToggle defaultMusicSrc="/boba-date.mp3" />
          </div>
        </div>
        {/* Game Title */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/public/cleansort-logo.png" 
              alt="CleanSort Mascot" 
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
            />
            <div className="text-center">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-amber-600">
                CleanSort
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold tagline-text mt-2">
                Sort it Right, Keep it Bright!
              </p>
            </div>
          </div>
          <p className="text-base sm:text-xl md:text-2xl text-gray-700 font-medium mt-4">
            Belajar memilah sampah dengan benar melalui permainan seret-dan-lepas yang menyenangkan!
          </p>
        </div>

        {/* Auth buttons and Info button with better positioning */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link to="/tentang-sampah">
            <Button 
              variant="secondary" 
              className="rounded-full text-sm px-5 py-[13px]"
              onClick={playButtonClick}
            >
              📘 Info Lengkap: Pengelolaan Sampah
            </Button>
          </Link>
          <Link to="/leaderboard">
            <Button variant="outline" className="font-semibold">🏆 Leaderboard</Button>
          </Link>
          <div className="flex gap-2">
            {user ? (
              <>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm flex items-center">
                  👋 {user.email}
                </div>
              </>
            ) : (
              <Button onClick={() => { playButtonClick(); navigate('/auth'); }}>
                🔐 Login / Register
              </Button>
            )}
          </div>
        </div>

        {/* Level Selection by Difficulty */}
        <div className="space-y-8 mb-8">
          {difficultyMap.map(diff => {
          const levels = gameLevels.filter(lvl => lvl.difficulty === diff.key);
          if (levels.length === 0) return null;
          return <div key={diff.key}>
                <h2 className={`text-lg sm:text-2xl font-bold mb-4 flex items-center gap-2 justify-center ${diff.color}`}>
                  {diff.icon} <span>{diff.label}</span>
                </h2>
                <div className="overflow-x-auto scrollbar-none -mx-2 sm:mx-0">
                  <div className={`
                      flex flex-row gap-3 px-2
                      sm:gap-4 sm:px-0
                    `} style={{
                minWidth: 0
              }}>
                    {levels.map((level, idx) => {
                  const unlocked = isLevelUnlocked(idx, levels, levelStars);
                  return <div key={level.id} className="relative min-w-[270px] max-w-[350px] sm:min-w-[320px] sm:max-w-[380px] flex-shrink-0">
                          <Card className={`transition-all duration-300 cursor-pointer border-4 ${diff.borderColor} relative select-none 
                              ${unlocked ? "hover:scale-102 hover:shadow-md" : "opacity-60 grayscale cursor-not-allowed pointer-events-none"}
                              rounded-xl p-1 sm:p-2
                            `} onClick={() => unlocked && handleStartGame(level.id)} tabIndex={unlocked ? 0 : -1} aria-disabled={!unlocked}>
                            <CardHeader className="pb-2 sm:pb-3">
                              <div className="mb-1">
                                {getLevelIcon(diff.key, idx)}
                              </div>
                              <CardTitle className="text-base sm:text-lg">{level.name}</CardTitle>
                              <CardDescription>
                                {formatTime(level.timeLimit)} • {level.items.length} sampah
                              </CardDescription>
                              <div className="flex justify-center mt-1">
                                <LevelStars stars={levelStars[level.id] || 0} />
                              </div>
                            </CardHeader>
                            <CardContent>
                              <Button 
                                className={`w-full ${diff.buttonColor} text-base py-2 sm:py-3 rounded-lg`} 
                                size="lg"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (unlocked) handleStartGame(level.id);
                                }}
                              >
                                Mulai Bermain
                              </Button>
                            </CardContent>
                            {!unlocked && <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center rounded-xl z-10">
                                <div className="text-3xl mb-2" aria-label="level terkunci">🔒</div>
                                <span className="text-gray-600 text-xs sm:text-sm font-semibold text-center">Selesaikan level sebelumnya untuk membuka!</span>
                              </div>}
                          </Card>
                        </div>;
                })}
                  </div>
                </div>
              </div>;
        })}
        </div>

        {/* Game Instructions */}
        <Card className="bg-white/80 backdrop-blur-sm mt-4">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-gray-800">Cara Bermain 🎮</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 text-left">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6">
              <div>
                <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-green-700">🌱 Organik (Hijau)</h4>
                <p className="text-gray-700 text-sm sm:text-base">Sisa makanan, daun, dan bahan yang bisa terurai</p>
              </div>
              <div>
                <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-gray-600">♻️ Anorganik (Abu-abu)</h4>
                <p className="text-gray-700 text-sm sm:text-base">Plastik, logam, dan bahan yang bisa didaur ulang</p>
              </div>
              <div>
                <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-red-600">⚠️ Limbah B3 (Merah)</h4>
                <p className="text-gray-700 text-sm sm:text-base">Bahan berbahaya yang perlu pembuangan khusus</p>
              </div>
              <div>
                <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-blue-600">📄 Kertas (Biru)</h4>
                <p className="text-gray-700 text-sm sm:text-base">Kertas, kardus, dan produk kertas</p>
              </div>
            </div>
            <div className="text-center mt-3 sm:mt-6 p-4 bg-amber-50 rounded-lg">
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                🎯 Seret dan lepaskan sampah ke tempat sampah yang benar untuk belajar memilah sampah!
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Tingkat kesulitan meningkat seiring bertambahnya level - dari sampah sederhana hingga limbah B3!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};

export default WelcomeScreen;
