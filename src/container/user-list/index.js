import { connect } from 'react-redux';
import Organism from './organism';
import { whereUsers } from '../../domain/users/actions';

const mapStateToProps = (state) => ({
    users: state.users,
})

const mapDispatchToProps = (dispatch, props) => ({
    sideEffect: () => dispatch(whereUsers(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Organism);