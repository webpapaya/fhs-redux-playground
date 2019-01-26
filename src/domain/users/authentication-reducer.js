import jwtDecode from 'jwt-decode';
import { setAuthentication, unsetAuthentication } from 'datenkrake/src/adapters/postgrest';
import { connection } from '../server-connection';

const parseToken = (token) => {
	if (!token) { return {}; }
	const parsedToken = jwtDecode(token);
	return {
		id: parsedToken.id,
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
