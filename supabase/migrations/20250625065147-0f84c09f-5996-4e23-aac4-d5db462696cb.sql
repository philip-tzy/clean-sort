
-- First, add the role column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role public.app_role DEFAULT 'user'::public.app_role;

-- Add is_admin column for easier checking
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Create security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_user_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT COALESCE(is_admin, false) FROM public.profiles WHERE id = auth.uid();
$$;

-- Create function to delete user progress (admin only)
CREATE OR REPLACE FUNCTION public.delete_user_progress(target_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if current user is admin
  IF NOT public.is_user_admin() THEN
    RAISE EXCEPTION 'Only admins can delete user progress';
  END IF;
  
  -- Delete all game scores for the target user
  DELETE FROM public.game_scores WHERE user_id = target_user_id;
  
  -- Reset progress in profiles table
  UPDATE public.profiles 
  SET progress = '{}'::jsonb 
  WHERE id = target_user_id;
END;
$$;

-- Add policy for admins to view all profiles
CREATE POLICY "Admins can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (public.is_user_admin() OR auth.uid() = id);

-- Add policy for admins to view all scores
CREATE POLICY "Admins can view all scores" 
  ON public.game_scores 
  FOR SELECT 
  USING (public.is_user_admin() OR auth.uid() = user_id);

-- Update the handle_new_user function to support admin registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, role, is_admin)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    new.email,
    COALESCE((new.raw_user_meta_data ->> 'role')::public.app_role, 'user'::public.app_role),
    COALESCE((new.raw_user_meta_data ->> 'is_admin')::boolean, false)
  )
  ON CONFLICT (id) DO UPDATE SET
    username = EXCLUDED.username,
    email = EXCLUDED.email,
    role = EXCLUDED.role,
    is_admin = EXCLUDED.is_admin;
  RETURN new;
END;
$$;
