create table if not exists public.level_locks (
  level_id text primary key,
  locked boolean not null default false
); 