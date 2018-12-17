import { fetchGet } from '../fetch'

export const where = () => (dispatch) => Promise.resolve()
    .then(() => fetchGet('money_transactions'))
    .then((payload) => dispatch({ type: '@MONEY_TRANSACTIONS/where', payload }));

export const create = ({ amount, debitorId, creditorId }) => (dispatch) => Promise.resolve()
    .then(() => fetchGet('money_transactions', { amount, debitorId, creditorId }))
    .then((payload) => dispatch({ type: '@MONEY_TRANSACTIONS/created', payload }));
