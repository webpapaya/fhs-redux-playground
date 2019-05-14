import { createFilterByQuery, createFindByQuery } from 'datenkrake/src/selectors';

export const filterByQuery =
  createFilterByQuery({ path: ['moneyTransactions'] });

export const findByQuery =
  createFindByQuery({ path: ['moneyTransactions'] });