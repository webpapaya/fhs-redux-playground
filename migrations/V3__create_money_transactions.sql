create table if not exists
public.money_transactions (
  id           SERIAL PRIMARY KEY,
  amount       NUMERIC(8, 2) NOT NULL CHECK (amount >= 0),
  debitor_id   serial NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  creditor_id  serial NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  created_at   timestamp without time zone NOT NULL default (now() at time zone 'utc'),

  CHECK        (debitor_id <> creditor_id)
);