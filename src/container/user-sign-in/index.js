import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import { redirect } from '../../lib/routing';
import pipe from '../../lib/pipe';

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (props) => Promise.resolve()
        .then(() => dispatch(UserActions.signIn(props)))
        .then(() => redirect('/money-transactions')),
});

export default pipe(
    withRouter,
    connect(null, mapDispatchToProps),
)(Organism);