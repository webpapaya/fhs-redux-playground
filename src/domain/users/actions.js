import { fetchGet, fetchPost } from '../../lib/fetch'

export const whereUsers = () => (dispatch) => {
    return fetchGet('users')
        .then((payload) => dispatch({ type: '@USERS:fetched', payload }));
}

export const createUser = (body) => (dispatch) => {
    return fetchPost('users', { body })
        .then(() => dispatch(whereUsers({})));
}