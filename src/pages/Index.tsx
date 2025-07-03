import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WelcomeScreen from '@/components/WelcomeScreen';
import GameScreen from '@/components/GameScreen';
import ResultsScreen from '@/components/ResultsScreen';
import { gameLevels } from '@/data/gameData';
import { supabase } from '@/integrations/supabase/client';
import { useSound } from '@/hooks/useSound';

type GameState = 'welcome' | 'playing' | 'results';

type StarAchievements = { [levelId: string]: number };

const getStarsByScore = (score: number, maxScore: number) => {
  // 3 bintang: 90%+, 2 bintang: 70%+, 1 bintang: 50%+, 0: di bawah itu
  if (maxScore === 0) return 0;
  const percent = score / maxScore;
  if (percent >= 0.9) return 3;
  if (percent >= 0.7) return 2;
  if (percent >= 0.5) return 1;
  return 0;
};

const Index = () => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { playButtonClick, playLevelUp } = useSound();
  
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [currentLevel, setCurrentLevel] = useState<string>('');
  const [gameResults, setGameResults] = useState<{
    score: number;
    errors: Array<{item: string, explanation: string}>;
    canProceed?: boolean;
    completionTime?: number;
  }>({ score: 0, errors: [], canProceed: false });

  const [starAchievements, setStarAchievements] = useState<StarAchievements>({});
  const [progressLoading, setProgressLoading] = useState(true);

  // Load progress from database
  const loadUserProgress = async () => {
    if (!user) {
      setProgressLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_level_progress')
        .select('level_id, stars')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading user progress:', error);
        setProgressLoading(false);
        return;
      }

      const achievements: StarAchievements = {};
      data.forEach(progress => {
        achievements[progress.level_id] = progress.stars;
      });

      setStarAchievements(achievements);
    } catch (error) {
      console.error('Error loading user progress:', error);
    } finally {
      setProgressLoading(false);
    }
  };

  // Save progress to database
  const saveProgressToDatabase = async (levelId: string, stars: number, score: number) => {
    if (!user) return;

    try {
      const { error } = await supabase.rpc('save_user_level_progress', {
        p_level_id: levelId,
        p_stars: stars,
        p_score: score
      });

      if (error) {
        console.error('Error saving progress:', error);
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  // Load user progress when component mounts or user changes
  useEffect(() => {
    loadUserProgress();
  }, [user]);

  // Cari urutan index level aktif
  const currentLevelIdx = gameLevels.findIndex(lvl => lvl.id === currentLevel);

  const startGame = (levelId: string) => {
    setCurrentLevel(levelId);
    setGameState('playing');
  };

  // Save score to database
  const saveScoreToDatabase = async (score: number, completionTime: number, stars: number) => {
    if (!user) return;

    // Cek apakah sudah ada skor untuk user & level ini
    const { data: existing, error: fetchError } = await supabase
      .from('game_scores')
      .select('id')
      .eq('user_id', user.id)
      .eq('level_id', currentLevel)
      .maybeSingle();

    if (fetchError) {
      console.error('Error checking existing score:', fetchError);
      return;
    }

    // Hanya insert jika belum ada skor (attempt pertama)
    if (!existing) {
      try {
        const { error } = await supabase
          .from('game_scores')
          .insert({
            user_id: user.id,
            level_id: currentLevel,
            score: score,
            completion_time: completionTime,
            stars: stars
          });

        if (error) {
          console.error('Error saving score:', error);
        }
      } catch (error) {
        console.error('Error saving score:', error);
      }
    }
  };

  // Cek skor: harus >= 50% dari skor max (diset ke 100 poin)
  const endGame = (score: number, errors: Array<{item: string, explanation: string}>, completionTime: number, correctCount: number, totalCount: number) => {
    // Hitung bintang berdasarkan jumlah item benar
    let stars = 0;
    if (totalCount > 0) {
      if (correctCount === totalCount) {
        stars = 3;
      } else if (correctCount >= Math.ceil((2/3) * totalCount)) {
        stars = 2;
      } else if (correctCount >= Math.ceil((1/3) * totalCount)) {
        stars = 1;
      }
    }
    const canProceed = stars >= 1;

    // Save to database if user is logged in
    if (user) {
      saveScoreToDatabase(score, completionTime, stars);
    }

    // Update progress in database and local state
    setStarAchievements(prev => {
      const prevStar = prev[currentLevel] || 0;
      if (stars > prevStar) {
        if (canProceed) {
          playLevelUp();
        }
        // Save to database
        if (user) {
          saveProgressToDatabase(currentLevel, stars, score);
        }
        return { ...prev, [currentLevel]: stars };
      }
      return prev;
    });

    setGameResults({ score, errors, canProceed, completionTime });
    setGameState('results');
  };

  const playAgain = () => {
    playButtonClick();
    setGameState('playing');
  };

  const backToMenu = () => {
    playButtonClick();
    setGameState('welcome');
    setCurrentLevel('');
    setGameResults({ score: 0, errors: [], canProceed: false });
  };

  // Lanjut ke next level jika ada
  const proceedToNextLevel = () => {
    // Jika tidak ada level selanjutnya, kembali ke menu
    if (currentLevelIdx === -1 || currentLevelIdx + 1 >= gameLevels.length) {
      setGameState('welcome');
      setCurrentLevel('');
      setGameResults({ score: 0, errors: [], canProceed: false });
      return;
    }
    const nextLevelId = gameLevels[currentLevelIdx + 1].id;
    setCurrentLevel(nextLevelId);
    setGameState('playing');
  };

  if (loading || progressLoading) {
    return (
      <div className="min-h-screen bg-welcome-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-xl font-bold">Memuat...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Admin Panel Button - only show for admins */}
      {/* Removed duplicate Admin Panel button here to avoid double rendering on WelcomeScreen */}

      {gameState === 'welcome' && (
        <WelcomeScreen onStartGame={startGame} levelStars={starAchievements} />
      )}

      {gameState === 'playing' && currentLevel && (
        <GameScreen 
          levelId={currentLevel}
          onGameEnd={endGame}
          onBackToMenu={backToMenu}
        />
      )}

      {gameState === 'results' && (
        <ResultsScreen 
          score={gameResults.score}
          errors={gameResults.errors}
          onPlayAgain={playAgain}
          onBackToMenu={backToMenu}
          canProceed={gameResults.canProceed}
          onProceedNextLevel={proceedToNextLevel}
          hasNextLevel={currentLevelIdx + 1 < gameLevels.length}
        />
      )}
    </div>
  );
};

export default Index;
