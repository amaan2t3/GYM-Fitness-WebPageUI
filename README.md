# Amaan’s Gym & Fitness

The project is split into two independently managed areas:

- [`frontend/`](./frontend/) — React, Vite, Tailwind, public website, and admin UI.
- [`backend/`](./backend/) — Supabase database migration and backend setup.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

The website can run without Supabase; it uses local sample content and disables contact submissions. To connect the backend and admin portal:

1. Create a Supabase project.
2. In its SQL Editor, run the migrations in order: [`202611020001_gym_content.sql`](./backend/supabase/migrations/202611020001_gym_content.sql), [`202611020002_program_categories.sql`](./backend/supabase/migrations/202611020002_program_categories.sql), then [`202611020003_trainer_experience.sql`](./backend/supabase/migrations/202611020003_trainer_experience.sql). These add separate men’s/ladies’ program categories and trainer experience details. If your Supabase project already ran migration 001, run only migrations 002 and 003.
3. Copy [`frontend/.env.example`](./frontend/.env.example) to `frontend/.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from the Supabase project API settings. These are public client settings; never put a `service_role` key in a `VITE_` variable.
4. Create an administrator in Supabase Authentication (invite the intended admin; public sign-up is not implemented).
5. Add that user's auth ID to the admin allowlist from the Supabase SQL Editor:

   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'admin@example.com'
   on conflict (user_id) do nothing;
   ```

6. Restart the Vite server and open `/admin`.

The migration enables row-level security. Visitors can read active site content and submit inquiries; only accounts explicitly inserted into `admin_users` can manage site content or read inquiries. Database policies enforce these permissions.

## Admin workspace

Sign in at `/admin` using the invited Supabase user. The portal provides a content dashboard, class and coach management, membership plan editing, and inquiry status management. Content changes are reflected on the public website.

## Frontend scripts

Run these commands from `frontend/`:

- `npm run dev` — local development server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run preview` — preview the production build
