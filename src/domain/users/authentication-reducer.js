import jwtDecode from 'jwt-decode';
import { unsetAuthorizationToken, setAuthorizationToken } from '../fetch';

const parseToken = (token) => {
  if (!token) { return {}; }
  const parsedToken = jwtDecode(token);
  return {
    userId: parseInt(parsedToken.role.replace('user', '')),
    expiryDate: new Date(parsedToken.exp * 1000),
  };
}

export default (_, action) => {
  switch (action.type) {
    case '@USER/signedIn':
      global.localStorage.setItem('jwtToken', action.payload.token); 
      setAuthorizationToken(action.payload.token);
      return parseToken(action.payload.token);

    case 'reset': 
      global.localStorage.removeItem('jwtToken');
      unsetAuthorizationToken(); 
      return {};

    default: 
      setAuthorizationToken(global.localStorage.getItem('jwtToken'));
      return parseToken(global.localStorage.getItem('jwtToken'));
  }
}; 