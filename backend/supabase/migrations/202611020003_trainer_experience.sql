alter table public.trainers
add column if not exists experience text not null default '';

update public.trainers
set experience = case name
  when 'Amaan' then '10+ years · Former powerlifting champion'
  when 'Zeeshan Haider' then 'Functional training specialist'
  when 'Karamat Ali' then 'Certified mobility therapist'
  else experience
end
where experience = '';
