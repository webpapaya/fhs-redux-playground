import { connect } from 'react-redux';
import MoneyTransactionActions from '../../domain/money-transactions/actions';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';
import {
	desc, q, order, filterByQuery,
} from 'datenkrake';

const transactionQuery = q(order(desc('createdAt')));

const mapStateToProps = state => ({
	users: state.users,
	moneyTransactions: filterByQuery(transactionQuery, state.moneyTransactions),
	userId: state.userAuthentication.userId,
});

const mapDispatchToProps = dispatch => ({
	onDestroy: query =>
		dispatch(MoneyTransactionActions.destroy(query)),

	sideEffect: () =>
		dispatch(UserActions.where()),

	onMoneyTransactionsLoad: paginationQuery =>
		dispatch(MoneyTransactionActions.where(q(paginationQuery, transactionQuery))),
});

export default pipe(
	connect(mapStateToProps, mapDispatchToProps),
	hasSideEffect(),
)(Organism);
