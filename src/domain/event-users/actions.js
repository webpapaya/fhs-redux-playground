import { fetchGet, fetchPost, fetchDelete } from '../fetch'

export const where = () => (dispatch) => fetchGet('events_users')
    .then((payload) => dispatch({ type: '@EVENTS_USERS:fetched', payload }));

export const create = (body) => (dispatch) => fetchPost('events_users', { body })
    .then(() => dispatch(where({})));

export const destroy = ({ id }) => (dispatch) => Promise.resolve()
    .then(() => dispatch({ type: '@EVENTS_USERS:destroyed', payload: { id } }))
    .then(() => fetchDelete('events_users', { body: { id } }))
    .then(() => dispatch(where({})));