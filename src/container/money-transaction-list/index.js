import { connect } from 'react-redux';
import MoneyTransactionActions from '../../domain/money-transactions/actions';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';

const mapStateToProps = (state, props) => ({
    users: state.users,
    moneyTransactions: state.moneyTransactions,
});

const mapDispatchToProps = (dispatch) => ({
    onDestroy: (filter) => dispatch(MoneyTransactionActions.destroy(filter)),
    sideEffect: () => Promise.all([
        dispatch(UserActions.where()),
        dispatch(MoneyTransactionActions.where()),
    ]),
});

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
    hasSideEffect(),
)(Organism);