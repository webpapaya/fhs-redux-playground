import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
	findByQuery, q, where, eq,
} from 'datenkrake';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';

const mapStateToProps = state => ({
	state,
	userId: state.userAuthentication.id,
	users: state.users,
});

const mapDispatchToProps = dispatch => ({
	whereUsers: filter => dispatch(UserActions.where(filter)),
	updateUser: (filter, body) => dispatch(UserActions.update(filter, body)),
});

const mergeProps = (state, actions) => {
	const filter = q(where({ id: eq(state.userId) }));
	return {
		sideEffect: () => actions.whereUsers(filter),
		onSubmit: body => actions.updateUser(filter, body),
		defaultValues: findByQuery(filter, state.users),
	};
};

export default pipe(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps, mergeProps),
	hasSideEffect(),
)(Organism);
