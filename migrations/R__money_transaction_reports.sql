-- I know I'm ugly...

drop view if exists money_transaction_reports;
CREATE VIEW money_transaction_reports as
  select sum(amount) as amount, date, user_id, granularity from (
    select amount, user_id, date, granularity from money_transaction_credits
    union
    select amount * -1, user_id, date, granularity from money_transaction_debts
  ) as x group by date, user_id, granularity
;




