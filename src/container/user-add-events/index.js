import { connect } from 'react-redux';
import pipe from '../../lib/pipe';
import hasSideEffect from '../../lib/has-side-effect';

import Organism from './organism';
import * as eventActions from '../../domain/events/actions';
import * as userActions from '../../domain/users/actions';
import * as eventUserActions from '../../domain/event-users/actions';

const mapStateToProps = (state, props) => ({
    events: 'eventId' in props ? state.events.filter((event) => event.id === props.eventId) : state.events,
    users: 'userId' in props ? state.users.filter((user) => user.id === props.userId) : state.users,
})

const mapDispatchToProps = (dispatch) => ({
    sideEffect: () => Promise.all([
        dispatch(eventActions.where({})),
        dispatch(userActions.where({})),
        dispatch(eventUserActions.where({})),
    ]),
    onSubmit: (props) => dispatch(eventUserActions.create(props)),
});

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
    hasSideEffect(),
)(Organism);