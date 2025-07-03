import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signUp, signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      if (!username.trim()) {
        alert('Username harus diisi!');
        setLoading(false);
        return;
      }
      await signUp(email, password, username, isAdmin);
    } else {
      await signIn(email, password);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-welcome-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-start mb-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/')} className="flex items-center gap-2">
              <span className="text-lg">←</span> Kembali
            </Button>
          </div>
          <div className="flex justify-center mb-4">
            <img 
              src="/cleansort-logo.png" 
              alt="CleanSort Logo" 
              className="w-16 h-16"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-amber-600">
            Clean Sort Game
          </CardTitle>
          <p className="text-gray-600 mt-2">
            {isSignUp ? 'Daftar untuk mulai bermain' : 'Masuk ke akun Anda'}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username"
                    required={isSignUp}
                  />
                </div>
                
                {/* <div className="flex items-center space-x-2">
                  <Checkbox
                    id="admin"
                    checked={isAdmin}
                    onCheckedChange={(checked) => setIsAdmin(checked as boolean)}
                  />
                  <Label htmlFor="admin" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Daftar sebagai Admin
                  </Label>
                </div> */}
              </>
            )}
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Memproses...' : (isSignUp ? 'Daftar' : 'Masuk')}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm"
            >
              {isSignUp 
                ? 'Sudah punya akun? Masuk di sini' 
                : 'Belum punya akun? Daftar di sini'
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
