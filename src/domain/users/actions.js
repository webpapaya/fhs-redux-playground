import { fetchPost, setAuthorizationToken, unsetAuthorizationToken } from '../fetch'

export const signIn = ({ email, password }) => (dispatch) => 
    fetchPost('rpc/user_sign_in', { email, pass: password }).then((data) => {
        setAuthorizationToken(data[0].token);
        return dispatch({ type: '@USER/signedIn' });
    });

export const signOut = () => (dispatch) => Promise.resolve()
    .then(() => unsetAuthorizationToken())
    .then(() => dispatch({ type: '@USER/signedOut' }));

export const signUpAndIn = ({ email, password }) => (dispatch) => Promise.resolve()
    .then(() => fetchPost('rpc/user_sign_up', { email, pass: password }))
    .then(() => dispatch({ type: '@USER/signedUp'}))
    .then(() => dispatch(signIn({ email, password })));

export const where = () => (dispatch) => Promise.resolve()
    .then(() => api.get('users'))
    .then((payload) => dispatch({ type: '@USER/where', payload }));
