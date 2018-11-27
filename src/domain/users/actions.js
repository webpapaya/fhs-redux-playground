import { fetchGet, fetchPost } from '../fetch'

export const where = () => (dispatch) => fetchGet('users')
    .then((payload) => dispatch({ type: '@USERS:fetched', payload }));

export const create = (body) => (dispatch) => fetchPost('users', { body })
    .then(() => dispatch(where({})));
