import React from 'react';
export default ({ events, onEventDestroy }) =>  (
    <ul>
        { events.map((event) => (
            <li key={event.id}>
                {event.name},{event.startTime}-{event.endTime}
                <button onClick={ () => onEventDestroy(event)}>Destroy</button>
            </li>
        )) }
    </ul>
);