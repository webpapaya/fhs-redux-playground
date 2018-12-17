import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { signIn } from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';
import { redirect } from '../../lib/routing';

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (props) => Promise.resolve()
        .then(() => dispatch(signIn(props)))
        .then(() => redirect('/money-transactions')),
});

export default pipe(
    withRouter,
    connect(null, mapDispatchToProps),
)(Organism);