import { connect } from 'react-redux';
import Organism from './organism';
import * as userActions from '../../domain/users/actions';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect'

const mapStateToProps = (state) => ({
    users: state.users,
});

const mapDispatchToProps = (dispatch, props) => ({
    sideEffect: () => dispatch(userActions.where(props)),
});

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
    hasSideEffect()
)(Organism);