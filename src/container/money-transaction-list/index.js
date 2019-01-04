import { connect } from 'react-redux';
import MoneyTransactionActions from '../../domain/money-transactions/actions';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';

const mapStateToProps = (state, props) => ({
    users: state.users,
    items: state.moneyTransactions,
    userId: state.userAuthentication.userId,
});


const mapDispatchToProps = (dispatch) => ({
    onDestroy: (query) => 
        dispatch(MoneyTransactionActions.destroy(query)),

    sideEffect: () =>
        dispatch(UserActions.where()),

    onItemsLoad: (query) =>
        dispatch(MoneyTransactionActions.where(query)),
});

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
    hasSideEffect(),
)(Organism);


