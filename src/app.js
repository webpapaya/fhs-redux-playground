import React from 'react';

import UserCreate from './container/user-create';
import EventCreate from './container/event-create';
import UserList from './container/user-list';
import EventList from './container/event-list';

export default () => (
    <div>
        <EventCreate />
        <EventList />

        <UserCreate />
        <UserList />
    </div>
);