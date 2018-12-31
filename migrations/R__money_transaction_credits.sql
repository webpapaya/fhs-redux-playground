-- -- I know I'm ugly...

drop VIEW IF EXISTS money_transaction_credits;
CREATE VIEW money_transaction_credits as 
  select 
    sum(amount) as amount, 
    creditor_id as user_id,
    date_trunc('day', created_at) as date, 
    'day' as granularity, 
    'credit' as type
  from money_transactions
  group by date_trunc('day', created_at), creditor_id

  UNION

  select 
    sum(amount) as amount, 
    creditor_id as user_id, 
    date_trunc('month', created_at) as date, 
    'month' as granularity,
    'credit' as type
  from money_transactions
  group by date_trunc('month', created_at), creditor_id

  UNION

  select 
    sum(amount) as amount, 
    creditor_id as user_id, 
    date_trunc('year', created_at) as date, 
    'year' as granularity,
    'credit' as type
  from money_transactions
  group by date_trunc('year', created_at), creditor_id

  UNION

  select 
    sum(amount) as amount, 
    creditor_id as user_id, 
    null as date, 
    'total' as granularity, 
    'credit' as type
  from money_transactions
  group by creditor_id
;




