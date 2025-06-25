import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import MusicToggle from '@/components/MusicToggle';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  total_scores: number;
  completed_levels: number;
  total_stars: number;
}

const Admin = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (!isAdmin) {
      navigate('/');
      toast.error('Akses ditolak. Anda bukan admin.');
      return;
    }

    fetchUsers();
  }, [user, isAdmin, navigate]);

  const fetchUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Get detailed user statistics
      const usersWithStats = await Promise.all(
        profiles.map(async (profile) => {
          // Get total scores count
          const { count: totalScores } = await supabase
            .from('game_scores')
            .select('*', { count: 'exact' })
            .eq('user_id', profile.id);

          // Get level progress statistics
          const { data: levelProgress } = await supabase
            .from('user_level_progress')
            .select('stars')
            .eq('user_id', profile.id);

          const completedLevels = levelProgress?.length || 0;
          const totalStars = levelProgress?.reduce((sum, progress) => sum + progress.stars, 0) || 0;

          return {
            ...profile,
            total_scores: totalScores || 0,
            completed_levels: completedLevels,
            total_stars: totalStars
          };
        })
      );

      setUsers(usersWithStats);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Gagal memuat data pengguna');
    } finally {
      setLoading(false);
    }
  };

  const deleteUserProgress = async (userId: string, username: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus semua progress ${username}? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    setDeleting(userId);

    try {
      const { error } = await supabase.rpc('delete_user_progress', {
        target_user_id: userId
      });

      if (error) throw error;

      toast.success(`Progress ${username} berhasil dihapus`);
      fetchUsers(); // Refresh data
    } catch (error) {
      console.error('Error deleting user progress:', error);
      toast.error('Gagal menghapus progress pengguna');
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-xl font-bold">Memuat data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <Card className="mb-6 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <div className="text-4xl mb-2">👨‍💼</div>
                <CardTitle className="text-3xl">Admin Panel</CardTitle>
                <p className="text-gray-600">Kelola pengguna dan progress game</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-stretch sm:items-center sm:justify-end">
                <Button variant="outline" onClick={() => navigate('/')} className="w-full sm:w-auto">
                  🏠 Kembali ke Game
                </Button>
                <Button variant="outline" onClick={() => navigate('/leaderboard')} className="w-full sm:w-auto">
                  🏆 Leaderboard
                </Button>
                <Button variant="outline" onClick={signOut} className="w-full sm:w-auto">
                  🚪 Keluar
                </Button>
                <div className="flex w-full sm:w-auto justify-end items-center">
                  <MusicToggle defaultMusicSrc="/boba-date.mp3" />
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Users Management Table */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">👥 Manajemen Pengguna</CardTitle>
            <p className="text-sm text-gray-600">
              Kelola progress dan data pengguna game
            </p>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">👤</div>
                <p className="text-gray-600">Belum ada pengguna terdaftar.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Level Selesai</TableHead>
                      <TableHead className="text-center">Total Bintang</TableHead>
                      <TableHead className="text-center">Total Games</TableHead>
                      <TableHead className="text-center">Tgl Daftar</TableHead>
                      <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((userProfile) => (
                      <TableRow key={userProfile.id} className={user?.id === userProfile.id ? 'bg-blue-50' : ''}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {userProfile.username}
                            {user?.id === userProfile.id && (
                              <Badge variant="secondary" className="text-xs">You</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{userProfile.email}</TableCell>
                        <TableCell>
                          {userProfile.is_admin ? (
                            <Badge variant="destructive">Admin</Badge>
                          ) : (
                            <Badge variant="secondary">User</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="font-bold text-blue-600">
                            {userProfile.completed_levels}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="font-bold text-yellow-600">
                            ⭐ {userProfile.total_stars}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-bold text-green-600">
                          {userProfile.total_scores}
                        </TableCell>
                        <TableCell className="text-center text-gray-600">
                          {formatDate(userProfile.created_at)}
                        </TableCell>
                        <TableCell className="text-center">
                          {!userProfile.is_admin && (userProfile.total_scores > 0 || userProfile.completed_levels > 0) && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteUserProgress(userProfile.id, userProfile.username)}
                              disabled={deleting === userProfile.id}
                            >
                              {deleting === userProfile.id ? '⏳' : '🗑️ Reset Progress'}
                            </Button>
                          )}
                          {userProfile.is_admin && (
                            <Badge variant="outline" className="text-xs">
                              Admin - Tidak dapat direset
                            </Badge>
                          )}
                          {!userProfile.is_admin && userProfile.total_scores === 0 && userProfile.completed_levels === 0 && (
                            <Badge variant="outline" className="text-xs">
                              Belum bermain
                            </Badge>
                          )}
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
        <Card className="mt-6 bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <p className="text-red-800 text-sm">
              ⚠️ <strong>Peringatan:</strong> Menghapus progress pengguna akan menghilangkan semua skor, pencapaian level, dan bintang mereka secara permanen. 
              Tindakan ini tidak dapat dibatalkan dan akan mengatur ulang progress mereka ke awal.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
