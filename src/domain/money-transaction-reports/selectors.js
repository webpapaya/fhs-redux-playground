import { createFilterByQuery, createFindByQuery } from 'datenkrake/src/selectors';

export const filterByQuery =
  createFilterByQuery({ path: ['moneyTransactionReports'] });

export const findByQuery =
  createFindByQuery({ path: ['moneyTransactionReports'] });