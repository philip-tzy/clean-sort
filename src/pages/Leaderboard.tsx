import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import MusicToggle from '@/components/MusicToggle';

interface LeaderboardEntry {
  id: string;
  username: string;
  total_score: number;
  best_time: number;
  total_stars: number;
  games_played: number;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { playBackgroundMusic } = useBackgroundMusic();

  useEffect(() => {
    fetchLeaderboard();
    playBackgroundMusic('/boba-date.mp3');

    // Subscribe to realtime changes in game_scores
    const subscription = supabase
      .channel('public:game_scores')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'game_scores' },
        () => {
          fetchLeaderboard();
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('game_scores')
        .select(`
          user_id,
          score,
          completion_time,
          stars,
          profiles!fk_game_scores_user_id(username, is_admin)
        `);

      if (error) throw error;

      console.log('Leaderboard data:', data);

      // Group by user and calculate stats
      const userStats: { [key: string]: LeaderboardEntry & { is_admin?: boolean } } = {};

      data?.forEach((score: any) => {
        const userId = score.user_id;
        if (!userStats[userId]) {
          userStats[userId] = {
            id: userId,
            username: score.profiles?.username || 'Unknown User',
            total_score: 0,
            best_time: Infinity,
            total_stars: 0,
            games_played: 0,
            is_admin: score.profiles?.is_admin || false
          };
        }

        userStats[userId].total_score += score.score;
        userStats[userId].best_time = Math.min(userStats[userId].best_time, score.completion_time);
        userStats[userId].total_stars += score.stars;
        userStats[userId].games_played += 1;
      });

      // Convert to array and sort by total score (desc), then by best time (asc)
      const sortedLeaderboard = Object.values(userStats)
        .filter(user => user.games_played > 0 && !user.is_admin)
        .sort((a, b) => {
          if (b.total_score !== a.total_score) {
            return b.total_score - a.total_score;
          }
          return a.best_time - b.best_time;
        });

      setLeaderboard(sortedLeaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds === Infinity) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 p-4">
        <div className="flex w-full justify-end mb-2"><MusicToggle defaultMusicSrc="/boba-date.mp3" /></div>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <div className="text-4xl mb-2">🏆</div>
                <CardTitle className="text-3xl">Leaderboard</CardTitle>
                <p className="text-gray-600">Peringkat pemain terbaik</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate('/')}>
                  🏠 Kembali ke Game
                </Button>
                {user && (
                  <Button variant="outline" onClick={signOut}>
                    🚪 Keluar
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Leaderboard Table */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">🎮 Top Players</CardTitle>
            <p className="text-sm text-gray-600">
              Peringkat berdasarkan total poin tertinggi, kemudian waktu tercepat
            </p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="text-2xl mb-2">⏳</div>
                <p>Memuat data leaderboard...</p>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🎯</div>
                <p className="text-gray-600">Belum ada data permainan.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Mulai bermain untuk muncul di leaderboard!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>Player</TableHead>
                      <TableHead className="text-right">Total Poin</TableHead>
                      <TableHead className="text-right">Waktu Terbaik</TableHead>
                      <TableHead className="text-right">Total ⭐</TableHead>
                      <TableHead className="text-right">Games</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboard.map((entry, index) => (
                      <TableRow key={entry.id} className={user?.id === entry.id ? 'bg-blue-50' : ''}>
                        <TableCell className="font-bold text-lg">
                          {getRankIcon(index + 1)}
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {entry.username}
                            {user?.id === entry.id && (
                              <Badge variant="secondary" className="text-xs">You</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-bold text-green-600">
                          {entry.total_score}
                        </TableCell>
                        <TableCell className="text-right font-mono text-blue-600">
                          {formatTime(entry.best_time)}
                        </TableCell>
                        <TableCell className="text-right text-yellow-600">
                          {entry.total_stars}
                        </TableCell>
                        <TableCell className="text-right text-gray-600">
                          {entry.games_played}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-blue-800 text-sm">
              💡 <strong>Tips:</strong> Dapatkan poin lebih tinggi dengan menyelesaikan level dengan cepat dan akurat! 
              Setiap jawaban benar memberikan poin, dan menyelesaikan dengan waktu singkat meningkatkan peringkat Anda.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
