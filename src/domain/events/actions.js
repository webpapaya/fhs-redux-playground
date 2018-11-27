import { fetchGet, fetchPost, fetchDelete } from '../fetch'

export const where = () => (dispatch) => fetchGet('events')
    .then((payload) => dispatch({ type: '@EVENTS:fetched', payload }));

export const create = (body) => (dispatch) => fetchPost('events', { body })
    .then(() => dispatch(where({})));

export const destroy = ({ id }) => (dispatch) => Promise.resolve()
    .then(() => dispatch({ type: '@EVENTS:destroyed', payload: { id } }))
    .then(() => fetchDelete('events', { body: { id } }))
    .then(() => dispatch(where({})));