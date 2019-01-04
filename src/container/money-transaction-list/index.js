import { connect } from 'react-redux';
import MoneyTransactionActions from '../../domain/money-transactions/actions';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';

import { eq, desc } from '../../lib/repository/operators';
import { q, where, order } from '../../lib/repository/query-builder';

const mapStateToProps = (state, props) => ({
    users: state.users,
    items: state.moneyTransactions,
    userId: state.userAuthentication.userId,
});

const mapDispatchToProps = (dispatch) => ({
    onDestroy: ({ id }) => 
        dispatch(MoneyTransactionActions.destroy(q(where({ id: eq(id) })))),

    sideEffect: () =>
        dispatch(UserActions.where()),

    onItemsLoad: (filter, meta = {}) =>
        dispatch(MoneyTransactionActions.where(q(
            order(desc('createdAt'))))),
});

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
    hasSideEffect(),
)(Organism);


