import { connect } from 'react-redux';
import { q, where, eq, not } from 'datenkrake';
import MoneyTransactionActions from '../../domain/money-transactions/actions';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';
import UserSelectors from '../../domain/users/selectors'

const mapStateToProps = state => ({
	users: UserSelectors.filterByQuery(
			q(where({ id: not(eq(state.userAuthentication.id)) })), state),
	authenticatedUserId: state.userAuthentication.id,
});

const mapDispatchToProps = dispatch => ({
	onSubmit: props => dispatch(MoneyTransactionActions.create(props)),
	sideEffect: () => dispatch(UserActions.where()),
	onUserLoad: filter => dispatch(UserActions.where(filter)),
});

const mergeProps = (state, actions) => ({
	...state,
	...actions,
	onDebtCreate: ({ userId, ...props }) => actions.onSubmit({
		...props,
		creditorId: userId,
		debitorId: state.authenticatedUserId,
	}),
	onCreditCreate: ({ userId, ...props }) => actions.onSubmit({
		...props,
		debitorId: userId,
		creditorId: state.authenticatedUserId,
	}),
});

export default pipe(
	connect(mapStateToProps, mapDispatchToProps, mergeProps),
	hasSideEffect(),
)(Organism);
