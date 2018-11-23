import React from 'react';
export default ({ users, sideEffect }) => {
    return (
        <ul>
            { users.map((user) => (
                <li>{user.firstName}-{user.lastName}{ console.log(user)}</li>
            ))}
            <button onClick={sideEffect}>load users</button>
        </ul>
    )
}