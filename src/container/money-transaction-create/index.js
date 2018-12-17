import { connect } from 'react-redux';
import { signUpAndIn, where as usersWhere } from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';

const mapStateToProps = (state, props) => ({

});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (props) => dispatch(signUpAndIn(props)),
    sideEffect: () => dispatch(usersWhere())
});

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
    hasSideEffect(),
)(Organism);