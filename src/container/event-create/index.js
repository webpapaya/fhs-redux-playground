import { connect } from 'react-redux';
import Organism from './organism';
import * as events from '../../domain/events/actions';
import pipe from '../../lib/pipe';

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (props) => dispatch(events.create(props)),
});

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
)(Organism);