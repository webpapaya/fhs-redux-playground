import { connect } from 'react-redux';
import MoneyTransactionActions from '../../domain/money-transactions/actions';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';

const mapStateToProps = (state, props) => ({
    users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (props) => dispatch(MoneyTransactionActions.create(props)),
    sideEffect: () => dispatch(UserActions.where()).catch((x) => console.error(x))
});

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
    hasSideEffect(),
)(Organism);