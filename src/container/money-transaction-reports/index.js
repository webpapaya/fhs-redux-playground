import { connect } from 'react-redux';
import MoneyTransactionReportsActions from '../../domain/money-transaction-reports/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';
import {
	q, where, eq, findByQuery,
} from 'datenkrake';

const mapStateToProps = (state) => {
	const reports = state.moneyTransactionReports;
	const totalBalanceQuery = q(where({
		granularity: eq('total'),
		userId: eq(state.userAuthentication.userId),
	}));

	return ({
		reloadMoneyTransactionReports: state.ui.reloadMoneyTransactionReports,
		totalAmount: findByQuery(q(totalBalanceQuery, where({ type: eq('sum') })), reports).amount || 0,
		debitAmount: findByQuery(q(totalBalanceQuery, where({ type: eq('debit') })), reports).amount || 0,
		creditAmount: findByQuery(q(totalBalanceQuery, where({ type: eq('credit') })), reports).amount || 0,
		userId: state.userAuthentication.userId,
	});
};

const mapDispatchToProps = dispatch => ({
	sideEffect: props => dispatch(MoneyTransactionReportsActions.where(q(where({
		granularity: eq('total'),
		userId: eq(props.userId),
	})))),
});

export default pipe(
	connect(mapStateToProps, mapDispatchToProps),
	hasSideEffect({ props: ['reloadMoneyTransactionReports'] }),
)(Organism);
