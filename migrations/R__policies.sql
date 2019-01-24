ALTER TABLE public.money_transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS money_transactions_policy
ON public.money_transactions;

CREATE POLICY money_transactions_policy
ON public.money_transactions
FOR ALL
USING (
  debitor_id in (select id from users where role = current_user) OR
  creditor_id in (select id from users where role = current_user));

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS user_policy
ON public.users;

CREATE POLICY user_policy
ON public.users
FOR ALL
USING (role = current_user);

