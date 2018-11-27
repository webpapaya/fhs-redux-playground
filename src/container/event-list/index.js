import { connect } from 'react-redux';
import Organism from './organism';
import * as events from '../../domain/events/actions';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect'

const mapStateToProps = (state) => ({
    events: state.events,
});

const mapDispatchToProps = (dispatch, props) => ({
    sideEffect: () => dispatch(events.where(props)),
    onEventDestroy: (event) => dispatch(events.destroy(event)),
});

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
    hasSideEffect()
)(Organism);