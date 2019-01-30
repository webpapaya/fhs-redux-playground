drop view if exists money_transaction_reports;
CREATE VIEW money_transaction_reports as
  select sum(amount) as amount, user_id, other_user_id, type from (
    select 
      sum(amount) * -1 as amount, 
      debitor_id as user_id,
      creditor_id :: integer as other_user_id,
      'sum' as type
    from money_transactions 
    where paid_at is null 
    group by user_id, other_user_id

    UNION

    select 
      sum(amount) as amount, 
      creditor_id as user_id,
      debitor_id :: integer as other_user_id,
      'sum' as type
    from money_transactions 
    where paid_at is null 
    group by user_id, other_user_id

    UNION

    select 
      sum(amount) * -1 as amount, 
      debitor_id as user_id,
      null :: integer as other_user_id,
      'sum' as type
    from money_transactions 
    where paid_at is null 
    group by user_id, other_user_id

    UNION

    select 
      sum(amount) as amount, 
      creditor_id as user_id,
      null :: integer as other_user_id,
      'sum' as type
    from money_transactions 
    where paid_at is null 
    group by user_id, other_user_id

    ---------

    UNION

    select 
      sum(amount) as amount, 
      creditor_id as user_id,
      debitor_id :: integer as other_user_id,
      'credit' as type
    from money_transactions 
    where paid_at is null 
    group by user_id, other_user_id

    UNION

    select 
      sum(amount) * -1 as amount, 
      debitor_id as user_id,
      creditor_id :: integer as other_user_id,
      'debit' as type
    from money_transactions 
    where paid_at is null 
    group by user_id, other_user_id

    UNION

    select 
      sum(amount) as amount, 
      creditor_id as user_id,
      null :: integer as other_user_id,
      'credit' as type
    from money_transactions 
    where paid_at is null 
    group by user_id

    UNION

    select 
      sum(amount) * -1 as amount, 
      debitor_id as user_id,
      null :: integer as other_user_id,
      'debit' as type
    from money_transactions 
    where paid_at is null 
    group by user_id
  ) x group by user_id, other_user_id, type;
;
