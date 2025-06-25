import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import MusicToggle from './MusicToggle';
import { Link } from 'react-router-dom';

interface ResultsScreenProps {
  score: number;
  errors: Array<{item: string, explanation: string}>;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
  canProceed?: boolean;
  onProceedNextLevel?: () => void;
  hasNextLevel?: boolean;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ 
  score, 
  errors, 
  onPlayAgain, 
  onBackToMenu,
  canProceed = false,
  onProceedNextLevel,
  hasNextLevel = false,
}) => {
  const { playBackgroundMusic } = useBackgroundMusic();

  const getPerformanceMessage = () => {
    if (score >= 50) return { message: "Luar biasa! Kamu juara pemilah sampah! 🏆", color: "text-green-600" };
    if (score >= 30) return { message: "Kerja bagus! Kamu belajar dengan cepat! 🌟", color: "text-blue-600" };
    if (score >= 10) return { message: "Usaha yang baik! Terus berlatih! 💪", color: "text-yellow-600" };
    return { message: "Jangan menyerah! Setiap ahli pernah jadi pemula! 🌱", color: "text-purple-600" };
  };

  const performance = getPerformanceMessage();

  const educationalFacts = [
    "🌍 Memilah sampah dengan benar membantu melindungi lingkungan dan mengurangi polusi!",
    "♻️ Mendaur ulang satu kaleng aluminium menghemat energi untuk menyalakan TV selama 3 jam!",
    "🌱 Mengkompos sampah organik menciptakan pupuk alami untuk tanaman dan kebun!",
    "⚠️ Limbah B3 harus ditangani dengan hati-hati untuk melindungi manusia dan alam!",
    "📄 Satu ton kertas daur ulang menyelamatkan 17 pohon dan 26.000 liter air!",
    "🔋 Mendaur ulang baterai mencegah logam beracun mencemari tanah dan air!"
  ];

  const randomFact = educationalFacts[Math.floor(Math.random() * educationalFacts.length)];

  React.useEffect(() => {
    playBackgroundMusic('/boba-date.mp3');
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="flex w-full justify-end items-center gap-2 mb-2">
          <MusicToggle defaultMusicSrc="/boba-date.mp3" />
        </div>
        {/* Results Header */}
        <Card className="mb-6 text-center bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="text-6xl mb-2">
              {score >= 50 ? '🏆' : score >= 30 ? '🌟' : score >= 10 ? '💪' : '🌱'}
            </div>
            <CardTitle className="text-3xl">Permainan Selesai!</CardTitle>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              Skor Akhir: {score} poin
            </div>
            <p className={`text-xl font-medium ${performance.color}`}>
              {performance.message}
            </p>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Errors Review */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                📚 Momen Belajar
                <Badge variant="secondary">{errors.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {errors.length === 0 ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="text-green-600 font-semibold">Sempurna! Tidak ada kesalahan!</p>
                  <p className="text-gray-600">Kamu memilah semua sampah dengan benar!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {errors.map((error, index) => (
                    <div key={index} className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                      <h4 className="font-semibold text-yellow-800">{error.item}</h4>
                      <p className="text-yellow-700 text-sm mt-1">{error.explanation}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Educational Fact */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">💡 Tahukah Kamu?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-lg text-gray-700 mb-4">{randomFact}</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>🌱 <strong>Sampah organik</strong> bisa dikompos jadi pupuk</p>
                  <p>♻️ <strong>Sampah anorganik</strong> bisa didaur ulang jadi produk baru</p>
                  <p>📄 <strong>Sampah kertas</strong> bisa didaur ulang hingga 7 kali</p>
                  <p>⚠️ <strong>Limbah B3</strong> perlu cara pembuangan khusus</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={onPlayAgain}
            className="text-lg py-3 px-8 bg-green-600 hover:bg-green-700"
          >
            🎮 Main Lagi
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={onBackToMenu}
            className="text-lg py-3 px-8"
          >
            🏠 Kembali ke Menu
          </Button>
          <Link to="/leaderboard">
            <Button size="lg" variant="outline" className="text-lg py-3 px-8 font-semibold">🏆 Leaderboard</Button>
          </Link>
          {canProceed && hasNextLevel && onProceedNextLevel && (
            <Button
              size="lg"
              variant="default"
              onClick={onProceedNextLevel}
              className="text-lg py-3 px-8 bg-blue-600 hover:bg-blue-700"
            >
              ▶️ Lanjut ke Level Berikutnya
            </Button>
          )}
        </div>

        {/* Encouragement Message */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-blue-800 font-medium">
              🌍 Setiap kali kamu memilah sampah dengan benar, kamu membantu melindungi planet kita! 
              Terus belajar dan berlatih untuk menjadi pahlawan lingkungan! 🦸‍♀️🦸‍♂️
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsScreen;
