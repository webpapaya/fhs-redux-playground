import { connect } from 'react-redux';
import MoneyTransactionReportsActions from '../../domain/money-transaction-reports/actions';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';

const mapStateToProps = (state, props) => ({
    moneyTransactionReports: state.moneyTransactionReports,
});

const mapDispatchToProps = (dispatch) => ({
    sideEffect: () => dispatch(MoneyTransactionReportsActions.where({ granularity: 'day' })),
});

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
    hasSideEffect(),
)(Organism);