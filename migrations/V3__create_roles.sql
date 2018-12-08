create role authenticator noinherit;
create role anon;
create role member;

ALTER DEFAULT PRIVILEGES IN SCHEMA public, basic_auth 
    GRANT select, insert, update, delete ON TABLES TO anon;

ALTER DEFAULT PRIVILEGES IN SCHEMA public, basic_auth
    GRANT USAGE, SELECT ON SEQUENCES TO anon;

grant select on table pg_authid, basic_auth.users to anon;

grant anon to authenticator;
grant anon to member;