create table public.events (
  id       serial primary key,
  name     text not null check (length(name) < 512),
  user_id  NAME not null default current_user
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY events_policy ON public.events
  USING ((user_id = current_user) or (current_user = 'member'))