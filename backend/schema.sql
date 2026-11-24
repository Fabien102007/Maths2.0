-- Mathevo — schéma Supabase initial.
-- À exécuter dans Supabase SQL Editor avant d'activer la synchronisation.
create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.user_progress enable row level security;
create policy "Users read their own progress" on public.user_progress for select using (auth.uid() = user_id);
create policy "Users insert their own progress" on public.user_progress for insert with check (auth.uid() = user_id);
create policy "Users update their own progress" on public.user_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.user_subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  status text not null default 'inactive',
  price_id text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);
alter table public.user_subscriptions enable row level security;
create policy "Users read their own subscription" on public.user_subscriptions for select using (auth.uid() = user_id);

create table if not exists public.beta_feedback (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  category text not null,
  rating integer check (rating between 1 and 5),
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.beta_feedback enable row level security;
-- Les retours sont insérés par le Worker avec la clé service role, jamais depuis le navigateur.
