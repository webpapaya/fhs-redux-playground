import React from 'react';
export default ({ users }) =>  (
    <ul>
        { users.map((user) => <li key={user.id}>{user.firstName}-{user.lastName}</li>) }
    </ul>
);