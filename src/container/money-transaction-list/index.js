import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MoneyTransactionActions from '../../domain/money-transactions/actions';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';
import { desc, q, order, filterByQuery } from 'datenkrake';
import { fromQueryParams } from 'datenkrake/src/adapters/postgrest'

const mapStateToProps = (state, props) => ({
	users: state.users,
	moneyTransactions: filterByQuery(q(
		fromQueryParams(props.history.location.search),
	), state.moneyTransactions),
	userId: state.userAuthentication.id,
});

const mapDispatchToProps = (dispatch, props) => ({
	onDestroy: query =>
		dispatch(MoneyTransactionActions.destroy(query)),

	sideEffect: () =>
		dispatch(UserActions.where()),

	onMoneyTransactionsLoad: paginationQuery => {
		return dispatch(MoneyTransactionActions.where(q(
			paginationQuery, 
			fromQueryParams(props.history.location.search),
		)));
	}
});

export default pipe(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
	hasSideEffect(),
)(Organism);
