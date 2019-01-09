import React from 'react';

const Form = ({ onSubmit, children }) => (
    <form onSubmit={onSubmit} style={{ width: '100%' }}>
        {children}
    </form>
);

export default Form;