import { fetchGet, fetchPost } from '../../lib/fetch'

const wait = (ms) => (args) => new Promise(resolve => {
    setTimeout(() =>  resolve(args), ms)
});

export const whereUsers = () => (dispatch) => fetchGet('users')
    .then(wait(1000))
    .then((payload) => dispatch({ type: '@USERS:fetched', payload }));

export const createUser = (body) => (dispatch) => fetchPost('users', { body })
    .then(() => dispatch(whereUsers({})));
