-- We put things inside the basic_auth schema to hide
-- them from public view. Certain public procs/views will
-- refer to helpers and tables inside.
create schema if not exists basic_auth;

create table if not exists
basic_auth.users (
  id       serial primary key,
  email    text check ( email ~* '^.+@.+\..+$' ) unique,
  pass     text not null check (length(pass) < 512),
  role     name not null check (length(role) < 512)
);

create or replace function
basic_auth.check_role_exists() returns trigger as $$
begin
  if not exists (select 1 from pg_roles as r where r.rolname = new.role) then
    raise foreign_key_violation using message =
      'unknown database role: ' || new.role;
    return null;
  end if;
  return new;
end
$$ language plpgsql;

drop trigger if exists ensure_user_role_exists on basic_auth.users;
create constraint trigger ensure_user_role_exists
  after insert or update on basic_auth.users
  for each row
  execute procedure basic_auth.check_role_exists();


create or replace function
basic_auth.encrypt_pass() returns trigger as $$
begin
  if tg_op = 'INSERT' or new.pass <> old.pass then
    new.pass = basic_auth.crypt(new.pass, basic_auth.gen_salt('bf'));
  end if;
  return new;
end
$$ language plpgsql;

drop trigger if exists encrypt_pass on basic_auth.users;
create trigger encrypt_pass
  before insert or update on basic_auth.users
  for each row
  execute procedure basic_auth.encrypt_pass();



create or replace function
basic_auth.user_role(email text, pass text) returns name
  language plpgsql
  as $$
begin
  return (
  select role from basic_auth.users
   where users.email = user_role.email
     and users.pass = basic_auth.crypt(user_role.pass, users.pass)
  );
end;
$$;


CREATE TYPE public.jwt_token AS (
  token text
);

-- login should be on your exposed schema
create or replace function
sign_in(email text, pass text) returns public.jwt_token as $$
declare
  _role name;
  result public.jwt_token;
begin
  -- check email and password
  select basic_auth.user_role(email, pass) into _role;
  if _role is null then
    raise invalid_password using message = 'invalid user or password';
  end if;

  select basic_auth.sign(
      row_to_json(r), 'reallyreallyreallyreallyverysafe'
    ) as token
    from (
      select _role as role, sign_in.email as email,
         extract(epoch from now())::integer + 60*60000 as exp
    ) r
    into result;
  return result;
end;
$$ language plpgsql;

create or replace function
sign_up(email text, pass text) returns VOID as $$
begin
  INSERT INTO basic_auth.users (email, pass, role)
  VALUES (email, pass, 'member');
end;
$$ language plpgsql;



create or replace function
user_role() returns name
  language plpgsql
  as $$
begin
  return (
  select current_user);
end;
$$;