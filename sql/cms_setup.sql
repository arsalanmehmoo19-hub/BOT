create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content jsonb not null default '[]',
  status text not null default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  alt text,
  uploaded_at timestamp with time zone default timezone('utc'::text, now())
);

-- Example: content jsonb = [{"type":"heading","text":"Welcome"},{"type":"image","url":"..."},{"type":"paragraph","text":"..."}]
