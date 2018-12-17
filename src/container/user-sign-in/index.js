import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';

const mapDispatchToProps = (dispatch, props) => ({
    onSubmit: (payload) => Promise.resolve()
        .then(() => dispatch(UserActions.signIn(payload)))
        .then(() => props.history.push('/money-transactions')),
});

export default pipe(
    withRouter,
    connect(null, mapDispatchToProps),
)(Organism);