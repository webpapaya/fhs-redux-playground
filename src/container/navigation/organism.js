import React from 'react';

const Organism = ({ onUserSignOut }) => (
    <div>
        <button onClick={onUserSignOut}>Sign out</button>
    </div>
)

export default Organism;