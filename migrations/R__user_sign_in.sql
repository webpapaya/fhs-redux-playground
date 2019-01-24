CREATE TYPE public.jwt_token AS (
	token text
);

-- login should be on your exposed schema
create or replace function
user_sign_in(email text, pass text) returns public.jwt_token as $$
declare
  _userId integer;
	_role name;
	result public.jwt_token;
begin
	-- check email and password
	select basic_auth.user_role(email, pass) into _role;
  if _role is null then
	raise invalid_password using message = 'invalid user or password';
	end if;
  select id from public.users where role = _role limit 1 into _userId;

	select basic_auth.sign(
		row_to_json(r), 'reallyreallyreallyreallyverysafe'
	) as token
	from (
		select _role as role, user_sign_in.email as email, _userId as id,
		 extract(epoch from now())::integer + 60*60000 as exp
	) r
	into result;
	return result;
end;
$$ language plpgsql SECURITY DEFINER;