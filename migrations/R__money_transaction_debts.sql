-- -- I know I'm ugly...


drop VIEW IF EXISTS money_transaction_debits;
CREATE VIEW money_transaction_debits as 
  select 
    sum(amount) as amount, 
    debitor_id as user_id,
    date_trunc('day', created_at) as date, 
    'day' as granularity, 
    'debit' as type
  from money_transactions
  group by date_trunc('day', created_at), debitor_id

  UNION

  select 
    sum(amount) as amount, 
    debitor_id as user_id, 
    date_trunc('month', created_at) as date, 
    'month' as granularity,
    'debit' as type
  from money_transactions
  group by date_trunc('month', created_at), debitor_id

  UNION

  select 
    sum(amount) as amount, 
    debitor_id as user_id, 
    date_trunc('year', created_at) as date, 
    'year' as granularity,
    'debit' as type
  from money_transactions
  group by date_trunc('year', created_at), debitor_id

  UNION

  select 
    sum(amount) as amount, 
    debitor_id as user_id, 
    null as date, 
    'total' as granularity, 
    'debit' as type
  from money_transactions
  group by debitor_id
;




