create role anon;
create role member;
create role authenticator noinherit;
grant anon to authenticator;
grant anon to member;

grant usage on schema public, basic_auth to anon;
grant select on table pg_authid, basic_auth.users to anon;
grant execute on function sign_in(text,text) to anon;