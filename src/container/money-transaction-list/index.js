import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { q } from 'datenkrake';
import { fromQueryParams } from 'datenkrake/src/adapters/postgrest';
import MoneyTransactionActions from '../../domain/money-transactions/actions';
import UserActions from '../../domain/users/actions';
import { filterByQuery } from '../../domain/money-transactions/selectors';
import Organism from './organism';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';

const mapStateToProps = (state, props) => ({
	users: state.users,
	moneyTransactions: filterByQuery(q(
		fromQueryParams(props.history.location.search),
	), state),
	userId: state.userAuthentication.id,
});

const mapDispatchToProps = (dispatch, props) => ({
	onDestroy: query =>
		dispatch(MoneyTransactionActions.destroy(query)),

	sideEffect: () =>
		dispatch(UserActions.where()),

	onMoneyTransactionsLoad: paginationQuery => dispatch(MoneyTransactionActions.where(q(
		paginationQuery,
		fromQueryParams(props.history.location.search),
	))),
	onMoneyTransactionSubmit: (query, record) =>
		dispatch(MoneyTransactionActions.update(query, record)),
});

export default pipe(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
	hasSideEffect(),
)(Organism);
