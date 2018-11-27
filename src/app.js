import React from 'react';

import UserCreate from './container/user-create';
import EventCreate from './container/event-create';
import UserList from './container/user-list';
import EventList from './container/event-list';
import UserAddEvents from './container/user-add-events';

export default () => (
    <div>
        <UserAddEvents />

        <EventCreate />
        <EventList />

        <UserCreate />
        <UserList />
    </div>
);