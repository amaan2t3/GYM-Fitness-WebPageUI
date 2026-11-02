alter table public.classes
add column if not exists category text not null default 'shared'
check (category in ('mens', 'ladies', 'shared'));

update public.classes
set category = case title
  when 'Strength Lab' then 'mens'
  when 'Conditioning' then 'mens'
  else 'shared'
end
where category = 'shared'
  and title in ('Strength Lab', 'Conditioning', 'Mobility Flow');

insert into public.classes (title, category, description, duration, intensity, schedule, badge, image_url, sort_order)
select seed.title, seed.category, seed.description, seed.duration, seed.intensity, seed.schedule, seed.badge, seed.image_url, seed.sort_order
from (values
  ('Ladies’ Strength', 'ladies', 'A welcoming space to get stronger, one session at a time.', '55 min', 'All levels', 'Mon, Wed · 5:30 PM', 'Ladies’ fitness', 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=900&q=85', 4),
  ('Fitness & Energy', 'ladies', 'Feel-good conditioning designed to meet you where you are.', '45 min', 'All levels', 'Tue, Thu · 6:00 PM', 'Wellness', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85', 5),
  ('Mobility & Balance', 'ladies', 'Restore range, build balance, and make recovery part of training.', '50 min', 'All levels', 'Sat · 9:00 AM', 'Healthy lifestyle', 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=900&q=85', 6)
) as seed(title, category, description, duration, intensity, schedule, badge, image_url, sort_order)
where not exists (
  select 1 from public.classes existing where existing.title = seed.title
);
