import { createFilterByQuery, createFindByQuery } from 'datenkrake/src/selectors';

export const filterByQuery =
  createFilterByQuery({ path: ['users'] });

export const findByQuery =
  createFindByQuery({ path: ['users'] });