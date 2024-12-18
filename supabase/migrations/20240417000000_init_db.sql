-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create meditation_sessions table
create table meditation_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  duration integer not null, -- in seconds
  completed boolean default false,
  mood text,
  rating integer check (rating >= 1 and rating <= 5),
  journal_text text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create achievements table
create table achievements (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  icon text not null,
  requirement_type text not null, -- e.g., 'streak', 'total_sessions', 'total_minutes'
  requirement_value integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_achievements table
create table user_achievements (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  achievement_id uuid references achievements on delete cascade not null,
  unlocked_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, achievement_id)
);

-- Create streaks table
create table streaks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  current_streak integer default 0,
  longest_streak integer default 0,
  last_meditation_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Enable RLS
alter table profiles enable row level security;
alter table meditation_sessions enable row level security;
alter table achievements enable row level security;
alter table user_achievements enable row level security;
alter table streaks enable row level security;

-- Create RLS policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

create policy "Users can view their own meditation sessions."
  on meditation_sessions for select
  using ( auth.uid() = user_id );

create policy "Users can create their own meditation sessions."
  on meditation_sessions for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own meditation sessions."
  on meditation_sessions for update
  using ( auth.uid() = user_id );

create policy "Achievements are viewable by everyone."
  on achievements for select
  using ( true );

create policy "Users can view their own achievement progress."
  on user_achievements for select
  using ( auth.uid() = user_id );

create policy "Users can update their own achievement progress."
  on user_achievements for insert
  with check ( auth.uid() = user_id );

create policy "Users can view their own streaks."
  on streaks for select
  using ( auth.uid() = user_id );

create policy "Users can update their own streaks."
  on streaks for update
  using ( auth.uid() = user_id );

-- Create functions
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  
  insert into public.streaks (user_id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Insert default achievements
insert into achievements (title, description, icon, requirement_type, requirement_value) values
  ('Early Bird', 'Complete 5 morning meditations', 'Sunrise', 'morning_sessions', 5),
  ('Zen Master', 'Achieve a 10-day streak', 'Trophy', 'streak', 10),
  ('Inner Peace', 'Log 20 calm moods', 'Heart', 'mood_count', 20),
  ('Mindful Explorer', 'Try 5 different meditation types', 'Brain', 'unique_types', 5),
  ('Consistency King', 'Meditate for 30 days total', 'Medal', 'total_days', 30),
  ('Goal Setter', 'Complete all weekly goals', 'Target', 'weekly_goals', 1);
