import MoneyTransactionReportActions from '../money-transaction-reports/actions';
import { cache } from '../../lib/memoize-actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `money_transaction_reports/where/success`:
      return [...state, ...action.payload];
    case `money_transaction_reports/update/success`:
    case `money_transaction_reports/create/success`:
    case `money_transaction_reports/destroy/success`:
        cache.delete(MoneyTransactionReportActions.where.unmemoized);
        return INITIAL_STATE;
    case `reset`:
        cache.clear();
        return INITIAL_STATE;
    default:
        return INITIAL_STATE;
  }
}
