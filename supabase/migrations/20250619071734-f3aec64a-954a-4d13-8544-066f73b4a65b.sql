
-- Add missing foreign key constraint between game_scores and profiles
ALTER TABLE public.game_scores 
ADD CONSTRAINT fk_game_scores_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update the existing foreign key reference to use profiles table instead of auth.users
ALTER TABLE public.game_scores DROP CONSTRAINT IF EXISTS game_scores_user_id_fkey;
