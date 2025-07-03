import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { gameLevels, binCategories, TrashItem as TrashItemType } from '@/data/gameData';
import { toast } from 'sonner';
import { useSound } from '@/hooks/useSound';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import MusicToggle from './MusicToggle';

import TrashBin from './TrashBin';
import TrashItem from './TrashItem';
import { useDragTouchHandlers } from './useDragTouchHandlers';

interface GameScreenProps {
  levelId: string;
  onGameEnd: (score: number, errors: Array<{item: string, explanation: string}>, completionTime: number, completedItems: number, totalItems: number) => void;
  onBackToMenu: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ levelId, onGameEnd, onBackToMenu }) => {
  const level = gameLevels.find(l => l.id === levelId)!;
  const levelIdx = gameLevels.findIndex(l => l.id === levelId);
  
  const { playButtonClick, playDragStart, playCorrectDrop, playIncorrectDrop, playGameComplete, playTick } = useSound();
  const { playBackgroundMusic, stopBackgroundMusic } = useBackgroundMusic();

  // Pattern: Level 1&2: 3 item, 3&4: 4 item, 5&6: 5 item, dst.
  let numItems: number;
  let effectiveItems: TrashItemType[] = [];

  // Ambil item dari level yang dipilih saja, tidak dari nextLevelObj
  numItems = level.items.length;
  effectiveItems = [...level.items];

  const [timeLeft, setTimeLeft] = useState(level.timeLimit);
  const [startTime] = useState(Date.now());
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState<Array<{item: string, explanation: string}>>([]);
  const [currentItems, setCurrentItems] = useState<TrashItemType[]>([]);
  const [draggedItem, setDraggedItem] = useState<TrashItemType | null>(null);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [incorrectItems, setIncorrectItems] = useState<Set<string>>(new Set());
  const [gameStarted, setGameStarted] = useState(false);

  // Skor dinamis sesuai tingkat kesulitan
  let pointsPerCorrect = 0;
  let penaltyWrong = 0;
  if (level.difficulty === 'easy') {
    pointsPerCorrect = 4;
    penaltyWrong = 1;
  } else if (level.difficulty === 'medium') {
    pointsPerCorrect = 7;
    penaltyWrong = 2;
  } else if (level.difficulty === 'hard') {
    pointsPerCorrect = 10;
    penaltyWrong = 3;
  }

  useEffect(() => {
    // Randomkan urutan agar tidak selalu sama
    const shuffled = [...effectiveItems].sort(() => Math.random() - 0.5);
    setCurrentItems(shuffled);
    setGameStarted(true);
    setScore(0);
    setErrors([]);
    setCompletedItems(new Set());
    setIncorrectItems(new Set());
    setTimeLeft(level.timeLimit);
    setDraggedItem(null);
    
    // Start background music when game starts
    playBackgroundMusic();
    
    // eslint-disable-next-line
  }, [levelId]); // reset only saat ganti level

  useEffect(() => {
    if (!gameStarted || currentItems.length === 0) return;

    const totalProcessedItems = completedItems.size + incorrectItems.size;
    if (totalProcessedItems === currentItems.length) {
      playGameComplete();
      stopBackgroundMusic(); // Stop music when game ends
      const completionTime = Math.floor((Date.now() - startTime) / 1000);
      // --- Faktor waktu ---
      let timeFactor = 1;
      if (completionTime < 0.25 * level.timeLimit) {
        timeFactor = 3;
      } else if (completionTime < 0.75 * level.timeLimit) {
        timeFactor = 2;
      }
      const finalScore = score * timeFactor;
      onGameEnd(finalScore, errors, completionTime, completedItems.size, currentItems.length);
      return;
    }
    if (timeLeft <= 0) {
      stopBackgroundMusic(); // Stop music when time runs out
      const completionTime = Math.floor((Date.now() - startTime) / 1000);
      // --- Faktor waktu ---
      let timeFactor = 1;
      if (completionTime < 0.25 * level.timeLimit) {
        timeFactor = 3;
      } else if (completionTime < 0.75 * level.timeLimit) {
        timeFactor = 2;
      }
      const finalScore = score * timeFactor;
      onGameEnd(finalScore, errors, completionTime, completedItems.size, currentItems.length);
      return;
    }
    
    // Play tick sound for last 10 seconds
    if (timeLeft <= 10) {
      playTick();
    }
    
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, completedItems.size, incorrectItems.size, currentItems.length, score, errors, onGameEnd, gameStarted, startTime, playGameComplete, playTick, stopBackgroundMusic]);

  // Cleanup background music on unmount
  useEffect(() => {
    return () => {
      stopBackgroundMusic();
    };
  }, [stopBackgroundMusic]);

  // DRAG & TOUCH HANDLERS with sound
  const { handleDragStart: originalHandleDragStart, handleTouchStart: originalHandleTouchStart } = useDragTouchHandlers({
    completedItems,
    incorrectItems,
    setDraggedItem
  });

  const handleDragStart = (item: TrashItemType) => {
    playDragStart();
    originalHandleDragStart(item);
  };

  const handleTouchStart = (item: TrashItemType) => {
    playDragStart();
    originalHandleTouchStart(item);
  };

  // Untuk mobile: tap bin saat sedang drag item
  const handleBinTouch = (category: string) => {
    if (draggedItem && !completedItems.has(draggedItem.id) && !incorrectItems.has(draggedItem.id)) {
      handleDrop(category, draggedItem);
      setDraggedItem(null);
    }
  };

  // Handler drop (desktop & mobile) with sound
  const handleDrop = (category: string, forceItem?: TrashItemType) => {
    const usedItem = forceItem || draggedItem;
    if (!usedItem || completedItems.has(usedItem.id) || incorrectItems.has(usedItem.id)) return;

    const isCorrect = usedItem.category === category;
    if (isCorrect) {
      playCorrectDrop();
      setScore(prev => prev + pointsPerCorrect);
      setCompletedItems(prev => new Set([...prev, usedItem.id]));
    } else {
      playIncorrectDrop();
      setScore(prev => prev - penaltyWrong);
      setIncorrectItems(prev => new Set([...prev, usedItem.id]));
      const newError = {
        item: usedItem.name,
        explanation: `${usedItem.name} seharusnya masuk ke tempat sampah ${getBinName(usedItem.category)}. ${usedItem.educationalFact}`
      };
      setErrors(prev => [...prev, newError]);
    }
    setDraggedItem(null);
  };

  const getBinName = (category: string) => {
    const bin = binCategories.find(b => b.id === category);
    return bin ? bin.name.toLowerCase() : category;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalProcessedItems = completedItems.size + incorrectItems.size;
  const progressPercentage = currentItems.length > 0 ? (totalProcessedItems / currentItems.length) * 100 : 0;

  if (!gameStarted || currentItems.length === 0) {
    return (
      <div className="min-h-screen bg-game-gradient flex items-center justify-center">
        <div className="text-2xl font-bold">Memuat permainan...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-game-gradient p-4">
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex w-full justify-end mb-2"><MusicToggle defaultMusicSrc="/Quiz-Background-Music.mp3" /></div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <Button variant="outline" onClick={() => { playButtonClick(); stopBackgroundMusic(); onBackToMenu(); }}>
            ← Kembali ke Menu
          </Button>
          <h2 className="text-2xl font-bold text-center">Level {level.name}</h2>
          <div className="text-right">
            <div className="text-lg font-semibold">Skor: {score}</div>
            <div className={`text-lg font-semibold ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-red-600'}`}>
              Waktu: {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        <Progress value={progressPercentage} className="h-3" />
        <p className="text-center mt-2 text-gray-600">
          {totalProcessedItems} dari {currentItems.length} sampah telah diproses
        </p>
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Trash Bins */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {binCategories.map((bin) => (
            <TrashBin
              key={bin.id}
              binId={bin.id}
              isActive={!!draggedItem}
              touchSelectedItem={draggedItem}
              onDrop={id => handleDrop(id)}
              onBinTouch={handleBinTouch}
            />
          ))}
        </div>
        {/* Trash Items */}
        <div
          className="grid gap-3 grid-cols-4 w-full max-w-full items-center justify-center"
        >
          {currentItems.map((item) => {
            const isCompleted = completedItems.has(item.id);
            const isIncorrect = incorrectItems.has(item.id);
            const isProcessed = isCompleted || isIncorrect;
            const isSelected = draggedItem && draggedItem.id === item.id;
            return (
              <TrashItem
                key={item.id}
                item={item}
                isCompleted={isCompleted}
                isIncorrect={isIncorrect}
                isSelected={!!isSelected}
                onDragStart={handleDragStart}
                onTouchStart={handleTouchStart}
              />
            );
          })}
        </div>
        {/* Instructions */}
        <Card className="mt-8 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <p className="text-gray-700 font-medium">
              🎯 Seret sampah ke tempat sampah berwarna yang benar! Belajar memilah sampah sambil bersenang-senang!
            </p>
            <p className="text-sm text-gray-600 mt-2">
              ✅ Jawaban benar: +{pointsPerCorrect} poin | ❌ Jawaban salah: -{penaltyWrong} poin <br />
              <span className="text-xs block mt-1">(Tidak ada nilai maksimal. Skor akhir dikali faktor waktu!)</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameScreen;
