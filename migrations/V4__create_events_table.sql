create table if not exists
public.events (
  id       serial primary key,
  name     text not null check (length(name) < 512),
  user_id  NAME not null default current_user
);