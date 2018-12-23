import { connect } from 'react-redux';
import MoneyTransactionReportsActions from '../../domain/money-transaction-reports/actions';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';
import { find, where, isNil, propEq } from 'ramda';

const selectTotalBalanceForAuthenticatedUser = (state) => {
    const transactionReport = find(where({
        granularity: propEq('total'),
        creditorId: propEq(state.userAuthentication.userId),
        debitorId: isNil,
    }), state.moneyTransactionReports) || {};

    return transactionReport.amount || 0;
}

const mapStateToProps = (state, props) => ({
    reloadMoneyTransactionReports: state.ui.reloadMoneyTransactionReports,
    totalBalance: selectTotalBalanceForAuthenticatedUser(state),
    creditorId: state.userAuthentication.userId,
});

const mapDispatchToProps = (dispatch) => ({
    sideEffect: (props) => dispatch(MoneyTransactionReportsActions.where({ 
        granularity: 'total', 
        creditorId: props.creditorId, 
        debitorId: null,
    })),
});

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
    hasSideEffect({ props: ['reloadMoneyTransactionReports'] }),
)(Organism);