import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';

const mapDispatchToProps = (dispatch, props) => ({
	onSettingsRedirect: () => Promise.resolve()
		.then(() => props.history.push('/settings')),

	onUserSignOut: () => Promise.resolve()
		.then(() => dispatch(UserActions.signOut()))
		.then(() => props.history.push('/')),
});

export default pipe(
	withRouter,
	connect(null, mapDispatchToProps),
)(Organism);
