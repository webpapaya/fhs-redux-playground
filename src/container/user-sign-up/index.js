import { connect } from 'react-redux';
import { signUpAndIn } from '../../domain/users/actions';
import Organism from './organism';
import pipe from '../../lib/pipe';

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (props) => dispatch(signUpAndIn(props)),
});

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
)(Organism);