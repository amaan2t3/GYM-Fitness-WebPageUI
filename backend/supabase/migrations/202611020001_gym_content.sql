create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_gym_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_gym_admin() from public;
grant execute on function public.is_gym_admin() to authenticated;

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'shared' check (category in ('mens', 'ladies', 'shared')),
  description text not null default '',
  duration text not null default '',
  intensity text not null default '',
  schedule text not null default '',
  badge text not null default '',
  image_url text not null default '',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.classes
add column if not exists category text not null default 'shared' check (category in ('mens', 'ladies', 'shared'));

create table if not exists public.trainers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  experience text not null default '',
  bio text not null default '',
  image_url text not null default '',
  instagram_url text not null default '',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.membership_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10, 2) not null default 0 check (price >= 0),
  period text not null default 'month',
  features text[] not null default '{}',
  is_highlighted boolean not null default false,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 3 and 254),
  message text not null check (char_length(message) between 5 and 3000),
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.classes enable row level security;
alter table public.trainers enable row level security;
alter table public.membership_plans enable row level security;
alter table public.inquiries enable row level security;

create policy "Admins can view their own admin record"
on public.admin_users for select to authenticated
using (user_id = (select auth.uid()));

create policy "Public can read active classes"
on public.classes for select to anon, authenticated
using (is_active or (select public.is_gym_admin()));
create policy "Admins manage classes"
on public.classes for all to authenticated
using ((select public.is_gym_admin()))
with check ((select public.is_gym_admin()));

create policy "Public can read active trainers"
on public.trainers for select to anon, authenticated
using (is_active or (select public.is_gym_admin()));
create policy "Admins manage trainers"
on public.trainers for all to authenticated
using ((select public.is_gym_admin()))
with check ((select public.is_gym_admin()));

create policy "Public can read active membership plans"
on public.membership_plans for select to anon, authenticated
using (is_active or (select public.is_gym_admin()));
create policy "Admins manage membership plans"
on public.membership_plans for all to authenticated
using ((select public.is_gym_admin()))
with check ((select public.is_gym_admin()));

create policy "Visitors can submit inquiries"
on public.inquiries for insert to anon, authenticated
with check (status = 'new');
create policy "Admins can manage inquiries"
on public.inquiries for all to authenticated
using ((select public.is_gym_admin()))
with check ((select public.is_gym_admin()));

grant select on public.classes, public.trainers, public.membership_plans to anon, authenticated;
grant insert on public.inquiries to anon, authenticated;
grant select, insert, update, delete on public.classes, public.trainers, public.membership_plans, public.inquiries to authenticated;
grant select on public.admin_users to authenticated;

insert into public.classes (title, category, description, duration, intensity, schedule, badge, image_url, sort_order)
select seed.title, seed.category, seed.description, seed.duration, seed.intensity, seed.schedule, seed.badge, seed.image_url, seed.sort_order
from (values
  ('Strength & Muscle', 'mens', 'Build lasting strength with thoughtful, progressive coaching.', '60 min', 'All levels', 'Mon, Wed, Fri · 6:00 PM', 'Men’s fitness', 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85', 1),
  ('Bodybuilding', 'mens', 'Focused programming for muscle development, form, and confidence.', '45 min', 'Intermediate', 'Tue, Thu · 7:00 PM', 'Strength', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85', 2),
  ('Athletic Conditioning', 'mens', 'Improve endurance and power with coached functional training.', '45 min', 'All levels', 'Sat · 10:00 AM', 'Conditioning', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85', 3),
  ('Ladies’ Strength', 'ladies', 'A welcoming space to get stronger, one session at a time.', '55 min', 'All levels', 'Mon, Wed · 5:30 PM', 'Ladies’ fitness', 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=900&q=85', 4),
  ('Fitness & Energy', 'ladies', 'Feel-good conditioning designed to meet you where you are.', '45 min', 'All levels', 'Tue, Thu · 6:00 PM', 'Wellness', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85', 5),
  ('Mobility & Balance', 'ladies', 'Restore range, build balance, and make recovery part of training.', '50 min', 'All levels', 'Sat · 9:00 AM', 'Healthy lifestyle', 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=900&q=85', 6)
) as seed(title, category, description, duration, intensity, schedule, badge, image_url, sort_order)
where not exists (select 1 from public.classes);

insert into public.trainers (name, role, experience, bio, image_url, sort_order)
select seed.name, seed.role, seed.experience, seed.bio, seed.image_url, seed.sort_order
from (values
  ('Amaan', 'Strength & conditioning', '10+ years · Former powerlifting champion', 'Powerlifting, barbell technique, and sustainable muscle building.', 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=700&q=85', 1),
  ('Zeeshan Haider', 'Performance & nutrition', 'Functional training specialist', 'Functional training and nutrition coaching for everyday athletes.', 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=700&q=85', 2),
  ('Karamat Ali', 'Mobility & movement', 'Certified mobility therapist', 'Movement, injury prevention, and confident recovery.', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=85', 3)
) as seed(name, role, experience, bio, image_url, sort_order)
where not exists (select 1 from public.trainers);

insert into public.membership_plans (name, price, period, features, is_highlighted, sort_order)
select seed.name, seed.price, seed.period, seed.features, seed.is_highlighted, seed.sort_order
from (values
  ('Starter', 1500, 'month', array['Gym floor access', 'Locker facility', 'Movement assessment'], false, 1),
  ('Performance', 3000, 'month', array['Unlimited classes', 'Monthly coach check-in', 'Personalized training plan'], true, 2),
  ('Signature', 5000, 'month', array['Everything in Performance', 'Personal training session', 'Nutrition consultation'], false, 3)
) as seed(name, price, period, features, is_highlighted, sort_order)
where not exists (select 1 from public.membership_plans);
