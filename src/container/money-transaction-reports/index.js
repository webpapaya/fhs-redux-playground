import { connect } from 'react-redux';
import MoneyTransactionReportsActions from '../../domain/money-transaction-reports/actions';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';
import { filter, find, where, whereEq, propEq } from 'ramda';



const selectTotalBalanceForAuthenticatedUser = (state, { type }) => {
    const transactionReport = find(whereEq({
        granularity: 'total',
        userId: state.userAuthentication.userId,
        type
    }), state.moneyTransactionReports) || {};

    return transactionReport.amount || 0;
}

const mapStateToProps = (state, props) => ({
    reloadMoneyTransactionReports: state.ui.reloadMoneyTransactionReports,
    totalAmount: selectTotalBalanceForAuthenticatedUser(state, { type: 'sum' }),
    debitAmount: selectTotalBalanceForAuthenticatedUser(state, { type: 'debit' }),
    creditAmount: selectTotalBalanceForAuthenticatedUser(state, { type: 'credit' }),
    userId: state.userAuthentication.userId,
});

const mapDispatchToProps = (dispatch) => ({
    sideEffect: (props) => dispatch(MoneyTransactionReportsActions.where({ 
        granularity: 'total', 
        userId: props.userId
    })),
});

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
    hasSideEffect({ props: ['reloadMoneyTransactionReports'] }),
)(Organism);