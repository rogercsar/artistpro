-- Enable required extensions
create extension if not exists pgcrypto;

-- Profiles table (users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  name text,
  role text not null check (role in ('artist','contractor','admin')) default 'artist',
  category text null check (category in ('dance','theater','clowning','music')),
  contractor_category text null check (contractor_category in ('dance','theater','clowning','music')),
  level text not null check (level in ('basic','advanced','pro')) default 'basic',
  avatar_url text,
  bio text,
  location text,
  phone text,
  birth_date date,
  website text,
  social_media jsonb,
  portfolio_photos text[],
  portfolio_videos text[],
  is_verified boolean default false,
  subscription jsonb,
  rating numeric(2,1) default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep updated_at in sync
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute procedure public.set_updated_at();

-- Events table
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  contractor_id uuid not null references public.profiles(id) on delete cascade,
  category text null check (category in ('dance','theater','clowning','music')),
  location text not null,
  date date not null,
  time text not null,
  duration numeric,
  requirements text[],
  genres text[],
  budget_min int,
  budget_max int,
  budget_currency text default 'BRL',
  max_participants int,
  status text not null check (status in ('active','closed','cancelled')) default 'active',
  images text[],
  tags text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at before update on public.events
for each row execute procedure public.set_updated_at();

-- Event interests (users marking interest)
create table if not exists public.event_interests (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(event_id, user_id)
);

-- Favorites
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('event','artist','contractor')),
  item_id uuid not null,
  created_at timestamptz not null default now(),
  unique(user_id, type, item_id)
);

-- Reviews
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  from_user_id uuid not null references public.profiles(id) on delete cascade,
  to_user_id uuid not null references public.profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  comment text,
  event_id uuid references public.events(id) on delete set null,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.event_interests enable row level security;
alter table public.favorites enable row level security;
alter table public.reviews enable row level security;

-- Profiles policies
drop policy if exists "Profiles are viewable by authenticated users" on public.profiles;
create policy "Profiles are viewable by authenticated users"
  on public.profiles for select
  to authenticated
  using (true);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- Events policies
drop policy if exists "Events are viewable by authenticated" on public.events;
create policy "Events are viewable by authenticated"
  on public.events for select
  to authenticated
  using (true);

drop policy if exists "Contractors can insert their events" on public.events;
create policy "Contractors can insert their events"
  on public.events for insert
  to authenticated
  with check (
    contractor_id = auth.uid() and
    exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'contractor')
  );

drop policy if exists "Event owner can update" on public.events;
create policy "Event owner can update"
  on public.events for update
  to authenticated
  using (contractor_id = auth.uid())
  with check (contractor_id = auth.uid());

drop policy if exists "Event owner can delete" on public.events;
create policy "Event owner can delete"
  on public.events for delete
  to authenticated
  using (contractor_id = auth.uid());

-- Event interests policies
drop policy if exists "Users can view their interests" on public.event_interests;
create policy "Users can view their interests"
  on public.event_interests for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Users can insert their interest" on public.event_interests;
create policy "Users can insert their interest"
  on public.event_interests for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Users can delete their interest" on public.event_interests;
create policy "Users can delete their interest"
  on public.event_interests for delete
  to authenticated
  using (user_id = auth.uid());

-- Favorites policies
drop policy if exists "Users can view their favorites" on public.favorites;
create policy "Users can view their favorites"
  on public.favorites for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Users can manage their favorites" on public.favorites;
create policy "Users can manage their favorites"
  on public.favorites for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Users can delete their favorites" on public.favorites;
create policy "Users can delete their favorites"
  on public.favorites for delete
  to authenticated
  using (user_id = auth.uid());

-- Reviews policies
drop policy if exists "Reviews are viewable by authenticated" on public.reviews;
create policy "Reviews are viewable by authenticated"
  on public.reviews for select
  to authenticated
  using (true);

drop policy if exists "Users can create reviews" on public.reviews;
create policy "Users can create reviews"
  on public.reviews for insert
  to authenticated
  with check (from_user_id = auth.uid());

-- Trigger to create profile on new auth user
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name',''), coalesce(new.raw_user_meta_data->>'role','artist'))
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Views to shape data for the frontend
create or replace view public.profiles_view as
  select 
    p.*
  from public.profiles p;

create or replace view public.events_view as
  select 
    e.*,
    (select row_to_json(pc) from (
      select id, email, name, role, level, avatar_url as avatar, bio, location, website, rating
      from public.profiles p where p.id = e.contractor_id
    ) pc) as contractor
  from public.events e;