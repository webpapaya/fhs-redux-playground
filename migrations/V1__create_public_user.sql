create table if not exists
public.users (
  id	   SERIAL PRIMARY KEY,
  name	 text NOT NULL
);