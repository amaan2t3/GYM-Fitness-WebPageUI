# Backend

Supabase provides the database and authentication backend for Amaan’s Gym & Fitness. Apply the SQL migrations in [`supabase/migrations/`](./supabase/migrations/) in filename order. They create the content tables, seed public content, add men's and ladies' program categories and trainer experience, and configure row-level security policies.

Apply the migration in the Supabase SQL Editor. Then invite an admin through Supabase Authentication and add that user's ID to `public.admin_users`; see the root [README](../README.md) for the exact SQL and frontend environment setup.

The frontend uses only the Supabase URL and anon/publishable key. Never expose a Supabase `service_role` key in browser code or a `VITE_` environment variable.
