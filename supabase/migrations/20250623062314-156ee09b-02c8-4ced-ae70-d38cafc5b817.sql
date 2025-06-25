
-- Drop existing policies first
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own scores" ON public.game_scores;
DROP POLICY IF EXISTS "Users can insert their own scores" ON public.game_scores;

-- Drop complex multi-role tables and functions
DROP TABLE IF EXISTS public.room_game_progress CASCADE;
DROP TABLE IF EXISTS public.room_participants CASCADE;
DROP TABLE IF EXISTS public.rooms CASCADE;
DROP TYPE IF EXISTS public.room_status CASCADE;
DROP FUNCTION IF EXISTS public.get_room_leaderboard(uuid);
DROP FUNCTION IF EXISTS public.is_admin(uuid);

-- Drop and recreate app_role enum to be simpler
DROP TYPE IF EXISTS public.app_role CASCADE;
CREATE TYPE public.app_role AS ENUM ('user');

-- Update profiles table to be simple
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role CASCADE;
ALTER TABLE public.profiles ADD COLUMN role public.app_role DEFAULT 'user'::public.app_role;

-- Ensure game_scores table has proper foreign key to profiles
ALTER TABLE public.game_scores DROP CONSTRAINT IF EXISTS fk_game_scores_user_id;
ALTER TABLE public.game_scores 
ADD CONSTRAINT fk_game_scores_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Enable RLS on profiles and game_scores
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

-- Simple RLS policies
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can view their own scores" 
  ON public.game_scores 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scores" 
  ON public.game_scores 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create simple trigger function for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, role)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    new.email,
    'user'::public.app_role
  )
  ON CONFLICT (id) DO UPDATE SET
    username = EXCLUDED.username,
    email = EXCLUDED.email,
    role = EXCLUDED.role;
  RETURN new;
END;
$$;

-- Ensure trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
