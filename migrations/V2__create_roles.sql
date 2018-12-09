create schema if not exists basic_auth;
create schema if not exists public;

create role authenticator noinherit;
create role anon;
create role member;

ALTER DEFAULT PRIVILEGES IN SCHEMA public 
    GRANT select, insert, update, delete ON TABLES TO anon;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT usage, select ON SEQUENCES TO anon;

ALTER DEFAULT PRIVILEGES IN SCHEMA public 
    GRANT execute ON FUNCTIONS TO anon;

grant anon to authenticator;
grant anon to member;