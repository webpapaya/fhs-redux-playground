import { connect } from 'react-redux';
import Organism from './organism';
import { createUser } from '../../domain/users/actions';
import pipe from '../../lib/pipe';

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (props) => dispatch(createUser(props)),
});

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
)(Organism);