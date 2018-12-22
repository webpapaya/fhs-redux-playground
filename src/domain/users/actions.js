import buildRestActions from '../build-rest-actions';
import { fetchPost, setAuthorizationToken, unsetAuthorizationToken, fetchGet } from '../fetch'

const REST_ACTIONS = buildRestActions({ resource: 'users' });

const signIn = ({ email, password }) => (dispatch) => 
    fetchPost('rpc/user_sign_in', { email, pass: password }).then((data) => {
        setAuthorizationToken(data[0].token);
        // For simplicity store jwtToken in localStorage for now (don't use this in prod)
        global.localStorage.setItem('jwtToken', data[0].token); 
        return dispatch({ type: '@USER/signedIn', payload: { token } });
    });

const signOut = () => (dispatch) => Promise.resolve()
    .then(() => unsetAuthorizationToken())
    .then(() => dispatch({ type: '@USER/signedOut' }));

const signUpAndIn = ({ name, email, password }) => (dispatch) => Promise.resolve()
    .then(() => fetchPost('rpc/user_sign_up', { email, pass: password }))
    .then(() => dispatch({ type: '@USER/signedUp'}))
    .then(() => dispatch(signIn({ email, password })))
    .then(() => dispatch(REST_ACTIONS.create({ name })));

export default {
    ...REST_ACTIONS,
    signIn,
    signOut,
    signUpAndIn,
}; 