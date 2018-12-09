create schema if not exists basic_auth;
create schema if not exists public;

create role authenticator noinherit;
create role anon;
create role member;

ALTER DEFAULT PRIVILEGES IN SCHEMA public 
    GRANT select, insert, update, delete ON TABLES TO anon;

GRANT select, insert, update, delete ON ALL TABLES IN SCHEMA public TO anon;


ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT usage, select ON SEQUENCES TO anon;

GRANT usage, select ON ALL SEQUENCES IN SCHEMA public TO anon;


ALTER DEFAULT PRIVILEGES IN SCHEMA public 
    GRANT execute ON FUNCTIONS TO anon;

GRANT execute ON ALL FUNCTIONS IN SCHEMA public TO anon;


grant anon to authenticator;
grant anon to member;