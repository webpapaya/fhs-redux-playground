-- I know I'm ugly...


CREATE OR REPLACE VIEW money_transaction_reports as 
  select sum(amount) as amount, date_trunc('day', created_at) as date, 'day' as granularity, debitor_id, creditor_id
  from money_transactions
  group by date_trunc('day', created_at), debitor_id, creditor_id

  UNION 

  select sum(amount) as amount, date_trunc('day', created_at) as date, 'day' as granularity, null as debitor_id, null as creditor_id
  from money_transactions
  group by date_trunc('day', created_at), debitor_id, creditor_id

  UNION

  select sum(amount) as amount, date_trunc('day', created_at) as date, 'day' as granularity, debitor_id, null as creditor_id
  from money_transactions
  group by date_trunc('day', created_at), debitor_id, creditor_id

  UNION

  select sum(amount) as amount, date_trunc('day', created_at) as date, 'day' as granularity, null as debitor_id, creditor_id
  from money_transactions
  group by date_trunc('day', created_at), debitor_id, creditor_id
  
  UNION

  -- MONTH

  select sum(amount) as amount, date_trunc('month', created_at) as date, 'month' as granularity, debitor_id, creditor_id
  from money_transactions
  group by date_trunc('month', created_at), debitor_id, creditor_id

  UNION 

  select sum(amount) as amount, date_trunc('month', created_at) as date, 'month' as granularity, null as debitor_id, null as creditor_id
  from money_transactions
  group by date_trunc('month', created_at), debitor_id, creditor_id

  UNION

  select sum(amount) as amount, date_trunc('month', created_at) as date, 'month' as granularity, debitor_id, null as creditor_id
  from money_transactions
  group by date_trunc('month', created_at), debitor_id, creditor_id

  UNION

  select sum(amount) as amount, date_trunc('month', created_at) as date, 'month' as granularity, null as debitor_id, creditor_id
  from money_transactions
  group by date_trunc('month', created_at), debitor_id, creditor_id

  UNION

  -- YEAR

  select sum(amount) as amount, date_trunc('year', created_at) as date, 'year' as granularity, debitor_id, creditor_id
  from money_transactions
  group by date_trunc('year', created_at), debitor_id, creditor_id

  UNION 

  select sum(amount) as amount, date_trunc('year', created_at) as date, 'year' as granularity, null as debitor_id, null as creditor_id
  from money_transactions
  group by date_trunc('year', created_at), debitor_id, creditor_id

  UNION

  select sum(amount) as amount, date_trunc('year', created_at) as date, 'year' as granularity, debitor_id, null as creditor_id
  from money_transactions
  group by date_trunc('year', created_at), debitor_id, creditor_id

  UNION

  select sum(amount) as amount, date_trunc('year', created_at) as date, 'year' as granularity, null as debitor_id, creditor_id
  from money_transactions
  group by date_trunc('year', created_at), debitor_id, creditor_id

  -- --  TOTAL --
  
  UNION

  select sum(amount) as amount, null as date, 'total' as granularity, debitor_id, creditor_id
  from money_transactions
  group by debitor_id, creditor_id

  UNION 

  select sum(amount) as amount,  null as date, 'total' as granularity, null as debitor_id, null as creditor_id
  from money_transactions
  group by debitor_id, creditor_id

  UNION

  select sum(amount) as amount,  null as date, 'total' as granularity, debitor_id, null as creditor_id
  from money_transactions
  group by debitor_id, creditor_id

  UNION

  select sum(amount) as amount, null as date, 'total' as granularity, null as debitor_id, creditor_id
  from money_transactions
  group by debitor_id, creditor_id
;