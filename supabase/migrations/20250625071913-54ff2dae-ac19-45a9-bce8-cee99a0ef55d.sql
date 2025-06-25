
-- Create table to store user level progress
CREATE TABLE IF NOT EXISTS public.user_level_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  level_id text NOT NULL,
  stars integer DEFAULT 0,
  best_score integer DEFAULT 0,
  completed_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, level_id)
);

-- Enable RLS
ALTER TABLE public.user_level_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user_level_progress
CREATE POLICY "Users can view their own progress" 
  ON public.user_level_progress 
  FOR SELECT 
  USING (auth.uid() = user_id OR public.is_user_admin());

CREATE POLICY "Users can insert their own progress" 
  ON public.user_level_progress 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
  ON public.user_level_progress 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete any progress" 
  ON public.user_level_progress 
  FOR DELETE 
  USING (public.is_user_admin());

-- Update delete_user_progress function to also clear level progress
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
  
  -- Delete all level progress for the target user
  DELETE FROM public.user_level_progress WHERE user_id = target_user_id;
  
  -- Reset progress in profiles table
  UPDATE public.profiles 
  SET progress = '{}'::jsonb 
  WHERE id = target_user_id;
END;
$$;

-- Function to save or update user level progress
CREATE OR REPLACE FUNCTION public.save_user_level_progress(
  p_level_id text,
  p_stars integer,
  p_score integer
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_level_progress (user_id, level_id, stars, best_score)
  VALUES (auth.uid(), p_level_id, p_stars, p_score)
  ON CONFLICT (user_id, level_id) 
  DO UPDATE SET 
    stars = GREATEST(user_level_progress.stars, EXCLUDED.stars),
    best_score = GREATEST(user_level_progress.best_score, EXCLUDED.best_score),
    updated_at = now()
  WHERE user_level_progress.user_id = auth.uid() AND user_level_progress.level_id = p_level_id;
END;
$$;
