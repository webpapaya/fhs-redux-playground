import { connect } from 'react-redux';
import MoneyTransactionActions from '../../domain/money-transactions/actions';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';
import { filterByQuery } from '../../lib/repository/adapters/in-memory';
import { desc } from '../../lib/repository/operators';
import { q, order } from '../../lib/repository/query-builder';

const transactionQuery = q(order(desc('createdAt')));

const mapStateToProps = (state, props) => ({
    users: state.users,
    moneyTransactions: filterByQuery(transactionQuery, state.moneyTransactions),
    userId: state.userAuthentication.userId,
});

const mapDispatchToProps = (dispatch) => ({
    onDestroy: (query) => 
        dispatch(MoneyTransactionActions.destroy(query)),

    sideEffect: () =>
        dispatch(UserActions.where()),

    onItemsLoad: (paginationQuery) => 
        dispatch(MoneyTransactionActions.where(q(paginationQuery, transactionQuery))),
});

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
    hasSideEffect(),
)(Organism);


