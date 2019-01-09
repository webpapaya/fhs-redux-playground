import jwtDecode from 'jwt-decode';
import { connection } from '../server-connection';
import { setAuthentication, unsetAuthentication } from '../../lib/repository/adapters/postgrest';

const parseToken = (token) => {
	if (!token) { return {}; }
	const parsedToken = jwtDecode(token);
	return {
		userId: parseInt(parsedToken.role.replace('user', ''), 10),
		expiryDate: new Date(parsedToken.exp * 1000),
	};
};

export default (_, action) => {
	switch (action.type) {
		case '@USER/signedIn':
			global.localStorage.setItem('jwtToken', action.payload.token);
			setAuthentication(connection, action.payload.token);
			return parseToken(action.payload.token);

		case 'reset':
			global.localStorage.removeItem('jwtToken');
			unsetAuthentication(connection);
			return {};

		default:
			setAuthentication(connection, global.localStorage.getItem('jwtToken'));
			return parseToken(global.localStorage.getItem('jwtToken'));
	}
};
