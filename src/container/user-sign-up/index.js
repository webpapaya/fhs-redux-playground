import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { signUpAndIn } from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';

const mapDispatchToProps = (dispatch, props) => ({
    onSubmit: (body) => Promise.resolve()
        .then(() => dispatch(signUpAndIn(body))) 
        .then(() => props.history.push('/money-transactions')),
});

export default pipe(
    withRouter,
    connect(null, mapDispatchToProps),
)(Organism);