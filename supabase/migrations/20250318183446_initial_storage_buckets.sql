-- Create a bucket if it does not exist
insert into storage.buckets (id, name, public, created_at, updated_at)
values
('images', 'images', true, now(), now())
on conflict (id) do nothing;
