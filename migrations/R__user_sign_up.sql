
create or replace function
user_sign_up(email text, pass text) returns VOID as $$
begin
  INSERT INTO basic_auth.users (email, pass, role)
  VALUES (email, pass, 'member');
end;
$$ language plpgsql SECURITY DEFINER;